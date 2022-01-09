import { Page } from "../page/page";

import { html } from "lit";
import { customElement, state } from "lit/decorators.js";

import { DailyTimetable, Bell, RollCall, Period, RoomVariation, ClassVariation } from "./types";

import "./bell";
import "./period";

//@ts-ignore
import textCss from "default/text.css";
//@ts-ignore
import cardElementCss from "default/pages/card.css";
//@ts-ignore
import pageCss from "default/pages/page.css";
//@ts-ignore
import dailyTimetableCss from "./daily-timetable.css";

@customElement("daily-timetable")
export class SchoolAnnouncements extends Page {
    static styles = [pageCss, cardElementCss, textCss, dailyTimetableCss];

    @state()
    dailyTimetable: DailyTimetable;

    constructor() {
        super();

        this.AddResource("dailytimetable", "dailyTimetable");
    }

    GetBell(bell: Bell) {
        return html`<daily-timetable-bell title="${bell.bellDisplay}" time="${bell.time}"></daily-timetable-bell>`;
    }

    GetPeriod(period: Period | RollCall, roomVariation: RoomVariation | undefined, classVariation: ClassVariation | undefined) {
        return html`
        <daily-timetable-period></daily-timetable-period>
        `;
    }

    renderPage() {
        let bells = this.dailyTimetable.bells;
        let periods = this.dailyTimetable.timetable.timetable.periods;

        let roomVariations = Array.isArray(this.dailyTimetable.roomVariations) ? {} : this.dailyTimetable.roomVariations;
        let classVariations = Array.isArray(this.dailyTimetable.classVariations) ? {} : this.dailyTimetable.classVariations;

        return html`
            <div class="next-display">
                <p>Nothing</p>
                <p>in</p>
                <div class="timer-container">
                    <span class="line left"></span>
                    <h1 class="timer">Never</h1>
                    <span class="line right"></span>
                </div>
            </div>

            <div class="periods">
                ${bells.map(bell => {
                    if (bell.period in periods) {
                        let period = periods[bell.period];

                        //Check if the bell is a roll call
                        if ("fullTeacher" in period && "year" in period)
                            return this.GetPeriod(periods[bell.period], roomVariations[bell.period], classVariations[bell.period]);
                        else
                            return this.GetBell(bell);
                    }
                    else
                        return this.GetBell(bell);
                })}
            </div>
        `;
    }
}