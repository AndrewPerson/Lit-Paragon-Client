self.addEventListener('install', event => event.waitUntil(onInstall()));
self.addEventListener('activate', event => event.waitUntil(onActivate()));
self.addEventListener('fetch', event => event.respondWith(onFetch(event)));
self.addEventListener("message", event => event.waitUntil(onMessage(event)));

var termination = new Date();
termination.setHours(termination.getHours() + 24 * 90);
const token =
String.raw`{
    "access_token": "",
    "refresh_token": "",
    "expiry": "2021-07-28T06:21:22.3968863",
    "termination": "${termination.toISOString()}"
}`;

const metadata =
String.raw`{
    "version": "Local",
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
}`

const METADATA_CACHE = "Metadata";
const SERVER_ENDPOINT = "https://webparagon.azurewebsites.net/api";

const SERVER_URL = new URL(SERVER_ENDPOINT);

async function onInstall() {
    self.skipWaiting();
}

async function onActivate() {
    clients.claim();
}

async function onFetch(event) {
    if (event.request.method == 'GET' || event.request.method == 'POST') {
        const request = event.request;

        var url = new URL(request.url);

        if (url.hostname == location.hostname && url.pathname == "/login")
            return await fetch("/callback");

        if (url.origin == SERVER_URL.origin && url.pathname == `${SERVER_URL.pathname}/resource`)
            return await fetch("https://sbhs-random-data.profsmart.repl.co/resources");
            //return await fetch("http://localhost:8080/all.json");

        if (url.origin == SERVER_URL.origin && url.pathname == `${SERVER_URL.pathname}/auth`)
            return new Response(token);

        if (url.origin == SERVER_URL.origin && url.pathname == `${SERVER_URL.pathname}/refresh`)
            return new Response(token);
    }

    return fetch(event.request);
}

async function onMessage(event) {
    if (event.data.command == "metadata-fetch") {
        var metadataCache = await caches.open(METADATA_CACHE);
        
        await metadataCache.put("Metadata", new Response(metadata));
    }
}