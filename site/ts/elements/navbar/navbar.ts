import { LitElement, html, TemplateResult } from "lit";
import { customElement, property, query } from "lit/decorators.js";

import { Extensions, Extension, GetExtensionNavIconURL } from "../../site/extensions";

import "./navitem";
import { NavItem } from "./navitem";

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

    draggedNavItemIndex: number = 0;

    static GetNavbarOrder(): number[] {
        return JSON.parse(localStorage.getItem("Nav Order") || "[0, 1, 2, 3, 4, 5]");
    }

    static SetNavbarOrder(order: number[]) {
        localStorage.setItem("Nav Order", JSON.stringify(order));

        (document.querySelector("nav-bar") as Navbar).requestUpdate();
    }

    SetDraggedNavItemIndex(e: DragEvent) {  
        //Not always guaranteed to be a NavItem
        let target = e.target as NavItem;

        if (!target.editing) return;
        if (target.dataset.index === undefined) return;

        this.draggedNavItemIndex = parseInt(target.dataset.index);

        if (e.dataTransfer) e.dataTransfer.effectAllowed = "copyLink";
        e.dataTransfer?.setData("Text", target.id);
    }

    ReorderNavItems(e: DragEvent) {
        //Not always guaranteed to be a NavItem
        let target = e.target as NavItem;

        if (!target.editing) return;
        if (target.dataset.index === undefined) return;

        let newIndex = parseInt(target.dataset.index);

        this.order.splice(newIndex, 0, this.order.splice(this.draggedNavItemIndex, 1)[0]);

        this.draggedNavItemIndex = newIndex;

        Navbar.SetNavbarOrder(this.order);
    }

    GetNavItem: (order: number, index: number) => TemplateResult<1> = ((order: number, index: number) => {
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
            <nav-item ?editing="${this.editing}" pageName="${page}" ?extension="${extension}" title="${title}" 
                      @dragstart="${this.SetDraggedNavItemIndex}" @dragenter="${this.ReorderNavItems}" @dragover="${(e: DragEvent) => e.preventDefault()}"
                      data-index="${index}">
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

        this.order = [...this.order, ...this.order];

        let extensions = Extensions.installedExtensions;

        for (var key of extensions.keys()) {
            this.pages.push(key);
            this.icons.push(GetExtensionNavIconURL(extensions.get(key) as Extension));
        }

        return html`
        <div id="items-container">
            ${this.order.map(this.GetNavItem)}
        </div>
        `;
    }
}