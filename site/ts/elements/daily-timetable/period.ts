import { html, nothing, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

import { Time } from "schemas/utils";

import "./next-indicator";

//@ts-ignore
import periodCss from "./period.css";
//@ts-ignore
import textCss from "default/text.css";

@customElement("dt-period")
export class DailyTimetablePeriod extends LitElement {
    static styles = [textCss, periodCss];

    @property()
    title: string;

    @property({ type: Object })
    time: Time;

    @property()
    teacher: string;

    @property({ type: Boolean })
    teacherChanged: boolean;

    @property()
    room: string;

    @property({ type: Boolean })
    roomChanged: boolean;

    @property({ type: Boolean })
    next: boolean;

    get timeString() {
        return `${this.time.hours.toString().padStart(2, "0")}:${this.time.minutes.toString().padStart(2, "0")}`;
    }

    render = () => html`
        ${this.next ? html`<next-indicator text="This is the next period."></next-indicator>` : nothing}

        <div>
            <p>${this.title}</p>
            <p class="subtitle">at <time datetime=${this.timeString}>${this.timeString}</time> with <span class="${this.teacherChanged ? "changed" : ""}">${this.teacher}</span></p>
        </div>

        <p class="room ${this.roomChanged ? "changed" : ""}">${this.room}</p>
    `;
}