import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import { Site } from "../../site";

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
        var allExtensions = await Site.GetExtensionsNow();
        var installedExtensions = Site.GetInstalledExtensions();

        var extension = allExtensions[this.title];

        if (extension) {
            installedExtensions[this.title] = extension;

            Site.SetInstalledExtensions(installedExtensions);

            var order = Site.GetNavbarOrder();
            order.push(order.length);

            Site.SetNavbarOrder(order);
        }

        (document.getElementById("pages") as ExtensionsMarketplace).requestUpdate();
    }

    async Uninstall() {
        var installedExtensions = Site.GetInstalledExtensions();

        var order = Site.GetNavbarOrder();

        var index = order.indexOf(Object.keys(installedExtensions).indexOf(this.title)) + Navbar.defaultPages.length;
        var position = order.splice(index, 1)[0];

        for (let i = 0; i < order.length; i++) {
            if (order[i] > position) {
                order[i]--;
            }
        }

        Site.SetNavbarOrder(order);

        delete installedExtensions[this.title];

        Site.SetInstalledExtensions(installedExtensions);

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