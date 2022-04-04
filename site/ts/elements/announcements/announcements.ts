import { Page } from "../page/page";

import { html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { repeat } from "lit/directives/repeat.js";

import "./post";

import { Announcements } from "./types";
import { Missing } from "../../missing";

//@ts-ignore
import textCss from "default/text.css";
//@ts-ignore
import imgCss from "default/img.css";
//@ts-ignore
import searchCss from "default/search.css";
//@ts-ignore
import selectCss from "default/select.css";
//@ts-ignore
import scrollbarCss from "default/scrollbar.css";
//@ts-ignore
import fullElementCss from "default/pages/full.css";
//@ts-ignore
import pageCss from "default/pages/page.css";
//@ts-ignore
import announcementCss from "./announcements.css";

@customElement("school-announcements")
export class SchoolAnnouncements extends Page {
    static styles = [textCss, imgCss, searchCss, selectCss, scrollbarCss, pageCss, fullElementCss, announcementCss];

    @state()
    announcements: Announcements;

    set userInfo(value: {yearGroup: string | Missing}) {
        let yearGroup = value.yearGroup;

        if (yearGroup !== undefined && yearGroup !== null)
            if (localStorage.getItem("Announcement Year Filter") === null)
                this.yearFilter = yearGroup;
    }

    @state()
    yearFilter: string = localStorage.getItem("Announcement Year Filter") ?? "all";

    @state()
    searchFilter: string = "";

    constructor() {
        super();

        this.AddResource("announcements", "announcements");
        this.AddResource("userinfo", "userInfo");
    }

    ChangeSearchFilter(e: InputEvent) {
        this.searchFilter = (e.target as HTMLInputElement).value;
    }

    ChangeYearFilter(e: InputEvent) {
        let filter = (e.target as HTMLInputElement).value;

        localStorage.setItem("Announcement Year Filter", filter);

        this.yearFilter = filter;
    }

    IsSameDay(a: Date, b: Date) {
        return a.getDate() == b.getDate() && a.getMonth() == b.getMonth() && a.getFullYear() == b.getFullYear();
    }

    renderPage() {
        let notices = this.announcements.notices ?? [];

        let filteredAnnouncements = this.yearFilter == "all" ? notices : notices.filter(announcement => {
            let years = announcement.years ?? [];
            return years.includes(this.yearFilter)
        });

        filteredAnnouncements = this.searchFilter.length == 0 ? filteredAnnouncements : filteredAnnouncements.filter(announcement => {
            let title = announcement.title;
            let content = announcement.content;

            if (title === undefined || title === null ||
                content === undefined || content === null) return false;
            
            return title.toLowerCase().includes(this.searchFilter.toLowerCase()) ||
                   content.toLowerCase().includes(this.searchFilter.toLowerCase())
        });

        return html`
        <div class="header">
            <input type="search" placeholder="Search..." @input="${this.ChangeSearchFilter.bind(this)}">

            <select title="Select filter year for announcements" @input="${this.ChangeYearFilter.bind(this)}">
                <option value="all" ?selected="${this.yearFilter == "all"}">All</option>
                <option value="Staff" ?selected="${this.yearFilter == "Staff"}">Staff</option>
                <option value="12" ?selected="${this.yearFilter == "12"}">Year 12</option>
                <option value="11" ?selected="${this.yearFilter == "11"}">Year 11</option>
                <option value="10" ?selected="${this.yearFilter == "10"}">Year 10</option>
                <option value="9" ?selected="${this.yearFilter == "9"}">Year 9</option>
                <option value="8" ?selected="${this.yearFilter == "8"}">Year 8</option>
                <option value="7" ?selected="${this.yearFilter == "7"}">Year 7</option>
            </select>
        </div>

        <!--The ugliest code ever written, but the div tags for .content need to be where they are, or the :empty selector won't work-->
        <!--Also, trust me that this bit will always generate a unique ID for every announcement. (Assuming that no one makes the exact same announcement twice.)-->
        <div class="content">${repeat(filteredAnnouncements, (announcement) => `${announcement.title}${announcement.title?.length ?? 0}Year:${announcement.displayYears}`, announcement => {
            let meeting = announcement.isMeeting == 1;

            let meetingDate = announcement.meetingDate ?? "";
            if (this.IsSameDay(new Date(meetingDate), new Date())) meetingDate = "Today";

            return html`
            <announcement-post title="${announcement.title ?? "???"}" content="${announcement.content ?? "???"}"
                               author="${announcement.authorName ?? "???"}" years="${announcement.displayYears ?? "???"}"
                               published="${ifDefined(this.IsSameDay(new Date(announcement.dates?.[0] ?? ""), new Date()) ? "Today" : announcement.dates?.[0] ?? "")}" ?meeting="${meeting}"
                               meetingDate="${meetingDate}" meetingTime="${meeting ? (announcement.meetingTime ?? announcement.meetingTimeParsed ?? "??:??") : ""}"
                               weight="${(announcement.relativeWeight ?? 0) + (meeting ? 1 : 0)}"></announcement-post>
            `;
        })}</div>
        `;
    }
}