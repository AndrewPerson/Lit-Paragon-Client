import { html, LitElement, nothing } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { announcementItemCss, announcementContainerCss } from "./announcement-css";

export class AnnouncementItem extends LitElement {
    static get styles() {
        return announcementItemCss;
    }

    static get properties() {
        return {
            title: {type: String},
            content: {type: String},
            displayYears: {type: String},
            author: {type: String},
            time: {type: String}
        }
    }

    constructor() {
        super();

        this.title = "";
        this.content = "";
        this.displayYears = "";
        this.author = "";
        this.time = null;
    }

    render() {
        //"toggle" is located in announcements.html
        return html`
            <p class="title" onclick="toggle(this.parentNode.querySelector('#content'))">${this.title}</p>
            <p class="sub">For ${this.displayYears} ${this.time ? "| At " + this.time + " " : ""}| By ${this.author}</p>
            <div id="content" class="content collapsed">
                ${unsafeHTML(this.content)}
            </div>
            <img onclick="toggle(this.parentNode.querySelector('#content'))" class="toggle" src="images/toggle.svg" />
        `;
    }
}

export class AnnouncementContainer extends LitElement {
    static get styles() {
        return announcementContainerCss;
    }

    static get properties() {
        return {
            data: {type: Object},
            filter: {type: String}
        }
    }

    constructor() {
        super();

        this.data = {
            notices: []
        }

        this.filter = "";
    }

    render() {
        if (!this.data) {
            return html`<loading-element></loading-element>`;
        }

        if (this.data.notices.length == 0) {
            return html`
                <div class="header" style="min-width: unset; width: 80%; margin: 0 auto;">
                    <div class="line-right"></div>
                    <p>Nothing For Today</p>
                    <div class="line-left"></div>
                </div>
            `;
        }

        var filteredNotices = [];

        if (this.filter != "all" && this.filter != "") {
            filteredNotices = this.data.notices.filter(notice => notice.years.includes(this.filter));
        }
        else {
            filteredNotices = this.data.notices;
        }

        filteredNotices = filteredNotices.sort((a, b) => b.relativeWeight - a.relativeWeight);

        if (filteredNotices.length == 0) {
            return html`
                <div class="header">
                    <select id="filter" oninput="updateFilter(this.value)">
                        <option value="all">All</option>
                        <option value="Staff">Staff</option>
                        <option value="12">12</option>
                        <option value="11">11</option>
                        <option value="10">10</option>
                        <option value="9">9</option>
                        <option value="8">8</option>
                        <option value="7">7</option>
                    </select>
                </div>

                <div style="align-self: center; flex-grow: 1; display: flex; flex-direction: column; justify-content: center;">
                    <p>Nothing For This Filter</p>
                </div>
            `;
        }

        //"updateFilter" is in announcements.html
        //"toggleAll" is in announcements.html
        return html`
            <div class="header">
                <select id="filter" oninput="updateFilter(this.value)">
                    <option value="all">All</option>
                    <option value="Staff">Staff</option>
                    <option value="12">12</option>
                    <option value="11">11</option>
                    <option value="10">10</option>
                    <option value="9">9</option>
                    <option value="8">8</option>
                    <option value="7">7</option>
                </select>
            </div>
            <div class="announcements">
                ${
                    filteredNotices.map(notice => {
                        return html`
                            <announcement-item title="${notice.title}"
                                               content="${notice.content}"
                                               displayYears="${notice.displayYears}"
                                               author="${notice.authorName}"
                                               time="${notice.isMeeting ? notice.meetingTime : ''}">
                            </announcement-item>
                        `;
                    })
                }
            </div>
        `;
    }
}

customElements.define("announcement-item", AnnouncementItem);
customElements.define("announcement-container", AnnouncementContainer);