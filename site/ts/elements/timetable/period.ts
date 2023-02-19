import { html, LitElement } from "lit";
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

    @state()
    showDetails: boolean = false;

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

    render() {
        let highlighted = TimetablePeriod.highlighted == this.title;
        this.classList.toggle("highlighted", highlighted);

        if (!highlighted) {
            this.blur();
            this.showDetails = false;
        }

        const rect = this.getBoundingClientRect();

        return html`
        <p class="title">${this.shortTitle}</p>

        <p id="room" class="popup info" style="top: ${rect.top + rect.height}px; left: ${rect.left}px; ${highlighted && !this.showDetails ? "" : "display: none"}">
            ${this.room}
        </p>

        <div id="details" class="popup details" style="top: ${rect.top + rect.height}px; left: ${rect.left}px; ${this.showDetails ? "" : "display: none"}">
            ${this.title} in ${this.room} with ${this.teacher}
        </div>
        `;
    }
}