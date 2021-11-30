import { ExtensionPage } from "./extensions/extensions";
import "./loader/loader";
import "./navbar/navbar";

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
}

export class Site {
    static page: Page;

    private static pageElement: HTMLElement;

    static NavigateTo(page: Page): void {
        if (location.pathname != "") location.pathname = "";

        if (page.extension) {
            var extensions = this.GetInstalledExtensions();

            if (Object.keys(extensions).indexOf(page.page) != -1) {
                var newPage = document.getElementById(`extension-${page.page}`);

                if (newPage) this.SetPage(page, newPage);
                else {
                    var extensionPage: ExtensionPage = document.createElement("extension-page") as ExtensionPage;
                    extensionPage.src = extensions[page.page].url;
                    extensionPage.id = `extension-${page.page}`;

                    document.getElementById("pages-container").appendChild(newPage);
                }
            }
        }
        else this.SetPage(page, document.getElementById(page.page));
    }

    private static SetPage(page: Page, element: HTMLElement) {
        if (element) {
            if (this.pageElement) this.pageElement.classList.add("hidden");

            element.classList.remove("hidden");
            this.pageElement = element;
            
            this.page = page;

            location.hash = page.extension ? `extension-${page.page}` : page.page;
        }
    }

    static GetInstalledExtensions(): Extensions {
        return JSON.parse(localStorage.getItem("Installed Extensions")) || {};
    }
}