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
const METADATA_ENDPOINT = "https://paragon-metadata.professor-smart.workers.dev";

var UPDATING = false;

async function Install() {
    self.skipWaiting();
}

async function Activate() {
    await clients.claim();
}

async function Fetch(event) {
    if (event.request.method == 'GET' && !UPDATING) {
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

            // 30 Minutes
            if (new Date() - lastFetched >= 1800000) {
                MetadataFetch();
            }
        }
        else MetadataFetch();
    }
}

async function GetLatestMetadata() {
    var request = await fetch(METADATA_ENDPOINT);

    var text = await request.text();
    var object = JSON.parse(text);

    return object;
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