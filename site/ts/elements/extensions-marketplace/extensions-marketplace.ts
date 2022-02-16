import { LitElement, html, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";

import { Site } from "../../site/site";
import { Extensions, Extension } from "../../site/extensions";

import "./extension-display";

//@ts-ignore
import textCss from "default/text.css";
//@ts-ignore
import searchCss from "default/search.css";
//@ts-ignore
import checkboxCss from "default/checkbox.css";
//@ts-ignore
import fullElementCss from "default/pages/full.css";
//@ts-ignore
import pageCss from "default/pages/page.css";
//@ts-ignore
import extensionsMarketplaceCss from "./extensions-marketplace.css";

@customElement("extensions-marketplace")
export class ExtensionsMarketplace extends LitElement {
    static styles = [textCss, searchCss, checkboxCss, pageCss, fullElementCss, extensionsMarketplaceCss];

    @state()
    extensions: Map<string, Extension> = new Map();

    @state()
    searchFilter: string = "";

    @state()
    allowPreview: boolean = false;

    constructor() {
        super();

        Site.GetMetadata(metadata => {
            this.extensions = new Map(Object.entries(metadata?.pages ?? {}));
        });
    }

    AllowPreviewExtensions(e: InputEvent) {
        this.allowPreview = (e.target as HTMLInputElement).checked;
    }

    render() {
        let installedExtensions = Extensions.installedExtensions;

        let installedExtensionNames: string[] = [...installedExtensions.keys()];

        let extensionNames = [...this.extensions.keys()];
        extensionNames = this.searchFilter.length == 0 ? extensionNames : extensionNames.filter(name => name.toLowerCase().includes(this.searchFilter.toLowerCase()) || this.extensions.get(name)?.description.toLowerCase().includes(this.searchFilter.toLowerCase()));
        extensionNames = extensionNames.filter(name => this.allowPreview || !this.extensions.get(name)?.preview || installedExtensionNames.includes(name));
        //Sort extensions by whether they're installed, then by whether they're in preview, then by lexical order of the name.
        extensionNames = extensionNames.sort((a, b) => {
            let first = true;

            if (installedExtensionNames.includes(a)) {
                if (installedExtensionNames.includes(b)) {
                    if (this.extensions.get(a)?.preview === false) {
                        if (this.extensions.get(b)?.preview === false)
                            first = a >= b;
                        else
                            first = true;
                    }
                    else if (this.extensions.get(b)?.preview === false)
                        first = false;
                }
                else
                    first = true;
            }
            else if (installedExtensionNames.includes(b))
                first = false;
            else if (this.extensions.get(a)?.preview === false) {
                if (this.extensions.get(b)?.preview === false)
                    first = a >= b;
                else
                    first = true;
            }
            else if (this.extensions.get(b)?.preview === false)
                first = false;

            return first ? -1 : 1;
        });

        return html`
        <div class="header">
            <input type="search" placeholder="Search..." @input="${(e: InputEvent) => this.searchFilter = (e.target as HTMLInputElement).value}">
            
            <div class="label-input-group">
                <label for="preview">
                    Show Preview Extensions?
                </label>

                <input type="checkbox" name="preview" title="Show Preview Extensions" @input="${this.AllowPreviewExtensions}">
            </div>
        </div>

        <!--The ugliest code ever written, but the div tags for .content need to be where they are, or the :empty selector won't work-->
        <div class="content">${extensionNames.map((extensionName: string) => {
            let extension = this.extensions.get(extensionName) as Extension;

            return html`
                <extension-display title="${extensionName}" img="${Extensions.GetExtensionIconURL(extension)}"
                                description="${extension.description}"
                                ?preview="${extension.preview}"
                                ?installed="${installedExtensionNames.includes(extensionName)}"></extension-display>
            `
        })}</div>
        `;
    }
}