import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

//@ts-ignore
import notificationCss from "./notification.css";
//@ts-ignore
import imgCss from "default/img.css";

//@ts-ignore
import crossSvg from "images/cross.svg";

@customElement("inline-notification")
export class InlineNotification extends LitElement {
    static styles = [imgCss, notificationCss];

    @property({ type: Boolean })
    loader: boolean;

    Close = this.remove.bind(this);

    render() {
        return html`
        <slot></slot>
        ${this.loader ? html`
        <loading-indicator class="indicator"></loading-indicator>` :
        html`
        <button class="indicator"  @click="${this.remove}" title="Close">
            ${crossSvg}
        </button>`}
        `;
    }
}