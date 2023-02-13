import { html, unsafeCSS, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

//@ts-ignore
import imgCss from "default/img.css";
//@ts-ignore
import infoCss from "./info.css";

declare const SKIN_CSS: string;

@customElement("info-popup")
export class Info extends LitElement {
    static styles = [imgCss, infoCss];

    render() {
        return html`
        <button title="Click or hover to reveal more information">
            <slot name="icon">
                <img src="/images/info.svg">
            </slot>
        </button>

        <slot id="info"></slot>

        <div id="background"></div>
        `;
    }
}