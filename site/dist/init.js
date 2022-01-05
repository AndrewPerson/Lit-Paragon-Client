// <define:REQUIRED_FEATURES>
var define_REQUIRED_FEATURES_default = ["navigator.serviceWorker", "ShadowRoot", "customElements"];

// site/ts/init.ts
var dark = localStorage.getItem("Dark") == "true";
document.documentElement.classList.toggle("dark", dark);
var hue = localStorage.getItem("Hue") || "200";
document.documentElement.style.setProperty("--main-hue", hue);
document.documentElement.style.setProperty("--hue-rotate", `${parseFloat(hue) - 200}deg`);
for (let feature of define_REQUIRED_FEATURES_default) {
  let obj = window;
  for (let part of feature.split(".")) {
    obj = obj[part];
    if (obj == null || obj == void 0) {
      location.href = `${location.origin}/unsupported?feature="${part}"`;
    }
  }
}
