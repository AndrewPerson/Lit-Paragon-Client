import { Site } from "./site";
import { Resources } from "./resources";
import { Navbar } from "../elements/navbar/navbar";

declare const METADATA_CACHE: string;

export type Extension = {
    navIcon: string,
    url: string,
    preview: boolean,
    description: string,
    icon: string,
    version: string
};

export type ExtensionCallback = (extension: Map<string, Extension>) => any;

export class Extensions {
    static get installedExtensions() {
        return this._installedExtensions;
    }

    static set installedExtensions(value: Map<string, Extension>) {
        this._installedExtensions = value;
        this.extensionOrigins = this.GetExtensionOrigins(value);
    }

    private static _installedExtensions: Map<string, Extension> = new Map(Object.entries(JSON.parse(localStorage.getItem("Installed Extensions") || "{}")));

    static extensionOrigins: string[] = this.GetExtensionOrigins(this._installedExtensions);

    private static _extensionCallbacks: ExtensionCallback[] = [];

    static GetExtensionOrigins(extensions: Map<string, Extension>) {
        let origins: string[] = [];

        for (let extension of extensions.values())
            origins.push(new URL(extension.url).origin);

        return origins;
    }

    static async HandleCommand(command: string, data: any, source: MessageEventSource | null) {
        if (command == "Get Resource") {
            return new Promise(resolve => {
                let resolved = false;

                Resources.GetResource(data.name, async resource => {
                    if (resolved) {
                        source?.postMessage({
                            command: "Resource",
                            data: {
                                resource: resource
                            }
                        });

                        return;
                    }

                    resolved = true;

                    resolve({
                        command: "Resource",
                        data: {
                            resource: resource
                        }
                    });
                });
            });
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

        return {
            command: "Unknown Command",
            data: {
                command: command,
            }
        }
    }

    static async InstallExtension(extensionName: string) {
        let extension = (await this.GetExtensionsNow()).get(extensionName);

        if (extension) {
            this._installedExtensions.set(extensionName, extension);

            localStorage.setItem("Installed Extensions", JSON.stringify(Object.fromEntries(this._installedExtensions)));

            let order = Navbar.GetNavbarOrder();
            order.splice(order.length - 1, 0, order.length);

            Navbar.SetNavbarOrder(order);
        }
    }

    static async UninstallExtension(extensionName: string) {
        let installedExtensions = Extensions.installedExtensions;

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

        this._installedExtensions.delete(extensionName);

        localStorage.setItem("Installed Extensions", JSON.stringify(Object.fromEntries(this._installedExtensions)));
    }

    static async GetExtensionsNow(): Promise<Map<string, Extension>> {
        let cache = await caches.open(METADATA_CACHE);
        let response = await cache.match("Metadata");

        if (!response) return new Map();

        let extensions: Map<string, Extension> = new Map(Object.entries((await response.json()).pages || {}));

        return extensions;
    }

    static async GetExtensions(callback: ExtensionCallback) {
        this._extensionCallbacks.push(callback);

        callback(await this.GetExtensionsNow());
    }

    static async FireExtensionCallbacks() {
        let extensions = await this.GetExtensionsNow();

        for (let callback of this._extensionCallbacks)
            callback(extensions);
    }

    static GetExtensionIconURL(extension: Extension) {
        let url = new URL(extension.icon, extension.url);
        url.search = `cache-version=${extension.version}`;

        return url.toString();
    }

    static GetExtensionNavIconURL(extension: Extension) {
        let url = new URL(extension.navIcon, extension.url);
        url.search = `cache-version=${extension.version}`;

        return url.toString();
    }

    static AddListeners() {
        Site.ListenForDark(dark => {
            for (let i = 0; i < window.frames.length; i++) {
                let frame = window.frames[i];

                frame.postMessage({
                    command: "Set Dark",
                    data: dark
                }, "*");
            }
        });

        window.addEventListener("message", async e => {
            let origin = e.origin;

            if (!Extensions.extensionOrigins.includes(origin)) return;

            e.source?.postMessage(await Extensions.HandleCommand(e.data.command, e.data.data, e.source));
        });
    }
}