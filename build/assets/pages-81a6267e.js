const PAGES = [
    "dailytimetable",
    "barcode",
    "timetable",
    "announcements",
    "pages",
    "settings"
];

function RunCallbacks() {
    var navbar = document.getElementById("nav");

    //Sometimes the navbar isn't fully initialised
    if (navbar.updatePage instanceof Function)
        navbar.updatePage();
}

function DisplayExtension(extension) {
    var currentPage = document.getElementById(extension);

    if (currentPage) {
        currentPage.classList.remove("hidden");
    }
    else {
        var newPage = document.createElement("iframe");
        newPage.id = extension;

        var extensions = window.getInstalledExtensions();

        newPage.src = extensions[extension];

        document.getElementById("pages-container").appendChild(newPage);
    }

    window.page = extension;
}

function DisplayPage(page) {
    var newPage = document.getElementById(page);
    newPage.classList.remove("hidden");

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

    if (window.page) {
        var currentPage = document.getElementById(window.page);
        currentPage.classList.add("hidden");
    }

    if (extension) {
        if (Object.keys(window.getInstalledExtensions()).includes(page.substring(6))) {
            DisplayExtension(page);
        }
        else {
            if (window.page) {
                location.hash = window.page;
                DisplayPage(window.page);
            }
            else {
                location.hash = "dailytimetable";
                DisplayPage("dailytimetable");
            }
        }
    }
    else {
        DisplayPage(page);
    }
}

UpdatePage();