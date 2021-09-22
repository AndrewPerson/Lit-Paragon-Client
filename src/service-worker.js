import { initializeApp, getApps } from 'firebase/app';
import { initializeAuth, indexedDBLocalPersistence, signInAnonymously, getIdToken } from "firebase/auth";

importScripts("./assets.js");

self.addEventListener('install', event => event.waitUntil(Install(event)));
self.addEventListener('activate', event => event.waitUntil(Activate(event)));
self.addEventListener('fetch', event => event.respondWith(Fetch(event)));
self.addEventListener('periodicsync', event => event.waitUntil(PeriodicSync(event)));
self.addEventListener('message', event => event.waitUntil(Message(event)));

const OFFLINE_CACHE = 'Offline Resources';
const METADATA_CACHE = "Metadata";
const RESOURCE_CACHE = "User Resources";
const VALID_CACHES = [
    "Offline Resources",
    "Metadata",
    "User Resources"
];

const SERVER_ENDPOINT = "https://au-syd.functions.appdomain.cloud/api/v1/web/6bbc35c7-dc9e-4df5-9708-71beb3b96f36/default";
const METADATA_ENDPOINT = "https://firestore.googleapis.com/v1/projects/web-paragon/databases/(default)/documents/Metadata/Metadata";

var UPDATING = false;

async function Install() {
    self.skipWaiting();
}

async function Activate() {
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
                var cachedResponse = response.clone();

                if (self.assets.includes(cachedResponse.url.replace(location.origin, ""))) {
                    var keys = await cache.keys();

                    if (!keys.includes(cachedResponse.url))
                        await cache.put(cachedResponse.url, cachedResponse);
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

async function GetLatestMetadata() {
    var firebaseConfig = {
        apiKey: "AIzaSyDXDDZJS3mHlAGwcLL9qRYs30SAW5h3Ly0",
        authDomain: "web-paragon.firebaseapp.com",
        projectId: "web-paragon",
        storageBucket: "web-paragon.appspot.com",
        messagingSenderId: "59394117419",
        appId: "1:59394117419:web:fc7173d15609bb0332bf6e",
        measurementId: "G-DK3FHC0RDM"
    };

    var apps = getApps();

    var app;
    if (apps.length > 0) app = apps[0];
    else app = initializeApp(firebaseConfig);

    const auth = initializeAuth(app, {persistence: indexedDBLocalPersistence});

    var token;
    if (auth.currentUser)
        var token = await getIdToken(auth.currentUser);
    else {
        var user = (await signInAnonymously(auth)).user;

        token = await getIdToken(user);
    }

    var request = await fetch(METADATA_ENDPOINT, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    var text = await request.text();
    var object = JSON.parse(text);

    var pages = object.fields.Pages.mapValue.fields;

    //TODO: Add extension fields later
    return {
        version: object.fields.Version.stringValue,
        pages: Object.keys(pages).map(key => {
            var page = pages[key].mapValue.fields;
            
            return {
                finished: page.Finished.booleanValue,
                url: page.Url?.stringValue,
                description: page.Description?.stringValue,
                icon: page.Icon?.stringValue,
                navIcon: page.NavIcon?.stringValue
            };
        })
    };
}

async function MetadataFetch() {
    var metadataCache = await caches.open(METADATA_CACHE);
    var currentMetadataResponse = await metadataCache.match("Metadata");

    var currentMetadata = null;

    if (currentMetadataResponse) currentMetadata = JSON.parse(await currentMetadataResponse.text());

    var latestMetadata = await GetLatestMetadata();

    if (currentMetadata == null || currentMetadata.version != latestMetadata.version)
        await Update();

    await metadataCache.put("Metadata", new Response(JSON.stringify(latestMetadata)));
    await metadataCache.put("Last Fetched", new Response(new Date().toISOString()));
}

async function DataFetch() {
    var resourceCache = await caches.open(RESOURCE_CACHE);

    var tokenResponse = await resourceCache.match("Token");
    var token = await tokenResponse.text();

    var resourceResponse = await fetch(`${SERVER_ENDPOINT}/resources?token=${token}`);
    
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

async function Update() {
    UPDATING = true;
    
    var fileCache = await caches.open(OFFLINE_CACHE);

    // Fetch and cache all matching items from the assets manifest
    var assetData = self.assets;
    
    var filePromises = [];
    assetData.forEach(asset =>
        filePromises.push(fetch(asset))
    );

    var files = await Promise.all(filePromises);

    var putPromises = [];
    files.forEach(file =>
        putPromises.push(fileCache.put(file.url, file))
    );

    await Promise.all(putPromises);

    await fileCache.put("/", await fetch("/"));

    UPDATING = false;
    
    var keys = await fileCache.keys();

    var toDelete = keys.filter(key =>  {
        var url = key.url.replace(location.origin, "");
        return !self.assets.includes(url) && url != "/";
    });
    
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