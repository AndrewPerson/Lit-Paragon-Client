import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";

//@ts-ignore
import notificationCss from "./notification.css";
//@ts-ignore
import imgCss from "default/img.css";

//@ts-ignore
import crossSvg from "cross.svg";

@customElement("inline-notification")
export class InlineNotification extends LitElement {
    static styles = [imgCss, notificationCss];

    render() {
        return html`
        <slot></slot>
        <button @click="${this.remove}" title="Close">
            ${unsafeSVG(crossSvg)}
        </button>
        `;
    }
}