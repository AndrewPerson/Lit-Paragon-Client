import { ExtensionPage } from "./elements/extensions/extensions";
import { Navbar } from "./elements/navbar/navbar";

export declare const RESOURCE_CACHE: string;
export declare const SERVER_ENDPOINT: string;
declare const MAX_REFRESH_FREQUENCY: number;

type Extension = {
    url: string,
    navIcon: string,
    version: string
};

type Extensions = {
    [index:string]: Extension
};

export type Page = {
    page: string,
    extension: boolean
};

type ResourceCallbacks = {
    [index: string]: ((resource: any) => any)[]
};

type ResourceResult = {
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

type DarkCallback = (dark: boolean) => any;

export class Site {
    static page: Page = {
        page: "dailytimetable",
        extension: false
    };

    static dark: boolean = false;
    static hue: string = "200";

    private static pageElement: HTMLElement | null = null;

    private static resourceCallbacks: ResourceCallbacks = {};
    private static darkCallbacks: DarkCallback[] = [];

    //#region Navigation
    static NavigateTo(page: Page): void {
        if (page.extension) {
            var extensions = this.GetInstalledExtensions();

            if (Object.keys(extensions).indexOf(page.page) != -1) {
                var newPage = document.getElementById(`extension-${page.page}`);

                if (newPage) this.SetPage(page, newPage);
                else {
                    var extensionPage: ExtensionPage = document.createElement("extension-page") as ExtensionPage;
                    extensionPage.src = extensions[page.page].url;
                    extensionPage.id = `extension-${page.page}`;

                    document.getElementById("pages-container")?.appendChild(extensionPage);
                }
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
            this.ShowLoginPopup();
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
                for (var callback of this.resourceCallbacks[name])
                    callback(resource);
            }));
        });

        await Promise.all(promises);
    }

    static async SetResource(name: string, resource: string) {
        var cache = await caches.open(RESOURCE_CACHE);
        await cache.put(name, new Response(resource));

        if (name in this.resourceCallbacks) {
            for (var callback of this.resourceCallbacks[name])
                callback(resource);
        }
    }

    static async GetResource(name: string, callback: (resource: any) => any): Promise<void> {
        if (name in this.resourceCallbacks)
            this.resourceCallbacks[name].push(callback);
        else
            this.resourceCallbacks[name] = [callback];
        
        var cache = await caches.open(RESOURCE_CACHE);
        var response = await cache.match(name);

        if (response) {
            var resource = await response.json();
            if (resource !== undefined && resource !== null)
                callback(resource);
        }
    }

    static async FetchResources(): Promise<boolean> {
        var { valid, token } = await this.GetToken();

        if (!valid) return false;

        var serverUrl = new URL(SERVER_ENDPOINT);
        serverUrl.searchParams.append("token", JSON.stringify(token));

        var resourceResponse = await fetch(serverUrl.toString());

        //TODO Add more granular error handling
        if (!resourceResponse.ok) {
            this.ShowLoginPopup();
            return false;
        }

        var resourceResult: ResourceResult = await resourceResponse.json();

        var cache = await caches.open(RESOURCE_CACHE);
        
        await cache.put("Token", new Response(resourceResult.token as any));
        
        var putPromises = [];
        for (var key of Object.keys(resourceResult.result)) {
            putPromises.push(cache.put(key, new Response(resourceResult.result[key])));
        }

        await Promise.all(putPromises);

        return true;
    }
    //#endregion

    static GetInstalledExtensions(): Extensions {
        return JSON.parse(localStorage.getItem("Installed Extensions") as string) || {};
    }

    static ShowLoginPopup() {
        document.body.appendChild(document.createElement("login-popup"));
    }

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

if (location.hash)
    Site.NavigateTo({
        page: location.hash.substring(1),
        extension: location.hash.indexOf("extension-") == 1
    });

Site.dark = localStorage.getItem("Dark") == "true";
Site.hue = localStorage.getItem("Hue") || "200";

//This is to stop people who refresh a lot from spamming the server with requests.
//Session Storage is persisted through reloads, but is cleared once the tab is closed.
var lastReloadedText = sessionStorage.getItem("Last Reloaded");

if (lastReloadedText) {
    var lastReloaded = new Date(lastReloadedText);

    if ((new Date() as any - (lastReloaded as any)) > MAX_REFRESH_FREQUENCY) {
        Site.FetchResources();
        sessionStorage.setItem("Last Refreshed", new Date().toISOString());
    }
}
else Site.FetchResources();