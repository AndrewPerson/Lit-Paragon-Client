importScripts("./assets.js");

importScripts("https://www.gstatic.com/firebasejs/8.9.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.9.1/firebase-auth.js");

self.addEventListener('install', event => event.waitUntil(Install(event)));
self.addEventListener('activate', event => event.waitUntil(Activate(event)));
self.addEventListener('fetch', event => event.respondWith(Fetch(event)));
self.addEventListener('periodicsync', event => event.waitUntil(PeriodicSync(event)));
self.addEventListener('message', event => event.waitUntil(Message(event)));

const OFFLINE_CACHE = 'Offline Resources';
const METADATA_CACHE = "Metadata";
const VALID_CACHES = [
    "Offline Resources",
    "Metadata",
    "User Resources"
];

const VERSION_URL = "https://firestore.googleapis.com/v1/projects/web-paragon/databases/(default)/documents/Metadata/Metadata";

var UPDATING = false;

async function Install(event) {
    self.skipWaiting();
}

async function Activate(event) {
    await clients.claim();
}

async function Fetch(event) {
    if (event.request.method === 'GET' && !UPDATING) {
        const request = event.request;
        const cache = await caches.open(OFFLINE_CACHE);

        let result = await cache.match(request);
        if (result instanceof Response) return result;
        else
        {
            var response = await fetch(request);

            if (!UPDATING) {
                if (self.assets.includes(response.url.replace(location.origin, ""))) {
                    var keys = await cache.keys();

                    if (!keys.includes(response.url))
                        await cache.put(response.url, response);
                }
            }

            return response;
        }
    }

    return fetch(event.request);
}

async function PeriodicSync(event) {
    if (event.tag == "metadata-fetch") {
        MetadataFetch();
        DataFetch();
    }
}

async function Message(event) {
    if (event.data.command == "metadata-fetch") {
        var metadataCache = await caches.open(METADATA_CACHE);
        
        var lastFetchedResponse = await metadataCache.match("Last Fetched");
        
        if (lastFetchedResponse) {
            var lastFetched = new Date(await lastFetchedResponse.text());

            if (new Date() - lastFetched > 86400000) {
                MetadataFetch();
            }
        }
        else MetadataFetch();
    }
}

async function FirebaseAuth() {
    var firebaseConfig = {
        apiKey: "AIzaSyDXDDZJS3mHlAGwcLL9qRYs30SAW5h3Ly0",
        authDomain: "web-paragon.firebaseapp.com",
        projectId: "web-paragon",
        storageBucket: "web-paragon.appspot.com",
        messagingSenderId: "59394117419",
        appId: "1:59394117419:web:fc7173d15609bb0332bf6e",
        measurementId: "G-DK3FHC0RDM"
    };
    
    firebase.initializeApp(firebaseConfig);

    if (firebase.auth().currentUser) {
        return firebase.auth().currentUser.getIdToken();
    }

    await firebase.auth().signInAnonymously();

    var token = new Promise(resolve => {
        firebase.auth().onAuthStateChanged(user => {
            user.getIdToken().then(idToken => {
                resolve(idToken);
            });
        });
    });

    return await token;
}

async function GetLatestVersion() {
    var headers = new Headers();

    var token = await FirebaseAuth()

    headers.append("Authorization", "Bearer " + token);

    var request = await fetch(VERSION_URL, {
        headers: headers
    });

    var text = await request.text();
    //return text;
    var object = await JSON.parse(text);
    return object.fields.Version.stringValue;
}

async function MetadataFetch() {
    var metadataCache = await caches.open(METADATA_CACHE);
    var currentVersionResponse = await metadataCache.match("Version");

    var currentVersion = "0";

    if (currentVersionResponse) currentVersion = await currentVersionResponse.text();
    else await metadataCache.put("Version", new Response("0"));

    var latestVersion = await GetLatestVersion();

    if (currentVersion != latestVersion)
        await Update(latestVersion);

    await metadataCache.put("Last Fetched", new Response(new Date().toISOString()));
}

async function DataFetch() {
    var resourceCache = await caches.open("User Resources");

    var tokenResponse = await resourceCache.match("Token");
    var token = await tokenResponse.text();

    var resourceResponse = await fetch(`https://webparagon.azurewebsites.net/api/resource?resource=all&token=${token}`);
    
    var text = await resourceResponse.text();
    var resources = JSON.parse(text);

    await resourceCache.put("Last Updated", new Response(new Date().toISOString()));

    await resourceCache.put("Token", new Response(JSON.stringify(resources.token)));

    var promises = [];
    for (var resource in resources.result) {
        promises.push(resourceCache.put(resource, new Response(JSON.stringify(resources.result[resource]))));
    }

    await Promise.all(promises);
}

async function Update(version) {
    if (!version) return;

    UPDATING = true;
    
    var fileCache = await caches.open(OFFLINE_CACHE);
    var metadataCache = await caches.open(METADATA_CACHE);

    // Fetch and cache all matching items from the assets manifest
    var assetData = self.assets;
    
    var filePromises = [];
    assetData.forEach(asset => {
        filePromises.push(fetch(asset))
    });

    var files = await Promise.all(filePromises);

    var putPromises = [];
    files.forEach(file =>
        putPromises.push(fileCache.put(file.url, file))
    );

    await Promise.all(putPromises);

    await metadataCache.put("Version", new Response(version));

    UPDATING = false;
    
    var keys = await fileCache.keys();

    var toDelete = keys.filter(key => !self.assets.includes(key.url.replace(location.origin, "")));
    
    var deletePromises = [];
    toDelete.forEach(key =>
        deletePromises.push(fileCache.delete(key))
    );

    await Promise.all(deletePromises);

    keys = await caches.keys();

    toDelete = keys.filter(key => !VALID_CACHES.includes(key));

    deletePromises = [];
    toDelete.forEach(key =>
        deletePromises.push(caches.delete(key))
    );

    await Promise.all(deletePromises);
}