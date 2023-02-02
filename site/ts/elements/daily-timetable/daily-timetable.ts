import { Page } from "../page/page";

import { html, unsafeCSS, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";

import { bellTemplatingPipeline } from "./bell-templating-pipeline/pipeline";

import { Resources } from "../../site/resources";

import { bells } from "./bells";

import "./bell";
import "./period";

import "../info/info";

import LOGIN_URL from "../../login-url";

import { DailyTimetable, Bell, Period, RoomVariation, ClassVariation, TeacherType } from "./types";
import { Day, Timetable } from "../timetable/types";

import { Missing } from "../../missing";

//@ts-ignore
import textCss from "default/text.css";
//@ts-ignore
import imgCss from "default/img.css";
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
declare const SKIN_CSS: string;

@customElement("daily-timetable")
export class StudentDailyTimetable extends Page {
    static styles = [textCss, imgCss, scrollbarCss, pageCss, cardElementCss, dailyTimetableCss];

    static updatingData: boolean = false;

    @state()
    private _dailyTimetable: DailyTimetable;

    private _previousBell: Bell | null = null;
    private _cachedBells: TemplateResult<1>[] | null = null;

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

        let lastBell = nextDailyTimetable?.bells?.[(nextDailyTimetable?.bells?.length ?? 1) - 1];

        if (nextDailyTimetable === undefined || nextDailyTimetable === null || lastBell === undefined ||
            nextDailyTimetable.date === undefined || nextDailyTimetable.date === null ||
            new Date().getTime() > DailyTimetableUtils.BellToDate(lastBell, new Date(nextDailyTimetable.date)).getTime()) {
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
            if (succeeded && lastBell !== undefined && new Date().getTime() < DailyTimetableUtils.BellToDate(lastBell, currentDailyTimetableDate).getTime()) {
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
                let dayNumber: number = (parseInt(currentDailyTimetable!.timetable!.timetable.dayNumber) + DailyTimetableUtils.GetSchoolDayCount(currentDailyTimetableDate, adjustedNow) - 1) % 15 + 1;

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
                    classVariations: [],
                    autoGenerated: true
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
            this._cachedBells = null;

            let bells = dailyTimetable.bells;

            if (bells === undefined || bells === null) {
                this._dailyTimetable = dailyTimetable;
                return;
            }

            let periods = dailyTimetable.timetable?.timetable?.periods ?? {};

            let foundStartOfDay = false;

            let leadingIndexCount = 0;
            let trailingIndexCount = 0;

            for (let i = 0; i < bells.length; i++) {
                let bell: Bell = bells[i];

                if (bell.period !== undefined && bell.period !== null && bell.period in periods) {
                    foundStartOfDay = true;
                    trailingIndexCount = 0;
                }
                else {
                    if (foundStartOfDay == false) leadingIndexCount++;
                    else trailingIndexCount++;
                }
            }

            for (let i = 0; i < trailingIndexCount; i++)
                bells[bells.length - i - 1].display = false;

            for (let i = 0; i < leadingIndexCount; i++)
                bells.shift();

            for (let i = bells.length - 1; i >= 0; i--) {
                let bell = bells[i];

                if (bell.endTime != bells[i + 1]?.startTime) {
                    bells.splice(i + 1, 0, {
                        period: "",
                        startTime: bell.endTime,
                        endTime: bells[i + 1]?.startTime,
                        time: bell.endTime,
                        bell: "Transition",
                        bellDisplay: "Transition",
                        display: false
                    });
                }
            }

            this._dailyTimetable = dailyTimetable;
        });

        setInterval(() => {
            //We need this because this can run before _dailyTimetable is initialised.
            if (this._dailyTimetable === undefined) return;

            this.requestUpdate();
        }, 1000);
    }

    renderPage() {
        let bells = this._dailyTimetable.bells ?? [];
        let periods = this._dailyTimetable.timetable?.timetable?.periods ?? {};

        let roomVariations = (Array.isArray(this._dailyTimetable.roomVariations) ? {} : this._dailyTimetable.roomVariations) ?? {};
        let classVariations = (Array.isArray(this._dailyTimetable.classVariations) ? {} : this._dailyTimetable.classVariations) ?? {};

        //TODO Change timer display here
        let nextBellInfo = DailyTimetableUtils.GetCurrentBell(this._dailyTimetable, new Date());

        let timeDisplay = { class: "Nothing", preposition: "in", time: "Never" };
        if (nextBellInfo === undefined) {
            StudentDailyTimetable.UpdateData();
        }
        else {
            if ((nextBellInfo?.bell ?? null) !== this._previousBell) {
                this._previousBell = nextBellInfo?.bell ?? null;
                this._cachedBells = null;
            }

            if (nextBellInfo?.bell !== undefined) {
                timeDisplay = {
                    class: "Nothing",
                    ...DailyTimetableUtils.HumanTimeDisplay(nextBellInfo.bell, new Date(this._dailyTimetable.date ?? ""), new Date())
                }
            }

            let nextClass = this._dailyTimetable?.timetable?.timetable?.periods?.[nextBellInfo?.bell?.period ?? ""];

            if (nextClass !== undefined && nextClass !== null && "year" in nextClass)
                timeDisplay.class = DailyTimetableUtils.GetPeriodTitle(this._dailyTimetable, nextClass.year ?? "?", nextClass.title ?? "???");
            else
                timeDisplay.class = nextBellInfo?.bell?.bellDisplay ?? "Nothing";
        }

        if (this._cachedBells === null) {
            let nextVisibleBellIndex = nextBellInfo?.index ?? 0;
            for (let i = nextVisibleBellIndex; i < bells.length; i++) {
                if (bells[i].display === false) {
                    nextVisibleBellIndex++;
                    continue;
                }

                break;
            }

            this._cachedBells = bellTemplatingPipeline.run(bells, {
                dailyTimetable: this._dailyTimetable,
                nextVisibleBell: nextVisibleBellIndex,
            });
        }

        return html`
            <info-popup style="${(this._dailyTimetable.autoGenerated ?? false) ? "" : "display: none"}">
                <img slot="icon" src="/images/warning.svg">
                This timetable was automatically generated and may be inaccurate. <a href="${LOGIN_URL}">Login</a> for the latest information.
            </info-popup>

            <div class="time-display">
                <p>${timeDisplay.class}</p>
                <p>${timeDisplay.preposition}</p>
                <h1 class="time">${timeDisplay.time}</h1>
            </div>

            <div class="periods">
                ${this._cachedBells}
            </div>
        `;
    }
}
