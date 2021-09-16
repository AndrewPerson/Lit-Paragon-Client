var body = document.getElementById("body");  
var elements = [];

UpdateScreenType();
CreateElements();

window.SERVER_ENDPOINT = "";
window.USER_RESOURCES = "";
// etc

window.addEventListener("resize", Debounce(() => {
    UpdateScreenType();
}, 250));

function RegisterElement(alias, name, resource) {
    var element = document.createElement(name);
    element.id = alias;

    elements.push({
        element: element,
        rendered: false,
        resource: resource
    });
}

async function AddElements() {
    for (let data of elements) {
        var resource = data.resource ? await GetResourceFromCache(data.resource) : undefined;

        var element = data.element;
        var rendered = data.rendered;

        if (resource) {
            element.setAttribute("data", resource);

            if (element.id == "timetable") {
                var dailyTimetable = await GetResourceFromCache("dailytimetable");
                var day = JSON.parse(dailyTimetable).timetable.timetable.dayname;
                
                element.setAttribute("day", day);
            }
        }

        if (!rendered) {
            if (window.page != element.id) element.classList.add("hidden");
            body.appendChild(element);
            data.rendered = true;
        }
    }
}

function CreateElements() {
    RegisterElement("dailytimetable", "daily-timetable", "dailytimetable");
    RegisterElement("barcode", "student-barcode", "userinfo");
    RegisterElement("timetable", "full-timetable", "timetable");
    RegisterElement("announcements", "school-announcements", "announcements");
    //registerElement("extensions", "extension-marketplace");

    //Add element for extension viewer.

    RegisterElement("settings", "user-settings");

    window.onPageUpdate = () => {
        if (window.page == "barcode")
            if (window.updateBarcode instanceof Function)
                window.updateBarcode();
    }

    window.onUserData = async () => {
        await AddElements();
    }
}

function UpdateScreenType() {
    var screenClass = "mobile-screen";
    var oppScreenClass = "laptop-screen";

    if (innerWidth >= innerHeight) {
        screenClass = "laptop-screen";
        oppScreenClass = "mobile-screen";
    }

    UpdateClasses(document.getElementsByTagName("body"), screenClass, oppScreenClass);

    var hash = location.hash.replace("#", "").split("-");
    var dark = hash.includes("dark");

    if (dark)
        document.getElementsByTagName("html")[0].classList.add("dark");
    else
        document.getElementsByTagName("html")[0].classList.remove("dark");

    caches.open("User Preferences").then(async cache => {
        var darkResponse = await cache.match("dark");

        if (darkResponse) {
            if (await darkResponse.text() == "true") {
                document.getElementsByTagName("html")[0].classList.add("dark");
                if (!dark) location.hash += "-dark";
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