import { html, unsafeCSS, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

//@ts-ignore
import imgCss from "default/img.css";
//@ts-ignore
import notificationCss from "./notification.css";

declare const SKIN_CSS: string;

@customElement("inline-notification")
export class InlineNotification extends LitElement {
    static styles = [imgCss, notificationCss];

    @property({ type: Boolean })
    loader: boolean;

    Close = (async () => {
        await this.updateComplete;
        this.remove();
    }).bind(this);

    render() {
        return html`
        <slot></slot>

        ${
            this.loader ?
            html`<loading-indicator class="indicator"></loading-indicator>` :
            html`
                <button class="indicator" @click="${this.Close}" title="Close">
                    <img src="/images/cross.svg">
                </button>
            `
        }
        `;
    }
}