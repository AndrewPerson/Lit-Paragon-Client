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

        for (let instance of this.instances) instance.requestUpdate();
    }

    constructor() {
        super();

        TimetablePeriod.instances.push(this);
    }

    Highlight() {
        TimetablePeriod.highlight(this.name);
        this.classList.add("highlighted");
    }

    Unhighlight() {
        TimetablePeriod.highlight("");
        this.classList.remove("highlighted");
    }

    firstUpdated() {
        //Just to prevent unnecessary event listeners
        if (this.name) {
            this.tabIndex = 0;

            this.addEventListener("mouseover", this.Highlight);
            this.addEventListener("mouseleave", this.Unhighlight);

            this.addEventListener("click", this.Highlight);

            this.addEventListener("focus", this.Highlight);
            this.addEventListener("blur", this.Unhighlight);
        }
    }

    render() {
        let highlighted = TimetablePeriod.highlighted == this.name && this.name;

        if (highlighted) {
            let nextSibling = this.nextElementSibling;
            let nextNextSibling = nextSibling?.nextElementSibling;

            let displayPopupTop = nextSibling?.getAttribute("name") == this.name
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