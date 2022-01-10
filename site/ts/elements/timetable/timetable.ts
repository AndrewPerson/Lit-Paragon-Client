import { Page } from "../page/page";

import { html } from "lit";
import { customElement, state } from "lit/decorators.js";

import { Timetable, Day } from "./types";
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

        let days = Object.keys(this.timetable.days);

        let dayGroups: Day[][] = [];
        for (let i = 0; i < days.length; i++) {
            //We use 5 because there are 5 days in a week when we go to school.
            let dayGroupIndex = Math.floor(i / 5);

            if (dayGroups.length > dayGroupIndex) dayGroups[dayGroupIndex].push(this.timetable.days[days[i]]);
            else dayGroups[dayGroupIndex] = [this.timetable.days[days[i]]];
        }

        return html`
            ${dayGroups.map((dayGroup, index) => html`
            <timetable-row week="${String.fromCharCode(65 + index)}"
                           .day1="${dayGroup[0]}"
                           .day2="${dayGroup[1]}"
                           .day3="${dayGroup[2]}"
                           .day4="${dayGroup[3]}"
                           .day5="${dayGroup[4]}"
                           day="${this._day}">
            </timetable-row>
            `)}
        `;
    }
}