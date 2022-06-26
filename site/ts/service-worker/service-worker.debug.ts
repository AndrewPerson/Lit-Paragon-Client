//Shady hack tso get typescript to accept the `declare const self` part.
export default undefined;

declare const self: ServiceWorkerGlobalScope;

declare const SKIN_CACHE: string;

self.addEventListener("install", e => e.waitUntil(self.skipWaiting()));
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));

self.addEventListener("fetch", e => e.respondWith(onFetch(e)));
self.addEventListener("message", e => e.waitUntil(onMessage(e)));

declare const METADATA_ENDPOINT: string;

async function onFetch(e: FetchEvent): Promise<Response> {
    if (e.request.method == "GET") {
        let url = new URL(e.request.url);

        if (url.origin == location.origin) {
            if (url.pathname == "/skin.css") {
                let cache = await caches.open(SKIN_CACHE);
                return (await cache.match(`${location.origin}/skin.css`)) ?? fetch(e.request);
            }

            if (url.pathname.endsWith(".svg")) {
                let cache = await caches.open(SKIN_CACHE);
                return (await cache.match(`${location.origin}${url.pathname}`)) ?? fetch(e.request);
            }
        }
    }

    return fetch(e.request);
}

async function onMessage(e: ExtendableMessageEvent) {
    if (e.data.command == "metadata-fetch") {
        e.source?.postMessage({
            command: "metadata-fetched",
            metadata: await (await fetch(METADATA_ENDPOINT)).json(),
            updated: false
        });
    }
}