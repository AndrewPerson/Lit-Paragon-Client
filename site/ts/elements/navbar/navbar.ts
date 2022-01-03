import { LitElement, html, TemplateResult } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";

import { Site } from "../../site";

import "./navitem";
import { NavItem } from "./navitem";

//@ts-ignore
import navbarCss from "./navbar.css";

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
    itemsContainer: HTMLDivElement;

    @query("#top-shadow", true)
    topShadow: HTMLDivElement;

    @query("#bottom-shadow", true)
    bottomShadow: HTMLDivElement;

    @query("#left-shadow", true)
    leftShadow: HTMLDivElement;

    @query("#right-shadow", true)
    rightShadow: HTMLDivElement;

    pages: string[] = [];
    icons: string[] = [];
    order: number[] = [];

    draggedNavItemIndex: number = 0;

    constructor() {
        super();

        matchMedia("(max-aspect-ratio: 1/1)").onchange = this.ShowShadows.bind(this);
    }

    SetDraggedNavItemIndex(e: DragEvent) {  
        //Not always guaranteed to be a NavItem
        var target = e.target as NavItem;

        if (!target.editing) return;
        if (target.dataset.index === undefined) return;

        this.draggedNavItemIndex = parseInt(target.dataset.index);

        if (e.dataTransfer) e.dataTransfer.effectAllowed = "copyLink";
        e.dataTransfer?.setData("Text", target.id);
    }

    ReorderNavItems(e: DragEvent) {
        //Not always guaranteed to be a NavItem
        var target = e.target as NavItem;

        if (!target.editing) return;
        if (target.dataset.index === undefined) return;

        var newIndex = parseInt(target.dataset.index);

        this.order.splice(newIndex, 0, this.order.splice(this.draggedNavItemIndex, 1)[0]);

        this.draggedNavItemIndex = newIndex;

        Site.SetNavbarOrder(this.order);
    }

    GetNavItem: (order: number, index: number) => TemplateResult<1> = ((order: number, index: number) => {
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
            <nav-item ?editing="${this.editing}" pageName="${page}" ?extension="${extension}" title="${title}" 
                      @dragstart="${this.SetDraggedNavItemIndex}" @dragenter="${this.ReorderNavItems}" @dragover="${(e: DragEvent) => e.preventDefault()}"
                      data-index="${index}">
                <img draggable="false" src="${icon}">
            </nav-item>
        `;
    }).bind(this);

    ShowShadows(): void {
        //This function can be called before the element is fully initialised.
        //This stops it from running if that happens.
        if (!this.shadowRoot) return;

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
            this.itemsContainer.classList.add("hover");
        });

        root.addEventListener("pointerup", () => {
            this.itemsContainer.classList.remove("hover");
        });

        return root;
    }

    firstUpdated() {
        this.itemsContainer.addEventListener("scroll", this.ShowShadows.bind(this));
    }

    updated() {
        for (var navItem of this.shadowRoot?.querySelectorAll("nav-item") as NodeListOf<NavItem>) {
            navItem.requestUpdate();
        }
    }

    render() {
        this.order = Site.GetNavbarOrder();

        var extensions = Site.GetInstalledExtensions();

        this.pages = Object.keys(extensions);
        this.icons = this.pages.map(key => Site.GetExtensionNavIconURL(extensions[key]));

        var mobile = window.innerWidth <= window.innerHeight;
        var vmin = mobile ? window.innerWidth / 100 : window.innerHeight / 100;
        var scrollable = this.order.length * 12 * vmin > window.innerHeight;

        return html`
        <div id="items-container">
            ${repeat(this.order, this.GetNavItem)}
        
            <div id="top-shadow" style="display: none"></div>
            <div id="bottom-shadow" style="${!mobile && scrollable ? "" : "display: none"}"></div>
            <div id="left-shadow" style="display: none"></div>
            <div id="right-shadow" style="${mobile && scrollable ? "" : "display: none"}"></div>
        </div>
        `;
    }
}