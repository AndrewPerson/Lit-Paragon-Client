import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { FormatTeacherCode } from "../../utils/format-teacher-code";

//@ts-ignore
import textCss from "default/text.css";
//@ts-ignore
import periodCss from "./period.css";

@customElement("timetable-period")
export class TimetablePeriod extends LitElement {
    static styles = [textCss, periodCss];

    @property()
    name: string;

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

        this.addEventListener("focus", () => this.showDetails = true);
        this.addEventListener("blur", () => this.showDetails = false);
        this.addEventListener("pointerleave", this.blur);
    }

    Highlight() {
        TimetablePeriod.Highlight(this.name);
        this.classList.add("highlighted");
    }

    Unhighlight() {
        TimetablePeriod.Highlight(undefined);
        this.classList.remove("highlighted");
    }

    firstUpdated() {
        //The if statement is to stop empty periods from being tabbed to
        if (this.room !== undefined && this.room !== null) {
            this.tabIndex = 0;
        }
    }

    render() {
        let highlighted = TimetablePeriod.highlighted == this.name;
        this.classList.toggle("highlighted", highlighted);
        if (!highlighted) this.blur();

        return html`
        <p>${this.name}</p>

        <p class="popup" style="${highlighted && !this.showDetails ? "" : "display: none"}">
            ${this.room}
        </p>

        <p class="popup details" style="${this.showDetails ? "" : "display: none"}">
            In ${this.room} with ${FormatTeacherCode(this.teacher)}
        </p>
        `;
    }
}