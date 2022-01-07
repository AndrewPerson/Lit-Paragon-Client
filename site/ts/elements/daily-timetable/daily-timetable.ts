import { Page } from "../page/page";

import { html } from "lit";
import { customElement, state } from "lit/decorators.js";

import { DailyTimetable } from "./types";

import "./period";

//@ts-ignore
import textCss from "default/text.css";
//@ts-ignore
import cardElementCss from "default/pages/card.css";
//@ts-ignore
import pageCss from "default/pages/page.css";
//@ts-ignore
import dailyTimetableCss from "./daily-timetable.css";

@customElement("daily-timetable")
export class SchoolAnnouncements extends Page {
    static styles = [pageCss, cardElementCss, textCss, dailyTimetableCss];

    @state()
    dailyTimetable: DailyTimetable;

    constructor() {
        super();

        this.AddResource("dailytimetable", "dailyTimetable");
    }

    renderPage() {
        return html`
            <div class="next-display">
                <p>Nothing</p>
                <p>in</p>
                <div class="timer-container">
                    <span class="line left"></span>
                    <h1 class="timer">Never</h1>
                    <span class="line right"></span>
                </div>
            </div>
        `;
    }
}