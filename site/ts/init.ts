declare const VERSION: string;
declare const SERVER_ENDPOINT: string;
declare const REQUIRED_FEATURES: string[];
declare const TELEMETRY_PERMISSION_STORAGE: string;
//declare const TELEMETRY_STORAGE: string;

if (JSON.parse(localStorage.getItem(TELEMETRY_PERMISSION_STORAGE) ?? "true"))
{
    window.addEventListener("error", async e => {
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
    });
}

let dark = localStorage.getItem("Dark") == "true";
document.documentElement.classList.toggle("dark", dark);

let hue = localStorage.getItem("Hue") || "200";
document.documentElement.style.setProperty("--main-hue", hue);
document.documentElement.style.setProperty("--hue-rotate", `${parseFloat(hue) - 200}deg`);
