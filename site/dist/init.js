(() => {
  // <define:REQUIRED_FEATURES>
  var define_REQUIRED_FEATURES_default = ["navigator.serviceWorker", "ShadowRoot", "customElements"];

  // site/js/init.ts
  var dark = localStorage.getItem("Dark") == "true";
  document.documentElement.classList.toggle("dark", dark);
  for (feature of define_REQUIRED_FEATURES_default) {
    obj = window;
    for (part of feature.split(".")) {
      obj = obj[part];
      if (obj == null || obj == void 0) {
        location.href = `${location.origin}/unsupported?feature="${part}"`;
      }
    }
  }
  var obj;
  var part;
  var feature;
})();
