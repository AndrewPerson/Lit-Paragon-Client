const PAGES = [
    "dailytimetable",
    "barcode",
    "timetable",
    "announcements",
    "pages",
    "settings"
];

function RunCallbacks() {
    //Sometimes the navbar isn't fully initialised
    var navbar = document.getElementById("nav");
    if (navbar.updatePage instanceof Function)
        navbar.updatePage();

    if (window.onPageUpdate instanceof Function)
        window.onPageUpdate();
}

function DisplayExtension(extension) {
    
}

function DisplayPage(page) {
    var currentPage = document.getElementById(page);
    if (window.received_data) currentPage.classList.remove("hidden");

    var elements = document.getElementById("pages-container").children;

    var i = 0;
    while (i < elements.length) {
        if (elements[i].id != page
         && elements[i].tagName != "SCRIPT"
         && elements[i].tagName != "NAV-BAR"
         && elements[i].tagName != "LOGIN-NOTIFICATION")
            elements[i].classList.add("hidden");
        
        i++;
    }

    window.page = page;

    RunCallbacks();
}

function UpdatePage() {
    var hash = window.getHash();

    var page = "dailytimetable";

    var gotPage = false;
    var extension = false;
    for (var part of hash) {
        if (PAGES.includes(part)) {
            page = part;
            gotPage = true;
            break;
        }

        if (part.startsWith("(page)")) {
            page = part.substring(11);
            gotPage = true;
            extension = true;
            break;
        }
    }

    if (!gotPage) {
        location.hash = "dailytimetable";
    }

    if (extension) {
        if (window.extensions) {
            if (window.extensions.includes(page)) {
                DisplayExtension(page);
            }
            else {
                location.hash = "dailytimetable"
            }
        }
        else {
            window.getExtensions().then(() => {
                if (window.extensions.includes(page)) {
                    DisplayExtension(page);
                }
                else {
                    location.hash = "dailytimetable";
                }
            });
        }
    }
    else {
        DisplayPage(page);
    }
}

UpdatePage();