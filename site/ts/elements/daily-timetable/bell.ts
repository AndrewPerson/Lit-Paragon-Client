import { html, nothing, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

import { Time } from "schemas/utils";

import "./next-indicator";

//@ts-ignore
import bellCss from "./bell.css";
//@ts-ignore
import textCss from "default/text.css";

@customElement("dt-bell")
export class Bell extends LitElement {
    static styles = [textCss, bellCss];

    @property()
    title: string;

    @property({ type: Object })
    time: Time

    @property({ type: Boolean })
    next: boolean;

    get timeString() {
        return `${this.time.hours.toString().padStart(2, "0")}:${this.time.minutes.toString().padStart(2, "0")}`;
    }

    render = () => html`
        ${this.next ? html`<next-indicator text="This is the next bell."></next-indicator>` : nothing}

        <p>${this.title}</p>
        <p>${this.timeString}</p>
    `;
}