import { LitElement, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";

import { Site, Page } from "../../site";

//@ts-ignore
import imgCss from "default/img.css";
//@ts-ignore
import textCss from "default/text.css"
//@ts-ignore
import navItemCss from "./navitem.css";

@customElement("nav-item")
export class NavItem extends LitElement {
    static styles = [textCss, imgCss, navItemCss];

    @property({ type: String })
    pageName: string = "";

    @property({type: Boolean})
    extension: boolean = false;

    @property({ type: String })
    title: string = "";

    @property({ type: Boolean })
    editing: boolean = false;

    public get page(): Page {
        return {
            page: this.pageName,
            extension: this.extension
        };
    }

    UpdatePage(e: Event) {
        e.preventDefault();

        Site.NavigateTo(this.page);

        return false;
    }

    render() {
        this.draggable = this.editing;

        if (Site.page.page == this.page.page && Site.page.extension == this.page.extension)
            this.classList.add("selected");
        else
            this.classList.remove("selected");

        return html`
            <a href="#${this.extension ? "extension-" : ""}${this.pageName}" @click="${this.UpdatePage}" title="${this.title}">
                <slot></slot>
            </a>

            ${this.editing ? html`<img id="handle" src="images/drag.svg" draggable="false"/>` : nothing}
        `;
    }
}