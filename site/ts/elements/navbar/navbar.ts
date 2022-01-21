import { LitElement, html, TemplateResult } from "lit";
import { customElement, property, query } from "lit/decorators.js";

import { Extensions, Extension } from "../../site/extensions";

import "./navitem";
import { NavItem } from "./navitem";
import "./dragged-navitem";
import { DraggedNavItem } from "./dragged-navitem";

//@ts-ignore
import navbarCss from "./navbar.css";

@customElement("nav-bar")
export class Navbar extends LitElement {
    static styles = navbarCss;

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

    pages: string[] = [];
    icons: string[] = [];
    order: number[] = [];

    draggedItemIndex: number = 0;
    draggedItem: DraggedNavItem | null = null;
    draggedItemOffsetX: number = 0;
    draggedItemOffsetY: number = 0;

    static GetNavbarOrder(): number[] {
        return JSON.parse(localStorage.getItem("Nav Order") || "[0, 1, 2, 3, 4, 5]");
    }

    static SetNavbarOrder(order: number[]) {
        localStorage.setItem("Nav Order", JSON.stringify(order));
        this.instance?.requestUpdate();
    }

    static instance: Navbar | null;

    constructor() {
        super();

        Navbar.instance = this;

        this.addEventListener("pointerdown", this.SetDraggedItem.bind(this));
        document.addEventListener("pointermove", this.DragElement);
        document.addEventListener("pointerup", this.StopDrag);
    }

    disconnectedCallback() {
        document.removeEventListener("pointermove", this.DragElement);
        document.removeEventListener("pointerup", this.StopDrag);
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

        if (element.dataset.index === undefined) return;
        this.draggedItemIndex = parseInt(element.dataset.index);

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

        if (element.dataset.index === undefined) return;

        this.ReorderNavItems(parseInt(element.dataset.index));
    }).bind(this);

    StopDrag = ((e: PointerEvent) => {
        if (this.draggedItem == null) return;

        this.draggedItem.remove();
        this.draggedItem = null;

        e.preventDefault();
    }).bind(this);

    ReorderNavItems(newIndex: number) {
        this.order.splice(newIndex, 0, this.order.splice(this.draggedItemIndex, 1)[0]);

        this.draggedItemIndex = newIndex;

        Navbar.SetNavbarOrder(this.order);
    }

    GetNavItem = ((order: number, index: number) => {
        let page: string;
        let title: string;
        let icon: string;
        let extension: boolean = false;

        if (order < Navbar.defaultPages.length) ({page, title, icon} = Navbar.defaultPages[order]);
        else {
            page = this.pages[order - Navbar.defaultPages.length];
            title = this.pages[order - Navbar.defaultPages.length];
            icon = this.icons[order - Navbar.defaultPages.length];
            extension = true;
        }
        
        return html`
            <nav-item ?editing="${this.editing}" pageName="${page}" ?extension="${extension}" title="${title}" data-index="${index}">
                <img draggable="false" src="${icon}">
            </nav-item>
        `;
    }).bind(this);

    createRenderRoot() {
        let root = super.createRenderRoot();

        root.addEventListener("pointerdown", () => {
            this.itemsContainer.classList.add("hover");
        });

        root.addEventListener("pointerup", () => {
            this.itemsContainer.classList.remove("hover");
        });

        return root;
    }

    updated() {
        for (let navItem of this.shadowRoot?.querySelectorAll("nav-item") as NodeListOf<NavItem>) {
            navItem.requestUpdate();
        }
    }

    render() {
        this.order = Navbar.GetNavbarOrder();

        let extensions = Extensions.installedExtensions;

        for (var key of extensions.keys()) {
            this.pages.push(key);
            this.icons.push(Extensions.GetExtensionNavIconURL(extensions.get(key) as Extension));
        }

        return html`
        <div id="items-container">
            ${this.order.map(this.GetNavItem)}
        </div>
        `;
    }
}