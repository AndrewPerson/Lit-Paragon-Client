import { html, LitElement } from "lit";
import { migrateCss } from "./migrate-css";

export class MigrateBanner extends LitElement {
    static get styles() {
        return migrateCss;
    }

    Close(_) {
        this.classList.add("close");
        localStorage.setItem("Last Dismissed", new Date().toISOString());
        setTimeout(this.remove.bind(this), 1000);
    }

    constructor() {
        super();

        this.appear = true;

        let lastDismissedText = localStorage.getItem("Last Dismissed");

        if (lastDismissedText !== null) {
            if (new Date() - new Date(lastDismissedText) < 86400000) {
                this.appear = false;
            }
        }
    }

    connectedCallback() {
        super.connectedCallback();

        if (!this.appear) {
            this.remove();
        }
    }

    render() {
        return html`
        <p>Paragon v1 is being deprecated at the end of 2022. Move to <a href="https://paragon.pages.dev">Paragon v2</a> by then.</p>
        <button @click="${this.Close}">
            <img draggable="false" src="images/cross.svg">
        </button>
        `
    }
}

customElements.define("migrate-banner", MigrateBanner);