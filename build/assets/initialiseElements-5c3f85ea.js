const ELEMENTS = [
    "dailytimetable",
    "announcements",
    "timetable"
];

window.onUserData = async () => {
    ELEMENTS.forEach(element => {
        GetResourceFromCache(element).then(resource => {
            document.getElementById(element).setAttribute("data", resource);
        });
    });

    GetResourceFromCache("userinfo").then(resource => {
        document.getElementById("barcode").setAttribute("data", resource);
    });

    GetResourceFromCache("dailytimetable").then(resource => {
        if (resource) {
            var day = JSON.parse(resource).timetable.timetable.dayname;

            document.getElementById("timetable").setAttribute("day", day);
        }
    });

    caches.open(window.METADATA_CACHE).then(async cache => {
        var metadataResponse = await cache.match("Metadata");
        if (!metadataResponse) return;

        var pages = (await metadataResponse.json()).pages;

        document.getElementById("pages").setAttribute("data", JSON.stringify(pages));
    });
}