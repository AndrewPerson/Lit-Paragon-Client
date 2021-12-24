import { LitElement, html, TemplateResult } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";

//@ts-ignore
import navbarCss from "./navbar.css";

//@ts-ignore
import Sortable, { AutoScroll } from "sortablejs/modular/sortable.core.esm.js";
Sortable.mount(AutoScroll);

import { Site } from "../../site";

import "./navitem";
import { NavItem } from "./navitem";

type HTML = TemplateResult<1>;
type NavbarSortableEvent = {
    item: NavItem,
    oldIndex: number | undefined,
    newIndex: number | undefined
};

@customElement("nav-bar")
export class Navbar extends LitElement {
    static styles = navbarCss;

    static defaultPages = [
        {
            page: "dailytimetable",
            title: "Daily Timetable",
            icon: "images/dailytimetable.svg"
        },
        {
            page: "barcode",
            title: "ID Barcode",
            icon: "images/barcode.svg"
        },
        {
            page: "timetable",
            title: "Timetable",
            icon: "images/timetable.svg"
        },
        {
            page: "announcements",
            title: "Announcements",
            icon: "images/announcements.svg"
        },
        {
            page: "pages",
            title: "Pages Marketplace",
            icon: "images/marketplace.svg"
        },
        {
            page: "settings",
            title: "Settings",
            icon: "images/settings.svg"
        }
    ];

    @property({ type: Boolean })
    editing: boolean = false;

    @query("#items-container", true)
    itemsContainer: HTMLDivElement | null;

    @query("#top-shadow", true)
    topShadow: HTMLDivElement | null;

    @query("#bottom-shadow", true)
    bottomShadow: HTMLDivElement | null;

    @query("#left-shadow", true)
    leftShadow: HTMLDivElement | null;

    @query("#right-shadow", true)
    rightShadow: HTMLDivElement | null;

    pages: string[] = [];
    icons: string[] = [];
    order: number[] = [0, 1, 2, 3, 4, 5];
    sortable: Sortable = null;

    constructor() {
        super();

        matchMedia("(max-aspect-ratio: 1/1)").onchange = this.ShowShadows.bind(this);
    }

    GetNavItem: (order: number) => HTML = ((order: number): HTML => {
        var page: string;
        var title: string;
        var icon: string;
        var extension: boolean = false;

        if (order < Navbar.defaultPages.length) ({page, title, icon} = Navbar.defaultPages[order]);
        else {
            page = this.pages[order - Navbar.defaultPages.length];
            title = this.pages[order - Navbar.defaultPages.length];
            icon = this.icons[order - Navbar.defaultPages.length];
            extension = true;
        }
        
        return html`
            <nav-item ?editing="${this.editing}" pageName="${page}" ?extension="${extension}" title="${title}">
                <img draggable="false" src="${icon}">
            </nav-item>
        `;
    }).bind(this);

    ShowShadows(): void {
        //This function can be called before the element is fully initialised.
        //This stops it from running if that happens.
        if (!this.shadowRoot || !this.topShadow
            || !this.bottomShadow || !this.leftShadow
            || !this.rightShadow || !this.itemsContainer) return;

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

    createRenderRoot() {
        var root = super.createRenderRoot();

        root.addEventListener("pointerdown", () => {
            this.itemsContainer?.classList.add("hover");
        });

        root.addEventListener("pointerup", () => {
            this.itemsContainer?.classList.remove("hover");
        });

        return root;
    }

    firstUpdated() {
        this.itemsContainer?.addEventListener("scroll", this.ShowShadows.bind(this));
    
        this.sortable = new Sortable(this.itemsContainer, {
            group: "nav-items",
            sort: true,
            disabled: !this.editing,
            draggable: "nav-item",
            handle: "#handle",

            ghostClass: "selected",
            dragClass: "drag",

            fallbackOnBody: true,
            
            onEnd: (e: NavbarSortableEvent) => {
                if (Site.page == e.item.page) e.item.classList.add("selected");

                if (e.oldIndex === undefined || e.newIndex === undefined) return;

                var order = this.order.splice(e.oldIndex, 1)[0];
                this.order.splice(e.newIndex, 0, order);

                localStorage.setItem("Nav Order", JSON.stringify(this.order));

                this.requestUpdate();
            }
        });
    }

    updated() {
        for (var navItem of this.shadowRoot?.querySelectorAll("nav-item") as NodeListOf<NavItem>) {
            navItem.requestUpdate();
        }
    }

    render() {
        var order = localStorage.getItem("Nav Order");

        if (order)
            this.order = JSON.parse(order);

        var extensions = Site.GetInstalledExtensions();

        this.pages = Object.keys(extensions);
        this.icons = this.pages.map(key => {
            var url = new URL(extensions[key].url);
            url.pathname = extensions[key].navIcon;
            url.search = `cache-version=${extensions[key].version}`;

            return url.toString();
        });

        var mobile = window.innerWidth <= window.innerHeight;
        var vmin = mobile ? window.innerWidth / 100 : window.innerHeight / 100;
        var scrollable = this.order.length * 12 * vmin > window.innerHeight;

        if (this.sortable != null) this.sortable.option("disabled", !this.editing);

        return html`
        <div id="items-container">
            ${repeat(this.order, (key: number) => key, this.GetNavItem)}
        
            <div id="top-shadow" style="display: none"></div>
            <div id="bottom-shadow" style="${!mobile && scrollable ? "" : "display: none"}"></div>
            <div id="left-shadow" style="display: none"></div>
            <div id="right-shadow" style="${mobile && scrollable ? "" : "display: none"}"></div>
        </div>
        `;
    }
}