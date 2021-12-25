//#conditional

import { Site } from "./site";
declare const MAX_REFRESH_FREQUENCY: number;
declare const BACKGROUND_SYNC_INTERVAL: number;

import "./elements";

Main();

async function Main() {
    if (location.hash)
        Site.NavigateTo({
            page: location.hash.substring(1),
            extension: location.hash.indexOf("extension-") == 1
        });

    //#if DEVELOPMENT
    var registration = await navigator.serviceWorker.getRegistration("dist/service-worker/service-worker.js");

    if (registration)
        await registration.update();
    else
        await navigator.serviceWorker.register("dist/service-worker/service-worker.js", {
            scope: "/"
        });
    //#endif

    //This is to stop people who refresh a lot from spamming the server with requests.
    //Session Storage is persisted through reloads, but is cleared once the tab is closed.
    var lastReloadedText = sessionStorage.getItem("Last Reloaded");

    var resourceNotification = ShowResourceNotification();

    if (lastReloadedText) {
        var lastReloaded = new Date(lastReloadedText);

        if ((new Date().getTime() - lastReloaded.getTime()) > MAX_REFRESH_FREQUENCY) {
            //We cannot simply pass in `resourceNotification.remove` as the callback because for some reason, it throws an error if we do that.
            Site.FetchResources().then(() => resourceNotification.remove());
            sessionStorage.setItem("Last Refreshed", new Date().toISOString());
        }
    }
    //We cannot simply pass in `resourceNotification.remove` as the callback because for some reason, it throws an error if we do that.
    else Site.FetchResources().then(() => resourceNotification.remove());

    //#if !DEVELOPMENT
    var registration = await navigator.serviceWorker.getRegistration("dist/service-worker/service-worker.js");

    if (registration)
        await registration.update();
    else
        await navigator.serviceWorker.register("dist/service-worker/service-worker.js", {
            scope: "/"
        });

    var serviceWorker = await navigator.serviceWorker.ready;

    //A lot of @ts-ignore because TS doesn't have up-to-date definitions.
    //@ts-ignore
    if (serviceWorker.periodicSync) {
        //@ts-ignore
        var tags = await serviceWorker.periodicSync.getTags();

        if (!tags.includes('metadata-fetch')) {
            try {
                //@ts-ignore
                await serviceWorker.periodicSync.register('metadata-fetch', {
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

function ShowResourceNotification() {
    return Site.ShowNotification("Updating resources...", true);
}