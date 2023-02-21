import { html, nothing, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

import "../info/info";

//@ts-ignore
import bellCss from "./bell.css";
//@ts-ignore
import nextIndicatorCss from "./next-indicator.css";
//@ts-ignore
import textCss from "default/text.css";

@customElement("daily-timetable-bell")
export class DailyTimetableBell extends LitElement {
    static styles = [textCss, nextIndicatorCss, bellCss];

    @property()
    title: string;

    @property()
    time: string;

    @property({ type: Boolean })
    next: boolean;

    render() {
        return html`
            ${
                this.next ? html`
                <info-popup class="next">
                    <div class="icon" slot="icon"></div>
                    <p>This is the next bell.</p>
                </info-popup>` :
                nothing
            }

            <p>${this.title}</p>
            <p>${this.time}</p>
        `;
    }
}