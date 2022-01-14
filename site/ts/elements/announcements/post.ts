import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

//@ts-ignore
import postCss from "./post.css";
//@ts-ignore
import textCss from "default/text.css";

@customElement("announcement-post")
export class AnnouncementPost extends LitElement {
    static styles = [textCss, postCss];

    @property()
    title: string;

    @property()
    author: string;

    @property()
    years: string;

    @property({ type: Boolean })
    meeting: boolean;

    @property()
    meetingDate: string;

    @property()
    meetingTime: string;

    @property()
    meetingLocation: string;

    @property()
    content: string;

    @property({ type: Number })
    weight: number;

    render() {
        return html`
        <details>
            <summary>
                <h3>${this.title}</h3>
                <p class="info">By ${this.author} | For ${this.years}${this.meeting ? ` | At${this.meetingDate == "" ? "" : ` ${this.meetingDate}` } ${this.meetingTime} | In ${this.meetingLocation}` : ""}</p>
            </summary>

            ${unsafeHTML(this.content)}
        </details>
        `;
    }
}