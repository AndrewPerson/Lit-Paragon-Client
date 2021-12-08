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
    info: HTMLElement | null;

    @query(".background", true)
    background: HTMLDivElement | null;

    ShowPopup() {
        this.info?.style.removeProperty("display");
        this.background?.style.removeProperty("display");
    }

    HidePopup() {
        if (this.info != null) this.info.style.display = "none";
        if (this.background != null) this.background.style.display = "none";
    }

    constructor() {
        super();

        this.addEventListener("pointerover", this.ShowPopup);
        this.addEventListener("pointerout", this.HidePopup);
    }

    render() {
        return html`
            <button @click="${this.ShowPopup}">
                ${unsafeSVG(infoSvg)}
            </button>

            <slot style="display: none"></slot>

            <div class="background" style="display: none"></div>
        `;
    }
}