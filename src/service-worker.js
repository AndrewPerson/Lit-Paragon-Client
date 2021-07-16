self.importScripts('./service-worker-assets.js');

self.addEventListener('install', event => event.waitUntil(onInstall(event)));
self.addEventListener('activate', event => event.waitUntil(onActivate(event)));
self.addEventListener('fetch', event => event.respondWith(onFetch(event)));
self.addEventListener('message', event => onMessage(event));

const cacheName = 'blazor-resources';
const offlineAssetsInclude = [ /\.dll$/, /\.pdb$/, /\.wasm/, /\.html/, /\.js$/, /\.json$/, /\.css$/, /\.woff$/, /\.png$/, /\.jpe?g$/, /\.gif$/, /\.ico$/, /\.blat$/, /\.dat$/, /\.svg$/, /\.webp$/ ];
const offlineAssetsExclude = [ /^service-worker\.js$/ ];

//const versionUrl = "https://paragonstorage.blob.core.windows.net/version/version.txt";
const versionUrl = "https://firestore.googleapis.com/v1/projects/web-paragon/databases/(default)/documents/Version/Version";

var updating = false;

async function onInstall(event) {
    self.skipWaiting();
    //await Update(await GetLatestVersion());
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
    updating = true;
    var fileCache = await caches.open(cacheName);
    var versionCache = await caches.open("Version");

    // Fetch and cache all matching items from the assets manifest
    //const assetsRequests = self.assetsManifest.assets
    var assetData = self.assetsManifest.assets.
        filter(asset => offlineAssetsInclude.some(pattern => pattern.test(asset.url))).
        filter(asset => !offlineAssetsExclude.some(pattern => pattern.test(asset.url)));
    //.map(asset => new Request(asset.url, { integrity: asset.hash }));
    //.map(asset => new Request(asset.url));

    downloadsLeft = assetData.length;

    for (index in assetData) {
        var url = assetData[index].url;

        fetch(url)
            .then(file => {
            fileCache.put(file.url, file)
            .then(() => {
                downloadsLeft--;
                if (downloadsLeft == 0) {
                    versionCache.put("Version", new Response(version))
                    .then(() => {
                        updating = false;
                    });
                }
            });
        });
    }
}

async function onActivate(event) {
    clients.claim();
    // Delete unused caches
    /*
    const cacheKeys = await caches.keys();
    await Promise.all(cacheKeys
        .filter(key => key !== cacheName)
        .map(key => caches.delete(key)));
    */
}

async function onFetch(event) {
    if (event.request.method === 'GET' && !updating) {
        // For all navigation requests, try to serve index.html from cache
        // If you need some URLs to be server-rendered, edit the following check to exclude those URLs
        const shouldServeIndexHtml = event.request.mode === 'navigate';

        const request = shouldServeIndexHtml ? 'index.html' : event.request;
        const cache = await caches.open(cacheName);

        let result = await cache.match(request);
        if (result instanceof Response) return result;
        else return fetch(request);
    }

    return fetch(event.request);
}

async function onMessage(event) {
    if (event.data.command === 'update') {
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
            }
        }
    }
}