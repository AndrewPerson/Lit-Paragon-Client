self.importScripts('./assets.js');

self.addEventListener('install', event => event.waitUntil(onInstall(event)));
self.addEventListener('activate', event => event.waitUntil(onActivate(event)));
self.addEventListener('fetch', event => event.respondWith(onFetch(event)));
self.addEventListener('message', event => onMessage(event));

const OFFLINE_CACHE = 'Offline Resources';
const VALID_CACHES = [
    "Offline Resources",
    "Version",
    "User Resources"
];

const offlineAssetsExclude = [ /^service-worker\.js$/ ];

//const versionUrl = "https://paragonstorage.blob.core.windows.net/version/version.txt";
const versionUrl = "https://firestore.googleapis.com/v1/projects/web-paragon/databases/(default)/documents/Version/Version";

var updating = false;

async function onInstall(event) {
    self.skipWaiting();
    await Update(await GetLatestVersion());
}

async function GetLatestVersion() {
    try {
        var request = await fetch(versionUrl);
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

    updating = true;
    
    var fileCache = await caches.open(OFFLINE_CACHE);
    var versionCache = await caches.open("Version");

    // Fetch and cache all matching items from the assets manifest
    var assetData = self.assets.
        filter(asset => !offlineAssetsExclude.some(pattern => pattern.test(asset)));

    var filePromises = [];
    assetData.forEach(asset =>
        filePromises.push(fetch(asset))
    );

    var files = await Promise.all(filePromises);

    for (file in files) {
        if (file) {
            if (file.status == 200) {
                await fileCache.put(file.url, file);
            }
        }
    }

    var keys = await fileCache.keys();

    var toDelete = keys.filter(key => !self.assets.includes(key.url.replace(location.origin, "")));
    
    var deletePromises = [];
    toDelete.forEach(key =>
        deletePromises.push(fileCache.delete(key))
    );

    await Promise.all(deletePromises);

    await versionCache.put("Version", new Response(version));

    updating = false;
}

async function onActivate(event) {
    clients.claim();
}

async function onFetch(event) {
    if (event.request.method === 'GET' && !updating) {
        const request = event.request;
        const cache = await caches.open(OFFLINE_CACHE);

        let result = await cache.match(request);
        if (result instanceof Response) return result;
        else
        {
            var response = await fetch(request);

            if (self.assets.includes(response.url) &&
                !(await cache.keys()).includes(response.url)) {
                await cache.put(response.url, response);
            }

            return ;
        }
    }

    return fetch(event.request);
}

async function onMessage(event) {
    if (event.data.command === 'update') {
        if (updating) return;

        var latestVersion = await GetLatestVersion();

        if (latestVersion) {
            var versionCache = await caches.open("Version");
            var storedVersionResponse = await versionCache.match("Version");

            var storedVersion = 0;

            if (storedVersionResponse) storedVersion = await storedVersionResponse.text();
            else await versionCache.put("Version", new Response("0"));

            if (latestVersion != storedVersion) {
                console.log("Updating...");
                await Update(latestVersion);
                console.log("Done updating");
            }
        }
    }
}