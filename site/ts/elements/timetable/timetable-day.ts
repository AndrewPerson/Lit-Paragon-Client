import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import { Periods } from "./types";

import "./timetable-period";

//@ts-ignore
import textCss from "default/text.css";
//@ts-ignore
import timetableDayCss from "./timetable-day.css";

@customElement("timetable-day")
export class TimetableDay extends LitElement {
    static styles = [textCss, timetableDayCss];

    @property()
    name: string;

    @property({ type: Array })
    periods: Periods;

    @property()
    day: string;

    render() {
        return html`
            <p class="name ${this.day == this.name ? "highlighted" : ""}">${this.name}</p>
            
            <timetable-period name="${this.periods["1"]?.title}"
                              room="${this.periods["1"]?.room}">
            </timetable-period>
            <timetable-period name="${this.periods["2"]?.title}"
                              room="${this.periods["2"]?.room}">
            </timetable-period>
            <timetable-period name="${this.periods["3"]?.title}"
                              room="${this.periods["3"]?.room}">
            </timetable-period>
            <timetable-period name="${this.periods["4"]?.title}"
                              room="${this.periods["4"]?.room}">
            </timetable-period>
            <timetable-period name="${this.periods["5"]?.title}"
                              room="${this.periods["5"]?.room}">
            </timetable-period>
        `;
    }
}