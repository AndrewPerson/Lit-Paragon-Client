import { Page } from "../page/page";

import { html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";

import { Announcements, Announcement } from "./types";

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
import fullElementCss from "default/pages/full.css";
//@ts-ignore
import pageCss from "default/pages/page.css";
//@ts-ignore
import announcementCss from "./announcements.css";

@customElement("school-announcements")
export class SchoolAnnouncements extends Page {
    static styles = [pageCss, fullElementCss, textCss, imgCss, searchCss, selectCss, announcementCss];

    @state()
    announcements: Announcements;

    @state()
    yearFilter: string = "all";

    @state()
    searchFilter: string = "";

    constructor() {
        super();

        this.AddResource("announcements", "announcements");
    }

    renderPage() {
        let filteredAnnouncements = this.yearFilter == "all" ? this.announcements.notices : this.announcements.notices.filter((announcement: Announcement) => announcement.years.includes(this.yearFilter));
        filteredAnnouncements = this.searchFilter == "" ? filteredAnnouncements : filteredAnnouncements.filter((announcement: Announcement) =>
                                                                                                                announcement.title.toLowerCase().includes(this.searchFilter.toLowerCase()) ||
                                                                                                                announcement.content.toLowerCase().includes(this.searchFilter.toLowerCase()));

        return html`
        <div class="header">
            <input type="search" placeholder="Search..." @input="${(e: InputEvent) => this.searchFilter = (e.target as HTMLInputElement).value}">

            <select @input="${(e: InputEvent) => this.yearFilter = (e.target as HTMLSelectElement).value}">
                <option value="all">All</option>
                <option value="Staff">Staff</option>
                <option value="12">Year 12</option>
                <option value="11">Year 11</option>
                <option value="10">Year 10</option>
                <option value="9">Year 9</option>
                <option value="8">Year 8</option>
                <option value="7">Year 7</option>
            </select>
        </div>

        <!--The ugliest code ever written, but the div tags for .content need to be where they are, or the :empty selector won't work-->
        <div class="content">${repeat(filteredAnnouncements, (announcement: Announcement) => html`
        <announcement-post title="${announcement.title}" content="${announcement.content}" author="${announcement.authorName}"
                           years="${announcement.displayYears}" ?meeting="${announcement.isMeeting == 1}"
                           ${announcement.meetingTime === null ? "" :
                           `meetingTime="${announcement.meetingTime}${announcement.meetingTimeParsed === undefined ? "" :
                           ` (${announcement.meetingTimeParsed})`}"`}
                           weight="${announcement.relativeWeight + announcement.isMeeting}"></announcement-post>
        `)}</div>
        `;
    }
}