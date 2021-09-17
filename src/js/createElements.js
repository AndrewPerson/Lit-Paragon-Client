var body = document.getElementById("body");  
var elements = [];

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