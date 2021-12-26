(() => {
  // site/js/service-worker/service-worker.debug.ts
  self.addEventListener("install", (e) => e.waitUntil(self.skipWaiting()));
  self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));
  self.addEventListener("fetch", (e) => e.respondWith(onFetch(e)));
  self.addEventListener("message", (e) => e.waitUntil(onMessage(e)));
  async function onFetch(e) {
    const request = e.request;
    if (request.method == "GET") {
      var url = new URL(request.url);
      if (url.hostname == location.hostname && url.pathname == "/login")
        return await fetch("/callback");
    }
    return fetch(request);
  }
  async function onMessage(e) {
    if (e.data.command == "metadata-fetch") {
      var metadataCache = await caches.open("Metadata");
      await metadataCache.put(`${location.origin}/Metadata`, await fetch("http://127.0.0.1:5555/metadata"));
    }
  }
})();
