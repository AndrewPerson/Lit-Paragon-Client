import { Page } from "../page/page";

import { html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";

import { Pipeline } from "../../site/pipeline";
import { filterYears } from "./year-filter";
import { filterSearch } from "./search-filter";

import "./post";

import { Announcements, Announcement } from "schemas/announcements";
import { UserInfo } from "schemas/user-info";

//@ts-ignore
import textCss from "default/text.css";
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
    static styles = [textCss, searchCss, selectCss, scrollbarCss, pageCss, fullElementCss, announcementCss];

    @state()
    announcements: Announcements;

    @state()
    yearFilter: string = localStorage.getItem("Announcement Year Filter") ?? "all";

    @state()
    searchFilter: string = "";

    announcementFilterPipeline = new Pipeline<Announcement[], { years: string[], search?: string }>()
                                 .transform(filterYears)
                                 .transform(filterSearch);

    get readAnnouncements() {
        let announcements = new Set(
            (JSON.parse(localStorage.getItem("Read Announcements") ?? "[]") as string[])
            .filter(a => this.announcements.findIndex(b => b.id.toString() == a) != -1)
        );

        this.readAnnouncements = announcements;

        return announcements;
    }

    set readAnnouncements(readAnnouncements: Set<string>) {
        localStorage.setItem("Read Announcements", JSON.stringify(Array.from(readAnnouncements)));
    }

    changeYearFilter(e: InputEvent) {
        let filter = (e.target as HTMLInputElement).value;

        localStorage.setItem("Announcement Year Filter", filter);

        this.yearFilter = filter;
    }

    constructor() {
        super();

        this.addResource("announcements", (announcements: Announcements) => this.announcements = announcements);
        this.addResource("userinfo", ({ yearGroup }: UserInfo) => {
            if (localStorage.getItem("Announcement Year Filter") == null)
                this.yearFilter = yearGroup;
        });

        this.addEventListener("read", ((e: CustomEvent<{ read: boolean, key: string }>) => {
            let readAnnouncements = this.readAnnouncements;

            if (e.detail.read) readAnnouncements.add(e.detail.key);
            else readAnnouncements.delete(e.detail.key);

            this.readAnnouncements = readAnnouncements;
        }) as EventListener);
    }

    renderPage() {
        let filteredAnnouncements = this.announcementFilterPipeline.run(this.announcements, {
            //TODO Make this multi-select
            years: this.yearFilter == "all" ? [] : [this.yearFilter],
            search: this.searchFilter
        });

        let readAnnouncements = this.readAnnouncements;

        return html`
        <div class="header">
            <input type="search" placeholder="Search..." @input="${(e: InputEvent) => this.searchFilter = (e.target as HTMLInputElement).value}">

            <select title="Select year filter for announcements" @input="${this.changeYearFilter.bind(this)}">
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
        <div class="content">${repeat(filteredAnnouncements, announcement => announcement.id, (announcement: Announcement) => {
            let isMeeting = announcement.meeting !== undefined;
            let read = readAnnouncements.has(announcement.id);

            return html`
            <a-post title="${announcement.title}"
                    content="${announcement.content}"
                    author="${announcement.author}"
                    years="${humanList(announcement.years)}"
                    published="${humanDate(new Date(announcement.dates[0]))}"
                    ?meeting="${isMeeting}"
                    meetingDate="${isMeeting ? humanDate(new Date(announcement.meeting!.date)) : ""}"
                    meetingTime="${isMeeting ? announcement.meeting!.time : ""}"
                    weight="${announcement.weight}"
                    key="${announcement.id}"
                    ?read=${read}></a-post>
            `;
        })}</div>
        `;
    }
}

function isSameDay(a: Date, b: Date) {
    return a.getDate() == b.getDate() && a.getMonth() == b.getMonth() && a.getFullYear() == b.getFullYear();
}

function humanDate(date: Date) {
    let now = new Date();

    if (isSameDay(date, now)) return "Today";

    let yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);

    if (isSameDay(date, yesterday)) return "Yesterday";

    let tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (isSameDay(date, tomorrow)) return "Tomorrow";

    return `${date.getDate().toString().padStart(2, "0")}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getFullYear()}`
}

// TODO Will need reworking to support doing stuff like "Year 7, 8, 9 and 10"
function humanList(list: string[]) {
    if (list.length == 1) return list[0];

    let last = list.pop();

    return `${list.join(", ")} and ${last}`;
}