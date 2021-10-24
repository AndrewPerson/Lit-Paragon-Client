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
    else if (command == "Get Token") {
        var token = JSON.parse(await GetToken());
        return {command: "Token", token: token.access_token};
    }
    else if (command == "Refresh Token") {
        var token = JSON.parse(await GetToken());
        //TODO Change this to just use the default resources api to also refresh the token.
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
                token: JSON.parse(await tokenResponse.text()).access_token,
                succeeded: true
            };
        }
        else return {
            command: "Refreshed Token",
            token: token.access_token,
            succeeded: false
        };
    }
}