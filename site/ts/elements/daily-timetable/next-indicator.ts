import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

import "../info/info";

//@ts-ignore
import nextIndicatorCss from "./next-indicator.css";
//@ts-ignore
import textCss from "default/text.css";

@customElement("next-indicator")
export class NextIndicator extends LitElement {
    static styles = [textCss, nextIndicatorCss];

    @property()
    text: string;

    render() {
        return html`
            <info-popup class="next" title="${this.text}">
                <div class="icon" slot="icon"></div>
                <p>${this.text}</p>
            </info-popup>
        `;
    }
}