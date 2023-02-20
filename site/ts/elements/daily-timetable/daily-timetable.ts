import { Page } from "../page/page";

import { html, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";

import { BellToDate, GetCurrentBell, GetPeriodTitle } from "./daily-timetable-utils";
import { generateDailyTimetable } from "./generate-daily-timetable";
import { bellTemplatingPipeline } from "./bell-templating-pipeline/pipeline";

import { Resources } from "../../site/resources";

import "./countdown";
import "./bell";
import "./period";

import "../info/info";

import LOGIN_URL from "../../login-url";

import { DailyTimetable, Bell } from "./types";
import { Timetable } from "../timetable/types";

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
@customElement("daily-timetable")
export class StudentDailyTimetable extends Page {
    static styles = [textCss, imgCss, scrollbarCss, pageCss, cardElementCss, dailyTimetableCss];

    static updatingData: boolean = false;

    @state()
    private _dailyTimetable: DailyTimetable;

    private static _lastUpdatedData?: Date;

    static async UpdateData() {
        //Rate limit in case of bug.
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

        let nextDailyTimetable = await Resources.GetResource<DailyTimetable>("next-dailytimetable");

        let lastBell = nextDailyTimetable?.bells?.[(nextDailyTimetable?.bells?.length ?? 1) - 1];

        if (nextDailyTimetable === undefined || lastBell === undefined || nextDailyTimetable.date === undefined ||
            nextDailyTimetable.date == null || new Date().getTime() > BellToDate(lastBell, new Date(nextDailyTimetable.date)).getTime()) {
            let succeeded = await Resources.FetchResources();

            let currentDailyTimetable = await Resources.GetResource<DailyTimetable>("dailytimetable");
            if (currentDailyTimetable === undefined || currentDailyTimetable.date === undefined || currentDailyTimetable.date == null ||
                currentDailyTimetable.bells === undefined || currentDailyTimetable.bells == null)
                //Keep updatingData true so we don't keep trying
                return;

            let currentDailyTimetableDate = new Date(currentDailyTimetable.date);
            let lastBell = currentDailyTimetable.bells[currentDailyTimetable.bells.length - 1];

            //Check if the returned date is not today.
            if (succeeded && lastBell !== undefined && new Date().getTime() < BellToDate(lastBell, currentDailyTimetableDate).getTime()) {
                this.updatingData = false;
                return;
            }

            let timetable = await Resources.GetResource<Timetable>("timetable");
            if (timetable === undefined)
                //Keep updatingData true so we don't keep trying
                return;

            let newDailyTimetable = await generateDailyTimetable(currentDailyTimetable, timetable);

            if (newDailyTimetable == null)
                //Keep updatingData true so we don't keep trying
                return;

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

            if (bells === undefined || bells == null) {
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

        this.addEventListener("countdown-finished", ((e: CustomEvent) => {
            this.requestUpdate();
        }) as EventListener);
    }

    renderPage() {
        const bells = this._dailyTimetable.bells ?? [];

        const nextBellInfo = GetCurrentBell(this._dailyTimetable, new Date());

        let title = "Nothing";
        let countdownAvailable = true;
        if (nextBellInfo === undefined || this._dailyTimetable.date === undefined || this._dailyTimetable.date == null) {
            StudentDailyTimetable.UpdateData();
            countdownAvailable = false;
        }
        else {
            let nextClass = this._dailyTimetable?.timetable?.timetable?.periods?.[nextBellInfo?.bell?.period ?? ""];

            if (nextClass !== undefined && nextClass !== null && "year" in nextClass)
                title = GetPeriodTitle(this._dailyTimetable, nextClass.year ?? "?", nextClass.title ?? "???");
            else
                title = nextBellInfo?.bell?.bellDisplay ?? "Nothing";
        }

        let nextVisibleBellIndex = nextBellInfo?.index ?? 0;
        for (let i = nextVisibleBellIndex; i < bells.length; i++) {
            if (bells[i].display === false) {
                nextVisibleBellIndex++;
                continue;
            }

            break;
        }

        return html`
            <info-popup style="${(this._dailyTimetable.autoGenerated ?? false) ? "" : "display: none"}">
                <img slot="icon" src="/images/warning.svg">
                This timetable was automatically generated and may be inaccurate. <a href="${LOGIN_URL}">Login</a> for the latest information.
            </info-popup>

            ${
                countdownAvailable ?
                html`<daily-timetable-countdown periodTitle="${title}" periodTime="${BellToDate(nextBellInfo!.bell, new Date(this._dailyTimetable.date!))}"></daily-timetable-countdown>` :
                html`<daily-timetable-countdown periodTitle="Nothing" periodTime="${new Date()}"></daily-timetable-countdown>`
            }

            <div class="periods">
                ${bellTemplatingPipeline.run(bells, {
                    dailyTimetable: this._dailyTimetable,
                    nextVisibleBell: nextVisibleBellIndex,
                })}
            </div>
        `;
    }
}
