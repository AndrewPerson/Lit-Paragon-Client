import { Site } from "./site";
import { Resources } from "./resources";

import { Callbacks, Callback } from "./callback";

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

export class Extensions {
    static installedExtensions: Map<string, Extension> = new Map(Object.entries(JSON.parse(localStorage.getItem("Installed Extensions") || "{}")));

    static _extensionCallbacks: Callbacks<Map<string, Extension>> = new Callbacks();

    static _resourceListeners: Map<string, MessageEvent[]> = new Map();
}

export function GetExtensionOrigins() {
    let origins: string[] = [];

    for (let extension of Extensions.installedExtensions.values())
        origins.push(new URL(extension.url).origin);

    return origins;
}

export async function InstallExtension(extensionName: string) {
    let extension = (await GetExtensionsNow()).get(extensionName);

    if (extension) {
        Extensions.installedExtensions.set(extensionName, extension);

        localStorage.setItem("Installed Extensions", JSON.stringify(Object.fromEntries(Extensions.installedExtensions)));

        let order = Navbar.GetNavbarOrder();
        order.splice(order.length - 1, 0, order.length);

        Navbar.SetNavbarOrder(order);
    }
}

export async function UninstallExtension(extensionName: string) {
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

    Extensions.installedExtensions.delete(extensionName);

    localStorage.setItem("Installed Extensions", JSON.stringify(Object.fromEntries(Extensions.installedExtensions)));
}

export async function GetExtensionsNow(): Promise<Map<string, Extension>> {
    let cache = await caches.open(METADATA_CACHE);
    let response = await cache.match("Metadata");

    if (!response) return new Map();

    let extensions: Map<string, Extension> = new Map(Object.entries((await response.json()).pages || {}));

    return extensions;
}

export async function GetExtensions(callback: Callback<Map<string, Extension>>) {
    Extensions._extensionCallbacks.AddListener(callback);

    callback(await GetExtensionsNow());
}

export async function FireExtensionCallbacks() {
    let extensions = await GetExtensionsNow();

    Extensions._extensionCallbacks.Invoke(extensions);
}

export function GetExtensionIconURL(extension: Extension) {
    let url = new URL(extension.icon, extension.url);
    url.search = `cache-version=${extension.version}`;

    return url.toString();
}

export function GetExtensionNavIconURL(extension: Extension) {
    let url = new URL(extension.navIcon, extension.url);
    url.searchParams.set("cache-version", extension.version);

    return url.toString();
}

export function AddExtensionListeners() {
    Site.ListenForDark(dark => {
        for (let i = 0; i < window.frames.length; i++) {
            let frame = window.frames[i];

            frame.postMessage({
                command: "Set Dark",
                data: {
                    dark: dark
                }
            }, "*");
        }
    });

    Site.ListenForHue(hue => {
        for (let i = 0; i < window.frames.length; i++) {
            let frame = window.frames[i];

            frame.postMessage({
                command: "Set Hue",
                data: {
                    hue: hue
                }
            }, "*");
        }
    })

    window.addEventListener("message", async e => {
        let origin = e.origin;

        if (!GetExtensionOrigins().includes(origin)) return;

        e.source?.postMessage(await HandleCommand(e), {
            targetOrigin: origin
        });
    });

    async function HandleCommand(e: MessageEvent) {
        let command = e.data.command;
        let data = e.data.data;
    
        if (command == "Initialise") {
            return {
                command: "Initialise",
                data: {
                    dark: Site.dark,
                    hue: Site.hue,
                    version: await Site.GetVersion()
                }
            }
        }
    
        if (command == "Get Resource") {
            let listeners = Extensions._resourceListeners.get(data.name);
    
            let firstTime = false;
    
            if (listeners === undefined) {
                firstTime = true;
                listeners = [];
            }
    
            listeners.push(e);
    
            Extensions._resourceListeners.set(data.name, listeners);
    
            if (firstTime) {
                Resources.GetResource(data.name, resource => {
                    let listeners = Extensions._resourceListeners.get(data.name) ?? [];
    
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

            let notification = Site.ShowNotification(data.contents, data.loader ?? false);
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