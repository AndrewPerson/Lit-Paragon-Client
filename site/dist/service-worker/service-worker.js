(() => {
  // site/js/service-worker/service-worker.debug.ts
  self.addEventListener("install", (e) => e.waitUntil(self.skipWaiting()));
  self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));
  self.addEventListener("fetch", (e) => e.respondWith(onFetch(e)));
  self.addEventListener("message", (e) => e.waitUntil(onMessage(e)));
  var token = `{}`;
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
  var metadataUrl = new URL("http://127.0.0.1:5555/metadata");
  async function onFetch(e) {
    const request = e.request;
    if (request.method == "GET" || request.method == "POST") {
      var url = new URL(request.url);
      if (url.hostname == location.hostname && url.pathname == "/login")
        return await fetch("/callback");
      if (url.origin == serverUrl.origin && url.pathname == `${serverUrl.pathname}/resources`)
        return await fetch("https://sbhs-random-data.profsmart.repl.co/all.json");
      if (url.origin == serverUrl.origin && url.pathname == `${serverUrl.pathname}/auth`)
        return new Response(token);
      if (url.origin == serverUrl.origin && url.pathname == `${serverUrl.pathname}/refresh`)
        return new Response(token);
      if (url.origin == metadataUrl.origin && url.pathname == metadataUrl.pathname)
        return new Response(metadata);
    }
    return fetch(request);
  }
  async function onMessage(e) {
    if (e.data.command == "metadata-fetch") {
      var metadataCache = await caches.open("Metadata");
      await metadataCache.put("Metadata", new Response(metadata));
    }
  }
})();
