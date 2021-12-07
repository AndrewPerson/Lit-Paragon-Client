(() => {
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // site/js/service-worker/service-worker.debug.ts
  self.addEventListener("install", (e) => e.waitUntil(self.skipWaiting()));
  self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));
  self.addEventListener("fetch", (e) => e.respondWith(onFetch(e)));
  self.addEventListener("message", (e) => e.waitUntil(onMessage(e)));
  var token = ``;
  var metadata = `{
    "version": "Development",
    "pages": {
        "Award Scheme Points": {
            "navIcon": "/nav-icon.svg",
            "url": "https://awardschemepoints.profsmart.repl.co",
            "finished": true,
            "description": "Displays your award scheme points.",
            "icon": "/icon.svg",
            "version": "0.0.1"
        }
    }
}`;
  var serverUrl = new URL("https://au-syd.functions.appdomain.cloud/api/v1/web/6bbc35c7-dc9e-4df5-9708-71beb3b96f36/default");
  var metadataUrl = new URL("http://localhost:5555/metadata");
  function onFetch(e) {
    return __async(this, null, function* () {
      const request = e.request;
      if (request.method == "GET" || request.method == "POST") {
        var url = new URL(request.url);
        if (url.hostname == location.hostname && url.pathname == "/login")
          return yield fetch("/callback");
        if (url.origin == serverUrl.origin && url.pathname == `${serverUrl.pathname}/resources`)
          return yield fetch("https://sbhs-random-data.profsmart.repl.co/all.json");
        if (url.origin == serverUrl.origin && url.pathname == `${serverUrl.pathname}/auth`)
          return new Response(token);
        if (url.origin == serverUrl.origin && url.pathname == `${serverUrl.pathname}/refresh`)
          return new Response(token);
        if (url.origin == metadataUrl.origin && url.pathname == metadataUrl.pathname)
          return new Response(metadata);
      }
      return fetch(request);
    });
  }
  function onMessage(e) {
    return __async(this, null, function* () {
      if (e.data.command == "metadata-fetch") {
        var metadataCache = yield caches.open("Metadata");
        yield metadataCache.put("Metadata", new Response(metadata));
      }
    });
  }
})();
