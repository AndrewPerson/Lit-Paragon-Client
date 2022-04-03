import { html, LitElement } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

//@ts-ignore
import textCss from "default/text.css";
//@ts-ignore
import postCss from "./post.css";

@customElement("announcement-post")
export class AnnouncementPost extends LitElement {
    static styles = [textCss, postCss];

    @property()
    set title(value: string) {
        this._title = value;

        if (this.readIndicator !== null) this.readIndicator.checked = false;
    }

    get title(): string {
        return this._title;
    }

    _title: string;

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

    @query("#read")
    readIndicator: HTMLInputElement;

    MarkRead(e: Event) {
        if ((e.target as HTMLDetailsElement).open) {
            this.readIndicator.checked = true;
            this.SaveRead(true);
        }
    }

    SaveRead(read: boolean) {
        let announcements = new Map(JSON.parse(localStorage.getItem("Read Announcements") ?? "[]"));

        if (this.parentElement !== null) {
            for (let announcement of announcements.keys()) {
                if (this.parentElement.querySelector(`announcement-post[title="${announcement}"]`) === null)
                    announcements.delete(announcement);
            }
        }

        announcements.set(this._title, read);

        localStorage.setItem("Read Announcements", JSON.stringify([...announcements.entries()]));
    }

    GetRead(): boolean {
        let announcements = new Map(JSON.parse(localStorage.getItem("Read Announcements") ?? "[]"));

        return announcements.get(this._title) as boolean | undefined ?? false;
    }

    render() {
        return html`
        <input type="checkbox" id="read" ?checked="${this.GetRead()}" @input="${(e: InputEvent) => this.SaveRead((e.target as HTMLInputElement).checked)}">
        <details @toggle="${this.MarkRead.bind(this)}">
            <summary>
                <h1>${this._title}</h1>
                <p class="info">By ${this.author} | For ${this.years}${this.meeting ? html` | <span class="meeting">Meeting at ${this.meetingTime}, ${this.meetingDate}</span>` : ""}${this.published === null ? "" : ` | Published ${this.published}`}</p>
            </summary>

            ${unsafeHTML(this.content)}
        </details>
        `;
    }
}