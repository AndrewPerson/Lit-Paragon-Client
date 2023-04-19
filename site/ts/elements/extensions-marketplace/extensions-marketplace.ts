import { html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";

import { Site } from "../../site/site";
import { Extensions, Extension } from "../../site/extensions";

import { Pipeline } from "../../site/pipeline";
import { filterPreviewExtensions } from "./preview-filter";
import { filterSearch } from "./search-filter";
import { sortExtensions } from "./sort";

import "./extension-display";

//@ts-ignore
import textCss from "default/text.css";
//@ts-ignore
import searchCss from "default/search.css";
//@ts-ignore
import checkboxCss from "default/checkbox.css";
//@ts-ignore
import scrollbarCss from "default/scrollbar.css";
//@ts-ignore
import fullElementCss from "default/pages/full.css";
//@ts-ignore
import pageCss from "default/pages/page.css";
//@ts-ignore
import extensionsMarketplaceCss from "./extensions-marketplace.css";

@customElement("extensions-marketplace")
export class ExtensionsMarketplace extends LitElement {
    static styles = [textCss, searchCss, checkboxCss, scrollbarCss, pageCss, fullElementCss, extensionsMarketplaceCss];

    @state()
    extensions: Map<string, Extension> = new Map();

    @state()
    searchFilter: string = "";

    @state()
    allowPreview: boolean = false;

    extensionPipeline = new Pipeline<Extension[], { allowPreviewExtensions: boolean, search?: string }>()
                            .transform(filterPreviewExtensions)
                            .transform(filterSearch)
                            .transform(sortExtensions);

    constructor() {
        super();

        this.addEventListener("install", ((e: CustomEvent<{ extension: string }>) => {
            Extensions.installExtension(e.detail.extension);
        }) as EventListener);

        this.addEventListener("uninstall", ((e: CustomEvent<{ extension: string }>) => {
            Extensions.uninstallExtension(e.detail.extension);
        }) as EventListener);

        Extensions.onInstalledExtensionsChanged(_ => this.requestUpdate());

        Site.onDarkChange(_ => this.requestUpdate());

        //TODO Use pagination
        Extensions.getExtensions().then(extensions => {
            this.extensions = extensions;
        });
    }

    render() {
        //TODO Use Algolia for searching
        const extensions = this.extensionPipeline.run(Array.from(this.extensions.values()), { allowPreviewExtensions: this.allowPreview, search: this.searchFilter });

        return html`
        <div class="header">
            <input type="search" placeholder="Search..." @input="${(e: InputEvent) => this.searchFilter = (e.target as HTMLInputElement).value}">

            <div class="preview-input-container">
                <label for="preview">
                    Show Preview Extensions?
                </label>

                <input type="checkbox" name="preview" title="Show Preview Extensions" @input="${(e: InputEvent) => this.allowPreview = (e.target as HTMLInputElement).checked}">
            </div>
        </div>

        <!--The ugliest code ever written, but the div tags for .content need to be where they are, or the :empty selector won't work-->
        <div class="content">${repeat(extensions, extension => extension.name, extension => html`
            <extension-display title="${extension.name}"
                               img="${Extensions.getExtensionIconURL(extension, Site.dark)}"
                               description="${extension.description}"
                               ?preview="${extension.preview}"
                               ?installed="${Extensions.installedExtensions.has(extension.name)}"></extension-display>
        `)}</div>
        `;
    }
}