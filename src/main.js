const RESOURCE_CACHE = "User Resources";

async function Load() {
    RedirectToProperWebsiteIfNeeded();

    UpdateScreenType();

    if (await RegisterServiceWorker()) {
        await Update();
    }

    var token = await LoginIfNeeded();

    await UpdateResourcesIfNeeded(token);

    window.addEventListener("resize", Debounce(event => {
        UpdateScreenType();
    }, 250));

    // Call function "finished" if it exists.
    // This will execute a custom callback defined in the page.
    if (window.finished instanceof Function) await window.finished();
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
    try {
        var registration = await navigator.serviceWorker.getRegistration('service-worker.js');

        if (registration)
            await registration.update();
        else
            await navigator.serviceWorker.register("service-worker.js");
    } catch (e) {
        return false;
    }

    return true;
}

async function Update() {
    var worker = await navigator.serviceWorker.ready;

    worker.active.postMessage({
        command: "update"
    });
}

async function LoginIfNeeded() {
    var resourceCache = await caches.open(RESOURCE_CACHE);

    var token = await resourceCache.match("Token");
    
    if (!token) location.pathname = "/login";

    return await token.text();
}

async function UpdateResourcesIfNeeded(token) {
    var resourceCache = await caches.open(RESOURCE_CACHE);

    var lastUpdatedResponse = await resourceCache.match("Last Updated");
    
    var resources;
    if (lastUpdatedResponse)
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
    }
}

async function GetAllResources(token) {
    var resourceResponse = await fetch(`https://webparagon.azurewebsites.net/api/resource?resource=all&token=${token}`);

    if (!resourceResponse) location.href = location.origin + "/login";

    if (resourceResponse.status == 403) {
        window.serversOffline = true;
    }
    else if (resourceResponse.status != 200) {
        //await caches.delete(RESOURCE_CACHE);
        //location.href = location.origin + "/login";
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