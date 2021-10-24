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

    var frames = window.frames;
    for (var i = 0; i < frames.length; i++) {
        var frame = frames[i];

        if (origins.includes(frame.origin))
            frame.postMessage({command: "Ready"}, frame.origin);
    }
}

async function handleMessage(command, data) {
    if (command == "Get Data") {
        var resource = await GetResourceFromCache(data);
        return {command: "Data", data: resource};
    }
    else if (command == "Get Token") {
        var token = await LoginIfNeeded();
        return {command: "Token", data: token};
    }
    else if (command == "Refresh Token") {
        var token = await LoginIfNeeded();
        var tokenResponse = await fetch(`${window.SERVER_ENDPOINT}/refresh`, {
            method: "POST",
            body: token
        });

        if (tokenResponse.status == 200) {
            var clonedResponse = tokenResponse.clone();
            var cache = await caches.open(window.RESOURCE_CACHE);
            await cache.put("Token", clonedResponse);

            return {
                command: "Refreshed Token",
                data: {
                    token: await tokenResponse.text(),
                    succeeded: true
                }
            };
        }
        else return {
            command: "Refreshed Token",
            data: {
                token: token,
                succeeded: false
            }
        };
    }
}