import { Site } from "./site";
import { Resources } from "./resources";

import { Navbar } from "../elements/navbar/navbar";
import { ExtensionPage } from "../elements/extensions/extensions";

import { InlineNotification } from "../elements/notification/notification";

declare const METADATA_CACHE: string;
declare const SKIN_CACHE: string;

export type Extension = {
    navIcon: string,
    url: string,
    preview: boolean,
    description: string,
    icon: string,
    darkIcon: string,
    version: string
};

export class Extensions {
    static installedExtensions: Map<string, Extension> = new Map(Object.entries(JSON.parse(localStorage.getItem("Installed Extensions") ?? "{}")));

    static _resourceListeners: Map<string, MessageEvent[]> = new Map();

    static extensionNotificationIds: Map<string, string[]> = new Map();

    static GetExtensionOrigins() {
        let origins: string[] = [];

        for (let extension of this.installedExtensions.values())
            origins.push(new URL(extension.url).origin);

        return origins;
    }

    static async InstallExtension(extensionName: string) {
        let extension = (await this.GetExtensionsNow()).get(extensionName);

        if (extension) {
            this.installedExtensions.set(extensionName, extension);

            localStorage.setItem("Installed Extensions", JSON.stringify(Object.fromEntries(this.installedExtensions)));

            let order = Navbar.GetNavbarOrder();
            order.splice(order.length - 1, 0, order.length);

            Navbar.SetNavbarOrder(order);
        }
    }

    static async UninstallExtension(extensionName: string) {
        let installedExtensions = this.installedExtensions;

        let order = Navbar.GetNavbarOrder();

        let index = order.indexOf(Object.keys(installedExtensions).indexOf(extensionName)) + Navbar.defaultPages.length;
        let position = order.splice(index, 1)[0];

        for (let i = 0; i < order.length; i++) {
            if (order[i] > position) {
                order[i]--;
            }
        }

        Navbar.SetNavbarOrder(order);

        var extensionPage = document.getElementById(`extension-${extensionName}`);
        if (extensionPage !== null) extensionPage.remove();

        this.installedExtensions.delete(extensionName);

        localStorage.setItem("Installed Extensions", JSON.stringify(Object.fromEntries(this.installedExtensions)));
    }

    static async GetExtensionsNow(): Promise<Map<string, Extension>> {
        let cache = await caches.open(METADATA_CACHE);
        let response = await cache.match("Metadata");

        if (!response) return new Map();

        let extensions: Map<string, Extension> = new Map(Object.entries((await response.json()).pages ?? {}));

        return extensions;
    }

    static GetExtensionIconURL(extension: Extension, dark: boolean) {
        let url = new URL(dark ? extension.darkIcon : extension.icon, extension.url);
        url.search = `cache-version=${extension.version}`;

        return url.toString();
    }

    static GetExtensionNavIconURL(extension: Extension) {
        let url = new URL(extension.navIcon, extension.url);
        url.searchParams.set("cache-version", extension.version);

        return url.toString();
    }

    static Initialise() {
        Site.GetMetadata(metadata => {
            let extensions = new Map(Object.entries(metadata?.pages ?? {}));

            let entries = [...this.installedExtensions.entries()];

            let updatedEntries = entries.map(entry => {
                let extension = extensions.get(entry[0]);

                if (extension === undefined) return undefined;

                return [entry[0], extension];
            });

            let filteredEntries = updatedEntries.filter(entry => entry !== undefined) as [string, Extension][];

            this.installedExtensions = new Map(filteredEntries);
            localStorage.setItem("Installed Extensions", JSON.stringify(Object.fromEntries(filteredEntries)));

            let order = Navbar.GetNavbarOrder();
            order.filter(index => index < Navbar.defaultPages.length + filteredEntries.length);
            Navbar.SetNavbarOrder(order);
        });

        Site.ListenForDark(dark => {
            let extensions = document.querySelectorAll("extension-page") as NodeListOf<ExtensionPage>;

            for (let extension of extensions) {
                extension.PostMessage({
                    command: "Set Dark",
                    data: {
                        dark: dark
                    }
                });
            }
        });

        Site.ListenForHue(hue => {
            let extensions = document.querySelectorAll("extension-page") as NodeListOf<ExtensionPage>;
            for (let extension of extensions) {
                extension.PostMessage({
                    command: "Set Hue",
                    data: {
                        hue: hue
                    }
                });
            }
        });

        window.addEventListener("message", async e => {
            let origin = e.origin;

            if (!this.GetExtensionOrigins().includes(origin)) return;

            let result = await this.HandleCommand(e);

            if (result !== undefined && "command" in result) {
                e.source?.postMessage(result, {
                    targetOrigin: origin
                });
            }
        });
    }

