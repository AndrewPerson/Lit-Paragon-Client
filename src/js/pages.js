const PAGES = [
    "dailytimetable",
    "barcode",
    "timetable",
    "announcements",
    "extensions",
    "settings"
];

function UpdatePage() {
    var hash = window.getHash();

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

    for (var element of elements) {
        if (element.id != page
         && element.tagName != "SCRIPT"
         && element.tagName != "NAV-BAR"
         && element.tagName != "LOGIN-NOTIFICATION") {
            element.classList.add("hidden");
        }
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