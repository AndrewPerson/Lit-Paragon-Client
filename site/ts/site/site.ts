import { Extensions, Extension } from "./extensions";

import { Callbacks, Callback } from "./callback";

import { Page as PageElement } from "../elements/page/page";
import { ExtensionPage } from "../elements/extensions/extensions";
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
    static hue: number = parseFloat(localStorage.getItem("Hue") || "200");

    private static _navigationListeners = new Callbacks<Page>();

    private static _pageElement: PageElement | null = null;

    private static _darkCallbacks = new Callbacks<boolean>();
    private static _hueCallbacks = new Callbacks<number>();
    private static _metadataCallbacks = new Callbacks<Metadata | undefined>();

    //#region Navigation
    static NavigateTo(page: Page): void {
        if (page.extension) {
            let extensions = Extensions.installedExtensions;

            if (extensions.has(page.page)) {
                let newPage = document.getElementById(`extension-${page.page}`) as PageElement;

                if (newPage == null) {
                    let extensionPage: ExtensionPage = document.createElement("extension-page") as ExtensionPage;
                    extensionPage.src = (extensions.get(page.page) as Extension).url;
                    extensionPage.id = `extension-${page.page}`;

                    document.querySelector("main")?.appendChild(extensionPage);

                    newPage = extensionPage;
                }

                this.SetPage(page, newPage);
            }
        }
        else this.SetPage(page, document.getElementById(page.page) as PageElement);
    }

    static ListenForNavigation(callback: Callback<Page>) {
        this._navigationListeners.AddListener(callback);
        callback(this.page);
    }

    private static SetPage(page: Page, element: PageElement | null) {
        if (element == null) {
            if (this._pageElement == null) {
                let defaultPage = document.querySelector("main")?.children?.[0] as PageElement | null;

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
        }

        this._pageElement?.requestUpdate?.();

        this._navigationListeners.Invoke(page);
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
        callback(this.dark);
    }

    static SetHue(hue: number): void {
        document.documentElement.style.setProperty("--main-hue", hue.toString());
        document.documentElement.style.setProperty("--hue-rotate", `${hue - 200}deg`);

        this.hue = hue;
    }

    static SaveHue() {
        localStorage.setItem("Hue", this.hue.toString());

        this._hueCallbacks.Invoke(this.hue);
    }

    static ListenForHue(callback: Callback<number>) {
        this._hueCallbacks.AddListener(callback);
        callback(this.hue);
    }
    //#endregion

    static async GetMetadataNow(): Promise<Metadata | undefined> {
        let cache = await caches.open(METADATA_CACHE);
        return await (await cache.match("Metadata"))?.json();
    }

    static async ListenForMetadata(callback: Callback<Metadata | undefined>) {
        this._metadataCallbacks.AddListener(callback);
        callback(await this.GetMetadataNow());
    }

    static async SetMetadata(metadata: Metadata, fireCallbacks: boolean = true) {
        let cache = await caches.open(METADATA_CACHE);
        await cache.put("Metadata", new Response(JSON.stringify(metadata)));

        if (fireCallbacks) this._metadataCallbacks.Invoke(metadata);
    }
}