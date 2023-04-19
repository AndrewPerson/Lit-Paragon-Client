import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

import { Extensions } from "../../site/extensions";

//@ts-ignore
import textCss from "default/text.css";
//@ts-ignore
import buttonCss from "default/button.css";
//@ts-ignore
import extensionDisplayCss from "./extension-display.css";

@customElement("extension-display")
export class ExtensionDisplay extends LitElement {
    static styles = [textCss, buttonCss, extensionDisplayCss];

    @property()
    title: string;

    @property()
    img: string;

    @property()
    description: string;

    @property({ type: Boolean })
    preview: boolean;

    @property({ type: Boolean })
    installed: boolean;

    async Install() {
        const installEvent = new CustomEvent("install", {
            bubbles: true,
            cancelable: true,
            composed: true,
            detail: {
                extension: this.title
            }
        });

        this.dispatchEvent(installEvent);
    }

    async Uninstall() {
        const uninstallEvent = new CustomEvent("uninstall", {
            bubbles: true,
            cancelable: true,
            composed: true,
            detail: {
                extension: this.title
            }
        });

        this.dispatchEvent(uninstallEvent);
    }

    render() {
        return html`
        <div class="icon-wrapper">
            <img class="icon" src="${this.img}" alt="Logo for ${this.title} extension">
        </div>

        <div class="content">
            <h4 class="${this.preview ? "preview" : ""}">${this.title}</h4>
            <p>${this.description}</p>

            <button @click="${this.installed ? this.Uninstall : this.Install}">${this.installed ? "Uninstall" : "Install"}</button>
        </div>
        `;
    }
}