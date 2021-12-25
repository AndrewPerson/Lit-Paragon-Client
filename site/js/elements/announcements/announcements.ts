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
import searchCss from "default/search.css";
//@ts-ignore
import selectCss from "default/select.css";
//@ts-ignore
import fullElementCss from "default/elements/full.css";
//@ts-ignore
import elementCss from "default/elements/element.css";
//@ts-ignore
import announcementCss from "./announcements.css";

export type Announcements = {
    notices: Announcement[]
}

export type Announcement = {
    title: string,
    content: string,
    years: string[],
}

@customElement("school-announcements")
export class SchoolAnnouncements extends Page {
    static styles = [elementCss, fullElementCss, textCss, imgCss, searchCss, selectCss, announcementCss];

    @state()
    announcements: Announcements;

    @state()
    yearFilter: string = "all";

    constructor() {
        super();

        this.AddResource("announcements", "announcements");
    }

    renderPage() {
        var filteredAnnouncements = this.yearFilter == "all" ? this.announcements.notices : this.announcements.notices.filter((announcement: Announcement) => announcement.years.includes(this.yearFilter));

        return html`
        <div class="header">
            <input type="search" placeholder="Search...">

            <select @input="${(e: InputEvent) => this.yearFilter = (e.target as HTMLSelectElement).value}">
                <option value="all">All</option>
                <option value="12">Year 12</option>
                <option value="11">Year 11</option>
                <option value="10">Year 10</option>
                <option value="9">Year 9</option>
                <option value="8">Year 8</option>
                <option value="7">Year 7</option>
            </select>
        </div>

        <div class="content">
            ${repeat(filteredAnnouncements, (notice: Announcement) => html`
            <announcement-post title="${notice.title}" content="${notice.content}"></announcement-post>
            `)}
        </div>
        `;
    }
}