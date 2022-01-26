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
    order: number;

    @property({ type: Boolean })
    editing: boolean;
    
    constructor() {
        super();

        this.addEventListener("keyup", this.Reorder);
    }

    Reorder(e: KeyboardEvent) {
        if (e.key.startsWith("Arrow") && this.editing) {
            let navOrder = Navbar.GetNavbarOrder();

            let dir = e.key == "ArrowUp" || e.key == "ArrowLeft" ? ReorderDirection.UP : ReorderDirection.DOWN;

            if (dir == ReorderDirection.UP) {
                let index = navOrder.splice(this.order, 1)[0];
                
                if (this.order == 0) navOrder.push(index);
                else navOrder.splice(this.order - 1, 0, index);
            }
            else {
                let index = navOrder.splice(this.order, 1)[0];

                if (this.order == navOrder.length - 1) navOrder.unshift(index);
                else navOrder.splice(this.order + 1, 0, index);
            }

            Navbar.SetNavbarOrder(navOrder);

            if (dir == ReorderDirection.UP) {
                if (this.order == 0) return;
                else (this.previousElementSibling as HTMLElement | null)?.focus();
            }
            else {
                if (this.order == navOrder.length - 1) return;
                else (this.nextElementSibling as HTMLElement | null)?.focus();
            }
        }
    }

    UpdatePage(e: Event) {
        e.preventDefault();

        Site.NavigateTo({
            page: this.page,
            extension: this.extension
        });
    }

    render() {
        if (Site.page.page == this.page && Site.page.extension == this.extension)
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