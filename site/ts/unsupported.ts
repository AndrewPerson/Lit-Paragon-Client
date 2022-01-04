import { Site } from "./site";

if (Site.dark)
    (document.getElementById("logo-p") as HTMLImageElement).src = "images/logo-dark.svg";

let missingFeature = new URLSearchParams(window.location.search).get("feature");

if (missingFeature) {
    let message = document.getElementById("message") as HTMLParagraphElement;
    message.innerHTML = `You need <a href="https://caniuse.com/?search=${missingFeature}">${missingFeature}</a> to run <b>Paragon</b>`;
}