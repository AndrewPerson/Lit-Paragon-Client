import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

//@ts-ignore
import imgCss from "default/img.css";
//@ts-ignore
import infoCss from "./info.css";

@customElement("info-popup")
export class Info extends LitElement {
    static styles = [imgCss, infoCss];

    render() {
        return html`
        <button title="${this.title == "" ? "Click or hover to reveal more information" : this.title}">
            <slot name="icon">
                <img src="/images/info.svg">
            </slot>
        </button>

        <div id="info-container">
            <slot id="info"></slot>

            <div id="background"></div>
        </div>
        `;
    }
}