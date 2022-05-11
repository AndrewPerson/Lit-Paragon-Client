import { Page } from "../page/page";

import { html } from "lit";
import { customElement, state, query } from "lit/decorators.js";

import { Resources } from "../../site/resources";

import { bells } from "./bells";

import "./bell";
import "./period";

import { DailyTimetable, Bell, Period, RoomVariation, ClassVariation, TeacherType } from "./types";
import { Timetable } from "../timetable/types";

import { Missing } from "../../missing";

//@ts-ignore
import textCss from "default/text.css";
//@ts-ignore
import scrollbarCss from "default/scrollbar.css";
//@ts-ignore
import cardElementCss from "default/pages/card.css";
//@ts-ignore
import pageCss from "default/pages/page.css";
//@ts-ignore
import dailyTimetableCss from "./daily-timetable.css";

declare const RESOURCE_CACHE: string;
declare const MAX_DAILY_TIMETABLE_DATA_UPDATE_FREQUENCY: number;

@customElement("daily-timetable")
export class StudentDailyTimetable extends Page {
    static styles = [textCss, scrollbarCss, pageCss, cardElementCss, dailyTimetableCss];

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

    @query("#periods", true)
    private _periods: HTMLDivElement | null;

    private _nextPeriod: Element | null = null;

    private static _lastUpdatedData?: Date;

    static async UpdateData() {
        if (this._lastUpdatedData !== undefined) {
            let now = new Date();
            if (this._lastUpdatedData.getTime() + MAX_DAILY_TIMETABLE_DATA_UPDATE_FREQUENCY > now.getTime()) {
                this._lastUpdatedData = now;
                return;
            }
        }

        if (this.updatingData) return;
        this.updatingData = true;

        this._lastUpdatedData = new Date();

        let nextDailyTimetable = await Resources.GetResourceNow("next-dailytimetable") as DailyTimetable | Missing;

        let firstBell = nextDailyTimetable?.bells?.[nextDailyTimetable.bells?.length ?? 0];

        if (nextDailyTimetable === undefined || nextDailyTimetable === null || firstBell === undefined || this.BellToDate(firstBell, nextDailyTimetable).getTime() <= new Date().getTime()) {
            let succeeded = await Resources.FetchResources();

            let currentDailyTimetable = await Resources.GetResourceNow("dailytimetable") as DailyTimetable | Missing;
            if (currentDailyTimetable === undefined || currentDailyTimetable === null)
                //Keep updatingData true so we don't keep trying
                return;

            if (currentDailyTimetable.date === undefined || currentDailyTimetable.date === null)
                //Keep updatingData true so we don't keep trying
                return;

            let firstBell = currentDailyTimetable?.bells?.[currentDailyTimetable.bells?.length ?? 0];

            //Check if the returned date is not today.
            if (succeeded && firstBell !== undefined && this.BellToDate(firstBell, currentDailyTimetable).getTime() > new Date().getTime()) {
                this.updatingData = false;
                return;
            }

            if (currentDailyTimetable.timetable?.timetable?.dayNumber === undefined || currentDailyTimetable.timetable?.timetable?.dayNumber === null)
                //Keep updatingData true so we don't keep trying
                return;

            let dailyTimetableDate = new Date(currentDailyTimetable.date);

            let currentBells = currentDailyTimetable.bells;
            if (currentBells === undefined || currentBells === null)
                //Keep updatingData true so we don't keep trying
                return;

            let now = new Date();

            if (now.getTime() > this.BellToDate(currentBells[currentBells.length - 1], currentDailyTimetable).getTime())
                now.setDate(now.getDate() + 1);

            if (now.getFullYear() == dailyTimetableDate.getFullYear() &&
                now.getMonth() == dailyTimetableDate.getMonth() &&
                now.getDate() == dailyTimetableDate.getDate())
                now.setDate(now.getDate() + 1);

            if (now.getDay() == 6)
                now.setDate(now.getDate() + 1);
        
            if (now.getDay() == 0)
                now.setDate(now.getDate() + 1);
            
            //YYYY-MM-DD
            let date = `${now.getFullYear().toString().padStart(2, "0")}-${now.getMonth().toString().padStart(2, "0")}-${now.getDay().toString().padStart(2, "0")}`

            //Day number (1 - 15)
            let dayNumber = (parseInt(currentDailyTimetable.timetable.timetable.dayNumber) + this.GetSchoolDayCount(dailyTimetableDate, now) - 1) % 15 + 1;

            let newBells = bells[dayNumber - 1];
            if (newBells === null || newBells === undefined)
                //Keep updatingData true so we don't keep trying
                return;

            let timetable = await Resources.GetResourceNow("timetable") as Timetable | Missing;
            if (timetable === undefined || timetable === null)
                //Keep updatingData true so we don't keep trying
                return;

            let day = timetable.days?.[dayNumber.toString()];
            if (day === null || day === undefined)
                //Keep updatingData true so we don't keep trying
                return;

            let dailyTimetable: DailyTimetable = {
                date: date,
                bells: newBells,
                timetable: {
                    timetable: day,
                    subjects: Object.fromEntries(timetable.subjects?.map(subject => {
                        return [`${subject?.year}${subject?.shortTitle}`, subject];
                    }) ?? [])
                },
                roomVariations: [],
                classVariations: []
            }

            await Resources.SetResource("dailytimetable", JSON.stringify(dailyTimetable));

            this.updatingData = false;
        }
        else {
            let resourceCache = await caches.open(RESOURCE_CACHE);
            await resourceCache.delete("next-dailytimetable");

            await Resources.SetResource("dailytimetable", JSON.stringify(nextDailyTimetable));

            this.updatingData = false;
        }
    }

