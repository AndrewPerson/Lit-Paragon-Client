import { html, LitElement } from "lit";
import { repeat } from "lit/directives/repeat.js";
import { navItemCss, navMenuCss, loadingElementCss, loginNotificationCss } from "./main-css";
import { imgCss, containerCss, textCss, buttonCss } from "./default-css";

export class NavItem extends LitElement {
    static get styles() {
        return [imgCss, navItemCss];
    }

    static get properties() {
        return {
            page: {type: String},
            title: {type: String},
            icon: {type: String}
        };
    }

    UpdatePage() {
        location.hash = this.page;

        if (location.pathname != "") location.pathname = "";

        window.UpdatePage();
        window.UpdateScreenType();
    }

    constructor() {
        super();

        this.page = "";
        this.title = "Home";
        this.icon = "";

        Navbar.NavItems.push(this);
    }

    render() {
        if (!this.icon) this.icon = this.title.toLowerCase();

        if (window.page == this.page)
            this.classList.add("nav-selected");
        else
            this.classList.remove("nav-selected");

        return html`
            <button @click="${this.UpdatePage}" title="${this.title}">
                <img draggable="false" src="images/${this.icon}.svg" />
            </button>
        `;
    }
}

export class NavPageItem extends LitElement {
    static get styles() {
        return [imgCss, navItemCss];
    }

    static get properties() {
        return {
            page: {type: String},
            title: {type: String},
            icon: {type: String}
        };
    }

    UpdatePage() {
        location.hash = `(page)${this.page}`;

        if (location.pathname != "") location.pathname = "";

        window.UpdatePage();
        window.UpdateScreenType();
    }

    constructor() {
        super();

        this.page = "";
        this.title = "Home";
        this.icon = "";

        Navbar.NavItems.push(this);
    }

    render() {
        if (window.page == this.page)
            this.classList.add("nav-selected");
        else
            this.classList.remove("nav-selected");

        return html`
            <button @click="${this.UpdatePage}" title="${this.title}">
                <img draggable="false" src="${this.icon}" />
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
            order: {type: Array},
        }
    }

    updatePage() {
        for (var child of Navbar.NavItems) {
            child.requestUpdate();
        }
    }

    static NavItems = [];

    constructor() {
        super();

        this.pages = [];
        this.titles = [];
        this.icons = [];
        this.order = [0, 1, 2, 3, 4, 6, 7, 8, 9, 10, 5];
    }

    render() {
        return repeat(this.order, key => key, (key, index) => {
            var result;

            if (key == 0) result = html`<nav-item page="dailytimetable" title="Daily Timetable" icon="dailytimetable"></nav-item>`;
            else if (key == 1) result = html`<nav-item page="barcode" title="ID Barcode" icon="barcode"></nav-item>`;
            else if (key == 2) result = html`<nav-item page="timetable" title="Timetable"></nav-item>`;
            else if (key == 3) result = html`<nav-item page="announcements" title="Announcements"></nav-item>`;
            else if (key == 4) result = html`<nav-item page="pages" title="Pages Marketplace" icon="marketplace"></nav-item>`;
            else if (key == 5) result = html`<nav-item page="settings" title="Settings"></nav-item>`;
            else result = html`<nav-page-item page="${this.pages[key - 6]}" title="${this.titles[key - 6]}" icon="${this.icons[key - 6]}"></nav-page-item>`;
        
            if (index == this.order.length - 1) result = html`<div class="end">${result}</div>`;

            return result;
        });
    }
}

export class LoadingElement extends LitElement {
    static get styles() {
        return loadingElementCss;
    }

    static get properties() {
        return {
            width: {type: String},
            height: {type: String}
        }
    }

    constructor() {
        super();

        this.width = "0";
        this.height = "0";
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
customElements.define("nav-page-item", NavPageItem);
customElements.define("nav-bar", Navbar);
customElements.define("loading-element", LoadingElement);
customElements.define("login-notification", LoginNotification);