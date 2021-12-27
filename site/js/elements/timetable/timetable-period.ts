import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

//@ts-ignore
import textCss from "default/text.css";
//@ts-ignore
import timetablePeriodCss from "./timetable-period.css";

@customElement("timetable-period")
export class TimetablePeriod extends LitElement {
    static styles = [textCss, timetablePeriodCss];

    @property()
    name: string;

    @property()
    room: string;

    static highlighted: string;

    static instances: TimetablePeriod[] = [];

    static highlight(name: string) {
        this.highlighted = name;

        for (var instance of this.instances) instance.requestUpdate();
    }

    constructor() {
        super();

        TimetablePeriod.instances.push(this);
    }

    firstUpdated() {
        //Just to prevent unnecessary event listeners
        if (this.name) {
            this.tabIndex = 0;

            this.addEventListener("pointerover", () => TimetablePeriod.highlight(this.name));
            this.addEventListener("pointerleave", () => TimetablePeriod.highlight(""));

            this.addEventListener("focus", () => TimetablePeriod.highlight(this.name));
            this.addEventListener("blur", () => TimetablePeriod.highlight(""));
        }
    }

    render() {
        var highlighted = TimetablePeriod.highlighted == this.name && this.name;

        if (highlighted) {
            var nextSibling = this.nextElementSibling;
            var nextNextSibling = nextSibling?.nextElementSibling;

            var displayPopupTop = nextSibling?.getAttribute("name") == this.name
                               || nextNextSibling?.getAttribute("name") == this.name;

            return html`
                <p class="highlighted">${this.name}</p>
                <p id="popup"
                   ?reversed="${displayPopupTop}">
                    ${this.room}
                </p>
            `;
        }
        else return html`<p>${this.name}</p>`;
    }
}