    //Not my code, I just cleaned it up a bit. Code from https://snipplr.com/view/4086/calculate-business-days-between-two-dates
    static GetSchoolDayCount(startDate: Date, endDate: Date) {
        if (endDate.getTime() < startDate.getTime()) return -1;

        let startDay = startDate.getDay();
        let endDay = endDate.getDay();

        // change Sunday from 0 to 7
        startDay = (startDay == 0) ? 7 : startDay;
        endDay = (endDay == 0) ? 7 : endDay;

        // adjustment if both days on weekend
        let adjust = 0;
        if ((startDay > 5) && (endDay > 5)) adjust = 1;

        // only count weekdays
        startDay = (startDay > 5) ? 5 : startDay;
        endDay = (endDay > 5) ? 5 : endDay;

        // calculate difference in weeks (1000ms * 60sec * 60min * 24hrs * 7 days = 604800000)
        let weeks = Math.floor((endDate.getTime() - startDate.getTime()) / 604800000);

        let dateDiff;
        if (startDay <= endDay) dateDiff = weeks * 5 + endDay - startDay;
        else dateDiff = (weeks + 1) * 5 + endDay - startDay;

        // take into account both days on weekend
        dateDiff -= adjust;

        return dateDiff;
    }

    static BellToDate(bell: Bell, dailyTimetable: DailyTimetable) {
        let time = new Date(dailyTimetable.date ?? "");

        let parts = bell.time?.split(":") ?? ["00", "00"];

        let hours = Number.parseInt(parts[0]);
        let minutes = Number.parseInt(parts[1]);

        time.setHours(hours);
        time.setMinutes(minutes);

        return time;
    }

    constructor() {
        super();

        this.AddResource("dailytimetable", "dailyTimetable");

        setInterval(() => {
            //We need this because this can run before _dailyTimetable is initialised.
            if (this._dailyTimetable === undefined) return;

            this.RenderNextBell();
        }, 1000);
    }

    NextBell() {
        let now = new Date();

        let bells = this._dailyTimetable.bells ?? [];

        for (let i = 0; i < bells.length; i++) {
            if (bells[i].time === undefined || bells[i].time === null) continue;

            let time = StudentDailyTimetable.BellToDate(bells[i], this._dailyTimetable);

            if (time.getTime() >= now.getTime()) return {
                index: i,
                bell: bells[i]
            };
        }

        return undefined;
    }

