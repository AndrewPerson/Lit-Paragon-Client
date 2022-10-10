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
    static styles = [textCss, postCss, unsafeCSS(decodeURIComponent(SKIN_CSS))];

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

    @property({ type: Number })
    weight: number;

    @property()
    key: string;

    @query("#read")
    readIndicator: HTMLInputElement;

    MarkRead(e: Event) {
        if ((e.target as HTMLDetailsElement).open) {
            this.readIndicator.checked = true;
            this.SaveRead(true);
        }
    }

    SaveRead(read: boolean) {
        let announcements = new Set<string>(JSON.parse(localStorage.getItem("Read Announcements") ?? "[]"));

        if (this.parentElement !== null) {
            for (let announcement of announcements) {
                //This type comparison is because an older version of storing whether the announcement was read or not used to be used.
                //This stops the code breaking if it encounters that.
                if (typeof announcement === "string") {
                    if (this.parentElement.querySelector(`announcement-post[key="${EscapeCss(announcement)}"]`) === null)
                        announcements.delete(announcement);
                }
                else announcements.delete(announcement);
            }
        }

        if (read) announcements.add(this.key);
        else announcements.delete(this.key);

        localStorage.setItem("Read Announcements", JSON.stringify([...announcements]));
    }

    GetRead(): boolean {
        let announcements: Set<string> = new Set<string>(JSON.parse(localStorage.getItem("Read Announcements") ?? "[]"));

        return announcements.has(this.key);
    }

    render() {
        return html`
        <input type="checkbox" id="read" ?checked="${this.GetRead()}" @input="${(e: InputEvent) => this.SaveRead((e.target as HTMLInputElement).checked)}">
        <details @toggle="${this.MarkRead.bind(this)}">
            <summary>
                <h1>${this.title}</h1>
                <p class="subtitle">By ${this.author} | For ${this.years}${this.meeting ? html` | <span class="meeting">Meeting at ${this.meetingTime}, ${this.meetingDate}</span>` : ""}${this.published === null ? "" : ` | Published ${this.published}`}</p>
            </summary>

            ${unsafeHTML(this.content)}
        </details>
        `;
    }
}