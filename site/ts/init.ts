var dark: boolean = localStorage.getItem("Dark") == "true";
document.documentElement.classList.toggle("dark", dark);

var hue: string = localStorage.getItem("Hue") || "200";
document.documentElement.style.setProperty("--main-hue", hue);
document.documentElement.style.setProperty("--hue-rotate", `${parseFloat(hue) - 200}deg`);

declare const REQUIRED_FEATURES: string[];

for (var feature of REQUIRED_FEATURES) {
    var obj: any = window;
    for (var part of feature.split(".")) {        
        obj = obj[part];

        if (obj == null || obj == undefined) {
            location.href = `${location.origin}/unsupported?feature="${part}"`
        }
    }
}