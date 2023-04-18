import { html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

//@ts-ignore
import textCss from "default/text.css";
//@ts-ignore
import postCss from "./post.css";

@customElement("a-post")
export class Post extends LitElement {
    static styles = [textCss, postCss];

    @property()
    title: string;

    @property()
    author: string;

    @property()
    years: string;

    @property()
    published: string;

    @property({ type: Boolean })
    meeting: boolean;

    @property()
    meetingDate: string | undefined;

    @property()
    meetingTime: string | undefined;

    @property()
    content: string;

    @property()
    key: string;

    @property({ type: Boolean })
    read: boolean;

    setRead(read: boolean) {
        let readEvent = new CustomEvent("read", {
            bubbles: true,
            cancelable: true,
            composed: true,
            detail: {
                read: read,
                key: this.key,
            }
        });

        this.dispatchEvent(readEvent);

        this.read = true;
    }

    render() {
        return html`
        <input type="checkbox" id="read" ?checked="${this.read}" @input="${(e: InputEvent) => this.setRead((e.target as HTMLInputElement).checked)}">
        <details @toggle="${(e: Event) => { if ((e.target as HTMLDetailsElement).open) this.setRead(true) }}">
            <summary>
                <h1>${this.title}</h1>
                <p class="subtitle">
                    By ${this.author} |
                    Published ${this.published} |
                    For ${this.years}
                    ${this.meeting ? html` | <span class="meeting">Meeting at ${this.meetingTime}, ${this.meetingDate}</span>` : nothing}
                </p>
            </summary>

            ${unsafeHTML(this.content)}
        </details>
        `;
    }
}