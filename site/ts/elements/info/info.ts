import { html, LitElement } from "lit";
import { customElement, query } from "lit/decorators.js";

//@ts-ignore
import imgCss from "default/img.css";
//@ts-ignore
import infoCss from "./info.css";

//@ts-ignore
import infoSvg from "images/info.svg";

@customElement("info-popup")
export class Info extends LitElement {
    static styles = [imgCss, infoCss];

    @query("slot")
    info: HTMLElement;

    @query(".background")
    background: HTMLDivElement;

    constructor() {
        super();
        
        this.addEventListener("pointerover", this.ShowPopup);
        document.addEventListener("pointerover", this.HidePopup);
    }

    ShowPopup(e: PointerEvent) {
        this.info.style.removeProperty("display");
        this.background.style.removeProperty("display");

        e.stopPropagation();
    }

    HidePopup = (() => {
        this.info.style.display = "none";
        this.background.style.display = "none";
    }).bind(this);

    disconnectedCallback() {
        super.disconnectedCallback();

        document.removeEventListener("pointerover", this.HidePopup);
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