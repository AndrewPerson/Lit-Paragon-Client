import { Page } from "../page/page";

import { html, unsafeCSS } from "lit";
import { customElement, state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";

import { Pipeline } from "../../site/pipeline";
import { filterYears } from "./year-filter";
import { filterSearch } from "./search-filter";

import "./post";

import { Announcements, Announcement } from "./types";
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

declare const SKIN_CSS: string;

@customElement("school-announcements")
export class SchoolAnnouncements extends Page {
    static styles = [textCss, imgCss, searchCss, selectCss, scrollbarCss, pageCss, fullElementCss, announcementCss];

    @state()
    announcements: Announcements;

    @state()
    yearFilter: string = localStorage.getItem("Announcement Year Filter") ?? "all";

    @state()
    searchFilter: string = "";

    announcementFilterPipeline = new Pipeline<Announcement[], { years: string[], search?: string }>()
                                 .transform(filterYears)
                                 .transform(filterSearch);

    GetReadAnnouncements() {
        let announcements: string[] = JSON.parse(localStorage.getItem("Read Announcements") ?? "[]");
        announcements = announcements.filter(a => this.announcements.notices?.findIndex(b => b.id?.toString() == a) != -1);

        let announcementsSet = new Set(announcements);
        this.SetReadAnnouncements(announcementsSet);

        return announcementsSet;
    }

    SetReadAnnouncements(readAnnouncements: Set<string>) {
        localStorage.setItem("Read Announcements", JSON.stringify(Array.from(readAnnouncements)));
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

    GetHumanDate(date: Date) {
        let now = new Date();

        if (this.IsSameDay(date, now)) return "Today";

        let yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);

        if (this.IsSameDay(date, yesterday)) return "Yesterday";

        let tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);

        if (this.IsSameDay(date, tomorrow)) return "Tomorrow";


        return `${date.getDate().toString().padStart(2, "0")}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getFullYear()}`
    }

    constructor() {
        super();

        this.AddResource("announcements", (announcements: Announcements) => this.announcements = announcements);
        this.AddResource("userinfo", (userInfo: {yearGroup: string | Missing}) => {
            let yearGroup = userInfo.yearGroup;

            if (yearGroup !== undefined && yearGroup !== null)
                if (localStorage.getItem("Announcement Year Filter") == null)
                    this.yearFilter = yearGroup;
        });

        this.addEventListener("read", ((e: CustomEvent<{ read: boolean, key: string }>) => {
            let readAnnouncements = this.GetReadAnnouncements();

            if (e.detail.read) readAnnouncements.add(e.detail.key);
            else readAnnouncements.delete(e.detail.key);

            this.SetReadAnnouncements(readAnnouncements);
        }) as EventListener);
    }

    renderPage() {
        let notices = this.announcements.notices ?? [];

        let filteredAnnouncements = this.announcementFilterPipeline.run(notices, {
            //TODO Make this multi-select
            years: this.yearFilter == "all" ? [] : [this.yearFilter],
            search: this.searchFilter
        });

        let readAnnouncements = this.GetReadAnnouncements();

        return html`
        <div class="header">
            <input type="search" placeholder="Search..." @input="${this.ChangeSearchFilter.bind(this)}">

            <select title="Select year filter for announcements" @input="${this.ChangeYearFilter.bind(this)}">
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
        <div class="content">${repeat(filteredAnnouncements, (announcement) => announcement.id?.toString() ?? "", announcement => {
            let meeting = announcement.isMeeting == 1;
            let read = readAnnouncements.has(announcement.id?.toString() ?? "");

            return html`
            <announcement-post title="${announcement.title ?? "???"}"
                               content="${announcement.content ?? "???"}"
                               author="${announcement.authorName ?? "???"}"
                               years="${announcement.displayYears ?? "???"}"
                               published="${this.GetHumanDate(new Date(announcement.dates?.[0] ?? ""))}"
                               ?meeting="${meeting}"
                               meetingDate="${this.GetHumanDate(new Date(announcement.meetingDate ?? ""))}"
                               meetingTime="${announcement.meetingTime ?? announcement.meetingTimeParsed ?? "??:??"}"
                               weight="${(announcement.relativeWeight ?? 0) + (meeting ? 1 : 0)}"
                               key="${announcement.id?.toString() ?? ""}"
                               ?read=${read}></announcement-post>
            `;
        })}</div>
        `;
    }
}