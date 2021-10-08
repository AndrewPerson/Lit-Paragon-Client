import { html, nothing, LitElement } from "lit";
import { repeat } from "lit/directives/repeat.js";
import { navItemCss, navMenuCss, loadingElementCss, loginNotificationCss } from "./main.css";
import { containerCss, textCss, buttonCss } from "./default.css";

export class NavItem extends LitElement {
    static get styles() {
        return navItemCss;
    }

    static get properties() {
        return {
            page: {type: String},
            title: {type: String},
            editing: {type: Boolean},
            order: {type: Number}
        };
    }

    UpdatePage() {
        location.hash = this.page;

        if (location.pathname != "") location.pathname = "";

        window.UpdatePage();
        window.UpdateScreenType();

        document.getElementById("nav").removeAttribute("editing");
    }

    static draggingOrder = 0;
    static draggingX = 0;
    static draggingY = 0;

    constructor() {
        super();

        this.page = "";
        this.title = "";
        this.editing = false;
        this.order = 0;

        this.dragging = false;
        
        this.addEventListener("dragstart", () => {
            this.style.opacity = "0.5";
            this.style.boxShadow = "none";

            this.dragging = true;

            if (window.page != this.page) this.classList.add("nav-selected");

            NavItem.draggingOrder = this.order;
            NavItem.draggingX = this.offsetLeft;
            NavItem.draggingY = this.offsetTop;
        });

        this.addEventListener("drag", e => {
            NavItem.draggingX = e.clientX;
            NavItem.draggingY = e.clientY;
        });

        this.addEventListener("dragover", e => {
            e.preventDefault();

            if (this.dragging) return false;

            var nav = document.getElementById("nav");

            var order = nav.getAttribute("order");

            if (order) order = JSON.parse(order);
            else order = [0, 1, 2, 3, 4, 5];

            order.splice(order.indexOf(NavItem.draggingOrder), 1);

            var index = order.indexOf(this.order) || 0;

            if (matchMedia("(max-aspect-ratio: 1/1)").matches) {
                if (NavItem.draggingX > this.offsetLeft + this.clientWidth / 2) {
                    order.splice(index + 1, 0, NavItem.draggingOrder);
                }
                else {
                    order.splice(index, 0, NavItem.draggingOrder);
                }
            }
            else {
                if (NavItem.draggingY < this.offsetTop + this.clientHeight / 2) {
                    order.splice(index + 1, 0, NavItem.draggingOrder);
                }
                else {
                    order.splice(index, 0, NavItem.draggingOrder);
                }
            }

            nav.setAttribute("order", JSON.stringify(order));

            return false;
        });

        this.addEventListener("dragend", () => {
            this.style.removeProperty("opacity");
            this.style.removeProperty("box-shadow");

            this.dragging = false;

            if (window.page != this.page) this.classList.remove("nav-selected");
        });
    }

    render() {
        if (window.page == this.page)
            this.classList.add("nav-selected");
        else
            this.classList.remove("nav-selected");

        this.draggable = this.editing;

        return html`
            <button @click="${this.UpdatePage}" title="${this.title}">
                <slot></slot>
            </button>

            ${
                nothing
                //this.editing ? html`<img @pointerdown="${this.StartMove}" id="handle" draggable="false" src="images/drag.svg" />`: nothing
            }
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
            order: {type: Array},
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
            <nav-item order="${order}" ?editing="${this.editing}" page="${page}" title="${title}">
                <img draggable="false" src="${icon}" />
            </nav-item>
        `;
    }

    ShowShadows() {
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

        matchMedia("(max-aspect-ratio: 1/1)").onchange = (() => {
            this.ShowShadows();
        }).bind(this);
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

    updated() {
        this.shadowRoot.getElementById("items-container").addEventListener("scroll", this.ShowShadows.bind(this));
    
        this.ShowShadows();
    }

    render() {
        var last = this.order.pop();

        return html`
            <div id="items-container">
                <div id="top-shadow" style="display: none"></div>
                <div id="bottom-shadow" style="display: none"></div>
                <div id="left-shadow" style="display: none"></div>
                <div id="right-shadow" style="display: none"></div>

                ${repeat(this.order, key => key, key => this.GetNavItem(key))}
            </div>
            <div class="end">
                ${this.GetNavItem(last)}
            </div>
        `;
    }
}

export class LoadingElement extends LitElement {
    static get styles() {
        return loadingElementCss;
    }

    render() {
        return html`
            <img draggable="false" class="spinner" src="images/rings.svg" />
        `;
    }
}

export class LoginNotification extends LitElement {
    static get styles() {
        return [containerCss, textCss, buttonCss, loginNotificationCss];
    }

    async login() {
        await caches.delete("User Resources");
        location.pathname = "login";
    }

    constructor() {
        super();
    }

    render() {
        return html`
            <p>You need to log in to view the latest information.</p>

            <div class="buttons">
                <button @click=${this.login}>
                    Login
                </button>
                <button @click=${() => this.remove()} class="dismiss">
                    Dismiss
                </button>
            </div>
        `;
    }
}

customElements.define("nav-item", NavItem);
customElements.define("nav-bar", Navbar);
customElements.define("loading-element", LoadingElement);
customElements.define("login-notification", LoginNotification);