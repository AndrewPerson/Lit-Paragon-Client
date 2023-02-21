import { html, nothing, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

import "./next-indicator";

//@ts-ignore
import bellCss from "./bell.css";
//@ts-ignore
import textCss from "default/text.css";

@customElement("daily-timetable-bell")
export class DailyTimetableBell extends LitElement {
    static styles = [textCss, bellCss];

    @property()
    title: string;

    @property()
    time: string;

    @property({ type: Boolean })
    next: boolean;

    render() {
        return html`
            ${this.next ? html`<next-indicator text="This is the next bell."></next-indicator>` : nothing}

            <p>${this.title}</p>
            <p>${this.time}</p>
        `;
    }
}