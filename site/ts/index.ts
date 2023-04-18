import { Site } from "./site/site";
import { Resources } from "./site/resources";
import { Extensions } from "./site/extensions";

import "./elements";
import { InlineNotification } from "./elements/notification/notification";

declare const MAX_REFRESH_FREQUENCY: number;
declare const AUTO_FETCH_RESOURCES_FREQUENCY: number;

Main();

async function Main() {
    if (location.hash != "") NavigateToHash(location.hash);
    else Site.navigateTo({
        page: document.querySelector("main")?.children[0].id ?? "",
        extension: false
    });

    Extensions.initialise();

    window.addEventListener("hashchange", () => {
        if (location.hash != "") {
            NavigateToHash(location.hash);
        }
    });

    let resourcesUpdatingNotification: InlineNotification | null = null;
    Resources.onReceivedResource((received, total) => {
        if (resourcesUpdatingNotification === null) {
            resourcesUpdatingNotification = InlineNotification.showNotification("Updating Resources", true);
        }

        resourcesUpdatingNotification.percentage = total == 0 ? 1 : received / total;
    });

    Resources.onEndUpdatingResources(_ => {
        if (resourcesUpdatingNotification != null) {
            resourcesUpdatingNotification.close();
            resourcesUpdatingNotification = null;
        }
    });

    //This is to stop people who refresh a lot from spamming the server with requests.
    //Session storage is persisted between reloads but is cleared when the tab is closed.
    let lastReloadedText = sessionStorage.getItem("Last Refreshed");

    if (lastReloadedText == null) {
        Resources.update().then(() => sessionStorage.setItem("Last Refreshed", new Date().toISOString()));
    }
    else {
        let lastReloaded = new Date(lastReloadedText);

        if ((new Date().getTime() - lastReloaded.getTime()) > MAX_REFRESH_FREQUENCY) {
            Resources.update().then(() => sessionStorage.setItem("Last Refreshed", new Date().toISOString()));
        }
    }

    try {
        let registration = await navigator.serviceWorker.getRegistration("dist/service-worker/service-worker.js");

        if (registration === undefined) await navigator.serviceWorker.register("dist/service-worker/service-worker.js", {
            scope: "/"
        });
    }
    catch(_) { }

    setInterval(() => {
        Resources.update();
    }, AUTO_FETCH_RESOURCES_FREQUENCY);
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

    Site.navigateTo({
        page: page,
        extension: extension
    });
}
