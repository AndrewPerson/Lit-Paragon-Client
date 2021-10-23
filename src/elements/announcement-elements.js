import { html, nothing, LitElement } from "lit";
import { repeat } from 'lit/directives/repeat.js';
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { announcementItemCss, announcementContainerCss } from "./announcement.css";
import { textCss, imgCss, blockQuoteCss, selectCss, searchCss, fullContainerCss, containerCss } from "./default.css";

export class AnnouncementItem extends LitElement {
    static get styles() {
        return [textCss, blockQuoteCss, imgCss, announcementItemCss];
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

    toggle() {
        this.collapsed = !this.collapsed;

        this.requestUpdate();
    }

    constructor() {
        super();

        this.title = "";
        this.content = "";
        this.displayYears = "";
        this.author = "";
        this.time = null;

        this.collapsed = true;
    }

    render() {
        return html`
            <button @click="${this.toggle}" id="toggle">
                <p id="title">${this.title}</p>
                <img id="toggleImg" class="${this.collapsed ? "" : "flipped"}" src="images/toggle.svg" />
            </button>

            <p id="sub">For ${this.displayYears} ${this.time ? "| At " + this.time + " " : ""}| By ${this.author}</p>
            <blockquote id="content" class="${this.collapsed ? "collapsed" : "expanded"}">
                ${unsafeHTML(this.content)}
            </blockquote>
        `;
    }
}

export class SchoolAnnouncements extends LitElement {
    static get styles() {
        return [textCss, selectCss, searchCss, fullContainerCss, containerCss, announcementContainerCss];
    }

    static get properties() {
        return {
            data: {type: Object}
        }
    }

    updateFilter(e) {
        this.filter = e.target.value;
        this.requestUpdate();
    }

    constructor() {
        super();

        this.data = {
            notices: []
        }

        this.filter = "all";
    }

    render() {
        if (!this.hasAttribute("data"))
            return nothing;

        if (!this.data)
            return html`<loading-element style="width: 80%; margin: auto;"></loading-element>`;

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

        return html`
            <div id="header">
                <input type="search" id="search" placeholder="Search..." autocomplete="off" @change="${this.Search}"/>

                <select id="filter" @input="${this.updateFilter}">
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
            <div id="announcements">
                <p id="nothing" style="${filteredNotices.length == 0 ? "" : "display: none"}">Nothing For This Filter</p>
                
                ${
                    repeat(filteredNotices, notice => notice.title, notice => html`
                        <announcement-item title="${notice.title}"
                                            content="${notice.content}"
                                            displayYears="${notice.displayYears}"
                                            author="${notice.authorName}"
                                            time="${notice.isMeeting ? notice.meetingTime : ''}">
                        </announcement-item>
                    `)
                }
            </div>
        `;
    }
}

customElements.define("announcement-item", AnnouncementItem);
customElements.define("school-announcements", SchoolAnnouncements);