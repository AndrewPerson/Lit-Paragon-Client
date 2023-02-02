import { html, unsafeCSS, LitElement } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import { EscapeCss } from "../../utils";

//@ts-ignore
import textCss from "default/text.css";
//@ts-ignore
import postCss from "./post.css";

declare const SKIN_CSS: string;

@customElement("announcement-post")
export class AnnouncementPost extends LitElement {
    static styles = [textCss, postCss];

    @property()
    title: string;

    @property()
    author: string;

    @property()
    years: string;

    @property()
    published: string | null;

    @property({ type: Boolean })
    meeting: boolean;

    @property()
    meetingDate: string;

    @property()
    meetingTime: string;

    @property()
    content: string;

    @property()
    key: string;

    @query("#read")
    readIndicator: HTMLInputElement;

    SaveRead(read: boolean) {
        this.readIndicator.checked = read;

        let announcements = new Set<string>(JSON.parse(localStorage.getItem("Read Announcements") ?? "[]"));

        if (read) announcements.add(this.key);
        else announcements.delete(this.key);

        localStorage.setItem("Read Announcements", JSON.stringify([...announcements]));
    }

    GetRead(): boolean {
        let announcements = new Set<string>(JSON.parse(localStorage.getItem("Read Announcements") ?? "[]"));

        return announcements.has(this.key);
    }

    render() {
        return html`
        <input type="checkbox" id="read" ?checked="${this.GetRead()}" @input="${(e: InputEvent) => this.SaveRead((e.target as HTMLInputElement).checked)}">
        <details @toggle="${(e: Event) => { if ((e.target as HTMLDetailsElement).open) this.SaveRead(true) }}">
            <summary>
                <h1>${this.title}</h1>
                <p class="subtitle">By ${this.author} | For ${this.years}${this.meeting ? html` | <span class="meeting">Meeting at ${this.meetingTime}, ${this.meetingDate}</span>` : ""}${this.published === null ? "" : ` | Published ${this.published}`}</p>
            </summary>

            ${unsafeHTML(this.content)}
        </details>
        `;
    }
}