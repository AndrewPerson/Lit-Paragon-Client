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

    @property()
    room: string;

    render() {
        return html`
            <div>
                <p>${this.title}</p>
                <p class="info">at ${this.time} with ${this.teacher}</p>
            </div>

            <p>${this.time}</p>
        `;
    }
}