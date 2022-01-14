import { Page } from "../page/page";

import { html } from "lit";
import { customElement, state } from "lit/decorators.js";

import "./post";

import { Announcements, Announcement } from "./types";

import { DefinedUnknown, SafeAccess } from "../../unknown";

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
    static styles = [textCss, imgCss, searchCss, selectCss, pageCss, fullElementCss, announcementCss];

    @state()
    announcements: Announcements | DefinedUnknown;

    @state()
    yearFilter: string = "all";

    @state()
    searchFilter: string = "";

    constructor() {
        super();

        this.AddResource("announcements", "announcements");
    }

    renderPage() {
        let notices = SafeAccess<(Announcement | DefinedUnknown)[]>(this.announcements, ["object", "array"], ["notices"]) ?? [];

        let filteredAnnouncements = this.yearFilter == "all" ? notices : notices.filter((announcement: Announcement | DefinedUnknown) => {
            let years = SafeAccess<string[]>(announcement, ["object", "array"], ["years"]) ?? [];
            return years.includes(this.yearFilter)
        });

        filteredAnnouncements = this.searchFilter == "" ? filteredAnnouncements : filteredAnnouncements.filter((announcement: Announcement | DefinedUnknown) => {
            let title = SafeAccess<string>(announcement, ["object", "string"], ["title"]);
            let content = SafeAccess<string>(announcement, ["object", "string"], ["content"]);

            if (title === undefined || content === undefined) return false;
            
            return title.toLowerCase().includes(this.searchFilter.toLowerCase()) ||
                   content.toLowerCase().includes(this.searchFilter.toLowerCase())
        });

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
        <div class="content">${filteredAnnouncements.map((announcement: Announcement | DefinedUnknown) => {
            let title = SafeAccess<string>(announcement, ["object", "string"], ["title"]) ?? "???";
            let content = SafeAccess<string>(announcement, ["object", "string"], ["content"]) ?? "???";
            let author = SafeAccess<string>(announcement, ["object", "string"], ["authorName"]) ?? "No one";
            let years = SafeAccess<string>(announcement, ["object", "string"], ["displayYears"]) ?? "No one";
            let meeting = (SafeAccess<number>(announcement, ["object", "number"], ["isMeeting"]) ?? 0) == 1;

            let meetingDate = SafeAccess<string>(announcement, ["object", "string"], ["meetingDate"]) ?? "";
            //No need to show the meeting date if it's today.
            if (new Date().toISOString().split('T')[0] == meetingDate) meetingDate = "";

            let meetingTime = SafeAccess<string>(announcement, ["object", "string"], ["meetingTime"]);
            let meetingTimeParsed = SafeAccess<string>(announcement, ["object", "string"], ["meetingTimeParsed"]) ?? "";
            let meetingLocation = SafeAccess<string>(announcement, ["object", "string"], ["meetingLocation"]) ?? "";
            let relativeWeight = SafeAccess<number>(announcement, ["object", "number"], ["relativeWeight"]) ?? 0;

            return html`
            <announcement-post title="${title}" content="${content}" author="${author}" years="${years}"
                               ?meeting="${meeting}" meetingDate="${meetingDate}" meetingTime="${meeting ? (meetingTime ?? meetingTimeParsed) : ""}"
                               meetingLocation="${meeting ? meetingLocation : ""}" weight="${relativeWeight + (meeting ? 1 : 0)}"></announcement-post>
            `;
        })}</div>
        `;
    }
}