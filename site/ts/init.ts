declare const VERSION: string;
declare const SERVER_ENDPOINT: string;
declare const REQUIRED_FEATURES: string[];
declare const TELEMETRY_PERMISSION_STORAGE: string;
//declare const TELEMETRY_STORAGE: string;

window.addEventListener("error", async e => {
    const telemetryPermission = JSON.parse(localStorage.getItem(TELEMETRY_PERMISSION_STORAGE) ?? "true");

    if (!telemetryPermission) return;

    if (e.error instanceof Error) {
        fetch(`${SERVER_ENDPOINT}/error`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                error_message: e.error.message,
                stack_trace: e.error.stack ?? "No stack trace",
                version: VERSION
            })
        });
    }
    else {
        fetch(`${SERVER_ENDPOINT}/error`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                error_message: "No message",
                stack_trace: e.error.stack ?? "No stack trace",
                version: VERSION
            })
        });
    }
})

let dark = localStorage.getItem("Dark") == "true";
document.documentElement.classList.toggle("dark", dark);

let hue = localStorage.getItem("Hue") || "200";
document.documentElement.style.setProperty("--main-hue", hue);
document.documentElement.style.setProperty("--hue-rotate", `${parseFloat(hue) - 200}deg`);

for (let feature of REQUIRED_FEATURES) {
    let obj: any = window;
    for (let part of feature.split(".")) {
        obj = obj[part];

        if (obj == null || obj == undefined) {
            location.href = `${location.origin}/unsupported?feature="${part}"`
        }
    }
}