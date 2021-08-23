import { html, LitElement } from "lit";
import { navItemCss, navMenuCss, loadingElementCss, loginNotificationCss } from "./main-css";

export class NavItem extends LitElement {
    static get styles() {
        return navItemCss;
    }

    static get properties() {
        return {
            link: {type: String},
            title: {type: String},
            icon: {type: String}
        };
    }

    constructor() {
        super();

        this.link = "";
        this.title = "Home";
    }

    render() {
        if (!this.icon) this.icon = this.title.toLowerCase();

        //Trims / off front and end of the path and the link.
        this.linkClass = location.pathname == this.link ? "nav-selected" : "";

        return html`
            <a href="${this.link}${location.hash}" title="${this.title}" class="${this.linkClass}">
                <img draggable="false" src="images/${this.icon}.svg" />
            </a>
        `;
    }
}

export class Navbar extends LitElement {
    static get styles() {
        return navMenuCss;
    }

    render() {
        return html`
            <nav-item link="/dailytimetable" title="Daily Timetable" icon="dailytimetable"></nav-item>
            <nav-item link="/barcode" title="ID Barcode" icon="barcode"></nav-item>
            <nav-item link="/announcements" title="Announcements"></nav-item>
            <nav-item link="/timetable" title="Timetable"></nav-item>
            <nav-item link="/calendar" title="Calendar"></nav-item>

            <nav-item link="/settings" title="Settings"></nav-item>
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
            <img class="spinner" src="images/rings.svg" />
        `;
    }
}

export class LoginNotification extends LitElement {
    static get styles() {
        return loginNotificationCss;
    }

    close(e) {
        this.remove();
    }

    constructor() {
        super();
    }

    render() {
        return html`
            <p>You need to log in to view the latest information.</p>

            <div class="buttons">
                <button onclick="location.pathname='login'">
                Login
                </button>
                <button @click="${this.close}" class="dismiss">
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