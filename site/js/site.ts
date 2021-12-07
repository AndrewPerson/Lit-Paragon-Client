import { ExtensionPage } from "./elements/extensions/extensions";
import { Navbar } from "./elements/navbar/navbar";

export declare const RESOURCE_CACHE: string;

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

type Callbacks = {
    [index:string]: ((resource: any) => any)[]
};

export class Site {
    static page: Page = {
        page: "dailytimetable",
        extension: false
    };

    static dark: boolean = false;

    private static pageElement: HTMLElement | null = null;

    private static resourceCallbacks: Callbacks = {};

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
    //#endregion

    static GetInstalledExtensions(): Extensions {
        return JSON.parse(localStorage.getItem("Installed Extensions") as string) || {};
    }

    //#region Theming
    static SetDark(dark: boolean): void {
        this.dark = dark;

        document.documentElement.classList.toggle("dark", dark);
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

var dark: boolean = localStorage.getItem("Dark") == "true";
Site.SetDark(dark);