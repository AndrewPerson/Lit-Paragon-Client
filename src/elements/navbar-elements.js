import { html, nothing, LitElement } from "lit";
import { repeat } from "lit/directives/repeat.js";
import { navItemCss, navMenuCss, extensionPageCss } from "./navbar.css";
import { imgCss } from "./default.css";

import Sortable, { AutoScroll } from "sortablejs/modular/sortable.core.esm.js";

Sortable.mount(AutoScroll);

export class NavItem extends LitElement {
    static get styles() {
        return [navItemCss, imgCss];
    }

    static get properties() {
        return {
            page: {type: String},
            title: {type: String},
            editing: {type: Boolean}
        };
    }

    UpdatePage(e) {
        e.preventDefault();

        location.hash = this.page;

        if (location.pathname != "") location.pathname = "";

        window.UpdatePage();
        window.UpdateScreenType();

        document.getElementById("nav").removeAttribute("editing");

        return false;
    }
    
    constructor() {
        super();

        this.page = "";
        this.title = "";
        this.editing = false;
    }

    render() {
        this.draggable = this.editing;

        if (window.page == this.page)
            this.classList.add("selected");
        else
            this.classList.remove("selected");

        return html`
            <a href="#${this.page}" @click="${this.UpdatePage}" title="${this.title}">
                <slot></slot>
            </a>

            ${this.editing ? html`<img id="handle" src="images/drag.svg" draggable="false"/>` : nothing}
        `;
    }
}

export class Navbar extends LitElement {
    static get styles() {
        return navMenuCss;
    }

    static get properties() {
        return {
            editing: {type: Boolean}
        }
    }

    updatePage() {
        for (var child of this.shadowRoot.querySelectorAll("nav-item")) {
            child.requestUpdate();
        }
    }

    GetNavItem(order, index) {
        var page;
        var title;
        var icon;

        if (order < Navbar.defaultPages.length) ({page, title, icon} = Navbar.defaultPages[order]);
        else {
            page = `(page)${this.pages[order - Navbar.defaultPages.length]}`;
            title = this.pages[order - Navbar.defaultPages.length];
            icon = this.icons[order - Navbar.defaultPages.length];
        }
        
        return html`
            <nav-item index="${index}" ?editing="${this.editing}" page="${page}" title="${title}">
                <img draggable="false" src="${icon}" />
            </nav-item>
        `;
    }

    ShowShadows() {
        if (!this.shadowRoot) return;

        var container = this.shadowRoot.getElementById("items-container");

        var topShadow = this.shadowRoot.getElementById("top-shadow");
        var bottomShadow = this.shadowRoot.getElementById("bottom-shadow");
        var leftShadow = this.shadowRoot.getElementById("left-shadow");
        var rightShadow = this.shadowRoot.getElementById("right-shadow");

        if (window.innerWidth <= window.innerHeight) {
            topShadow.style.display = "none";
            bottomShadow.style.display = "none";

            if (container.scrollLeft == 0)
                leftShadow.style.display = "none";
            else
                leftShadow.style.removeProperty("display");

            if (container.scrollLeft >= container.scrollWidth - container.clientWidth - 1)
                rightShadow.style.display = "none";
            else
                rightShadow.style.removeProperty("display");
        }
        else {
            leftShadow.style.display = "none";
            rightShadow.style.display = "none";

            if (container.scrollTop == 0)
                topShadow.style.display = "none";
            else
                topShadow.style.removeProperty("display");

            if (container.scrollTop >= container.scrollHeight - container.clientHeight - 1)
                bottomShadow.style.display = "none";
            else
                bottomShadow.style.removeProperty("display");
        }
    }

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

    constructor() {
        super();

        this.pages = [];
        this.icons = [];

        this.order = [0, 1, 2, 3, 4, 5];

        this.editing = false;

        this.sortable = null;

        matchMedia("(max-aspect-ratio: 1/1)").onchange = this.ShowShadows.bind(this);
    }

    createRenderRoot() {
        var root = super.createRenderRoot();

        root.addEventListener("pointerdown", () => {
            this.shadowRoot.getElementById("items-container").classList.add("hover");
        });

        root.addEventListener("pointerup", () => {
            this.shadowRoot.getElementById("items-container").classList.remove("hover");
        });

        return root;
    }

    firstUpdated() {
        var container = this.shadowRoot.getElementById("items-container");

        container.addEventListener("scroll", this.ShowShadows.bind(this));
    
        this.sortable = new Sortable(container, {
            group: "nav-items",
            sort: true,
            disabled: !this.editing,
            draggable: "nav-item",
            handle: "#handle",

            ghostClass: "selected",
            dragClass: "drag",

            fallbackOnBody: true,
            
            onEnd: e => {
                if (window.page == e.item.page) e.item.classList.add("selected");

                var order = this.order.splice(e.oldIndex, 1)[0];
                this.order.splice(e.newIndex, 0, order);

                localStorage.setItem("Nav Order", JSON.stringify(this.order));

                this.requestUpdate();
            }
        });
    }

    render() {
        var order = localStorage.getItem("Nav Order");

        if (order)
            this.order = JSON.parse(order);

        var extensions = window.getInstalledExtensions();

        this.pages = Object.keys(extensions);
        this.icons = this.pages.map(key => {
            var url = new URL(extensions[key].url);
            url.pathname = extensions[key].navIcon;

            return url.toString();
        });

        var mobile = window.innerWidth <= window.innerHeight;

        var vmin = mobile ? window.innerWidth / 100 : window.innerHeight / 100;

        var scrollable = this.order.length * 12 * vmin > window.innerHeight;

        if (this.sortable) this.sortable.option("disabled", !this.editing);

        return html`
            <div id="items-container">
                ${repeat(this.order, key => key, this.GetNavItem.bind(this))}
            
                <div id="top-shadow" style="display: none"></div>
                <div id="bottom-shadow" style="${!mobile && scrollable ? "" : "display: none"}"></div>
                <div id="left-shadow" style="display: none"></div>
                <div id="right-shadow" style="${mobile && scrollable ? "" : "display: none"}"></div>
            </div>
        `;
    }
}

export class ExtensionPage extends LitElement {
    static get styles() {
        return [extensionPageCss];
    }

    static get properties() {
        return {
            src: {type: String}
        };
    }

    constructor() {
        super();

        this.src = "";
    }

    firstUpdated() {
        var frame = this.shadowRoot.getElementById("frame")
        frame.addEventListener("load", () => {
            this.shadowRoot.getElementById("loader").remove();
            frame.removeAttribute("style");
        });
    }

    render() {
        return html`
            <iframe id="frame" src="${this.src}" style="display: none"></iframe>
            <loading-element id="loader"></loading-element>
        `;
    }
}

window.Navbar = Navbar;
customElements.define("nav-item", NavItem);
customElements.define("nav-bar", Navbar);
customElements.define("extension-page", ExtensionPage);