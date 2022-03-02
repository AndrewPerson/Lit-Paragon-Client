//#conditional

import { Site } from "./site/site";
import { Resources } from "./site/resources";
import { Extensions } from "./site/extensions";

import "./elements";

declare const MAX_REFRESH_FREQUENCY: number;
declare const INSTALL_PROMPT_FREQUENCY: number;
declare const BACKGROUND_SYNC_INTERVAL: number;

declare const METADATA_ENDPOINT: string;
declare const STATUS_SERVER_ENDPOINT: string;

Main();

async function Main() {
    window.addEventListener("error", async e => {
        let cache = await caches.open(METADATA_CACHE);
        let metadataResponse = await cache.match("Metadata");

        let version = "Unknown";
        if (metadataResponse !== undefined)
            version = (await metadataResponse.json()).version;

        let ok = true;

        let error;
        if (e.error instanceof Error) {
            error = {
                error_message: e.error.message,
                stack_trace: e.error.stack
            }
        }
        else {
            error = {
                error_message: "",
                stack_trace: JSON.stringify(e.error)
            }
        }

        try {
            let response = await fetch(`${SERVER_ENDPOINT}/error`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...error,
                    version: version
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
    });

    if (location.hash)
        NavigateToHash(location.hash);
    else
        Site.NavigateTo({
            page: document.querySelector("main")?.children[0].id ?? "",
            extension: false
        });

    Extensions.Initialise();

    window.addEventListener("hashchange", () => {
        if (location.hash) {
            NavigateToHash(location.hash);
        }
    });

    //#if DEVELOPMENT
    if ("serviceWorker" in navigator) {
        let registration = await navigator.serviceWorker.getRegistration("dist/service-worker/service-worker.js");

        if (registration) await registration.update();
        else await navigator.serviceWorker.register("dist/service-worker/service-worker.js", {
            scope: "/"
        });
    }
    //#endif

    //This is to stop people who refresh a lot from spamming the server with requests.
    //Session storage is persisted between reloads but is cleared when the tab is closed.
    let lastReloadedText = sessionStorage.getItem("Last Refreshed");

    if (lastReloadedText !== null) {
        let lastReloaded = new Date(lastReloadedText);

        if ((new Date().getTime() - lastReloaded.getTime()) > MAX_REFRESH_FREQUENCY) {
            Resources.FetchResources().then(() => sessionStorage.setItem("Last Refreshed", new Date().toISOString()));
        }
    }
    else {
        Resources.FetchResources().then(() => sessionStorage.setItem("Last Refreshed", new Date().toISOString()));
    }

    //#if !DEVELOPMENT
    if ("serviceWorker" in navigator) {
        let registration = await navigator.serviceWorker.getRegistration("dist/service-worker/service-worker.js");

        if (registration) await registration.update();
        else await navigator.serviceWorker.register("dist/service-worker/service-worker.js", {
            scope: "/"
        });

        navigator.serviceWorker.addEventListener("message", async (e: MessageEvent) => {
            if (e.data.command == "metadata-fetched") {
                await Site.SetMetadata(e.data.metadata);

                if (e.data.updated) {
                    let text = document.createElement("p");
                    text.innerHTML = `<a href="/">Reload</a> to update Paragon.`;

                    Site.ShowNotification(text);
                }
            }
        });

        let serviceWorker = await navigator.serviceWorker.ready;

        //A lot of @ts-ignore because TS doesn't have up-to-date definitions.
        if ("periodicSync" in serviceWorker) {
            //@ts-ignore
            let tags = await serviceWorker.periodicSync.getTags();

            if (!tags.includes("metadata-fetch")) {
                try {
                    //@ts-ignore
                    await serviceWorker.periodicSync.register("metadata-fetch", {
                        // An interval of half a day.
                        minInterval: BACKGROUND_SYNC_INTERVAL,
                    });
                } catch (e) {
                    console.log("Couldn't register background fetch. Updates will be only occur when app is open.");
                }
            }
        }
        else
            console.log("Couldn't register background fetch. Updates will be only occur when app is open.");

        navigator.serviceWorker.controller?.postMessage({command: "metadata-fetch"});
    }
    else {
        await Site.SetMetadata(await (await fetch(METADATA_ENDPOINT)).json());
    }
    //#endif

    try {
        var statusSocket = new WebSocket(STATUS_SERVER_ENDPOINT);
    }
    catch (e) {
        await fetch(STATUS_SERVER_ENDPOINT);
        statusSocket = new WebSocket(STATUS_SERVER_ENDPOINT);
    }

    statusSocket.addEventListener("open", () => {
        statusSocket.send("Latest News");
    });

    statusSocket.addEventListener("message", e => {
        let news = (e.data as string).trim();

        if (news.length > 0) Site.ShowNotification(e.data);
    });

    let lastPromptedInstall = localStorage.getItem("Last Prompted Install");
    let promptedInstall = lastPromptedInstall == null ? false : new Date().getTime() - new Date(lastPromptedInstall).getTime() < INSTALL_PROMPT_FREQUENCY;
    window.addEventListener("beforeinstallprompt", e => {
        if (promptedInstall) return;
        promptedInstall = true;

        e.preventDefault();

        localStorage.setItem("Last Prompted Install", new Date().toISOString());

        let deferredPrompt = e as Event & {
            prompt: () => void;
            userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
        };

        let text = document.createElement("p");

        let button = document.createElement("button");
        button.classList.add("a");
        button.innerText = "Click";

        button.addEventListener("click", () => {
            deferredPrompt.prompt();
        });

        text.appendChild(button);
        text.appendChild(document.createTextNode(" to install Paragon."));

        let notification = Site.ShowNotification(text);

        deferredPrompt.userChoice.then(choiceResult => {
            notification.Close();

            if (choiceResult.outcome == "accepted") Site.ShowNotification("Thanks for installing Paragon!");
        });
    });
}

function NavigateToHash(hash: string) {
    let extension = hash.indexOf("extension-") == 1;

    let page ="";
    if (extension) {
        page = decodeURIComponent(hash.substring(11));
    }
    else {
        page = decodeURIComponent(hash.substring(1));
    }

    Site.NavigateTo({
        page: page,
        extension: extension
    });
}