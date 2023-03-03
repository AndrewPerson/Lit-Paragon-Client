import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

//@ts-ignore
import imgCss from "default/img.css";
//@ts-ignore
import notificationCss from "./notification.css";

@customElement("inline-notification")
export class InlineNotification extends LitElement {
    static styles = [imgCss, notificationCss];

    @property({ type: Boolean })
    loader: boolean;

    @property({ type: Number })
    percentage: number = 0;

    static ShowNotification(content: HTMLElement | string, loader: boolean = false) {
        let notification = document.createElement("inline-notification") as InlineNotification;

        if (!(content instanceof HTMLElement)) {
            let text = document.createElement("p");
            text.textContent = content;
            content = text;
        }

        notification.appendChild(content);
        notification.loader = loader;

        document.getElementById("notification-area")?.appendChild(notification);

        return notification;
    }

    Close = (() => this.updateComplete.then(this.remove.bind(this))).bind(this);

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

        <!--TODO Make this more accessible-->
        <div class="progress" style="width: ${this.percentage * 100}%;"></div>
        `;
    }
}