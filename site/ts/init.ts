let dark: boolean = localStorage.getItem("Dark") == "true";
document.documentElement.classList.toggle("dark", dark);

let hue: string = localStorage.getItem("Hue") || "200";
document.documentElement.style.setProperty("--main-hue", hue);
document.documentElement.style.setProperty("--hue-rotate", `${parseFloat(hue) - 200}deg`);

declare const REQUIRED_FEATURES: string[];

for (let feature of REQUIRED_FEATURES) {
    let obj: any = window;
    for (let part of feature.split(".")) {        
        obj = obj[part];

        if (obj == null || obj == undefined) {
            location.href = `${location.origin}/unsupported?feature="${part}"`
        }
    }
}