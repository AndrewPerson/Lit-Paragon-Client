import { Page } from "../page/page";

import { html, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";

import { Resources } from "../../site/resources";

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
export class StudentDailyTimetable extends Page {
    static styles = [textCss, pageCss, cardElementCss, dailyTimetableCss];

    static updatingData: boolean = false;

    set dailyTimetable(value: DailyTimetable) {
        let bells = value.bells;

        if (bells === undefined || bells === null) {
            this._dailyTimetable = value;
            return;
        }

        let periods = value.timetable?.timetable?.periods ?? {};

        let foundStartofDay = false;

        let leadingIndiceCount = 0;
        let trailingIndiceCount = 0;

        for (let i = 0; i < bells.length; i++) {
            let bell: Bell = bells[i];

            if (bell.period !== undefined && bell.period !== null && bell.period in periods) {
                foundStartofDay = true;
                trailingIndiceCount = 0;
            }
            else {
                if (foundStartofDay == false) leadingIndiceCount++;
                else trailingIndiceCount++;
            }
        }

        for (let i = 0; i < trailingIndiceCount; i++) {
            bells[i].display = false;
        }

        for (let i = 0; i < leadingIndiceCount; i++) {
            bells.shift();
        }

        this._dailyTimetable = value;
        this._dailyTimetableChanged = true;
    }

    @state()
    private _dailyTimetable: DailyTimetable;

    private _dailyTimetableChanged: boolean = false;
    private _savedPeriodsHtml: TemplateResult<1>[] = [];

    static UpdateData() {
        if (this.updatingData) return;
        this.updatingData = true;

        Resources.FetchResources().then(succeeded => {
            //If it didn't succeed, make it look like the data is still being
            //updated so that we won't keep trying to update it.
            this.updatingData = !succeeded;
        });
    }

    constructor() {
        super();

        this.AddResource("dailytimetable", "dailyTimetable");

        setInterval(() => {
            this.requestUpdate();
        }, 1000);
    }

    BellDate(bell: Bell) {
        let time = new Date(this._dailyTimetable.date ?? "");

        let parts = bell.time?.split(":") ?? ["00", "00"];

        let hours = Number.parseInt(parts[0]);
        let minutes = Number.parseInt(parts[1]);

        time.setHours(hours);
        time.setMinutes(minutes);

        return time;
    }

    NextBell() {
        let now = new Date();

        for (let bell of this._dailyTimetable.bells ?? []) {
            if (bell.time === undefined || bell.time === null) continue;

            let time = this.BellDate(bell);

            if (time.getTime() >= now.getTime()) return bell;
        }

        return undefined;
    }

    TimeDisplay(bell: Bell) {
        let time = this.BellDate(bell);
        let now = new Date();

        let timeDifference = time.getTime() - now.getTime();

        if (now.getMonth() > time.getMonth() && now.getDate() > time.getDate()) {
            let difference = (time.getMonth() < now.getMonth() ? time.getMonth() + 12 : time.getMonth()) - now.getMonth();

            return {
                preposition: "in",
                time: difference +
                      (difference == 1 ?
                      " Month" :
                      " Months")
            };
        }
        //Length of one day in ms
        else if (timeDifference > 86400000) {
            var days = Math.round(timeDifference / 86400000);

            if (days == 1)
                return {
                    preposition: "is",
                    time: "Tomorrow"
                };

            return {
                preposition: "in",
                time: days + " Days"
            };
        }
        else {
            let hours = Math.floor(timeDifference / 3600000).toString();
            let minutes = Math.floor((timeDifference % 3600000) / 60000).toString();
            let seconds = Math.floor(((timeDifference % 3600000) % 60000) / 1000).toString();

            if (hours.length < 2)
                hours = "0" + hours;

            if (minutes.length < 2)
                minutes = "0" + minutes;

            if (seconds.length < 2)
                seconds = "0" + seconds;
            
            if (hours == "00")
                return {
                    preposition: "in",
                    time: `${minutes}:${seconds}`
                };

            return {
                preposition: "in",
                time: `${hours}:${minutes}:${seconds}`
            }
        }
    }

    FormatTeacherCode(code: string) {
        if (code.length == 0) return "";
        if (code.length == 1) return code.toUpperCase();
        if (code.length == 2) return `${code[0].toUpperCase()} ${code[1].toUpperCase()}`;

        return `${code[0].toUpperCase()} ${code[1].toUpperCase()}${code.substring(2).toLowerCase()}`;
    }

    GetBell(bell: Bell) {
        return html`<daily-timetable-bell title="${bell.bellDisplay ?? "???"}" time="${bell.time ?? "??:??"}"></daily-timetable-bell>`;
    }

    GetPeriodTitle(year: string, title: string) {
        let fullName = this._dailyTimetable?.timetable?.subjects?.[`${year}${title}`]?.title ?? title;
        
        return fullName.split(" ").filter(word => (isNaN(parseFloat(word)) && word.length > 1) || word == "&").join(" ");
    }

    GetPeriod(period: Period, bell: Bell, classVariation: ClassVariation | Missing, roomVariation: RoomVariation | Missing) {
        let teacherChanged = classVariation !== undefined && classVariation !== null && classVariation.type != TeacherType.NO_VARIATION;
        let roomChanged = roomVariation !== undefined && roomVariation !== null;

        return html`
        <daily-timetable-period title="${this.GetPeriodTitle(period.year ?? "?", period.title ?? "???")}"
                                time="${bell.time ?? "??:??"}"
                                teacher="${classVariation === undefined || classVariation === null ? period.fullTeacher ?? "???" :
                                           classVariation.type == TeacherType.NO_VARIATION ? period.fullTeacher ?? "???" :
                                           classVariation.type == TeacherType.NO_COVER ? "No one" :
                                           classVariation.casualSurname ?? this.FormatTeacherCode(classVariation.casual ?? "????")}"
                                ?teacherChanged="${teacherChanged}"
                                room="${roomVariation?.roomTo ?? period.room ?? "???"}"
                                ?roomChanged="${roomChanged}"></daily-timetable-period>
        `;
    }

    renderPage() {
        let nextBell = this.NextBell();

        if (nextBell === undefined) {
            StudentDailyTimetable.UpdateData();
        }

        let nextClass = this._dailyTimetable?.timetable?.timetable?.periods?.[nextBell?.bell ?? ""];
        let nextClassName = nextBell?.bellDisplay ?? "Nothing";

        if (nextClass !== undefined && nextClass !== null && "year" in nextClass) {
            nextClassName = this.GetPeriodTitle(nextClass.year ?? "?", nextClass.title ?? "???");
        }

        let timeDisplay = { time: "Never", preposition: "in" };
        if (nextBell !== undefined) timeDisplay = this.TimeDisplay(nextBell);

        let bells = this._dailyTimetable.bells ?? [];
        let periods = this._dailyTimetable.timetable?.timetable?.periods ?? {};

        let roomVariations = (Array.isArray(this._dailyTimetable.roomVariations) ? {} : this._dailyTimetable.roomVariations) ?? {};
        let classVariations = (Array.isArray(this._dailyTimetable.classVariations) ? {} : this._dailyTimetable.classVariations) ?? {};

        let periodsHtml = this._dailyTimetableChanged ? bells.filter(bell => bell.display ?? true).map(bell => {
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
        }) : this._savedPeriodsHtml;

        let result = html`
            <div class="next-display">
                <p>${nextClassName}</p>
                <p>${timeDisplay.preposition}</p>
                <div class="timer-container">
                    <span class="line left"></span>
                    <h1 class="timer">${timeDisplay.time}</h1>
                    <span class="line right"></span>
                </div>
            </div>

            <div class="periods">
                ${periodsHtml}
            </div>
        `;

        this._dailyTimetableChanged = false;
        this._savedPeriodsHtml = periodsHtml;
        return result;
    }
}