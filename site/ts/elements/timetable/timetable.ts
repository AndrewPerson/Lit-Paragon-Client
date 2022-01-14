import { Page } from "../page/page";

import { html, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";

import { TimetablePeriod } from "./period";

import { Timetable, Day, Period } from "./types";
import { DailyTimetable } from "../daily-timetable/types";

import { DefinedUnknown, SafeAccess } from "../../unknown";

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
    timetable: Timetable | DefinedUnknown;

    set dailyTimetable(value: DailyTimetable | DefinedUnknown) {
        let day = SafeAccess<string>(value, ["object", "object", "object", "string"], ["timetable", "timetable", "dayname"]);

        if (day !== undefined) {
            this._day = day.slice(0, 3).toUpperCase() + " " + day.slice(-1).toUpperCase();
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

    CreateTable(dayGroup: (Day | DefinedUnknown)[]): TemplateResult<1> {
        let dayNames: string[] = [];
        let periodRows: (Period | DefinedUnknown)[][] = [];

        for (let day of dayGroup) {
            dayNames.push(SafeAccess<string>(day, ["object", "string"], ["dayname"]) ?? "");
            let periods = SafeAccess<{ [index: string]: Period | DefinedUnknown }>(day, ["object", "object"], ["periods"]) ?? {};
            let periodIndices = Object.keys(periods);

            for (let i = 0; i < periodIndices.length; i++) {
                if (i >= periodRows.length)
                    periodRows.push([periods[periodIndices[i]]]);
                else
                    periodRows[i].push(periods[periodIndices[i]]);
            }
        }

        return html`
        <table>
            <thead>
                <tr>
                    <th></th>
                    ${dayNames.map(fullDayName => {
                        let parts = fullDayName.split(" ");

                        let dayName: string = `${parts.shift()?.substring(0, 3).toUpperCase() ?? "???"} ${parts.map(part => part.toUpperCase()).join(" ")}`;

                        return html`
                        <th class="${dayName == this._day ? "current-day" : ""}">${dayName}</th>
                        `;
                    })}
                </tr>
            </thead>
            <tbody>
                ${periodRows.map(periodRow => html`
                <tr>
                    ${periodRow.map(period => {
                        let title = SafeAccess<string>(period, ["object", "string"], ["title"]) ?? "";

                        return html`
                        <td>
                            <timetable-period name="${title}" room="${SafeAccess<string>(period, ["object", "string"], ["room"]) ?? "???"}"></timetable-period>
                        </td>
                        `;
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
        let days = SafeAccess<{ [index: string]: Day | DefinedUnknown }>(this.timetable, ["object", "object"], ["days"]) ?? {};
        let dayNames = Object.keys(days);

        let rows: TemplateResult<1>[] = [];
        let dayGroup: (Day | DefinedUnknown)[] = [];
        for (let i = 0; i < dayNames.length; i++) {
            if (i % 5 == 0) {
                if (dayGroup.length > 0) rows.push(this.CreateTable(dayGroup));

                dayGroup = [];
            }

            dayGroup.push(days[dayNames[i]]);
        }

        if (dayGroup.length > 0) rows.push(this.CreateTable(dayGroup));

        return html`${rows}`;
    }
}