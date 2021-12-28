//#conditional

import { Site } from "./site";
import LOGIN_URL from "./login-url";

declare const RESOURCE_CACHE: string;
declare const SERVER_ENDPOINT: string;

if (Site.dark)
    (document.getElementById("logo-p") as HTMLImageElement).src = "images/logo-dark.svg";

async function Token(code: string) {
    var tokenResponse = await fetch(SERVER_ENDPOINT + "/auth", {
        method: "POST",
        body: code
    });
    
    if (tokenResponse.status != 200) return false;

    if (!tokenResponse) return false;

    var resourceCache = await caches.open(RESOURCE_CACHE);
    resourceCache.put("Token", tokenResponse);

    return true;
}

var params = new URLSearchParams(window.location.search);

var code = params.get("code");

//#if !DEVELOPMENT
if (code) {
//#endif
    Token(code)
    .then(succeeded => {
        location.href = `${location.origin}/${succeeded ? "" : "login"}`;
    });
//#if !DEVELOPMENT
}
else {
    var error = params.get("error");

    if (error) {
        error = error.replace("_", " ");

        var words = error.split(" ");

        var formattedError = "";
        for (var word of words) {
            formattedError += word[0].toUpperCase() + word.substring(1) + " ";
        }

        (document.getElementById("message") as HTMLParagraphElement).innerText = `Error: ${formattedError.substring(0, formattedError.length - 1)}`;
    }
    else
        (document.getElementById("message") as HTMLParagraphElement).innerText = "No code available.";

    var loginLink = document.getElementById("login") as HTMLAnchorElement;

    loginLink.href = LOGIN_URL;
    loginLink.removeAttribute("style");
}
//#endif