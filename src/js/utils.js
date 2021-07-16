function getWidth() {
    return window.innerWidth;
}

function getHeight() {
    return window.innerHeight;
}

async function getCachedValue(cache, key) {
    var itemCache = await caches.open(cache);
    var itemResponse = await itemCache.match(key);

    if (itemResponse) return await itemResponse.text();
    else return itemResponse;
}

async function setCachedValue(cache, key, value) {
    var itemCache = await caches.open(cache);
    await itemCache.put(key, new Response(value));
}

async function getUrlParam(name) {
    var params = new URLSearchParams(window.location.search);
    return params.get(name);
}