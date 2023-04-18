import { Page } from "../page/page";

import { html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { map } from "lit/directives/map.js";

import { TimetablePeriod } from "./period";

import { Timetable, Day, Period } from "schemas/timetable";
import { DailyTimetable } from "schemas/daily-timetable";

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

        this.addResource("timetable", (timetable: Timetable) => this.timetable = timetable);
        this.addResource("dailytimetable", (dailyTimetable: DailyTimetable) => {
            this.dayNumber = dailyTimetable.dayNumber;
        });

        document.addEventListener("pointerover", this.clearHighlight);

        this.addEventListener("scroll", e => {
            let scroll = (e.target as HTMLElement).scrollTop;

            this.style.setProperty("--scroll", scroll + "px");
        });
    }

    setHighlight(event: Event) {
        TimetablePeriod.highlight((event.target as TimetablePeriod).title);
        event.stopPropagation();
    }

    clearHighlight(event: PointerEvent) {
        TimetablePeriod.highlight(undefined);
        event.stopPropagation();
    }

    disconnectedCallback() {
        super.disconnectedCallback();

        document.removeEventListener("pointerover", this.clearHighlight);
    }

    createRenderRoot() {
        let root = super.createRenderRoot();

        root.addEventListener("pointerover", this.setHighlight);

        root.addEventListener("focusin", e => {
            this.setHighlight(e);
        });

        return root;
    }

    renderPage() {
        return html`${map(this.timetable.weeks, week => {
            const { periodRows, firstPeriodIndex } = getPeriodRows(week.days);

            return html`
            <table style="--count-start: ${firstPeriodIndex - 1}">
                <thead>
                    <tr>
                        <th></th>
                        ${week.days.map(day => html`<th class="${day.dayNumber == this.dayNumber ? "current-day" : ""}">${day.dayName}</th>`)}
                    </tr>
                </thead>
                <tbody>
                    ${periodRows.map(periodRow => html`
                    <tr>
                        ${periodRow.map(period => {
                            if (period === null) return html`<td></td>`;
                            else return html`
                            <td>
                                <timetable-period tabindex="0" title="${period.name}" shortTitle="${period.shortName}" teacher="${period.teacher}" room="${period.room}"></timetable-period>
                            </td>
                            `;
                        })}
                    </tr>
                    `)}
                </tbody>
            </table>`;
        })}`;
    }
}

function getPeriodRows(days: Day[]) {
    const dayPeriods = days.map(day => new Map(
        Object.entries(day.periods).map(([periodNumber, period]) => [parseInt(periodNumber), period])
    ));

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

    return { periodRows, firstPeriodIndex };
}