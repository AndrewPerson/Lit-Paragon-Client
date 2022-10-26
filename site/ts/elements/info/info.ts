import { html, unsafeCSS, LitElement } from "lit";
import { customElement, query } from "lit/decorators.js";

//@ts-ignore
import imgCss from "default/img.css";
//@ts-ignore
import infoCss from "./info.css";

declare const SKIN_CSS: string;

@customElement("info-popup")
export class Info extends LitElement {
    static styles = [imgCss, infoCss];

    @query(".info")
    info: HTMLElement;

    @query(".background")
    background: HTMLDivElement;

    constructor() {
        super();

        this.addEventListener("pointerover", this.ShowPopup);
        //Because, for some reason, moving the mouse doesn't fire the pointerover event
        this.addEventListener("mouseleave", this.HidePopup);
        this.addEventListener("focusout", e => {
            let target = e.relatedTarget as HTMLElement | null;

            if (target === null || target.assignedSlot !== this.info)
                this.HidePopup();
        });

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
        <button title="Click or hover to reveal more information" @click="${this.ShowPopup}">
            <slot name="icon">
                <img src="/images/info.svg">
            </slot>
        </button>

        <slot class="info" style="display: none"></slot>

        <div class="background" style="display: none"></div>
        `;
    }
}