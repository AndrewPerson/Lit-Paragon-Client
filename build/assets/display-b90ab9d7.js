UpdateScreenType();

window.addEventListener("resize", Debounce(() => {
    UpdateScreenType();
}, 250));

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