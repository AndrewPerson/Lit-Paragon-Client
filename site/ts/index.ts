import { Site } from "./site/site";
import { Resources } from "./site/resources";
import { Extensions } from "./site/extensions";

import "./elements";

declare const MAX_REFRESH_FREQUENCY: number;
declare const AUTO_FETCH_RESOURCES_FREQUENCY: number;

Main();

async function Main() {
    if (location.hash != "") NavigateToHash(location.hash);
    else Site.NavigateTo({
        page: document.querySelector("main")?.children[0].id ?? "",
        extension: false
    });

    Extensions.Initialise();

    window.addEventListener("hashchange", () => {
        if (location.hash != "") {
            NavigateToHash(location.hash);
        }
    });

    //This is to stop people who refresh a lot from spamming the server with requests.
    //Session storage is persisted between reloads but is cleared when the tab is closed.
    let lastReloadedText = sessionStorage.getItem("Last Refreshed");

    if (lastReloadedText == null) {
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
    }
    catch(_) { }

    setInterval(() => {
        Resources.FetchResources();
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

    Site.NavigateTo({
        page: page,
        extension: extension
    });
}
