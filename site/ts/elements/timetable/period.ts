import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

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
    room: string;

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

    Highlight() {
        TimetablePeriod.Highlight(this.name);
        this.classList.add("highlighted");
    }

    Unhighlight() {
        TimetablePeriod.Highlight(undefined);
        this.classList.remove("highlighted");
    }

    firstUpdated() {
        //Just to prevent unnecessary tabbing
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
        <p id="popup"
           style="${highlighted ? "" : "display: none"}">
            ${this.room}
        </p>
        `;
    }
}