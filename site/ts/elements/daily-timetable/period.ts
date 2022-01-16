import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

//@ts-ignore
import periodCss from "./period.css";
//@ts-ignore
import textCss from "default/text.css";

@customElement("daily-timetable-period")
export class Bell extends LitElement {
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

    render() {
        return html`
            <div>
                <p>${this.title}</p>
                <p class="info">at <span class="${this.roomChanged ? "changed" : ""}">${this.room}</span> with <span class="${this.teacherChanged ? "changed" : ""}">${this.teacher}</span></p>
            </div>

            <p>${this.time}</p>
        `;
    }
}