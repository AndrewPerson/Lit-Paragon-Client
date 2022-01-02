import { LitElement, html, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";

import { Site, Extensions } from "../../site";

import "./extension-display";

//@ts-ignore
import textCss from "default/text.css";
//@ts-ignore
import searchCss from "default/search.css";
//@ts-ignore
import fullElementCss from "default/elements/full.css";
//@ts-ignore
import elementCss from "default/elements/element.css";
//@ts-ignore
import extensionsMarketplaceCss from "./extensions-marketplace.css";

@customElement("extensions-marketplace")
export class ExtensionsMarketplace extends LitElement {
    static styles = [elementCss, fullElementCss, textCss, searchCss, extensionsMarketplaceCss];

    fetchingExtensions: boolean = true;

    @state()
    extensions: Extensions = {};

    searchFilter: string;

    constructor() {
        super();

        Site.GetExtensions(extensions => {
            this.fetchingExtensions = false;
            this.extensions = extensions;
        });
    }

    render() {
        var installedExtensions = Site.GetInstalledExtensions();

        return html`
        <div class="header">
            <input type="search" placeholder="Search..." @input="${(e: InputEvent) => this.searchFilter = (e.target as HTMLInputElement).value}">
            <input type="checkbox">
        </div>

        ${this.fetchingExtensions ? nothing : html`
        <!--The ugliest code ever written, but the div tags for .content need to be where they are, or the :empty selector won't work-->
        <div class="content">${repeat(Object.keys(this.extensions), (extensionName: string) => html`
        <extension-display title="${extensionName}" img="${Site.GetExtensionIconURL(this.extensions[extensionName])}"
                           description="${this.extensions[extensionName].description}"
                           ?installed="${Object.keys(installedExtensions).includes(extensionName)}"></extension-display>
        `)}</div>
        `}
        `;
    }
}