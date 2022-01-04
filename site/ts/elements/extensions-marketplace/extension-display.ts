import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import { Site } from "../../site";
import { Extensions } from "../../extensions";

import { Navbar } from "../navbar/navbar";
import { ExtensionsMarketplace } from "./extensions-marketplace";

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
    installed: boolean;

    async Install() {
        await Extensions.InstallExtension(this.title);

        (document.getElementById("pages") as ExtensionsMarketplace).requestUpdate();
    }

    async Uninstall() {
        await Extensions.UninstallExtension(this.title);

        (document.getElementById("pages") as ExtensionsMarketplace).requestUpdate();
    }

    render() {
        return html`
        <img src="${this.img}">
        
        <div class="content">
            <h4>${this.title}</h4>
            <p>${this.description}</p>

            <button @click="${this.installed ? this.Uninstall : this.Install}">${this.installed ? "Uninstall" : "Install"}</button>
        </div>
        `;
    }
}