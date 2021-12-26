import { html, LitElement } from "lit";
import { customElement, query } from "lit/decorators.js";

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
    info: HTMLElement;

    @query(".background", true)
    background: HTMLDivElement;

    ShowPopup() {
        this.info.style.removeProperty("display");
        this.background.style.removeProperty("display");
    }

    HidePopup() {
        this.info.style.display = "none";
        this.background.style.display = "none";
    }

    constructor() {
        super();

        this.addEventListener("pointerover", this.ShowPopup);
        this.addEventListener("pointerout", this.HidePopup);
    }

    render() {
        return html`
        <button @click="${this.ShowPopup}">
            ${infoSvg}
        </button>

        <slot style="display: none"></slot>

        <div class="background" style="display: none"></div>
        `;
    }
}