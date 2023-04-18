//#conditional

import LOGIN_URL from "./login-url";

declare const RESOURCE_CACHE: string;
declare const SERVER_ENDPOINT: string;

async function getToken(code: string) {
    let tokenResponse = await fetch(SERVER_ENDPOINT + "/auth", {
        method: "POST",
        body: JSON.stringify({
            code: code
        })
    });

    if (tokenResponse.status != 200) return false;

    if (!tokenResponse) return false;

    let resourceCache = await caches.open(RESOURCE_CACHE);
    resourceCache.put("Token", tokenResponse);

    return true;
}

function showError(error: string) {
    let words = error.split(/ |_|-/);

    let formattedError = "";
    for (let word of words) {
        formattedError += word[0].toUpperCase() + word.substring(1) + " ";
    }

    formattedError = formattedError.substring(0, formattedError.length - 1);

    let bold = document.createElement("b");
    bold.innerText = formattedError;

    (document.getElementById("message") as HTMLParagraphElement).innerText = "Error: ";
    (document.getElementById("message") as HTMLParagraphElement).appendChild(bold);

    let loginLink = document.getElementById("login") as HTMLAnchorElement;

    loginLink.href = LOGIN_URL;
    loginLink.removeAttribute("style");
}

let params = new URLSearchParams(window.location.search);

let code = params.get("code");

if (code != null) {
    getToken(code)
    .then(succeeded => {
        sessionStorage.removeItem("Last Refreshed");
        // TODO Have a better method than forcefully redirecting the user to the login page. (i.e. display an error message)
        location.href = `${location.origin}/${succeeded ? "" : "login"}`;
    });
}
else {
    let error = params.get("error");

    if (error) showError(error)
    else (document.getElementById("message") as HTMLParagraphElement).innerText = "No code available.";
}