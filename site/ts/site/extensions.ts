import { Site } from "./site";
import { Resources } from "./resources";

import { Navbar } from "../elements/navbar/navbar";
import { ExtensionPage } from "../elements/extensions/extensions";

declare const METADATA_CACHE: string;

export type Extension = {
    navIcon: string,
    url: string,
    preview: boolean,
    description: string,
    icon: string,
    version: string
};

export class Extensions {
    static installedExtensions: Map<string, Extension> = new Map(Object.entries(JSON.parse(localStorage.getItem("Installed Extensions") || "{}")));

    static _resourceListeners: Map<string, MessageEvent[]> = new Map();

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
    
        let extensions: Map<string, Extension> = new Map(Object.entries((await response.json()).pages || {}));
    
        return extensions;
    }

    static GetExtensionIconURL(extension: Extension) {
        let url = new URL(extension.icon, extension.url);
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
            let extensions = new Map(Object.entries(metadata?.pages || {}));

            let entries = [...this.installedExtensions.entries()];
            let toUpdate: {
                index: number,
                extension: Extension
            }[] = [];

            entries = entries.filter((entry, index) => {
                if (!extensions.has(entry[0])) return;

                let extension = extensions.get(entry[0]);

                if (extension === undefined) return;

                if (extension.version != entry[1].version) {
                    toUpdate.push({
                        index: index,
                        extension: extension
                    });

                    return true;
                }

                for (let key of Object.keys(extension))
                // @ts-ignore
                    if (extension[key] != entry[1][key])
                        return false;

                return true;
            });

            for (let updateEntry of toUpdate) {
                entries[updateEntry.index][1] = updateEntry.extension;
            }

            this.installedExtensions = new Map(entries);
            localStorage.setItem("Installed Extensions", JSON.stringify(Object.fromEntries(this.installedExtensions.entries())));

            let order = Navbar.GetNavbarOrder();
            order.filter(index => index >= Navbar.defaultPages.length + entries.length);
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
                data: {
                    token: token.token === null ? null : token.token.access_token,
                    valid: token.valid
                }
            }
        }
    
        if (command == "Refresh Token") {
            let fetchedResources = await Resources.FetchResources();
    
            if (!fetchedResources)
                return {
                    command: "Refreshed Token",
                    data: {
                        token: null,
                        valid: false
                    }
                }
    
            let token = await Resources.GetToken();
    
            return {
                command: "Refreshed Token",
                data: {
                    token: token.token === null ? null : token.token.access_token,
                    valid: token.valid
                }
            }
        }

        if (command == "Show Notification") {
            if (data.loader && typeof data.id !== "string") return;

            let notification = Site.ShowNotification(data.content, data.loader ?? false);
            notification.id = data.id;

            return;
        }

        if (command == "Close Notification") {
            let notification = document.getElementById(data.id) as any | null;

            if (notification !== null && "Close" in notification && typeof notification.Close === "function") notification.Close();
        
            return;
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