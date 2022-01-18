/// <reference lib="WebWorker" />

//Shady hack to get typescript to accept the `declare const self` part.
export default undefined;

declare const self: ServiceWorkerGlobalScope & { assets: string[] };

type PeriodicSyncEvent = {
    tag: string
} & ExtendableMessageEvent;

importScripts("./assets.js");

self.addEventListener("install", e => e.waitUntil(self.skipWaiting()));
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", e => e.respondWith(Fetch(e)));
//@ts-ignore
self.addEventListener("periodicsync", e => e.waitUntil(PeriodicSync(e)));
self.addEventListener("message", e => e.waitUntil(Message(e)));

declare const FILE_CACHE: string;
declare const METADATA_CACHE: string;
declare const RESOURCE_CACHE: string;
declare const EXTENSION_CACHE: string;

declare const SERVER_ENDPOINT: string;
declare const METADATA_ENDPOINT: string;

var UPDATING = false;

async function Fetch(e: FetchEvent) {
    console.log(e.request.url, e.request.method);

    if (e.request.method == "GET" && !UPDATING) {
        let request = e.request;
        let url = new URL(request.url);

        if (url.searchParams.has("cache-version")) {
            let cache = await caches.open(EXTENSION_CACHE);

            let cachedResource = await cache.match(request);

            if (cachedResource) return cachedResource;
            else {
                let response =  await fetch(request);

                cache.put(request, response.clone()).then(async () => {
                    let keys = await cache.keys();

                    for (let key of keys) {
                        let keyUrl = new URL(key.url);
                        if (keyUrl.origin == url.origin
                            && keyUrl.pathname == url.pathname
                            && keyUrl.search != url.search)
                            cache.delete(key);
                    }
                });

                return response;
            }
        }

        let cache = await caches.open(FILE_CACHE);

        let cachedResource = await cache.match(url.origin + url.pathname);
        if (cachedResource) return cachedResource;
        else
        {
            let response = await fetch(request);
            let clonedResponse = response.clone();

            if (url.origin == location.origin) {
                if (response.ok) {
                    if (!UPDATING) {
                        if (self.assets.includes(response.url.replace(location.origin, ""))) {
                            cache.keys().then(keys => {
                                if (!keys.find(key => key.url == response.url))
                                    cache.put(clonedResponse.url, clonedResponse);
                            });
                        }
                    }
                }
                else {
                    if (response.status == 404) {
                        return (await cache.match(location.origin + "/404")) ?? clonedResponse;
                    }
                }
            }
            
            return clonedResponse;
        }
    }

    return fetch(e.request);
}

async function PeriodicSync(e: PeriodicSyncEvent) {
    if (e.tag == "metadata-fetch") {
        MetadataFetch();
        DataFetch();
    }
}

async function Message(e: ExtendableMessageEvent) {
    if (e.data.command == "metadata-fetch") {
        await MetadataFetch();
        e.source?.postMessage("metadata-fetched");
    }
}

async function GetLatestMetadata() {
    let request = await fetch(METADATA_ENDPOINT);

    return await request.json();
}

async function MetadataFetch() {
    let metadataCache = await caches.open(METADATA_CACHE);
    let currentMetadataResponse = await metadataCache.match(location.origin + "/Metadata");

    let currentMetadata = null;

    if (currentMetadataResponse) currentMetadata = JSON.parse(await currentMetadataResponse.text());

    let latestMetadata = await GetLatestMetadata();

    if (currentMetadata == null || currentMetadata.version != latestMetadata.version)
        await Update();

    await metadataCache.put(location.origin + "/Metadata", new Response(JSON.stringify(latestMetadata)));
}

async function DataFetch() {
    let resourceCache = await caches.open(RESOURCE_CACHE);

    let tokenResponse = await resourceCache.match(location.origin + "/Token");
    if (!tokenResponse) return;
    
    let token = await tokenResponse.text();

    let resourceResponse = await fetch(`${SERVER_ENDPOINT}/resources?token=${token}`);
    
    let resources = await resourceResponse.json();

    await resourceCache.put(location.origin + "/Token", new Response(JSON.stringify(resources.token)));

    let promises = [];
    for (let resource in resources.result) {
        promises.push(resourceCache.put(location.origin + "/" + resource, new Response(JSON.stringify(resources.result[resource]))));
    }

    await Promise.all(promises);
}

async function Update() {
    UPDATING = true;
    
    let fileCache = await caches.open(FILE_CACHE);

    // Fetch and cache all matching items from the assets manifest
    let assetData = self.assets;
    
    let filePromises: Promise<Response>[] = [];
    assetData.forEach(asset =>
        filePromises.push(fetch(asset))
    );

    let files = await Promise.all(filePromises);

    let putPromises: Promise<void>[] = [];
    files.forEach(file =>
        putPromises.push(fileCache.put(file.url, file))
    );

    await Promise.all(putPromises);
    UPDATING = false;
    
    let keys = await fileCache.keys();

    let toDelete = keys.filter(key =>  {
        let url = key.url.replace(location.origin, "");
        return !self.assets.includes(url);
    });
    
    let deletePromises: Promise<boolean>[] = [];
    toDelete.forEach(key =>
        deletePromises.push(fileCache.delete(key))
    );

    await Promise.all(deletePromises);
}