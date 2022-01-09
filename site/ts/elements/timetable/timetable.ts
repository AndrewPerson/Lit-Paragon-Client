import { Page } from "../page/page";

import { html } from "lit";
import { customElement, state } from "lit/decorators.js";

import { Timetable } from "./types";
import { DailyTimetable } from "../daily-timetable/types";

import "./row";

import { TimetablePeriod } from "./period";

//@ts-ignore
import pageCss from "default/pages/page.css";
//@ts-ignore
import timetableCss from "./timetable.css";

@customElement("full-timetable")
export class FullTimetable extends Page {
    static styles = [pageCss, timetableCss];

    @state()
    timetable: Timetable;

    set dailyTimetable(value: DailyTimetable) {
        this._day = value.timetable.timetable.dayname;
    }

    @state()
    private _day: string;

    ClearHighlight() {
        TimetablePeriod.highlight("");
    }

    constructor() {
        super();

        this.AddResource("timetable", "timetable");
        this.AddResource("dailytimetable", "dailyTimetable");

        this.addEventListener("pointerover", e => e.stopPropagation());
        document.addEventListener("pointerover", this.ClearHighlight);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        
        document.removeEventListener("pointerover", this.ClearHighlight);
    }

    renderPage() {        
        this._day = this._day.slice(0, 3).toUpperCase() + " " + this._day.slice(-1);

        return html`
            <timetable-row week="A"
                           .day1="${this.timetable.days["1"]}"
                           .day2="${this.timetable.days["2"]}"
                           .day3="${this.timetable.days["3"]}"
                           .day4="${this.timetable.days["4"]}"
                           .day5="${this.timetable.days["5"]}"
                           day="${this._day}">
            </timetable-row>
            <timetable-row week="B"
                           .day1="${this.timetable.days["6"]}"
                           .day2="${this.timetable.days["7"]}"
                           .day3="${this.timetable.days["8"]}"
                           .day4="${this.timetable.days["9"]}"
                           .day5="${this.timetable.days["10"]}"
                           day="${this._day}">
            </timetable-row>
            <timetable-row week="C"
                           .day1="${this.timetable.days["11"]}"
                           .day2="${this.timetable.days["12"]}"
                           .day3="${this.timetable.days["13"]}"
                           .day4="${this.timetable.days["14"]}"
                           .day5="${this.timetable.days["15"]}"
                           day="${this._day}">
            </timetable-row>
        `;
    }
}