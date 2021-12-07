import { html, LitElement } from "lit";
import { customElement, query } from "lit/decorators.js";
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';

//@ts-ignore
import infoCss from "./info.css";
//@ts-ignore
import imgCss from "default/img.css";

//@ts-ignore
import infoSvg from "info.svg";

@customElement("info-popup")
export class Info extends LitElement {
    static styles = [imgCss, infoCss];

    @query("slot", true)
    info: HTMLElement | null = null;

    ShowPopup() {
        this.info?.style.removeProperty("display");
    }

    HidePopup() {
        if (this.info != null) this.info.style.display = "none";
    }

    render() {
        return html`
            <button @pointerover=${this.ShowPopup} @pointerleave=${this.HidePopup}>
                ${unsafeSVG(infoSvg)}
            </button>

            <slot style="display: none"></slot>
        `;
    }
}