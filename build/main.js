const CLIENT_ID = "paragon";

const RESOURCE_CACHE = "User Resources";

function login() {
    location.href = "https://student.sbhs.net.au/api/authorize?response_type=code" +
                    "&scope=all-ro" +
                    "&state=abc" +
                     `&client_id=${CLIENT_ID}` +
                    `&redirect_uri=${location.origin}/callback`;
}

async function UpdateResources(token, resourceCache) {
    var token = await token.text();

    var resourceBundle = await GetAllResources(token);

    var resources = resourceBundle.resources;
    token = resourceBundle.token;

    var promises = [];

    promises.push(resourceCache.put("Last Updated", new Response(new Date().toISOString())));

    promises.push(resourceCache.put("Token", new Response(token)));

    for (var resource in resources) {
        promises.push(resourceCache.put(resource, new Response(resources[resource])));
    }
    
    await Promise.all(promises);
}

async function onload() {
    if (window.location.hostname == "web-paragon.firebaseapp.com") {
        window.location.href = "https://web-paragon.web.app";
    }

    if (innerWidth >= innerHeight) {
        document.getElementsByTagName("body").item(0).classList.add("laptop-screen");
    }
    else {
        document.getElementsByTagName("body").item(0).classList.add("mobile-screen");
    }

    if (location.origin == "https://web-paragon.web.app") {
        var registration = await navigator.serviceWorker.getRegistration('service-worker.js');

        if (registration) {
            try
            {
                await registration.update();
                await Update();
            }
            catch(e) {}
        }
        else
        {
            await navigator.serviceWorker.register("service-worker.js");
            await Update();
        }
    }

    if (location.pathname == "/login") return;
    if (location.pathname == "/callback") return;

    var resourceCache = await caches.open(RESOURCE_CACHE);

    var token = await resourceCache.match("Token");
    
    if (!token) location.pathname = "/login";

    var lastUpdatedResponse = await resourceCache.match("Last Updated");
    
    if (lastUpdatedResponse)
    {
        var lastUpdated = new Date(await lastUpdatedResponse.text());

        if (new Date() - lastUpdated >= 3600000) UpdateResources(token, resourceCache);
    }
    else UpdateResources(token, resourceCache);

    // Call function "finished" if it exists.
    // This will execute a custom callback defined in the page.
    if (window.finished instanceof Function) await window.finished();
}

async function Update() {
    if (location.origin != "https://web-paragon.web.app") return;

    var worker = await navigator.serviceWorker.ready;

    worker.active.postMessage({ command: "update" });
}

async function GetAllResources(token) {
    var resourceResponse = await fetch(`https://webparagon.azurewebsites.net/api/resource?resource=all&token=${token}`);

    if (!resourceResponse) location.href = location.origin + "/login";

    if (resourceResponse.status == 403) {
        window.serversOffline = true;
    }
    else if (resourceResponse.status != 200) {
        await caches.delete(RESOURCE_CACHE);
        location.href = location.origin + "/login";
    }
    
    var text = await resourceResponse.text();
    console.log(text);
    var resources = JSON.parse(text);

    var resourceCache = await caches.open(RESOURCE_CACHE);

    console.log(JSON.stringify(resources.token));
    await resourceCache.put("Token", new Response(JSON.stringify(resources.token)));

    var promises = [];
    for (var resource in resources.result) {
        var decodedResource = decodeURIComponent(resources.result[resource]);
        promises.push(resourceCache.put(resource, new Response(decodedResource)));
        resources.result[resource] = JSON.parse(decodedResource);
    }

    await Promise.all(promises);

    return resources;
}

async function GetResourceFromCache(resource) {
    var resourceCache = await caches.open(RESOURCE_CACHE);

    var resourceResponse = await resourceCache.match(resource);

    if (!resourceResponse) return null;
    
    return await resourceResponse.text();
}

onload();