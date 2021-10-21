window.METADATA_CACHE = "Metadata";
window.RESOURCE_CACHE = "User Resources";
window.SERVER_ENDPOINT = "https://au-syd.functions.appdomain.cloud/api/v1/web/6bbc35c7-dc9e-4df5-9708-71beb3b96f36/default";
window.CLIENT_ID = "Paragon_Tools";

window.getHash = () => {
    return location.hash.replace("#", "").split("-").filter(key => key.trim());
}

window.isDark = () => { return localStorage.getItem("Dark") == "true"; };

window.getHue = () => {
    var hueResponse = localStorage.getItem("Hue");

    var hue = hueResponse ? parseFloat(hueResponse): 200;

    return {hue: hue, rotation: hue - 200};
}

window.getInstalledExtensions = () => {
    return JSON.parse(localStorage.getItem("Installed Pages") || "{}");
}

UpdateScreenType();

function UpdateScreenType() {
    var htmlElement = document.getElementsByTagName("html")[0];

    if (window.isDark()) {
        htmlElement.classList.add("dark");
    }
    else {
        htmlElement.classList.remove("dark");
    }

    var hue = window.getHue();

    htmlElement.style.setProperty("--main-hue", hue.hue);
    htmlElement.style.setProperty("--hue-rotate", `${hue.rotation}deg`);
}