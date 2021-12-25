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
    meetingTime: string | undefined;

    @property()
    meetingLocation: string | undefined;

    @property()
    content: string;

    @property({ type: Number })
    weight: number;

    render() {
        return html`
        <details>
            <summary>
                ${this.title}
            </summary>

            ${unsafeHTML(this.content)}
        </details>
        `;
    }
}