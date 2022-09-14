import { LitElement, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";

import { Site } from "../../site/site";
import { Navbar } from "./navbar";

//@ts-ignore
import imgCss from "default/img.css";
//@ts-ignore
import navItemCss from "./navitem.css";

enum ReorderDirection {
    UP,
    DOWN
}

@customElement("nav-item")
export class NavItem extends LitElement {
    static styles = [imgCss, navItemCss];

    @property({ type: String })
    page: string;

    @property({ type: Boolean })
    extension: boolean = false;

    @property({ type: String })
    title: string;

    @property({ type: Number })
    childIndex: number;

    @property({ type: Boolean })
    editing: boolean = false;

    @property({ type: Boolean })
    hovered: boolean = false;

    constructor() {
        super();

        this.addEventListener("keyup", this.Reorder);
    }

    Reorder(e: KeyboardEvent) {
        if (e.key.startsWith("Arrow") && this.editing) {
            let navOrder = Navbar.GetNavbarOrder();

            let dir = e.key == "ArrowUp" || e.key == "ArrowLeft" ? ReorderDirection.UP : ReorderDirection.DOWN;

            if (dir == ReorderDirection.UP) {
                let first = this.childIndex == 0;

                let index = navOrder.splice(this.childIndex, 1)[0];

                if (first) navOrder.push(index);
                else navOrder.splice(this.childIndex - 1, 0, index);
            }
            else {
                let last = this.childIndex == navOrder.length - 1;

                let index = navOrder.splice(this.childIndex, 1)[0];

                if (last) navOrder.unshift(index);
                else navOrder.splice(this.childIndex + 1, 0, index);
            }

            Navbar.SetNavbarOrder(navOrder);
        }
    }

    UpdatePage(e: Event) {
        e.preventDefault();

        if (!this.editing)
            Site.NavigateTo({
                page: this.page,
                extension: this.extension
            });
    }

    render() {
        if (Site.page.page == this.page && Site.page.extension == this.extension || this.hovered)
            this.classList.add("selected");
        else
            this.classList.remove("selected");

        return html`
        <a href="#${this.extension ? "extension-" : ""}${this.page}" @click="${this.UpdatePage}" title="${this.title}">
            <slot></slot>
        </a>

        ${this.editing ? html`<img id="handle" src="images/drag.svg" draggable="false">` : nothing}
        `;
    }
}