import { html, LitElement } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { map } from "lit/directives/map.js";

import { Site } from "../../site/site";
import { Extensions, Extension } from "../../site/extensions";

import "./navitem";

//@ts-ignore
import navbarCss from "./navbar.css";

@customElement("nav-bar")
export class Navbar extends LitElement {
    static styles = [navbarCss];

    static defaultPages = [
        { page: "daily-timetable", title: "Daily Timetable", icon: "images/dailytimetable.svg", extension: false },
        { page: "barcode", title: "ID Barcode", icon: "images/barcode.svg", extension: false },
        { page: "timetable", title: "Timetable", icon: "images/timetable.svg", extension: false },
        { page: "announcements", title: "Announcements", icon: "images/announcements.svg", extension: false },
        { page: "pages", title: "Pages Marketplace", icon: "images/marketplace.svg", extension: false },
        { page: "settings", title: "Settings", icon: "images/settings.svg", extension: false },
    ];

    @property({ type: Array })
    order: string[] = Navbar.defaultPages.map((page) => page.page);

    @query("#items-container", true)
    itemsContainer: HTMLDivElement;

    @query("#top-shadow", true)
    topShadow: HTMLDivElement;

    @query("#bottom-shadow", true)
    bottomShadow: HTMLDivElement;

    @query("#left-shadow", true)
    leftShadow: HTMLDivElement;

    @query("#right-shadow", true)
    rightShadow: HTMLDivElement;

    mobileMediaQuery: MediaQueryList = matchMedia("(max-aspect-ratio: 1/1)");

    constructor() {
        super();

        this.addEventListener("pointerdown", this.showScrollBar.bind(this));
        this.addEventListener("pointerup", this.hideScrollBar.bind(this));

        Site.onNavigate(_ => this.requestUpdate());
        Extensions.onInstalledExtensionsChanged(_ => this.requestUpdate());

        //Because sometimes addEventListener is undefined.
        //TODO Find out why
        this.mobileMediaQuery.addEventListener?.("change", this.showScrollShadows.bind(this));
    }

    showScrollBar() {
        this.itemsContainer.classList.add("scroll");
    }

    hideScrollBar() {
        this.itemsContainer.classList.remove("scroll");
    }

    showScrollShadows() {
        //This function can be called before the element is fully initialised.
        //This stops it from running if that happens.
        if (this.shadowRoot == null) return;

        if (window.innerWidth <= window.innerHeight) {
            this.topShadow.style.display = "none";
            this.bottomShadow.style.display = "none";

            if (this.itemsContainer.scrollLeft == 0)
                this.leftShadow.style.display = "none";
            else
                this.leftShadow.style.removeProperty("display");

            if (this.itemsContainer.scrollLeft >= this.itemsContainer.scrollWidth - this.itemsContainer.clientWidth - 1)
                this.rightShadow.style.display = "none";
            else
                this.rightShadow.style.removeProperty("display");
        }
        else {
            this.leftShadow.style.display = "none";
            this.rightShadow.style.display = "none";

            if (this.itemsContainer.scrollTop == 0)
                this.topShadow.style.display = "none";
            else
                this.topShadow.style.removeProperty("display");

            if (this.itemsContainer.scrollTop >= this.itemsContainer.scrollHeight - this.itemsContainer.clientHeight - 1)
                this.bottomShadow.style.display = "none";
            else
                this.bottomShadow.style.removeProperty("display");
        }
    }

    render() {
        const extensions = Extensions.installedExtensions;

        let pages = [...Navbar.defaultPages];
        const lastPage = pages.pop()!;

        for (const key of extensions.keys()) {
            pages.push({
                page: key,
                title: key,
                icon: Extensions.getExtensionNavIconURL(extensions.get(key) as Extension),
                extension: true,
            });
        }

        pages.push(lastPage);

        const mobile = this.mobileMediaQuery.matches;
        const vmin = mobile ? window.innerWidth / 100 : window.innerHeight / 100;
        const scrollable = (extensions.size + 5) * 12 * vmin > window.innerHeight;

        return html`
        <div id="items-container" @scroll="${this.showScrollShadows.bind(this)}">
            ${map(pages, page => html`
            <nav-item page="${page.page}" title="${page.title}" ?extension="${page.extension}"
                      class="${Site.page.page == page.page && Site.page.extension == page.extension ? "selected" : ""}">
                <img draggable="false" src="${page.icon}" alt="">
            </nav-item>
            `)}

            <div id="top-shadow" style="display: none"></div>
            <div id="bottom-shadow" style="${!mobile && scrollable ? "" : "display: none"}"></div>
            <div id="left-shadow" style="display: none"></div>
            <div id="right-shadow" style="${mobile && scrollable ? "" : "display: none"}"></div>
        </div>
        `;
    }
}