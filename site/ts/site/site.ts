import { Extensions } from "./extensions";

import { Callbacks, Callback } from "./callback";

import { Page as PageElement } from "../elements/page/page";
import { ExtensionPage } from "../elements/extensions/extensions";

export type Page = {
    page: string,
    extension: boolean
};

export class Site {
    static page: Page = {
        page: "",
        extension: false
    };

    static dark: boolean = localStorage.getItem("Dark") == "true";
    static hue: number = parseFloat(localStorage.getItem("Hue") || "200");

    private static _navigationListeners = new Callbacks<[Page]>();

    private static _pageElement: PageElement | null = null;

    private static _darkCallbacks = new Callbacks<[boolean]>();
    private static _hueCallbacks = new Callbacks<[number]>();

    //#region Navigation
    static navigateTo(page: Page): void {
        if (page.extension) {
            let extension = Extensions.installedExtensions.get(page.page);

            if (extension !== undefined) {
                let newPage = document.getElementById(`extension-${page.page}`) as PageElement;

                if (newPage == null) {
                    let extensionPage: ExtensionPage = document.createElement("extension-page") as ExtensionPage;
                    extensionPage.src = extension.url;
                    extensionPage.id = `extension-${page.page}`;

                    document.querySelector("main")?.appendChild(extensionPage);

                    newPage = extensionPage;
                }

                this.setPage(page, newPage);
            }
        }
        else this.setPage(page, document.getElementById(page.page) as PageElement);
    }

    static onNavigate(callback: Callback<[Page]>) {
        this._navigationListeners.add(callback);
        callback(this.page);
    }

    private static setPage(page: Page, element: PageElement | null) {
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

        this._navigationListeners.invoke(page);
    }
    //#endregion

    //#region Theming
    static setDark(dark: boolean): void {
        this.dark = dark;

        document.documentElement.classList.toggle("dark", dark);

        localStorage.setItem("Dark", dark.toString());

        this._darkCallbacks.invoke(dark);
    }

    static onDarkChange(callback: Callback<[boolean]>) {
        this._darkCallbacks.add(callback);
        callback(this.dark);
    }

    static setHue(hue: number): void {
        document.documentElement.style.setProperty("--main-hue", hue.toString());
        document.documentElement.style.setProperty("--hue-rotate", `${hue - 200}deg`);

        this.hue = hue;
    }

    static saveHue() {
        localStorage.setItem("Hue", this.hue.toString());

        this._hueCallbacks.invoke(this.hue);
    }

    static onHueChange(callback: Callback<[number]>) {
        this._hueCallbacks.add(callback);
        callback(this.hue);
    }
    //#endregion
}