    TimeDisplay(bell: Bell) {
        let time = StudentDailyTimetable.BellToDate(bell, this._dailyTimetable);
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
        let fullName = this._dailyTimetable?.timetable?.subjects?.[`${year}${title}`]?.title;
        
        if (fullName === undefined || fullName === null) {
            let words = title.split(" ");
            words.pop();
            
            return words.join(" ");
        }

        let words = fullName.split(" ");
        words.shift();
        words.pop();

        return words.join(" ");
    }

    FormatCasualCode(code: string) {
        if (code.length == 0) return code;
        if (code.length == 1) return `${code.toUpperCase()}.`;
        
        return `${code[code.length - 1].toUpperCase()} ${code[0].toUpperCase()}${code.substring(1, code.length - 1).toLowerCase()}.`;
    }

    GetPeriod(period: Period, bell: Bell, classVariation: ClassVariation | Missing, roomVariation: RoomVariation | Missing) {
        let teacherChanged = classVariation !== undefined && classVariation !== null && classVariation.type != TeacherType.NO_VARIATION;
        let roomChanged = roomVariation !== undefined && roomVariation !== null;

        return html`
        <daily-timetable-period title="${this.GetPeriodTitle(period.year ?? "?", period.title ?? "???")}" class="${classVariation?.type == TeacherType.NO_COVER ? "cancelled" : ""}"
                                time="${bell.time ?? "??:??"}"
                                teacher="${classVariation === undefined || classVariation === null ? (period.fullTeacher?.trim().length == 0 ? "No one" : period.fullTeacher) ?? "???" :
                                           classVariation.type == TeacherType.NO_VARIATION ? period.fullTeacher ?? "???" :
                                           classVariation.type == TeacherType.NO_COVER ? "No one" :
                                           classVariation.casualSurname ?? this.FormatCasualCode(classVariation.casual ?? "????")}"
                                ?teacherChanged="${teacherChanged}"
                                room="${roomVariation?.roomTo ?? period.room ?? "???"}"
                                ?roomChanged="${roomChanged}"></daily-timetable-period>
        `;
    }

    RenderNextBell() {
        let nextBellInfo = this.NextBell();

        if (nextBellInfo === undefined)
            StudentDailyTimetable.UpdateData();

        let nextClass = this._dailyTimetable?.timetable?.timetable?.periods?.[nextBellInfo?.bell?.period ?? ""];
        let nextClassName = nextBellInfo?.bell?.bellDisplay ?? "Nothing";

        if (nextClass !== undefined && nextClass !== null && "year" in nextClass)
            nextClassName = this.GetPeriodTitle(nextClass.year ?? "?", nextClass.title ?? "???");

        let timeDisplay = { time: "Never", preposition: "in" };
        if (nextBellInfo?.bell !== undefined) timeDisplay = this.TimeDisplay(nextBellInfo.bell);

        if (this._nextClass !== null) this._nextClass.innerText = nextClassName ?? "Nothing";
        if (this._preposition !== null) this._preposition.innerText = timeDisplay?.preposition ?? "in";
        if (this._timer !== null) this._timer.innerText = timeDisplay?.time ?? "Never";

        let nextPeriod = this._periods?.children[nextBellInfo?.index ?? 0];

        if (nextPeriod !== this._nextPeriod) {
            this._nextPeriod?.classList.remove("next");
            this._nextPeriod = nextPeriod ?? null;
        }

        nextPeriod?.classList.add("next");
    }

    updated() {
        //We need this because this can run before _dailyTimetable is initialised.
        if (this._dailyTimetable === undefined) return;

        this.RenderNextBell();
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

            <div id="periods">
                ${bells.filter(bell => bell.display !== false).map(bell => {
                    if (bell.period !== undefined && bell.period !== null && bell.period in periods) {
                        let period = periods[bell.period];

                        if (period !== undefined && period !== null &&
                            "fullTeacher" in period && period.fullTeacher !== undefined && period.fullTeacher !== null &&
                            period.room !== undefined && period.room !== null)
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