    private static async HandleCommand(e: MessageEvent) {
        let command = e.data.command;
        let data = e.data.data;

        if (command == "Initialise") {
            return {
                command: "Initialise",
                data: {
                    dark: Site.dark,
                    hue: Site.hue,
                    version: (await Site.GetMetadataNow())?.version
                }
            }
        }

        if (command == "Get Resource") {
            let listeners = this._resourceListeners.get(data.name);

            let firstTime = false;

            if (listeners === undefined) {
                firstTime = true;
                listeners = [];
            }

            listeners.push(e);

            this._resourceListeners.set(data.name, listeners);

            if (firstTime) {
                Resources.GetResource(data.name, resource => {
                    let listeners = this._resourceListeners.get(data.name) ?? [];

                    for (let listener of listeners) {
                        listener.source?.postMessage({
                            command: "Resource",
                            data: {
                                name: data.name,
                                resource: resource
                            }
                        }, {
                            targetOrigin: listener.origin
                        });
                    }
                });
            }

            let resource = await Resources.GetResourceNow(data.name);

            return {
                command: "Resource",
                data: {
                    name: data.name,
                    resource: resource
                }
            }
        }

        if (command == "Get Token") {
            let token = await Resources.GetToken();

            return {
                command: "Token",
                data: token?.access_token ?? null
            }
        }

        if (command == "Refresh Token") {
            let fetchedResources = await Resources.FetchResources();

            if (!fetchedResources)
                return {
                    command: "Refreshed Token",
                    data: null
                }

            let token = await Resources.GetToken();

            return {
                command: "Refreshed Token",
                data: token?.access_token ?? null
            }
        }

        if (command == "Show Notification") {
            if (data.loader && typeof data.id !== "string") return;

            let notification = Site.ShowNotification(data.content, data.loader ?? false);
            notification.id = data.id;

            let ids = this.extensionNotificationIds.get(e.origin) ?? [];
            ids.push(notification.id);

            this.extensionNotificationIds.set(e.origin, ids);

            return;
        }

        if (command == "Close Notification") {
            let notification = document.getElementById(data.id) as InlineNotification | null;

            if (notification !== null) {
                notification.Close();

                let ids = this.extensionNotificationIds.get(e.origin);

                if (ids !== undefined) {
                    ids.slice(ids.indexOf(data.id), 1);
                    this.extensionNotificationIds.set(e.origin, ids);
                }
            }

            return;
        }

        if (command == "Register Skin") {
            let cache = await caches.open(SKIN_CACHE);

            let promises: Promise<void>[] = [];

            if (typeof data.css === "string") {
                promises.push(cache.put("skin.css", new Response(data.css, {
                    headers: {
                        "Content-Type": "text/css"
                    }
                })).then(() => {
                    document.getElementById("skin")?.remove();

                    let newSkin = document.createElement("style");
                    newSkin.id = "skin";
                    newSkin.textContent = data.css;

                    document.body.append(newSkin);
                }));
            }

            try {
                for (let icon of data.icons.entries()) {
                    if (typeof icon[1] === "string") {
                        promises.push(cache.put(icon[0], new Response(icon[1], {
                            headers: {
                                "Content-Type": "image/svg+xml"
                            }
                        })));
                    }
                }
            }
            catch(e) { }

            await Promise.all(promises);

            location.reload();
        }

        if (command == "Ping") {
            return {
                command: "Pong"
            }
        }

        return {
            command: "Unknown Command",
            data: {
                command: command
            }
        }
    }
}