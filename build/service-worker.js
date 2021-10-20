self.addEventListener('install', event => event.waitUntil(onInstall()));
self.addEventListener('activate', event => event.waitUntil(onActivate()));
self.addEventListener('fetch', event => event.respondWith(onFetch(event)));
self.addEventListener("message", event => event.waitUntil(onMessage(event)));

const token =
String.raw`{
    "access_token": "",
    "refresh_token": "",
    "expiry": "2021-07-28T06:21:22.3968863",
    "termination": "2021-10-26T05:21:22.3968885"
}`;

const metadata =
String.raw`{
    "version": "Local",
    "pages": {
        "Award Scheme Points": {
            "navIcon": "/nav-icon.svg",
            "url": "https://awardschemepoints.profsmart.repl.co",
            "finished": true,
            "description": "A simple extension that displays student's award scheme points.",
            "icon": "/icon.svg"
        }
    }
}`

const METADATA_CACHE = "Metadata";

async function onInstall() {
    self.skipWaiting();
}

async function onActivate() {
    clients.claim();
}

async function onFetch(event) {
    if (event.request.method == 'GET' || event.request.method == 'POST') {
        const request = event.request;

        if (request.url.startsWith("https://au-syd.functions.appdomain.cloud/api/v1/web/6bbc35c7-dc9e-4df5-9708-71beb3b96f36/default/resources")) {
            return await fetch("https://sbhs-random-data.profsmart.repl.co/all.json");
        }
        
        if (request.url.startsWith("https://au-syd.functions.appdomain.cloud/api/v1/web/6bbc35c7-dc9e-4df5-9708-71beb3b96f36/default/auth")) {
            return new Response(token);
        }

        if (request.url.startsWith("https://paragon-metadata.profsmart.workers.dev")) {
            return new Response(metadata);
        }

        return fetch(event.request);
    }

    return fetch(event.request);
}

async function onMessage(event) {
    if (event.data.command == "metadata-fetch") {
        var metadataCache = await caches.open(METADATA_CACHE);
        
        await metadataCache.put("Metadata", new Response(metadata));
    }
}