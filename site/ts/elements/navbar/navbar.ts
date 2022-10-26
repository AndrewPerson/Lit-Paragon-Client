import { html, unsafeCSS, LitElement } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";

import { Extensions, Extension } from "../../site/extensions";

import "./navitem";
import { NavItem } from "./navitem";
import "./dragged-navitem";
import { DraggedNavItem } from "./dragged-navitem";

//@ts-ignore
import navbarCss from "./navbar.css";

declare const SKIN_CSS: string;

@customElement("nav-bar")
export class Navbar extends LitElement {
    static styles = [navbarCss, unsafeCSS(SKIN_CSS ?? "")];

    static defaultPages = [
        {
            page: "daily-timetable",
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

    mobileMediaQuery: MediaQueryList = matchMedia("(max-aspect-ratio: 1/1)");

    draggedItemIndex: number = 0;
    draggedItem: DraggedNavItem | null = null;
    draggedItemOffsetX: number = 0;
    draggedItemOffsetY: number = 0;

    hoveredElement: NavItem | null = null;

    static GetNavbarOrder(): number[] {
        return JSON.parse(localStorage.getItem("Nav Order") || "[0, 1, 2, 3, 4, 5]");
    }

    static SetNavbarOrder(order: number[], update: boolean = true) {
        localStorage.setItem("Nav Order", JSON.stringify(order));
        if (update) this.instance?.requestUpdate();
    }

    static instance: Navbar | null;

    constructor() {
        super();

        Navbar.instance = this;

        this.addEventListener("pointerdown", this.SetDraggedItem.bind(this));
        this.addEventListener("pointerdown", this.ShowScrollBar.bind(this));
        this.addEventListener("pointerup", this.HideScrollBar.bind(this));
        document.addEventListener("pointermove", this.DragElement);
        document.addEventListener("pointerup", this.StopDrag);

        //Because sometimes addEventListener is undefined.
        //TODO Find out why
        this.mobileMediaQuery.addEventListener?.("change", this.ShowScrollShadows.bind(this));
    }

    disconnectedCallback() {
        document.removeEventListener("pointermove", this.DragElement);
        document.removeEventListener("pointerup", this.StopDrag);
    }

    ShowScrollBar() {
        this.itemsContainer.classList.add("scroll");
    }

    HideScrollBar() {
        this.itemsContainer.classList.remove("scroll");
    }

    ShowScrollShadows() {
        //This function can be called before the element is fully initialised.
        //This stops it from running if that happens.
        if (this.shadowRoot === null) return;

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

    GetNavItemAtLocation(x: number, y: number): NavItem | null {
        let element = this.shadowRoot?.elementFromPoint(x, y);

        if (element === undefined || element === null) return null;

        while (element.tagName !== "NAV-ITEM") {
            if (element.parentElement === null) return null;

            element = element.parentElement;
        }

        return element as NavItem;
    }

    SetDraggedItem(e: PointerEvent) {
        if (!this.editing) return;

        let element = this.GetNavItemAtLocation(e.clientX, e.clientY);
        if (element === null) return;

        this.draggedItemIndex = element.childIndex;

        let clone = document.createElement("dragged-nav-item") as DraggedNavItem;
        clone.innerHTML = element.innerHTML;
        document.documentElement.appendChild(clone);

        this.draggedItem = clone;

        let rect = element.getBoundingClientRect();

        this.draggedItemOffsetX = rect.left - e.clientX;
        this.draggedItemOffsetY = rect.top - e.clientY;

        e.preventDefault();
    }

    DragElement = ((e: PointerEvent) => {
        if (!this.editing) return;
        if (this.draggedItem == null) return;

        this.draggedItem.style.left = `${e.clientX + this.draggedItemOffsetX}px`;
        this.draggedItem.style.top = `${e.clientY + this.draggedItemOffsetY}px`;

        e.preventDefault();

        let element = this.GetNavItemAtLocation(e.clientX, e.clientY);
        if (element === null) return;

        if (this.hoveredElement !== element) {
            if (this.hoveredElement !== null) this.hoveredElement.hovered = false;

            element.hovered = true;
            this.hoveredElement = element;

            this.ReorderNavItems(element.childIndex);
        }
    }).bind(this);

    StopDrag = ((e: PointerEvent) => {
        if (this.draggedItem !== null) {
            this.draggedItem.remove();
            this.draggedItem = null;
        }

        if (this.hoveredElement !== null) {
            this.hoveredElement.hovered = false;
            this.hoveredElement = null;
        }

        e.preventDefault();
    }).bind(this);

    ReorderNavItems(newIndex: number) {
        let order = Navbar.GetNavbarOrder();
        order.splice(newIndex, 0, order.splice(this.draggedItemIndex, 1)[0]);

        this.draggedItemIndex = newIndex;

        Navbar.SetNavbarOrder(order);
    }

    GetNavItem = ((index: number, order: number[], pages: string[], icons: string[]) => {
        let page: string;
        let title: string;
        let icon: string;
        let extension: boolean = false;

        let orderNumber = order[index];

        if (orderNumber < Navbar.defaultPages.length) ({page, title, icon} = Navbar.defaultPages[orderNumber]);
        else {
            page = pages[orderNumber - Navbar.defaultPages.length];
            title = pages[orderNumber - Navbar.defaultPages.length];
            icon = icons[orderNumber - Navbar.defaultPages.length];
            extension = true;
        }

        return html`
            <nav-item ?editing="${this.editing}" page="${page}" ?extension="${extension}" title="${title}" childIndex="${index}">
                <img draggable="false" src="${icon}" alt="">
            </nav-item>
        `;
    }).bind(this);

    updated() {
        for (let navItem of this.shadowRoot?.querySelectorAll("nav-item") as NodeListOf<NavItem>)
            navItem.requestUpdate();
    }

    render() {
        let order = Navbar.GetNavbarOrder();

        let extensions = Extensions.installedExtensions;

        if (order.length >= Navbar.defaultPages.length + extensions.size) {
            for (let i = order.length - 1; i >= 0; i--) {
                if (order[i] >= extensions.size + Navbar.defaultPages.length)
                    order.splice(i, 1);
            }

            Navbar.SetNavbarOrder(order, false);
        }

        let pages: string[] = [];
        let icons: string[] = [];
        for (let key of extensions.keys()) {
            pages.push(key);
            icons.push(Extensions.GetExtensionNavIconURL(extensions.get(key) as Extension));
        }

        let mobile = this.mobileMediaQuery.matches;
        let vmin = mobile ? window.innerWidth / 100 : window.innerHeight / 100;
        let scrollable = order.length * 12 * vmin > window.innerHeight;

        return html`
        <div id="items-container" @scroll="${this.ShowScrollShadows.bind(this)}">
            ${repeat(order, (order) => order, (_, index) => this.GetNavItem(index, order, pages, icons))}

            <div id="top-shadow" style="display: none"></div>
            <div id="bottom-shadow" style="${!mobile && scrollable ? "" : "display: none"}"></div>
            <div id="left-shadow" style="display: none"></div>
            <div id="right-shadow" style="${mobile && scrollable ? "" : "display: none"}"></div>
        </div>
        `;
    }
}