import { LitElement, html } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";

//@ts-ignore
import textCss from "default/text.css";
//@ts-ignore
import periodCss from "./period.css";

@customElement("timetable-period")
export class TimetablePeriod extends LitElement {
    static styles = [textCss, periodCss];

    @property()
    title: string;

    @property()
    shortTitle: string;

    @property()
    teacher: string;

    @property()
    room: string;

    @property({ type: Number })
    minWidth: number = 0;

    @property({ type: Number })
    maxWidth: number = 0;

    @property({ type: Number })
    maxHeight: number = 0;

    @state()
    showDetails: boolean = false;

    @query("#details")
    details: HTMLParagraphElement;

    @query("#room")
    roomInfo: HTMLParagraphElement;

    static highlighted: string | undefined;

    static instances: TimetablePeriod[] = [];

    static Highlight(name: string | undefined) {
        if (this.highlighted == name) return;

        this.highlighted = name;

        for (let instance of this.instances) instance.requestUpdate();
    }

    constructor() {
        super();

        TimetablePeriod.instances.push(this);
    }

    firstUpdated() {
        //The if statement is to stop empty periods from being tabbed to
        if (this.room !== undefined && this.room !== null) {
            this.tabIndex = 0;
        }
    }

    updated() {
        if (TimetablePeriod.highlighted == this.title) {
            if (this.showDetails) {
                this.details.classList.remove("right");
                this.details.classList.remove("left");
                this.details.classList.remove("up");

                let rect = this.details.getBoundingClientRect();

                if (rect.left < this.minWidth)
                    this.details.classList.add("right");
                else if (rect.right > this.maxWidth)
                    this.details.classList.add("left");
                else if (rect.bottom > this.maxHeight)
                    this.details.classList.add("up");
            }
            else {
                this.roomInfo.classList.remove("up");

                let rect = this.roomInfo.getBoundingClientRect();

                let detailsOffscreen = rect.top + rect.height > this.maxHeight;

                this.roomInfo.classList.toggle("up", detailsOffscreen);
            }
        }
    }

    render() {
        let highlighted = TimetablePeriod.highlighted == this.title;
        this.classList.toggle("highlighted", highlighted);

        if (!highlighted) {
            this.blur();
            this.showDetails = false;
        }

        return html`
        <p class="info">${this.shortTitle}</p>

        <p id="room" class="popup info" style="${highlighted && !this.showDetails ? "" : "display: none"}">
            ${this.room}
        </p>

        <div id="details" class="popup details info" style="${this.showDetails ? "" : "display: none"}">
            ${this.title} in ${this.room} with ${this.teacher}
        </div>
        `;
    }
}