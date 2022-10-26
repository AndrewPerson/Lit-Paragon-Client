import { html, unsafeCSS, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

//@ts-ignore
import imgCss from "default/img.css";
//@ts-ignore
import draggedNavItemCss from "./dragged-navitem.css";

declare const SKIN_CSS: string;

@customElement("dragged-nav-item")
export class DraggedNavItem extends LitElement {
    static styles = [imgCss, draggedNavItemCss, unsafeCSS(SKIN_CSS ?? "")];

    render() {
        return html`
        <div>
            <slot></slot>
        </div>

        <img id="handle" src="images/drag.svg" draggable="false">
        `;
    }
}