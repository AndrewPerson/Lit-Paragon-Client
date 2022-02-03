import { Page } from "../page/page";

import { html } from "lit";
import { customElement, state, query } from "lit/decorators.js";

import { Resources } from "../../site/resources";

import "./bell";
import "./period";

import { DailyTimetable, Bell, Period, RoomVariation, ClassVariation, TeacherType } from "./types";
import { Timetable } from "../timetable/types";

import { Missing } from "../../missing";

//@ts-ignore
import textCss from "default/text.css";
//@ts-ignore
import cardElementCss from "default/pages/card.css";
//@ts-ignore
import pageCss from "default/pages/page.css";
//@ts-ignore
import dailyTimetableCss from "./daily-timetable.css";

declare const RESOURCE_CACHE: string;

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

        for (let i = 0; i < trailingIndiceCount; i++)
            bells[bells.length - i - 1].display = false;

        for (let i = 0; i < leadingIndiceCount; i++)
            bells.shift();

        this._dailyTimetable = value;
    }

    @state()
    private _dailyTimetable: DailyTimetable;

    @query("#next-class", true)
    private _nextClass: HTMLParagraphElement | null;

    @query("#preposition", true)
    private _preposition: HTMLParagraphElement | null;

    @query("#timer", true)
    private _timer: HTMLHeadingElement | null;

    static async UpdateData() {
        if (this.updatingData) return;
        this.updatingData = true;

        let resourceCache = await caches.open(RESOURCE_CACHE);
        let nextDailyTimetable = await resourceCache.match("next-dailytimetable");

        if (nextDailyTimetable === undefined) {
            let succeeded = await Resources.FetchResources();

            if (succeeded) {
                this.updatingData = false;
                return;
            }

            //TODO Get the rest of this working offline
            return;

            let timetable = await Resources.GetResourceNow("timetable") as Timetable;

            let bells: {
                bells: {
                    bell: string | Missing,
                    endTime: string | Missing,
                    period: string | Missing,
                    startTime: string | Missing,
                    time: string | Missing,
                    type: string | Missing,
                    bellDisplay: string | Missing,
                    display: undefined | Missing
                }[] | Missing,
                day: string | Missing,
                weekType: string | Missing,
                dayNumber: number | Missing,
                date: string | Missing
            } = await (await fetch("https://student.sbhs.net.au/api/timetable/bells.json")).json();

            let dayNumber = bells.dayNumber;

            if (dayNumber === null || dayNumber === undefined)
                //Keep updatingData true so we don't keep trying
                return;

            let day = timetable.days?.[dayNumber ?? -1];

            if (day === null || day === undefined)
                //Keep updatingData true so we don't keep trying
                return;

            let dailyTimetable: DailyTimetable = {
                date: bells.date,
                bells: bells.bells?.map(bell => {
                    bell.bellDisplay = bell.bell;
                    return bell;
                }),
                timetable: {
                    timetable: day,
                    subjects: Object.fromEntries(timetable.subjects?.map(subject => {
                        return [`${subject?.year}${subject?.shortTitle}`, subject];
                    }) ?? [])
                },
                roomVariations: [],
                classVariations: []
            };
        }
        else {
            await caches.delete("next-dailytimetable");
            await Resources.SetResource("dailytimetable", await nextDailyTimetable.text());

            this.updatingData = false;
        }
    }

    constructor() {
        super();

        this.AddResource("dailytimetable", "dailyTimetable");

        setInterval(() => {
            let timerDisplay = this.GetTimerDisplay();

            if (timerDisplay === undefined)
                StudentDailyTimetable.UpdateData();

            if (this._nextClass !== null) this._nextClass.innerText = timerDisplay?.nextClass ?? "Nothing";
            if (this._preposition !== null) this._preposition.innerText = timerDisplay?.preposition ?? "in";
            if (this._timer !== null) this._timer.innerText = timerDisplay?.time ?? "Never";
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
                                           classVariation.casualSurname ?? `${classVariation.casual ?? "????"}.`}"
                                ?teacherChanged="${teacherChanged}"
                                room="${roomVariation?.roomTo ?? period.room ?? "???"}"
                                ?roomChanged="${roomChanged}"></daily-timetable-period>
        `;
    }

    GetTimerDisplay() {
        let nextBell = this.NextBell();

        if (nextBell === undefined) return undefined;

        let nextClass = this._dailyTimetable?.timetable?.timetable?.periods?.[nextBell?.bell ?? ""];
        let nextClassName = nextBell?.bellDisplay ?? "Nothing";

        if (nextClass !== undefined && nextClass !== null && "year" in nextClass)
            nextClassName = this.GetPeriodTitle(nextClass.year ?? "?", nextClass.title ?? "???");

        let timeDisplay = { time: "Never", preposition: "in" };
        if (nextBell !== undefined) timeDisplay = this.TimeDisplay(nextBell);

        return {
            nextClass: nextClassName,
            ...timeDisplay
        };
    }

    updated() {
        if (this._dailyTimetable === undefined) return;

        let timerDisplay = this.GetTimerDisplay();

        if (timerDisplay === undefined)
            StudentDailyTimetable.UpdateData();

        if (this._nextClass !== null) this._nextClass.innerText = timerDisplay?.nextClass ?? "Nothing";
        if (this._preposition !== null) this._preposition.innerText = timerDisplay?.preposition ?? "in";
        if (this._timer !== null) this._timer.innerText = timerDisplay?.time ?? "Never";
    }

    renderPage() {
        let bells = this._dailyTimetable.bells ?? [];
        let periods = this._dailyTimetable.timetable?.timetable?.periods ?? {};

        let roomVariations = (Array.isArray(this._dailyTimetable.roomVariations) ? {} : this._dailyTimetable.roomVariations) ?? {};
        let classVariations = (Array.isArray(this._dailyTimetable.classVariations) ? {} : this._dailyTimetable.classVariations) ?? {};

        return html`
            <div class="next-display">
                <p id="next-class">Nothing</p>
                <p id="preposition">in</p>
                <h1 id="timer">Never</h1>
            </div>

            <div class="periods">
                ${bells.filter(bell => bell.display !== false).map(bell => {
                    if (bell.period !== undefined && bell.period !== null && bell.period in periods) {
                        let period = periods[bell.period];

                        if (period !== undefined && period !== null &&
                            "fullTeacher" in period && period.fullTeacher !== undefined && period.fullTeacher !== null &&
                            "year" in period && period.year !== undefined && period.year !== null)
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
