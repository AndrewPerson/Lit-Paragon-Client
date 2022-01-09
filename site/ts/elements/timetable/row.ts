import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import { Day } from "./types";

import "./day";

//@ts-ignore
import textCss from "default/text.css";
//@ts-ignore
import rowCss from "./row.css";

@customElement("timetable-row")
export class TimetableRow extends LitElement {
    static styles = [textCss, rowCss];

    @property()
    week: string;

    @property({ type: Object })
    day1: Day;

    @property({ type: Object })
    day2: Day;

    @property({ type: Object })
    day3: Day;

    @property({ type: Object })
    day4: Day;

    @property({ type: Object })
    day5: Day;

    @property()
    day: string;

    render() {
        return html`
            <div class="period-nums">
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
            </div>

            <timetable-day name="MON ${this.week}"
                           .periods="${this.day1.periods}"
                           day="${this.day}">
            </timetable-day>

            <timetable-day name="TUE ${this.week}"
                           .periods="${this.day2.periods}"
                           day="${this.day}">
            </timetable-day>

            <timetable-day name="WED ${this.week}"
                           .periods="${this.day3.periods}"
                           day="${this.day}">
            </timetable-day>

            <timetable-day name="THU ${this.week}"
                           .periods="${this.day4.periods}"
                           day="${this.day}">
            </timetable-day>

            <timetable-day name="FRI ${this.week}"
                           .periods="${this.day5.periods}"
                           day="${this.day}">
            </timetable-day>
        `;
    }
}