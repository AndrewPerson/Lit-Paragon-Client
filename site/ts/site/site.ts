import { Extensions, Extension } from "./extensions";

import { ExtensionPage } from "../elements/extensions/extensions";
import { Navbar } from "../elements/navbar/navbar";
import { InlineNotification } from "../elements/notification/notification";

export type Page = {
    page: string,
    extension: boolean
};

export type DarkCallback = (dark: boolean) => any;

export class Site {
    static page: Page = {
        page: "",
        extension: false
    };

    static dark: boolean = localStorage.getItem("Dark") == "true";
    static hue: string = localStorage.getItem("Hue") || "200";

    private static pageElement: HTMLElement | null = null;

    private static darkCallbacks: DarkCallback[] = [];

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
        if (element) {
            if (this.pageElement != null) this.pageElement.classList.add("hidden");

            element.classList.remove("hidden");
            this.pageElement = element;
            
            this.page = page;

            location.hash = page.extension ? `extension-${page.page}` : page.page;

            let navbar: Navbar = document.querySelector("nav-bar") as Navbar;
            navbar.removeAttribute("editing");
            navbar.requestUpdate?.();
        }
    }
    //#endregion

    //#region Notifications
    static ShowNotification(content: HTMLElement | string, loader: boolean = false) {
        let notification = document.createElement("inline-notification") as InlineNotification;

        if (typeof content === "string") notification.innerText = content;
        else notification.appendChild(content);

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

        for (let callback of this.darkCallbacks) {
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