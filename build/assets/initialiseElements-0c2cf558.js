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

    var extensions = window.getInstalledExtensions();

    var origins = Object.keys(extensions).map(extension => {
        var url = new URL(extensions[extension].url);
        return url.origin;
    });

    window.addEventListener("message", e => {
        var origin = e.origin;

        if (!origins.includes(origin)) return;

        handleMessage(e.data.command, e.data.data).then(result => {
            e.source.postMessage(result, origin);
        });
    });
}

async function handleMessage(command, data) {
    if (command == "Get Data") {
        var resource = await GetResourceFromCache(data);
        return {command: "Data", data: resource};
    }
    
    if (command == "Get Token") {
        var token = JSON.parse(await GetToken());
        return {command: "Token", token: token.access_token};
    }

    if (command == "Refresh Token") {
        var token = await GetToken();
        
        //This also updates the token.
        //No matter what we do, it will always require at least one Cloud Function invocation.
        //Might as well update the resources while we're at it.
        var succeeded = await UpdateResourcesIfNeeded(token, true);

        if (succeeded)
            token = await GetToken();

        return {
            command: "Refreshed Token",
            token: JSON.parse(token).access_token,
            succeeded: succeeded
        };
    }
}