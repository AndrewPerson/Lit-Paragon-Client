import { Page } from "../page/page";

import { html, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";

import { TimetablePeriod } from "./period";

import { Timetable, Day, Period } from "./types";
import { DailyTimetable } from "../daily-timetable/types";

import { Debounce } from "../../utils";

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

    static get observedAttributes(): string[] {
        return [...super.observedAttributes, "class"];
    }

    attributeChangedCallback(name: string, _old: string | null, value: string | null): void {
        super.attributeChangedCallback(name, _old, value);

        if (name == "class") this.requestUpdate();
    }

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

        this.AddResource("timetable", (timetable: Timetable) => this.timetable = timetable);
        this.AddResource("dailytimetable", (dailyTimetable: DailyTimetable) => this.dailyTimetable = dailyTimetable);

        document.addEventListener("pointerover", this.ClearHighlight);

        window.addEventListener("resize", this.Resize);
    }

    SetHighlight(event: Event) {
        TimetablePeriod.Highlight((event.target as TimetablePeriod).title);
        event.stopPropagation();
    }

    ClearHighlight(event: PointerEvent) {
        TimetablePeriod.Highlight(undefined);
        event.stopPropagation();
    }

    Resize = Debounce(() => {
        this.requestUpdate();
    }, 300).bind(this);

    disconnectedCallback() {
        super.disconnectedCallback();

        document.removeEventListener("pointerover", this.ClearHighlight);

        window.removeEventListener("resize", this.Resize);
    }

    createRenderRoot() {
        let root = super.createRenderRoot();

        root.addEventListener("pointerover", this.SetHighlight);

        root.addEventListener("focusin", e => {
            this.SetHighlight(e);

            let target = e.target as HTMLElement;

            if (target.tagName == "TIMETABLE-PERIOD") {
                (target as TimetablePeriod).showDetails = true;
            }
        });

        root.addEventListener("focusout", e => {
            let target = e.target as HTMLElement;

            if (target.tagName == "TIMETABLE-PERIOD") {
                (target as TimetablePeriod).showDetails = false;
            }
        });

        return root;
    }

    CreateTable(dayGroup: Day[], minWidth: number, maxWidth: number, maxHeight: number): TemplateResult<1> {
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
                                <timetable-period title="${title}" shortTitle="${shortTitle}" teacher="${teacher}"
                                                  room="${period.room}" minWidth="${minWidth}"
                                                  maxWidth="${maxWidth}" maxHeight="${maxHeight}"></timetable-period>
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
        let days = this.timetable.days ?? {};
        let dayNames = Object.keys(days);

        let rect = this.getBoundingClientRect();

        let minWidth = rect.left;
        let maxWidth = rect.right;
        let maxHeight = rect.bottom;

        let rows: TemplateResult<1>[] = [];
        let dayGroup: Day[] = [];
        for (let i = 0; i < dayNames.length; i++) {
            if (i % 5 == 0) {
                if (dayGroup.length > 0) rows.push(this.CreateTable(dayGroup, minWidth, maxWidth, maxHeight));

                dayGroup = [];
            }

            let day = days[dayNames[i]];

            if (day !== undefined && day !== null) dayGroup.push(day);
        }

        if (dayGroup.length > 0) rows.push(this.CreateTable(dayGroup, minWidth, maxWidth, maxHeight));

        return html`${rows}`;
    }
}