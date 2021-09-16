const PAGES = [
    "dailytimetable",
    "barcode",
    "timetable",
    "announcements",
    "extensions",
    "settings"
];

function UpdatePage() {
    var hash = location.hash.replace("#", "").split("-").filter(key => key.trim());

    var page = "dailytimetable";

    var gotPage = false;
    for (var part of hash) {
        if (PAGES.includes(part)) {
            page = part;
            gotPage = true;
            break;
        }
    }

    if (!gotPage) {
        hash.unshift(page);
        location.hash = hash.join("-");
    }

    document.getElementById(page)?.classList.remove("hidden");

    var elements = document.getElementById("body").children;

    var i = 0;
    while (i < elements.length) {
        if (elements[i].id != page
         && elements[i].tagName != "SCRIPT"
         && elements[i].tagName != "NAV-BAR")
            elements[i].classList.add("hidden");
        
        i++;
    }

    window.page = page;

    //Sometimes the navbar isn't fully initialised
    var navbar = document.getElementById("nav");
    if (navbar.updatePage instanceof Function)
        navbar.updatePage();

    if (window.onPageUpdate instanceof Function)
        window.onPageUpdate();
}

UpdatePage();