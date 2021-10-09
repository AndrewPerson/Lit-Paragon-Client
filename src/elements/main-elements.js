import { html, LitElement } from "lit";
import { loadingElementCss, loginNotificationCss } from "./main.css";
import { containerCss, textCss, buttonCss } from "./default.css";

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

customElements.define("loading-element", LoadingElement);
customElements.define("login-notification", LoginNotification);