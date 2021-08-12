importScripts("./assets.js");

self.addEventListener('install', event => event.waitUntil(onInstall(event)));
self.addEventListener('activate', event => event.waitUntil(onActivate(event)));
self.addEventListener('fetch', event => event.respondWith(onFetch(event)));
self.addEventListener('message', event => event.waitUntil(onMessage(event)));

const OFFLINE_CACHE = 'Offline Resources';
const VERSION_CACHE = "Version";
const VALID_CACHES = [
    "Offline Resources",
    "Version",
    "User Resources"
];

//const VERSION_URL = "https://paragonstorage.blob.core.windows.net/version/version.txt";
const VERSION_URL = "https://firestore.googleapis.com/v1/projects/web-paragon/databases/(default)/documents/Version/Version";

var UPDATING = false;

async function onInstall(event) {
    self.skipWaiting();
}

async function onActivate(event) {
    clients.claim();
}

async function onFetch(event) {
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

async function onMessage(event) {
    if (event.data.command == "update") {
        var versionCache = await caches.open(VERSION_CACHE);
        var currentVersionResponse = await versionCache.match("Version");

        var currentVersion = "0";

        if (currentVersionResponse) currentVersion = await currentVersionResponse.text();
        else await versionCache.put("Version", new Response("0"));

        var latestVersion = await GetLatestVersion();

        if (currentVersion != latestVersion)
            Update(latestVersion);
    }
}

async function GetLatestVersion() {
    try {
        var request = await fetch(VERSION_URL);
        var text = await request.text();
        //return text;
        var object = await JSON.parse(text);
        return object.fields.Version.stringValue;
    } catch (e) {
        console.log("Offline");
        return;
    }
}

async function Update(version) {
    if (!version) return;

    UPDATING = true;
    
    var fileCache = await caches.open(OFFLINE_CACHE);
    var versionCache = await caches.open(VERSION_CACHE);

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

    await versionCache.put("Version", new Response(version));

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
