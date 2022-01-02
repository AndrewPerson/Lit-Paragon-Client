import { ExtensionPage } from "./elements/extensions/extensions";
import { Navbar } from "./elements/navbar/navbar";
import { InlineNotification } from "./elements/notification/notification";

declare const RESOURCE_CACHE: string;
declare const METADATA_CACHE: string;
declare const SERVER_ENDPOINT: string;

export type ExtensionCallback = (extension: Extensions) => any;

export type Extension = {
    navIcon: string,
    url: string,
    preview: boolean,
    description: string,
    icon: string,
    version: string
};

export type Extensions = {
    [index:string]: Extension
};

export type Page = {
    page: string,
    extension: boolean
};

export type ResourceCallback = (resource: any) => any;

export type ResourceResult = {
    result: {
        [index: string]: any
    },
    token: Token
};

export type Token = {
    access_token: string,
    refresh_token: string,
    expiry: Date,
    termination: Date
};

export type DarkCallback = (dark: boolean) => any;

export class Site {
    static page: Page = {
        page: "dailytimetable",
        extension: false
    };

    static dark: boolean = localStorage.getItem("Dark") == "true";
    static hue: string = localStorage.getItem("Hue") || "200";

    private static pageElement: HTMLElement | null = null;

    private static resourceCallbacks: {[index: string]: ResourceCallback[]} = {};
    private static extensionCallbacks: ExtensionCallback[] = [];
    private static darkCallbacks: DarkCallback[] = [];

    //#region Navigation
    static NavigateTo(page: Page): void {
        if (page.extension) {
            var extensions = this.GetInstalledExtensions();

            if (Object.keys(extensions).includes(page.page)) {
                var newPage = document.getElementById(`extension-${page.page}`);

                if (newPage === null) {
                    var extensionPage: ExtensionPage = document.createElement("extension-page") as ExtensionPage;
                    extensionPage.src = extensions[page.page].url;
                    extensionPage.id = `extension-${page.page}`;

                    document.querySelector("main")?.appendChild(extensionPage);

                    newPage = extensionPage;
                }

                this.SetPage(page, newPage);
            }
        }
        else this.SetPage(page, document.getElementById(page.page));
    }

    private static SetPage(page: Page, element: HTMLElement | null) {
        if (element) {
            if (this.pageElement != null) this.pageElement.classList.add("hidden");

            element.classList.remove("hidden");
            this.pageElement = element;
            
            this.page = page;

            location.hash = page.extension ? `extension-${page.page}` : page.page;

            var navbar: Navbar = document.querySelector("nav-bar") as Navbar;
            navbar.removeAttribute("editing");
            navbar.requestUpdate?.();
        }
    }
    //#endregion

    //#region Resources
    static async GetToken(): Promise<{valid: boolean, token: Token | null}> {
        var cache = await caches.open(RESOURCE_CACHE);
        var tokenResponse = await cache.match("Token");

        if (!tokenResponse) {
            location.href = `${location.origin}/login`;
            return {
                valid: false,
                token: null
            };
        }

        var token: Token = await tokenResponse.json();

        if (new Date() > token.termination) {
            this.ShowLoginNotification();
            return {
                valid: false,
                token: null
            };
        }

        return {
            valid: true,
            token: token
        };
    }

    static async SetResources(resources: {name: string, resource: string}[]) {
        var cache = await caches.open(RESOURCE_CACHE);

        var promises: Promise<void>[] = [];

        resources.forEach(resourceGroup => {
            var name = resourceGroup.name;
            var resource = resourceGroup.resource;

            promises.push(cache.put(name, new Response(resource)).then(() => {
                if (name in this.resourceCallbacks)
                    for (var callback of this.resourceCallbacks[name])
                        callback(JSON.parse(resource));
            }));
        });

        await Promise.all(promises);
    }

    static async SetResource(name: string, resource: string) {
        var cache = await caches.open(RESOURCE_CACHE);
        await cache.put(name, new Response(resource));

        if (name in this.resourceCallbacks)
            for (var callback of this.resourceCallbacks[name])
                callback(JSON.parse(resource));
    }

