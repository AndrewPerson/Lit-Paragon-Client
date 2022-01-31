import { Extensions, Extension } from "./extensions";

import { Callbacks, Callback } from "./callback";

import { ExtensionPage } from "../elements/extensions/extensions";
import { Navbar } from "../elements/navbar/navbar";
import { InlineNotification } from "../elements/notification/notification";

declare const METADATA_CACHE: string;

export type Page = {
    page: string,
    extension: boolean
};

export type Metadata = {
    version: string,
    pages: {
        [index: string]: Extension
    };
};

export class Site {
    static page: Page = {
        page: "",
        extension: false
    };

    static dark: boolean = localStorage.getItem("Dark") == "true";
    static hue: string = localStorage.getItem("Hue") || "200";

    private static _pageElement: HTMLElement | null = null;

    private static _darkCallbacks: Callbacks<boolean> = new Callbacks();
    private static _hueCallbacks: Callbacks<number> = new Callbacks();
    private static _metadataCallbacks: Callbacks<Metadata | undefined> = new Callbacks();

    //#region Navigation
    static NavigateTo(page: Page): void {
        if (page.extension) {
            let extensions = Extensions.installedExtensions;

            if (extensions.has(page.page)) {
                let newPage = document.getElementById(`extension-${page.page}`);

                if (newPage === null) {
                    let extensionPage: ExtensionPage = document.createElement("extension-page") as ExtensionPage;
                    extensionPage.src = (extensions.get(page.page) as Extension).url;
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
        if (element === null) {
            if (this._pageElement === null) {
                let defaultPage = (document.querySelector("main")?.children?.[0] as HTMLElement | undefined | null) ?? null;
                
                this.page = {
                    page: defaultPage?.id ?? "",
                    extension: false
                };

                location.hash = this.page.page;
                
                defaultPage?.classList.remove("hidden");

                this._pageElement = defaultPage;
            }
        }
        else {
            if (this._pageElement !== null) this._pageElement.classList.add("hidden");

            element.classList.remove("hidden");
            this._pageElement = element;
            
            this.page = page;

            location.hash = page.extension ? `extension-${page.page}` : page.page;

            if (Navbar.instance !== null) {
                Navbar.instance.editing = false;
                Navbar.instance.requestUpdate();
            }
        }
    }
    //#endregion

    //#region Notifications
    static ShowNotification(content: HTMLElement | string, loader: boolean = false) {
        let notification = document.createElement("inline-notification") as InlineNotification;

        if (!(content instanceof HTMLElement)) {
            let text = document.createElement("p");
            text.textContent = content;
            content = text;
        }

        notification.appendChild(content);
        notification.loader = loader;

        document.getElementById("notification-area")?.appendChild(notification);

        return notification;
    }
    //#endregion

    //#region Theming
    static SetDark(dark: boolean): void {
        this.dark = dark;

        document.documentElement.classList.toggle("dark", dark);

        localStorage.setItem("Dark", dark.toString());

        this._darkCallbacks.Invoke(dark);
    }

    static ListenForDark(callback: Callback<boolean>) {
        this._darkCallbacks.AddListener(callback);
    }

    static SetHue(hue: string): void {
        document.documentElement.style.setProperty("--main-hue", hue);
        document.documentElement.style.setProperty("--hue-rotate", `${parseFloat(hue) - 200}deg`);

        this.hue = hue;
    }

    static SaveHue() {
        localStorage.setItem("Hue", this.hue);

        this._hueCallbacks.Invoke(parseFloat(this.hue));
    }

    static ListenForHue(callback: Callback<number>) {
        this._hueCallbacks.AddListener(callback);
    }
    //#endregion

    static async GetMetadataNow(): Promise<Metadata | undefined> {
        let cache = await caches.open(METADATA_CACHE);
        return await (await cache.match("Metadata"))?.json();
    }

    static async GetMetadata(callback: Callback<Metadata | undefined>) {
        this._metadataCallbacks.AddListener(callback);
        callback(await this.GetMetadataNow());
    }

    static async FireMetadataCallbacks() {
        this._metadataCallbacks.Invoke(await this.GetMetadataNow());
    }
}