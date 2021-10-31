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

    async Login() {
        await caches.delete(window.RESOURCE_CACHE);
        
        location.href = "https://student.sbhs.net.au/api/authorize?response_type=code" +
                        "&scope=all-ro" +
                        "&state=abc" +
                        `&client_id=${window.CLIENT_ID}` +
                        `&redirect_uri=${location.origin}/callback`;
    }

    constructor() {
        super();
    }

    render() {
        return html`
            <p>You need to log in to view the latest information.</p>

            <div class="buttons">
                <button @click=${this.Login}>
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