import { html, nothing, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

//@ts-ignore
import periodCss from "./period.css";
//@ts-ignore
import textCss from "default/text.css";

@customElement("daily-timetable-period")
export class DailyTimetablePeriod extends LitElement {
    static styles = [textCss, periodCss];

    @property()
    title: string;

    @property()
    time: string;

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

    render() {
        return html`
            ${this.next ? html`<next-indicator text="This is the next period."></next-indicator>` : nothing}

            <div>
                <p>${this.title}</p>
                <p class="subtitle">at <span>${this.time}</span> with <span class="${this.teacherChanged ? "changed" : ""}">${this.teacher}</span></p>
            </div>

            <p class="${this.roomChanged ? "changed" : ""}">${this.room}</p>
        `;
    }
}