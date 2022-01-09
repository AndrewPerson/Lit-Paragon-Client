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

    render() {
        return html`
            <p>${this.title}</p>
            <p>${this.time}</p>
        `;
    }
}