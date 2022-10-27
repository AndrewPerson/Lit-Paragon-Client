//#conditional

import { Site } from "./site/site";
import { Resources } from "./site/resources";
import { Extensions } from "./site/extensions";

import "./elements";

declare const MAX_REFRESH_FREQUENCY: number;
declare const INSTALL_PROMPT_FREQUENCY: number;
declare const BACKGROUND_SYNC_INTERVAL: number;

declare const METADATA_ENDPOINT: string;

Main();

async function Main() {
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

    //This is to stop people who refresh a lot from spamming the server with requests.
    //Session storage is persisted between reloads but is cleared when the tab is closed.
    let lastReloadedText = sessionStorage.getItem("Last Refreshed");

    if (lastReloadedText === null) {
        Resources.FetchResources().then(() => sessionStorage.setItem("Last Refreshed", new Date().toISOString()));
    }
    else {
        let lastReloaded = new Date(lastReloadedText);

        if ((new Date().getTime() - lastReloaded.getTime()) > MAX_REFRESH_FREQUENCY) {
            Resources.FetchResources().then(() => sessionStorage.setItem("Last Refreshed", new Date().toISOString()));
        }
    }

    try {
        let registration = await navigator.serviceWorker.getRegistration("dist/service-worker/service-worker.js");

        if (registration) await registration.update();
        else await navigator.serviceWorker.register("dist/service-worker/service-worker.js", {
            scope: "/"
        });

        navigator.serviceWorker.addEventListener("message", async (e: MessageEvent) => {
            if (e.data.command == "metadata-fetched") {
                await Site.SetMetadata(e.data.metadata, !e.data.updated);

                if (e.data.updated) {
                    let text = document.createElement("p");
                    text.innerHTML = `<a href="/">Reload</a> to update Paragon.`;

                    Site.ShowNotification(text);
                }
            }
        });

        let serviceWorker = await navigator.serviceWorker.ready;

        //A lot of @ts-ignore because TS doesn't have up-to-date definitions for serviceWorker syncing.
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
    catch(_) {
        await Site.SetMetadata(await (await fetch(METADATA_ENDPOINT)).json());
    }

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
