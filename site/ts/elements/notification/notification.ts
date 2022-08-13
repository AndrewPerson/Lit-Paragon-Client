import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

//@ts-ignore
import imgCss from "default/img.css";
//@ts-ignore
import notificationCss from "./notification.css";

//@ts-ignore
import crossSvg from "images/cross.svg";

@customElement("inline-notification")
export class InlineNotification extends LitElement {
    static styles = [imgCss, notificationCss];

    @property({ type: Boolean })
    loader: boolean;

    Close = (async () => {
        await this.updateComplete;
        this.remove();
    }).bind(this);

    CheckToRemoveHover = ((e: PointerEvent) => {
        let boundingBox = this.getBoundingClientRect();

        if (e.clientX < boundingBox.left || e.clientX > boundingBox.right || e.clientY < boundingBox.top || e.clientY > boundingBox.bottom) {
            this.classList.remove("hover");
        }
    }).bind(this);

    constructor() {
        super();

        this.addEventListener("pointerenter", _ => {
            this.classList.add("hover");
        });

        document.addEventListener("pointermove", this.CheckToRemoveHover);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        
        document.removeEventListener("pointermove", this.CheckToRemoveHover);
    }

    render() {
        return html`
        <slot></slot>

        ${
            this.loader ?
            html`<loading-indicator class="indicator"></loading-indicator>` :
            html`
                <button class="indicator" @click="${this.Close}" @pointerenter="${(_: PointerEvent) => this.classList.remove("hover")}" @pointerleave="${(_: PointerEvent) => this.classList.add("hover")}" title="Close">
                    ${crossSvg}
                </button>
            `
        }
        `;
    }
}