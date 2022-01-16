declare const SERVER_ENDPOINT: string;
declare const METADATA_CACHE: string;
declare const REQUIRED_FEATURES: string[];

import "./elements/notification/notification";

window.addEventListener("error", async e => {
    if (e.error instanceof Error) {
        let cache = await caches.open(METADATA_CACHE);
        let metadataResponse = await cache.match("Metadata");

        let version = undefined;
        if (metadataResponse !== undefined)
            version = (await metadataResponse.json()).version;

        let ok = true;
        try {
            let response = await fetch(`${SERVER_ENDPOINT}/error`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    error_name: e.error.name,
                    stack_trace: e.error.stack,
                    version: version,
                })
            });

            ok = response.ok;
        }
        catch (e) {
            ok = false;
        }

        let notificationText = ok ? "An error occured and has been automatically reported. No personal information is sent." :
                                    "An error occured and could not be reported. For obvious reasons, the error while reporting has not been reported.";

        let notification = document.createElement("inline-notification");

        notification.innerText = notificationText;

        document.getElementById("notification-area")?.appendChild(notification);
    }
});

let dark: boolean = localStorage.getItem("Dark") == "true";
document.documentElement.classList.toggle("dark", dark);

let hue: string = localStorage.getItem("Hue") || "200";
document.documentElement.style.setProperty("--main-hue", hue);
document.documentElement.style.setProperty("--hue-rotate", `${parseFloat(hue) - 200}deg`);

for (let feature of REQUIRED_FEATURES) {
    let obj: any = window;
    for (let part of feature.split(".")) {        
        obj = obj[part];

        if (obj == null || obj == undefined) {
            location.href = `${location.origin}/unsupported?feature="${part}"`
        }
    }
}