import { html, LitElement } from "lit";
import { repeat } from "lit/directives/repeat.js";
import { navItemCss, navMenuCss } from "./navbar.css";

import Sortable, { AutoScroll } from 'sortablejs/modular/sortable.core.esm.js';
Sortable.mount(new AutoScroll());

export class NavItem extends LitElement {
    static get styles() {
        return navItemCss;
    }

    static get properties() {
        return {
            page: {type: String},
            title: {type: String},
        };
    }

    UpdatePage() {
        location.hash = this.page;

        if (location.pathname != "") location.pathname = "";

        window.UpdatePage();
        window.UpdateScreenType();

        document.getElementById("nav").removeAttribute("editing");
    }

    constructor() {
        super();

        this.page = "";
        this.title = "";
    }

    render() {
        if (window.page == this.page)
            this.classList.add("selected");
        else
            this.classList.remove("selected");

        return html`
            <button @click="${this.UpdatePage}" title="${this.title}">
                <slot></slot>
            </button>
        `;
    }
}

export class Navbar extends LitElement {
    static get styles() {
        return navMenuCss;
    }

    static get properties() {
        return {
            pages: {type: Array},
            titles: {type: Array},
            icons: {type: Array},
            editing: {type: Boolean}
        }
    }

    updatePage() {
        for (var child of this.shadowRoot.querySelectorAll("nav-item")) {
            child.requestUpdate();
        }
    }

    GetNavItem(order) {
        var page;
        var title;
        var icon;

        if (order == 0) {
            page = "dailytimetable";
            title = "Daily Timetable";
            icon = "images/dailytimetable.svg";
        }
        else if (order == 1) {
            page = "barcode";
            title = "ID Barcode";
            icon = "images/barcode.svg";
        }
        else if (order == 2) {
            page = "timetable";
            title = "Timetable";
            icon = "images/timetable.svg";
        }
        else if (order == 3) {
            page = "announcements";
            title = "Announcements";
            icon = "images/announcements.svg";
        }
        else if (order == 4) {
            page = "pages";
            title = "Pages Marketplace";
            icon = "images/marketplace.svg";
        }
        else if (order == 5) {
            page = "settings";
            title = "Settings";
            icon = "images/settings.svg";
        }
        else {
            page = `(page)${this.pages[order - 6]}`;
            title = this.titles[order - 6];
            icon = this.icons[order - 6];
        }
        
        return html`
            <nav-item ?editing="${this.editing}" page="${page}" title="${title}">
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

        if (matchMedia("(max-aspect-ratio: 1/1)").matches) {
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

    constructor() {
        super();

        this.pages = [];
        this.titles = [];
        this.icons = [];

        this.order = [0, 1, 2, 3, 4, 5];

        this.editing = false;

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
        this.sortable = Sortable.create(this.shadowRoot.getElementById("items-container"), {
            group: "nav-items",
            sort: true,
            disabled: !this.editing,
            animation: 150,
            easing: "cubic-bezier(1, 0, 0, 1)",
            preventOnFilter: true,
            draggable: "nav-item",
            dragClass: "drag",
            ghostClass: "selected",
            direction: function() {
                return matchMedia("(max-aspect-ratio: 1/1)").matches ? "horizontal" : "vertical";
            },
            onEnd: (function(e) {
                var element = e.item;

                if (window.page == element.page) element.classList.add("selected");

                var id = this.order.splice(e.oldIndex, 1)[0];

                this.order.splice(e.newIndex, 0, id);

                var json = JSON.stringify(this.order);

                localStorage.setItem("Nav Order", json);
            }).bind(this)
        });
    }

    updated() {
        this.shadowRoot.getElementById("items-container").addEventListener("scroll", this.ShowShadows.bind(this));
    }

    render() {
        var order = localStorage.getItem("Nav Order");

        if (order)
            this.order = JSON.parse(order);
        else if (this.pages.length < 6)
            this.order = this.pages.map((_, index) => index);

        var vmin = screen.availHeight < screen.availWidth ? screen.availHeight / 100 : screen.availWidth / 2;

        var scrollable = this.order.length * 12 * vmin > screen.availHeight;

        var mobile = matchMedia("(max-aspect-ratio: 1/1)").matches;

        if (this.sortable) this.sortable.option("disabled", !this.editing);

        return html`
            <div id="items-container">
                ${repeat(this.order, key => key, key => this.GetNavItem(key))}

                <div id="top-shadow" style="display: none"></div>
                <div id="bottom-shadow" style="${!mobile && scrollable ? "" : "display: none"}"></div>
                <div id="left-shadow" style="${mobile && scrollable ? "" : "display: none"}"></div>
                <div id="right-shadow" style="display: none"></div>
            </div>
        `;
    }
}

customElements.define("nav-item", NavItem);
customElements.define("nav-bar", Navbar);