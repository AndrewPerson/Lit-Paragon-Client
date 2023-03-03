/// <reference lib="WebWorker" />

//Shady hack to get typescript to accept the `declare const self` part.
export default undefined;

declare const self: ServiceWorkerGlobalScope & { assets: string[] };

importScripts("./assets.js");

self.addEventListener("install", e => e.waitUntil(self.skipWaiting()));
self.addEventListener("activate", e => e.waitUntil(Activate()));
self.addEventListener("fetch", e => e.respondWith(Fetch(e)));

//Service worker will change with each change to the VERSION variable, causing it to automatically re-update
declare const VERSION: string;
declare const FILE_CACHE: string;
declare const MISC_CACHE: string;

let UPDATING = false;

async function Activate() {
    console.log(`Updating to ${VERSION}`);

    Update();
}

async function Fetch(e: FetchEvent) {
    if (e.request.method == "GET" && !UPDATING) {
        let request = e.request;
        let url = new URL(request.url);

        if (url.origin == location.origin) {
            let cache = await caches.open(FILE_CACHE);

            let cachedResource = await cache.match(url.origin + url.pathname);
            if (cachedResource !== undefined) return cachedResource;
        }

        let response;
        try
        {
            response = await fetch(request);
        }
        catch(e)
        {
            //TypeError is used for a network error. (Why???)
            if (e instanceof TypeError)
            {
                const miscCache = await caches.open(MISC_CACHE);
                const cachedResponse = await miscCache.match(request.url);

                if (cachedResponse !== undefined) return cachedResponse;
                else throw e;
            }
            else throw e;
        }

        if (response.status == 200) {
            if (response.headers.has("X-Paragon-Cache")) {
                const miscCache = await caches.open(MISC_CACHE);
                miscCache.put(request, response.clone());
            }
        }

        return response;
    }
    else return fetch(e.request);
}

async function Update() {
    UPDATING = true;

    await caches.delete(FILE_CACHE);

    let fileCache = await caches.open(FILE_CACHE);
    await fileCache.addAll(self.assets);

    UPDATING = false;
}
