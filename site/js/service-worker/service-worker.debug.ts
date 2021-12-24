/// <reference lib="WebWorker" />

//Shady hack to get typescript to accept the `declare const self` part.
export default undefined;

declare const self: ServiceWorkerGlobalScope;

self.addEventListener("install", e => e.waitUntil(self.skipWaiting()));
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));

self.addEventListener("fetch", e => e.respondWith(onFetch(e)));
self.addEventListener("message", e => e.waitUntil(onMessage(e)));

const token = `{}`;

const metadata = `{
    "version": "Development",
    "pages": {
        "Award Scheme Points": {
            "navIcon": "/nav-icon.svg",
            "url": "https://awardschemepoints.profsmart.repl.co",
            "finished": true,
            "description": "Displays your award scheme points.",
            "icon": "/icon.svg",
            "version": "0.0.1"
        }
    }
}`;

declare const METADATA_CACHE: string;

declare const SERVER_ENDPOINT: string;
declare const METADATA_ENDPOINT: string;

const serverUrl = new URL(SERVER_ENDPOINT);
const metadataUrl = new URL(METADATA_ENDPOINT);

async function onFetch(e: FetchEvent): Promise<Response> {
    const request = e.request;

    if (request.method == 'GET' || request.method == 'POST') {
        var url = new URL(request.url);

        if (url.hostname == location.hostname && url.pathname == "/login")
            return await fetch("/callback");

        if (url.origin == serverUrl.origin && url.pathname == `${serverUrl.pathname}/resources`)
            return await fetch("https://sbhs-random-data.profsmart.repl.co/all.json");
        
        if (url.origin == serverUrl.origin && url.pathname == `${serverUrl.pathname}/auth`)
            return new Response(token);

        if (url.origin == serverUrl.origin && url.pathname == `${serverUrl.pathname}/refresh`)
            return new Response(token);

        if (url.origin == metadataUrl.origin && url.pathname == metadataUrl.pathname)
            return new Response(metadata);
    }

    return fetch(request);
}

async function onMessage(e: ExtendableMessageEvent) {
    if (e.data.command == "metadata-fetch") {
        var metadataCache = await caches.open(METADATA_CACHE);
        
        await metadataCache.put("Metadata", new Response(metadata));
    }
}