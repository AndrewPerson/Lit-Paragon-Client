import { LitElement, html, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";

import { Extensions, Extension, GetExtensions, GetExtensionIconURL } from "../../site/extensions";

import "./extension-display";

//@ts-ignore
import textCss from "default/text.css";
//@ts-ignore
import searchCss from "default/search.css";
//@ts-ignore
import fullElementCss from "default/pages/full.css";
//@ts-ignore
import pageCss from "default/pages/page.css";
//@ts-ignore
import extensionsMarketplaceCss from "./extensions-marketplace.css";

@customElement("extensions-marketplace")
export class ExtensionsMarketplace extends LitElement {
    static styles = [pageCss, fullElementCss, textCss, searchCss, extensionsMarketplaceCss];

    fetchingExtensions: boolean = true;

    @state()
    extensions: Map<string, Extension> = new Map();

    searchFilter: string;

    constructor() {
        super();

        GetExtensions(extensions => {
            this.fetchingExtensions = false;
            this.extensions = extensions;
        });
    }

    render() {
        let installedExtensions = Extensions.installedExtensions;

        let installedExtensionNames: string[] = [];
        for (var key of installedExtensions.keys())
            installedExtensionNames.push(key);

        return html`
        <div class="header">
            <input type="search" placeholder="Search..." @input="${(e: InputEvent) => this.searchFilter = (e.target as HTMLInputElement).value}">
            <input type="checkbox">
        </div>

        ${this.fetchingExtensions ? nothing : html`
        <!--The ugliest code ever written, but the div tags for .content need to be where they are, or the :empty selector won't work-->
        <div class="content">${[...this.extensions.keys()].map((extensionName: string) => html`
            <extension-display title="${extensionName}" img="${GetExtensionIconURL(this.extensions.get(extensionName) as Extension)}"
                            description="${(this.extensions.get(extensionName) as Extension).description}"
                            ?installed="${installedExtensionNames.includes(extensionName)}"></extension-display>
        `)}</div>
        `}
        `;
    }
}