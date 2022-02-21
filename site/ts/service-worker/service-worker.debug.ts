/// <reference lib="WebWorker" />

//Shady hack to get typescript to accept the `declare const self` part.
export default undefined;

declare const self: ServiceWorkerGlobalScope;

self.addEventListener("install", e => e.waitUntil(self.skipWaiting()));
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));

self.addEventListener("message", e => e.waitUntil(onMessage(e)));

declare const METADATA_ENDPOINT: string;

async function onMessage(e: ExtendableMessageEvent) {
    if (e.data.command == "metadata-fetch") {
        e.source?.postMessage({
            command: "metadata-fetched",
            metadata: await (await fetch(METADATA_ENDPOINT)).json(),
            updated: false
        });
    }
}