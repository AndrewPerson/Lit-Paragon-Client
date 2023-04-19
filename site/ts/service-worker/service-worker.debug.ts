//Shady hack tso get typescript to accept the `declare const self` part.
export default undefined;

declare const self: ServiceWorkerGlobalScope;

declare const SKIN_CACHE: string;

self.addEventListener("install", e => e.waitUntil(self.skipWaiting()));
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));

self.addEventListener("fetch", e => e.respondWith(onFetch(e)));

async function onFetch(e: FetchEvent): Promise<Response> {
    if (e.request.method == "GET") {
        const url = new URL(e.request.url);

        if (url.origin == location.origin) {
            if (url.pathname == "/skin.css") {
                const cache = await caches.open(SKIN_CACHE);
                return (await cache.match(`${location.origin}/skin.css`)) ?? fetch(e.request);
            }

            if (url.pathname.endsWith(".svg")) {
                const cache = await caches.open(SKIN_CACHE);
                return (await cache.match(`${location.origin}${url.pathname}`)) ?? fetch(e.request);
            }
        }
    }

    return fetch(e.request);
}
