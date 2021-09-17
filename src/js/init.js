window.SERVER_ENDPOINT = "https://au-syd.functions.appdomain.cloud/api/v1/web/6bbc35c7-dc9e-4df5-9708-71beb3b96f36/default";
window.PREFERENCE_CACHE = "User Preferences";
window.METADATA_CACHE = "Metadata";
window.RESOURCE_CACHE = "User Resources";
// etc

window.getHash = () => {
    return location.hash.replace("#", "").split("-").filter(key => key.trim());
}

window.isDark = callback => {
    var hashDark = window.getHash().includes("dark");

    if (hashDark) {
        callback(true);
    }
    else {
        caches.open(window.PREFERENCE_CACHE).then(async cache => {
            var darkResponse = await cache.match("Dark");

            callback(darkResponse && await darkResponse.text() == "true");
        });
    }
}

window.getHue = async () => {
    var cache = await caches.open(window.PREFERENCE_CACHE);
    var hueResponse = await cache.match("Hue");

    var hue = hueResponse ? parseFloat(await hueResponse.text()): 200;

    return {hue: hue, rotation: hue - 200};
}

UpdateScreenType();

window.addEventListener("resize", Debounce(() => {
    UpdateScreenType();
}, 250));

function UpdateScreenType() {
    var screenClass = "mobile-screen";
    var oppScreenClass = "laptop-screen";

    if (innerWidth >= innerHeight) {
        screenClass = "laptop-screen";
        oppScreenClass = "mobile-screen";
    }

    UpdateClasses(document.getElementsByTagName("body"), screenClass, oppScreenClass);

    var htmlElement = document.getElementsByTagName("html")[0];

    window.isDark(dark => {
        if (dark) {
            htmlElement.classList.add("dark");
                    
            var hash = window.getHash();
            if (!hash.includes("dark")) {
                hash.push("dark");
                location.hash = hash.join("-");
            }
        }
        else {
            htmlElement.classList.remove("dark");
        }

        caches.open(window.PREFERENCE_CACHE).then(cache =>
            cache.put("Dark", new Response(dark.toString()))
        );
    });

    window.getHue().then(hue => {
        htmlElement.style.setProperty("--main-hue", hue.hue);
        htmlElement.style.setProperty("--hue-rotate", `${hue.rotation}deg`);
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