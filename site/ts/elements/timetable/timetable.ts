import { Page } from "../page/page";

import { html, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";

import { TimetablePeriod } from "./period";

import { Timetable, Day, Period } from "./types";
import { DailyTimetable } from "../daily-timetable/types";

//@ts-ignore
import textCss from "default/text.css";
//@ts-ignore
import pageCss from "default/pages/page.css";
//@ts-ignore
import timetableCss from "./timetable.css";

@customElement("full-timetable")
export class FullTimetable extends Page {
    static styles = [textCss, pageCss, timetableCss];

    @state()
    timetable: Timetable;

    set dailyTimetable(value: DailyTimetable) {
        let day = value.timetable?.timetable?.dayname;

        if (day !== undefined && day !== null) {
            this._day = day;
        }
    }

    @state()
    private _day: string | undefined;

    constructor() {
        super();

        this.AddResource("timetable", "timetable");
        this.AddResource("dailytimetable", "dailyTimetable");

        document.addEventListener("pointerover", this.ClearHighlight);
    }

    SetHighlight(event: Event) {
        TimetablePeriod.Highlight((event.target as TimetablePeriod).name);
        event.stopPropagation();
    }

    ClearHighlight(event: PointerEvent) {
        TimetablePeriod.Highlight(undefined);
        event.stopPropagation();
    }

    CreateTable(dayGroup: Day[]): TemplateResult<1> {
        let dayNames: string[] = [];
        let periodRows: (Period | null)[][] = [];

        for (let day of dayGroup) {
            let dayName = day.dayname ?? "???";

            dayNames.push(dayName);

            let periods = day.periods ?? {};
            let periodIndices = Object.keys(periods);
            let lastIndex = 0;

            for (let i = 0; i < periodIndices.length; i++) {
                let index = parseInt(periodIndices[i]);

                let diff = index - lastIndex;

                for (let x = 0; x < diff; x++) {
                    if (diff + x > periodRows.length - 1)
                        periodRows.push([null]);
                    else
                        periodRows[lastIndex + x].push(null);
                }

                if (index > periodRows.length - 1)
                    periodRows.push([periods[periodIndices[i]] ?? null]);
                else
                    periodRows[index].push(periods[periodIndices[i]] ?? null);

                lastIndex = index + 1;
            }
        }

        let toRemove = 0;
        for (let i = 0; i < periodRows.length; i++) {
            let remove = periodRows[i].filter(period => period !== null).length == 0;

            if (!remove) break;
            
            toRemove++;
        }

        periodRows.splice(0, toRemove);

        return html`
        <table style="--count-start: ${toRemove - 1}">
            <thead>
                <tr>
                    <th></th>
                    ${dayNames.map(dayName => html`<th class="${dayName == this._day ? "current-day" : ""}">${dayName}</th>`)}
                </tr>
            </thead>
            <tbody>
                ${periodRows.map(periodRow => html`
                <tr>
                    ${periodRow.map(period => {
                        if (period !== null
                        && period.title !== undefined && period.title !== null
                        && period.room !== undefined && period.room !== null
                        && period.teacher !== undefined && period.teacher !== null) {
                            let title = period.title;
                            title = title.split(" ").filter(word => (isNaN(parseFloat(word)) && word.length > 1) || word =="&").join(" ");

                            return html`
                            <td>
                                <timetable-period name="${title}" teacher="${period.teacher}" room="${period.room}"></timetable-period>
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

    createRenderRoot() {
        let root = super.createRenderRoot();

        root.addEventListener("pointerover", this.SetHighlight);
        root.addEventListener("focusin", this.SetHighlight);

        return root;
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        
        document.removeEventListener("pointerover", this.ClearHighlight);
    }

    renderPage() {
        let days = this.timetable.days ?? {};
        let dayNames = Object.keys(days);

        let rows: TemplateResult<1>[] = [];
        let dayGroup: Day[] = [];
        for (let i = 0; i < dayNames.length; i++) {
            if (i % 5 == 0) {
                if (dayGroup.length > 0) rows.push(this.CreateTable(dayGroup));

                dayGroup = [];
            }

            let day = days[dayNames[i]];

            if (day !== undefined && day !== null) dayGroup.push(day);
        }

        if (dayGroup.length > 0) rows.push(this.CreateTable(dayGroup));

        return html`${rows}`;
    }
}