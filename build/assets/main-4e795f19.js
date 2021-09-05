const RESOURCE_CACHE = "User Resources";
const SERVER_ENDPOINT = "https://au-syd.functions.appdomain.cloud/api/v1/web/6bbc35c7-dc9e-4df5-9708-71beb3b96f36/default";

async function Load() {
    RedirectToProperWebsiteIfNeeded();

    if (window.onUserData instanceof Function) 
        try { await window.onUserData(); } catch (e) {}

    if (location.origin != "https://web-paragon.web.app")
        await RegisterServiceWorker();

    var token = await LoginIfNeeded();

    if (await UpdateResourcesIfNeeded(token)) {
        if (window.onUserData instanceof Function)
            try { await window.onUserData(); } catch (e) {}
    }
    
    if (location.origin == "https://web-paragon.web.app")
        await RegisterServiceWorker();
}

function RedirectToProperWebsiteIfNeeded() {
    if (window.location.hostname == "web-paragon.firebaseapp.com")
        window.location.href = "https://web-paragon.web.app";
}

async function RegisterServiceWorker() {
    var registration = await navigator.serviceWorker.getRegistration('service-worker.js');

    if (registration)
        await registration.update();
    else
        await navigator.serviceWorker.register("service-worker.js");

    var serviceWorker = await navigator.serviceWorker.ready;

    if (serviceWorker.periodicSync) {
        var tags = await serviceWorker.periodicSync.getTags();

        if (!tags.includes('metadata-fetch')) {
            try {
                await serviceWorker.periodicSync.register('metadata-fetch', {
                    // An interval of one day.
                    minInterval: 24 * 60 * 60 * 1000,
                });
            } catch (e) {
                console.log("Couldn't register background fetch. Updates will be only occur when app is open.");
                navigator.serviceWorker.controller.postMessage({command: "metadata-fetch"});
            }
        }
    }
    else {
        console.log("Couldn't register background fetch. Updates will be only occur when app is open.");
        navigator.serviceWorker.controller.postMessage({command: "metadata-fetch"});
    }    
}

async function LoginIfNeeded() {
    var resourceCache = await caches.open(RESOURCE_CACHE);

    var token = await resourceCache.match("Token");
    
    if (!token) location.pathname = "/login";

    return await token.text();
}

async function UpdateResourcesIfNeeded(token, force) {
    var resourceCache = await caches.open(RESOURCE_CACHE);

    var lastUpdatedResponse = await resourceCache.match("Last Updated");
    
    var resources;
    if (lastUpdatedResponse && !force)
    {
        var lastUpdated = new Date(await lastUpdatedResponse.text());

        if (new Date() - lastUpdated >= 3600000) resources = await GetAllResources(token);
    }
    else resources = await GetAllResources(token);

    if (resources) {
        var resourceCache = await caches.open(RESOURCE_CACHE);

        await resourceCache.put("Last Updated", new Response(new Date().toISOString()));

        await resourceCache.put("Token", new Response(JSON.stringify(resources.token)));

        var promises = [];
        for (var resource in resources.result) {
            promises.push(resourceCache.put(resource, new Response(JSON.stringify(resources.result[resource]))));
        }

        await Promise.all(promises);

        return true;
    }

    return false;
}

async function GetAllResources(token) {
    if (new Date() > new Date(JSON.parse(token).termination)) {
        document.getElementsByTagName("body")[0].appendChild(document.createElement("login-notification"));
        return;
    }

    var resourceResponse = await fetch(`${SERVER_ENDPOINT}/resources?token=${token}`);

    if (!resourceResponse) location.href = location.origin + "/login";

    if (resourceResponse.status == 403) {
        window.serversOffline = true;
        return;
    }

    if (resourceResponse.status != 200) {
        document.getElementsByTagName("body")[0].appendChild(document.createElement("login-notification"));
        return;
    }
    
    var text = await resourceResponse.text();
    var resources = JSON.parse(text);

    return resources;
}

async function GetResourceFromCache(resource) {
    var resourceCache = await caches.open(RESOURCE_CACHE);

    var resourceResponse = await resourceCache.match(resource);

    if (!resourceResponse) return null;
    
    return await resourceResponse.text();
}

Load();