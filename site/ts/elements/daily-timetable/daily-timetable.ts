import { Page } from "../page/page";

import { html } from "lit";
import { customElement, state } from "lit/decorators.js";

import "./bell";
import "./period";

import { DailyTimetable, Bell, Period, RoomVariation, ClassVariation, TeacherType } from "./types";

import { Missing } from "../../missing";

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
    static styles = [textCss, pageCss, cardElementCss, dailyTimetableCss];

    set dailyTimetable(value: DailyTimetable) {
        let bells = value.bells;

        if (bells === undefined || bells === null) {
            this._dailyTimetable = value;
            return;
        }

        let periods = value.timetable?.timetable?.periods ?? {};

        let foundStartofDay = false;

        let indicesToRemove: number[] = [];

        let trailingIndices: number[] = [];

        for (let i = 0; i < bells.length; i++) {
            let bell: Bell = bells[i];

            if (bell.period !== undefined && bell.period !== null && bell.period in periods) {
                foundStartofDay = true;
                trailingIndices = [];
            }
            else {
                if (foundStartofDay == false) indicesToRemove.push(i);
                else trailingIndices.push(i);
            }
        }

        indicesToRemove.push(...trailingIndices);

        for (let i = indicesToRemove.length - 1; i >= 0; i--) {
            bells.splice(indicesToRemove[i], 1);
        }

        this._dailyTimetable = value;
    }

    @state()
    private _dailyTimetable: DailyTimetable;

    constructor() {
        super();

        this.AddResource("dailytimetable", "dailyTimetable");
    }

    GetBell(bell: Bell) {
        return html`<daily-timetable-bell title="${bell.bellDisplay ?? "???"}" time="${bell.time ?? "??:??"}"></daily-timetable-bell>`;
    }

    GetPeriodTitle(year: string, title: string) {
        let fullName = this._dailyTimetable?.timetable?.subjects?.[`${year}${title}`]?.title ?? title;

        return fullName.split(" ").filter(word => (isNaN(parseFloat(word)) && word.length > 1) || word =="&").join(" ");
    }

    FormatTeacherCode(code: string) {
        if (code.length == 0) return "";
        if (code.length == 1) return code.toUpperCase();
        if (code.length == 2) return `${code[0].toUpperCase()} ${code[1].toUpperCase()}`;

        return `${code[0].toUpperCase()} ${code[1].toUpperCase()}${code.substring(2).toLowerCase()}`;
    }

    GetPeriod(period: Period, bell: Bell, classVariation: ClassVariation | Missing, roomVariation: RoomVariation | Missing) {
        return html`
        <daily-timetable-period title="${this.GetPeriodTitle(period.year ?? "?", period.title ?? "???")}"
                                time="${bell.time ?? "??:??"}"
                                teacher="${classVariation === undefined || classVariation === null ? period.fullTeacher ?? "???" :
                                           classVariation.type == TeacherType.NO_VARIATION ? period.fullTeacher ?? "???" :
                                           classVariation.type == TeacherType.NO_COVER ? "No one" :
                                           classVariation.casualSurname ?? this.FormatTeacherCode(classVariation.casual ?? "????")}"
                                room="${roomVariation?.roomTo ?? period.room ?? "???"}"></daily-timetable-period>
        `;
    }

    renderPage() {
        let bells = this._dailyTimetable.bells ?? [];
        let periods = this._dailyTimetable.timetable?.timetable?.periods ?? {};

        let roomVariations = (Array.isArray(this._dailyTimetable.roomVariations) ? {} : this._dailyTimetable.roomVariations) ?? {};
        let classVariations = (Array.isArray(this._dailyTimetable.classVariations) ? {} : this._dailyTimetable.classVariations) ?? {};

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

                    if (bell.period !== undefined && bell.period !== null && bell.period in periods) {
                        let period = periods[bell.period];

                        //Check if the bell is a roll call
                        if (period !== undefined && period !== null && "fullTeacher" in period && "year" in period)
                            return this.GetPeriod(period, bell, classVariations[bell.period], roomVariations[bell.period]);
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