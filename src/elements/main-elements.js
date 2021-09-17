import { html, LitElement } from "lit";
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
        if (window.getHash().includes("dark"))
            location.hash = `${this.page}-dark`;
        else
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
    }

    render() {
        if (!this.icon) this.icon = this.title.toLowerCase();

        if (window.page == this.page)
            this.classList.add("nav-selected");
        else
            this.classList.remove("nav-selected")

        return html`
            <button @click="${this.UpdatePage}" title="${this.title}">
                <img draggable="false" src="images/${this.icon}.svg" />
            </button>
        `;
    }
}

export class Navbar extends LitElement {
    static get styles() {
        return navMenuCss;
    }

    updatePage() {
        var children = this.shadowRoot.children;

        var i = 0;
        while (i < children.length) {
            children[i].update();
            i++;
        }
    }

    render() {
        return html`
            <nav-item page="dailytimetable" title="Daily Timetable" icon="dailytimetable"></nav-item>
            <nav-item page="barcode" title="ID Barcode" icon="barcode"></nav-item>
            <nav-item page="timetable" title="Timetable"></nav-item>
            <nav-item page="announcements" title="Announcements"></nav-item>
            <nav-item page="extensions" title="Extensions"></nav-item>

            <nav-item page="settings" title="Settings"></nav-item>
        `;
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
customElements.define("nav-bar", Navbar);
customElements.define("loading-element", LoadingElement);
customElements.define("login-notification", LoginNotification);