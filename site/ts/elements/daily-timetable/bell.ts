import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

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

    render() {
        return html`
            <p>${this.title}</p>
            <p>${this.time}</p>
        `;
    }
}