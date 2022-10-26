import { html, unsafeCSS, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

//@ts-ignore
import periodCss from "./period.css";
//@ts-ignore
import textCss from "default/text.css";

declare const SKIN_CSS: string;

@customElement("daily-timetable-period")
export class DailyTimetablePeriod extends LitElement {
    static styles = [textCss, periodCss, unsafeCSS(SKIN_CSS ?? "")];

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

    render() {
        return html`
            <div>
                <p>${this.title}</p>
                <p class="subtitle">at <span>${this.time}</span> with <span class="${this.teacherChanged ? "changed" : ""}">${this.teacher}</span></p>
            </div>

            <p class="${this.roomChanged ? "changed" : ""}">${this.room}</p>
        `;
    }
}