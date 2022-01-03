import { Site } from "./site";

var extensions = Site.GetInstalledExtensions();

var origins = Object.keys(extensions).map(extension => {
    var url = new URL(extensions[extension].url);
    return url.origin;
});

Site.ListenForDark(dark => {
    origins.forEach(origin => {
        window.postMessage({
            command: "Set Dark",
            data: {
                dark: dark
            }
        }, origin);
    });
});

window.addEventListener("message", async e => {
    var origin = e.origin;

    if (!origins.includes(origin)) return;

    e.source?.postMessage(await HandleCommands(e.data.command, e.data.data), {
        targetOrigin: origin
    });
});

async function HandleCommands(command: string, data: any) {
    switch (command) {
        case "Get Resource":
            return {
                command: "Resource",
                data: {
                    resource: await Site.GetResourceNow(data.resource)
                }
            }
        
        case "Get Token":
            var token = await Site.GetToken();

            return {
                command: "Token",
                data: {
                    token: token.token === null ? null : token.token.access_token,
                    valid: token.valid
                }
            }

        case "Refresh Token":
            var fetchedResources = await Site.FetchResources();

            if (!fetchedResources)
                return {
                    command: "Refreshed Token",
                    data: {
                        token: null,
                        valid: false
                    }
                }

            var token = await Site.GetToken();

            return {
                command: "Refreshed Token",
                data: {
                    token: token.token === null ? null : token.token.access_token,
                    valid: token.valid
                }
            }
    
        default:
            break;
    }
}