import { Page } from "../page/page";

import { html } from "lit";
import { customElement, state, query } from "lit/decorators.js";

import { DailyTimetableUtils } from "./daily-timetable-utils";

import { Resources } from "../../site/resources";

import { bells } from "./bells";

import "./bell";
import "./period";

import { DailyTimetable, Bell, Period, RoomVariation, ClassVariation, TeacherType } from "./types";
import { Day, Timetable } from "../timetable/types";

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

        if (nextDailyTimetable === undefined || nextDailyTimetable === null || firstBell === undefined ||
            DailyTimetableUtils.BellToDate(firstBell, new Date(nextDailyTimetable.date ?? "")).getTime() <= new Date().getTime()) {
            let succeeded = await Resources.FetchResources();

            let currentDailyTimetable = await Resources.GetResourceNow("dailytimetable") as DailyTimetable | Missing;
            if (currentDailyTimetable === undefined || currentDailyTimetable === null)
                //Keep updatingData true so we don't keep trying
                return;

            if (currentDailyTimetable.date === undefined || currentDailyTimetable.date === null)
                //Keep updatingData true so we don't keep trying
                return;

            if (currentDailyTimetable.timetable?.timetable?.dayNumber === undefined || currentDailyTimetable.timetable?.timetable?.dayNumber === null)
                //Keep updatingData true so we don't keep trying
                return;

            if (currentDailyTimetable.bells === undefined || currentDailyTimetable.bells === null)
                //Keep updatingData true so we don't keep trying
                return;

            let currentDailyTimetableDate = new Date(currentDailyTimetable.date);
            let lastBell = currentDailyTimetable.bells[currentDailyTimetable.bells.length - 1];

            //Check if the returned date is not today.
            if (succeeded && lastBell !== undefined && DailyTimetableUtils.BellToDate(lastBell, currentDailyTimetableDate).getTime() > new Date().getTime()) {
                this.updatingData = false;
                return;
            }

            let timetable = await Resources.GetResourceNow("timetable") as Timetable | Missing;
            if (timetable === undefined || timetable === null)
                //Keep updatingData true so we don't keep trying
                return;

            let now = new Date();

            while (now.getTime() > DailyTimetableUtils.BellToDate(lastBell, currentDailyTimetableDate).getTime()) {
                let adjustedNow = new Date(now);

                if (adjustedNow.getFullYear() == currentDailyTimetableDate.getFullYear() &&
                    adjustedNow.getMonth() == currentDailyTimetableDate.getMonth() &&
                    adjustedNow.getDate() == currentDailyTimetableDate.getDate())
                    adjustedNow.setDate(adjustedNow.getDate() + 1);

                if (adjustedNow.getDay() == 6)
                    adjustedNow.setDate(adjustedNow.getDate() + 1);

                if (adjustedNow.getDay() == 0)
                    adjustedNow.setDate(adjustedNow.getDate() + 1);

                //YYYY-MM-DD
                let date = `${adjustedNow.getFullYear().toString().padStart(2, "0")}-${(adjustedNow.getMonth() + 1).toString().padStart(2, "0")}-${adjustedNow.getDate().toString().padStart(2, "0")}`

                //Day number (1 - 15)
                let dayNumber: number = (parseInt(currentDailyTimetable.timetable!.timetable.dayNumber) + DailyTimetableUtils.GetSchoolDayCount(currentDailyTimetableDate, now) - 1) % 15 + 1;

                let newBells = bells[dayNumber - 1];
                if (newBells === undefined)
                    //Keep updatingData true so we don't keep trying
                    return;

                let day: Day | Missing = timetable.days?.[dayNumber.toString()];
                if (day === null || day === undefined)
                    //Keep updatingData true so we don't keep trying
                    return;

                if (day.dayNumber === null || day.dayNumber === undefined)
                    //Keep updatingData true so we don't keep trying
                    return;

                currentDailyTimetable = {
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

                currentDailyTimetableDate = new Date(adjustedNow);
                lastBell = newBells[newBells.length - 1];
            }
            
            await Resources.SetResource("dailytimetable", JSON.stringify(currentDailyTimetable));

            this.updatingData = false;
        }
        else {
            let resourceCache = await caches.open(RESOURCE_CACHE);
            await resourceCache.delete("next-dailytimetable");

            await Resources.SetResource("dailytimetable", JSON.stringify(nextDailyTimetable));

            this.updatingData = false;
        }
    }

    constructor() {
        super();

        this.AddResource("dailytimetable", (dailyTimetable: DailyTimetable) => {
            let bells = dailyTimetable.bells;

            if (bells === undefined || bells === null) {
                this._dailyTimetable = dailyTimetable;
                return;
            }

            let periods = dailyTimetable.timetable?.timetable?.periods ?? {};

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

            this._dailyTimetable = dailyTimetable;
        });

        setInterval(() => {
            //We need this because this can run before _dailyTimetable is initialised.
            if (this._dailyTimetable === undefined) return;

            this.RenderNextBell();
        }, 1000);
    }

    GetBell(bell: Bell) {
        return html`<daily-timetable-bell title="${bell.bellDisplay ?? "???"}" time="${bell.time ?? "??:??"}"></daily-timetable-bell>`;
    }

    GetPeriod(period: Period, bell: Bell, classVariation: ClassVariation | Missing, roomVariation: RoomVariation | Missing) {
        let teacherChanged = classVariation !== undefined && classVariation !== null && classVariation.type != TeacherType.NO_VARIATION;
        let roomChanged = roomVariation !== undefined && roomVariation !== null;

        return html`
        <daily-timetable-period title="${DailyTimetableUtils.GetPeriodTitle(this._dailyTimetable, period.year ?? "?", period.title ?? "???")}" class="${classVariation?.type == TeacherType.NO_COVER ? "cancelled" : ""}"
                                time="${bell.time ?? "??:??"}"
                                teacher="${classVariation === undefined || classVariation === null ? (period.fullTeacher?.trim().length == 0 ? "No one" : period.fullTeacher) ?? "???" :
                                           classVariation.type == TeacherType.NO_VARIATION ? period.fullTeacher ?? "???" :
                                           classVariation.type == TeacherType.NO_COVER ? "No one" :
                                           classVariation.casualSurname ?? DailyTimetableUtils.FormatCasualCode(classVariation.casual ?? "????")}"
                                ?teacherChanged="${teacherChanged}"
                                room="${roomVariation?.roomTo ?? period.room ?? "???"}"
                                ?roomChanged="${roomChanged}"></daily-timetable-period>
        `;
    }

    RenderNextBell() {
        let nextBellInfo = DailyTimetableUtils.GetCurrentBell(this._dailyTimetable, new Date());

        if (nextBellInfo === undefined)
            StudentDailyTimetable.UpdateData();

        let nextClass = this._dailyTimetable?.timetable?.timetable?.periods?.[nextBellInfo?.bell?.period ?? ""];
        let nextClassName = nextBellInfo?.bell?.bellDisplay ?? "Nothing";

        if (nextClass !== undefined && nextClass !== null && "year" in nextClass)
            nextClassName = DailyTimetableUtils.GetPeriodTitle(this._dailyTimetable, nextClass.year ?? "?", nextClass.title ?? "???");

        let timeDisplay = { time: "Never", preposition: "in" };
        if (nextBellInfo?.bell !== undefined) timeDisplay = DailyTimetableUtils.HumanTimeDisplay(nextBellInfo.bell, new Date(this._dailyTimetable.date ?? ""), new Date());

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
