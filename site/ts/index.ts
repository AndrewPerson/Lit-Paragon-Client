//#conditional

import { Site } from "./site/site";
import { Resources } from "./site/resources";
import { Extensions } from "./site/extensions";

declare const MAX_REFRESH_FREQUENCY: number;
declare const BACKGROUND_SYNC_INTERVAL: number;

import "./site/elements";
import "./site/extensions";

Main();

async function Main() {
    if (location.hash) {
        NavigateToHash(location.hash);
    }
    else {
        Site.NavigateTo({
            page: (document.querySelector("main") as HTMLElement).children[0].id,
            extension: false
        });
    }

    Extensions.Initialise();

    window.addEventListener("hashchange", () => {
        if (location.hash) {
            NavigateToHash(location.hash);
        }
    });

    //#if DEVELOPMENT
    var registration = await navigator.serviceWorker.getRegistration("dist/service-worker/service-worker.js");

    if (registration) await registration.update();
    else await navigator.serviceWorker.register("dist/service-worker/service-worker.js", {
        scope: "/"
    });
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
    var registration = await navigator.serviceWorker.getRegistration("dist/service-worker/service-worker.js");

    if (registration) await registration.update();
    else await navigator.serviceWorker.register("dist/service-worker/service-worker.js", {
        scope: "/"
    });

    navigator.serviceWorker.addEventListener("message", (e: MessageEvent) => {
        if (e.data.command == "metadata-fetched") {
            Site.FireMetadataCallbacks();
        }
    });

    let serviceWorker = await navigator.serviceWorker.ready;

    //A lot of @ts-ignore because TS doesn't have up-to-date definitions.
    //@ts-ignore
    if (serviceWorker.periodicSync) {
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
    //#endif
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