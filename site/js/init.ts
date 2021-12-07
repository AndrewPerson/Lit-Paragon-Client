var dark: boolean = localStorage.getItem("Dark") == "true";
document.documentElement.classList.toggle("dark", dark);

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