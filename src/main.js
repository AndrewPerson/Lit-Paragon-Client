const RESOURCE_CACHE = "User Resources";

async function Load() {
    UpdateScreenType();

    window.addEventListener("resize", Debounce(() => {
        UpdateScreenType();
    }, 250));

    RedirectToProperWebsiteIfNeeded();

    if (location.origin != "https://web-paragon.web.app")
        await RegisterServiceWorker();

    if (location.pathname != "login" && location.pathname != "callback") {
        var token = await LoginIfNeeded();

        if (window.onUserData instanceof Function) 
            try { await window.onUserData(); } catch (e) {}

        if (await UpdateResourcesIfNeeded(token)) {
            if (window.onUserData instanceof Function)
                try { await window.onUserData(); } catch (e) {}
        }
    }
    
    if (location.origin == "https://web-paragon.web.app")
        await RegisterServiceWorker();
}

function RedirectToProperWebsiteIfNeeded() {
    if (window.location.hostname == "web-paragon.firebaseapp.com")
        window.location.href = "https://web-paragon.web.app";
}

function UpdateScreenType() {
    var screenClass = "mobile-screen";
    var oppScreenClass = "laptop-screen";

    if (innerWidth >= innerHeight) {
        screenClass = "laptop-screen";
        oppScreenClass = "mobile-screen";
    }

    UpdateClasses(document.getElementsByTagName("body"), screenClass, oppScreenClass);

    var dark = location.hash == "#dark";

    if (dark)
        document.getElementsByTagName("html")[0].classList.add("dark");

    caches.open("User Preferences").then(async cache => {
        var darkResponse = await cache.match("dark");

        if (darkResponse) {
            if (await darkResponse.text() == "true") {
                document.getElementsByTagName("html")[0].classList.add("dark");
                location.hash = "#dark";
            }
            else await cache.put("dark", new Response(dark.toString()));
        }
        else await cache.put("dark", new Response(dark.toString()));
    });
}

function UpdateClasses(elements, screenClass, oppClass) {
    var i = 0;
    while (i < elements.length) {
        var classList = elements.item(i).classList;

        classList.remove(oppClass);
        classList.add(screenClass);

        i++;
    }
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
    var resourceResponse = await fetch(`https://webparagon.azurewebsites.net/api/resource?resource=all&token=${token}`);

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

function Debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

Load();