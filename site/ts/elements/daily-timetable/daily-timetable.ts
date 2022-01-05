import { Page } from "../page/page";

import { html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";

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
        
        `;
    }
}