    static async GetResource(name: string, callback: ResourceCallback): Promise<void> {
        if (name in this.resourceCallbacks)
            this.resourceCallbacks[name].push(callback);
        else
            this.resourceCallbacks[name] = [callback];
        
        var cache = await caches.open(RESOURCE_CACHE);
        var response = await cache.match(name);

        if (response) {
            var resource = await response.json();
            callback(resource);
        }
        else callback(undefined);
    }

    static async GetResourceNow(name: string): Promise<any> {
        var cache = await caches.open(RESOURCE_CACHE);
        var response = await cache.match(name);

        if (response) return await response.json();
        else return undefined;
    }

    static async FetchResources(): Promise<boolean> {
        var { valid, token } = await this.GetToken();

        if (!valid) return false;

        var serverUrl = new URL(SERVER_ENDPOINT + "/resources");
        serverUrl.searchParams.append("token", JSON.stringify(token));

        var resourceResponse = await fetch(serverUrl.toString());

        //TODO Add more granular error handling
        if (!resourceResponse.ok) {
            this.ShowLoginNotification();
            return false;
        }

        var resourceResult: ResourceResult = await resourceResponse.json();

        var cache = await caches.open(RESOURCE_CACHE);
        
        await cache.put("Token", new Response(JSON.stringify(resourceResult.token)));

        await this.SetResources(Object.keys(resourceResult.result).map(key => {
            return {
                name: key,
                resource: JSON.stringify(resourceResult.result[key])
            };
        }));

        return true;
    }
    //#endregion

    //#region Extensions
    static GetInstalledExtensions(): Extensions {
        return JSON.parse(localStorage.getItem("Installed Extensions") || "{}");
    }

    static SetInstalledExtensions(extensions: Extensions) {
        localStorage.setItem("Installed Extensions", JSON.stringify(extensions));

        (document.querySelector("nav-bar") as Navbar).requestUpdate();
    }

    static async GetExtensionsNow() {
        var cache = await caches.open(METADATA_CACHE);
        var response = await cache.match("Metadata");

        if (!response) return {};

        return (await response.json()).pages || {};
    }

    static async GetExtensions(callback: ExtensionCallback) {
        this.extensionCallbacks.push(callback);

        var extensions = await this.GetExtensionsNow();
        callback(extensions);
    }

    static async FireExtensionCallbacks() {
        var extensions = await this.GetExtensionsNow();

        for (var callback of this.extensionCallbacks)
            callback(extensions);
    }

    static GetExtensionIconURL(extension: Extension) {
        var url = new URL(extension.icon, extension.url);
        url.search = `cache-version=${extension.version}`;

        return url.toString();
    }

    static GetExtensionNavIconURL(extension: Extension) {
        var url = new URL(extension.navIcon, extension.url);
        url.search = `cache-version=${extension.version}`;

        return url.toString();
    }
    //#endregion

    //#region Navbar Order
    static GetNavbarOrder(): number[] {
        return JSON.parse(localStorage.getItem("Nav Order") || "[0, 1, 2, 3, 4, 5]");
    }

    static SetNavbarOrder(order: number[]) {
        localStorage.setItem("Nav Order", JSON.stringify(order));

        (document.querySelector("nav-bar") as Navbar).requestUpdate();
    }
    //#endregion

    //#region Notifications
    static ShowNotification(content: HTMLElement | string, loader: boolean = false) {
        var notification = document.createElement("inline-notification") as InlineNotification;

        if (typeof content === "string") notification.innerText = content;
        else notification.appendChild(content);

        notification.loader = loader;

        document.getElementById("notification-area")?.appendChild(notification);

        return notification;
    }

    static ShowLoginNotification() {
        var content = document.createElement("p");
        content.innerHTML = `You need to <a>login</a> to see the latest information.`

        this.ShowNotification(content);
    }
    //#endregion

    //#region Theming
    static SetDark(dark: boolean): void {
        this.dark = dark;

        document.documentElement.classList.toggle("dark", dark);

        for (var callback of this.darkCallbacks) {
            callback(dark);
        }
    }

    static ListenForDark(callback: DarkCallback) {
        this.darkCallbacks.push(callback);
    }

    static SetColour(hue: string): void {
        document.documentElement.style.setProperty("--main-hue", hue);
        document.documentElement.style.setProperty("--hue-rotate", `${parseFloat(hue) - 200}deg`);
    }
    //#endregion
}