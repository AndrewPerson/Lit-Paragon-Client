import { Page } from "../page/page";

import { html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";

import "./post";

//@ts-ignore
import textCss from "default/text.css";
//@ts-ignore
import imgCss from "default/img.css";
//@ts-ignore
import selectCss from "default/select.css";
//@ts-ignore
import fullElementCss from "default/elements/full.css";
//@ts-ignore
import elementCss from "default/elements/element.css";
//@ts-ignore
import announcementCss from "./announcements.css";

@customElement("school-announcements")
export class SchoolAnnouncements extends Page {
    static styles = [elementCss, fullElementCss, textCss, imgCss, selectCss, announcementCss];

    @state()
    announcements: any; //Announcements;

    constructor() {
        super();

        this.AddResource("announcements", "announcements");
    }

    renderPage() {
        return html`
        <div class="header"></div>
        <div class="content">
            ${repeat(this.announcements.notices, (notice: any) => html`
            <announcement-post title="${notice.title}" content="${notice.content}"></announcement-post>
            `)}
        </div>
        `;
    }
}