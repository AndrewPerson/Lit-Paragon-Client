import { html, unsafeCSS, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

import { Site } from "../../site/site";

//@ts-ignore
import imgCss from "default/img.css";
//@ts-ignore
import navItemCss from "./navitem.css";

declare const SKIN_CSS: string;

@customElement("nav-item")
export class NavItem extends LitElement {
    static styles = [imgCss, navItemCss];

    @property()
    page: string;

    @property()
    title: string;

    @property({ type: Boolean })
    extension: boolean = false;

    UpdatePage(e: Event) {
        e.preventDefault();

        Site.NavigateTo({
            page: this.page,
            extension: this.extension
        });
    }

    render() {
        return html`
        <a href="#${this.extension ? "extension-" : ""}${this.page}" @click="${this.UpdatePage}" title="${this.title}">
            <slot></slot>
        </a>
        `;
    }
}