import { html, LitElement, PropertyValueMap } from "lit";
import { customElement, property, query } from "lit/decorators.js";

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

    @query("#details", true)
    details: HTMLElement;

    static highlighted: string | undefined;

    static instances: TimetablePeriod[] = [];

    static highlight(name: string | undefined) {
        if (this.highlighted == name) return;
        this.highlighted = name;

        for (let instance of this.instances) instance.requestUpdate();
    }

    calculateDetailsOffset() {
        this.details.style.removeProperty("--detail-x-offset");
        this.details.classList.remove("flip-detail-y");
        const detailsRect = this.details.getBoundingClientRect();

        if (detailsRect.right > window.innerWidth) {
            this.details.style.setProperty("--detail-x-offset", `${Math.round(window.innerWidth - detailsRect.right)}px`);
        }

        if (detailsRect.left < 0) {
            this.details.style.setProperty("--detail-x-offset", `${Math.round(-detailsRect.left)}px`);
        }

        if (detailsRect.bottom > window.innerHeight) {
            this.details.classList.add("flip-detail-y");
        }
        else
        {
            this.details.classList.remove("flip-detail-y");
        }
    }

    constructor() {
        super();

        TimetablePeriod.instances.push(this);

        this.addEventListener("focus", _ => {
            this.calculateDetailsOffset();
        });
    }

    disconnectedCallback() {
        super.disconnectedCallback();

        TimetablePeriod.instances.splice(TimetablePeriod.instances.indexOf(this), 1);
    }

    render() {
        let highlighted = TimetablePeriod.highlighted == this.title;
        this.classList.toggle("highlighted", highlighted);

        if (!highlighted) {
            this.blur();
        }

        const rect = this.getBoundingClientRect();

        const scroll = getComputedStyle(this).getPropertyValue("--scroll");

        const offsetY = Math.round(rect.y + rect.height) + (scroll.length < 3 ? 0 : parseFloat(scroll.substring(0, scroll.length - 2)));
        const offsetX = Math.round(rect.x + rect.width / 2);

        return html`
        <p class="title">${this.shortTitle}</p>

        <p id="room" class="popup" style="top: ${offsetY}px; left: ${offsetX}px;">
            ${this.room}
        </p>

        <div id="details" class="popup" style="top: ${offsetY}px; left: ${offsetX}px;">
            <p>${this.title}</p>
            <p>${this.teacher} • Room ${this.room}</p>
        </div>
        `;
    }
}