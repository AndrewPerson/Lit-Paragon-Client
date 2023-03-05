import { Page } from "../page/page";

import { html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { map } from "lit/directives/map.js";

import { TimetablePeriod } from "./period";

import { Timetable, Day, Period } from "./types";
import { DailyTimetable } from "../daily-timetable/types";

//@ts-ignore
import textCss from "default/text.css";
//@ts-ignore
import scrollbarCss from "default/scrollbar.css";
//@ts-ignore
import pageCss from "default/pages/page.css";
//@ts-ignore
import timetableCss from "./timetable.css";

@customElement("full-timetable")
export class FullTimetable extends Page {
    static styles = [textCss, scrollbarCss, pageCss, timetableCss];

    @state()
    timetable: Timetable;

    @state()
    private dayNumber: number | undefined;

    constructor() {
        super();

        this.AddResource("timetable", (timetable: Timetable) => this.timetable = timetable);
        this.AddResource("dailytimetable", (dailyTimetable: DailyTimetable) => {
            let dayNumber = dailyTimetable.timetable?.timetable?.dayNumber;

            if (dayNumber !== undefined && dayNumber !== null) {
                this.dayNumber = parseInt(dayNumber);
            }
        });

        document.addEventListener("pointerover", this.ClearHighlight);

        this.addEventListener("scroll", e => {
            let scroll = (e.target as HTMLElement).scrollTop;

            this.style.setProperty("--scroll", scroll + "px");
        });
    }

    SetHighlight(event: Event) {
        TimetablePeriod.Highlight((event.target as TimetablePeriod).title);
        event.stopPropagation();
    }

    ClearHighlight(event: PointerEvent) {
        TimetablePeriod.Highlight(undefined);
        event.stopPropagation();
    }

    disconnectedCallback() {
        super.disconnectedCallback();

        document.removeEventListener("pointerover", this.ClearHighlight);
    }

    createRenderRoot() {
        let root = super.createRenderRoot();

        root.addEventListener("pointerover", this.SetHighlight);

        root.addEventListener("focusin", e => {
            this.SetHighlight(e);
        });

        return root;
    }

    GetPeriodsInDay(day: Day)
    {
        return new Map(
            Object.entries(day.periods ?? {}).
            map(([periodNumber, period]) => [
                parseInt(periodNumber),
                period
            ] as [number, Period])
        );
    }

    CreateTable(dayGroup: Day[]) {
        const dayPeriods = dayGroup.map(day => this.GetPeriodsInDay(day));

        const firstPeriodIndex = Math.min(...dayPeriods.map(periods => Math.min(...periods.keys())));
        const lastPeriodIndex = Math.max(...dayPeriods.map(periods => Math.max(...periods.keys())));
        
        const daysPerWeek = dayPeriods.length;

        let periodRows: (Period | null)[][] = [];

        for (let y = firstPeriodIndex; y <= lastPeriodIndex; y++) {
            periodRows.push([]);
        }

        for (let x = 0; x < daysPerWeek; x++) {
            for (let y = firstPeriodIndex; y <= lastPeriodIndex; y++) {
                //periodRows is 0-indexed, but y doesn't start at 0
                periodRows[y - firstPeriodIndex].push(dayPeriods[x].get(y) ?? null);
            }
        }

        periodRows = periodRows.filter(row => !row.every(p => p == null));

        return html`
        <table style="--count-start: ${firstPeriodIndex - 1}">
            <thead>
                <tr>
                    <th></th>
                    ${dayGroup.map(day => html`<th class="${day.dayNumber == this.dayNumber ? "current-day" : ""}">${day.dayname}</th>`)}
                </tr>
            </thead>
            <tbody>
                ${periodRows.map(periodRow => html`
                <tr>
                    ${periodRow.map(period => {
                        if (period !== null &&
                            period.title !== undefined && period.title !== null &&
                            period.room !== undefined && period.room !== null) {
                            let words = period.title.split(" ");

                            words.pop();

                            let shortTitle = words.join(" ");

                            let subjectInfo = this.timetable.subjects?.find(subject => subject?.shortTitle == period.title);

                            let title = subjectInfo?.title ?? "";
                            if (title.trim().length == 0) title = period.title ?? "???";

                            let teacher = period.fullTeacher ?? subjectInfo?.fullTeacher ?? "";
                            if (teacher.trim().length == 0) teacher = "No one";

                            return html`
                            <td>
                                <timetable-period title="${title}" shortTitle="${shortTitle}" teacher="${teacher}" room="${period.room}"></timetable-period>
                            </td>
                            `;
                        }

                        return html`<td></td>`;
                    })}
                </tr>
                `)}
            </tbody>
        </table>
        `;
    }

    renderPage() {
        const days = this.timetable.days ?? {};
        const dayNames = Object.keys(days);

        let dayGroups = [];

        for (let i = 0; i < dayNames.length; i += 5) {
            dayGroups.push(
                dayNames.slice(i, Math.min(i + 5, dayNames.length))
                .map(day => days[day])
                .filter(day => day != null && day !== undefined) as Day[]
            );
        }

        return html`${map(dayGroups, dayGroup => this.CreateTable(dayGroup))}`;
    }
}