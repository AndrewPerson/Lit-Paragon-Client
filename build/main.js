const CLIENT_ID = "paragon";

const RESOURCE_CACHE = "User Resources";

function login() {
    location.href = "https://student.sbhs.net.au/api/authorize?response_type=code" +
                    "&scope=all-ro" +
                    "&state=abc" +
                     `&client_id=${CLIENT_ID}` +
                    `&redirect_uri=${location.origin}/callback`;
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

    if (location.host != "web-paragon.web.app") return;
    
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

    if (location.pathname == "/login") return;
    if (location.pathname == "/callback") return;

    var resourceCache = await caches.open(RESOURCE_CACHE);

    var token = await resourceCache.match("Token");
        
    if (!token) location.pathname = "/login";

    var lastUpdatedResponse = await resourceCache.match("Last Updated");
    
    if (lastUpdatedResponse)
    {
        var lastUpdated = new Date(await lastUpdatedResponse.text());

        if (new Date() - lastUpdated < 3600000) return;
    }

    var token = await token.text();

    var resourceBundle = await GetAllResources(token);

    console.log(resourceBundle);

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

async function Update() {
    if (location.host != "web-paragon.web.app") return;

    var worker = await navigator.serviceWorker.ready;

    worker.active.postMessage({ command: "update" });
}

async function GetAllResources(token) {
    var resourceResponse = await fetch(`https://webparagon.azurewebsites.net/api/resource?resource=all&token=${token}`);

    var resources = JSON.parse(await resourceResponse.text());

    var newToken = resources["token"];

    resources["token"] = undefined;

    return {resources: JSON.parse(resources["result"]), token: newToken};
}

async function GetResourceFromCache(resource) {
    var resourceCache = await caches.open(RESOURCE_CACHE);

    var resourceResponse = await resourceCache.match(resource);

    if (!resourceResponse) return null;
    
    return await resourceResponse.text();
}

onload();