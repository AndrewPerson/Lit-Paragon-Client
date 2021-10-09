import { html, LitElement } from "lit"
import { timetablePeriodCss, timetableDayCss, timetableRowCss, fullTimetableCss } from "./timetable.css";
import { textCss, containerCss } from "./default.css";

export class TimetablePeriod extends LitElement {
    static get styles() {
        return [textCss, timetablePeriodCss];
    }

    static get properties() {
        return {
            name: {type: String},
            room: {type: String}
        }
    }

    static highlighted = "";

    static instances = [];

    static highlight(name) {
        this.highlighted = name;
        this.instances.forEach(instance => instance.requestUpdate());
    }

    constructor() {
        super();

        TimetablePeriod.instances.push(this);

        this.name = "";
        this.room = "";

        this.addEventListener("mouseover", () => TimetablePeriod.highlight(this.name));

        this.addEventListener("mouseleave", () => TimetablePeriod.highlight(""));
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
                   ?reversed="${displayPopupTop}"
                   @mouseover=${() => TimetablePeriod.highlight("")}>
                    ${this.room}
                </p>
            `;
        }
        else return html`<p>${this.name}</p>`;
    }
}

export class TimetableDay extends LitElement {
    static get styles() {
        return [textCss, timetableDayCss];
    }

    static get properties() {
        return {
            name: {type: String},
            data: {type: Object},
            day: {type: String}
        };
    }
    
    constructor() {
        super();

        this.name = "";

        this.data = {};

        this.day = "";
    }

    render() {
        return html`
            <p class="name ${this.day == this.name ? 'highlighted' : ''}">${this.name}</p>
            
            <timetable-period name="${this.data['1']?.title}"
                              room="${this.data['1']?.room}">
            </timetable-period>

            <timetable-period name="${this.data['2']?.title}"
                              room="${this.data['2']?.room}">
            </timetable-period>

            <timetable-period name="${this.data['3']?.title}"
                              room="${this.data['3']?.room}">
            </timetable-period>

            <timetable-period name="${this.data['4']?.title}"
                              room="${this.data['4']?.room}">
            </timetable-period>

            <timetable-period name="${this.data['5']?.title}"
                              room="${this.data['5']?.room}">
            </timetable-period>
        `;
    }
}

export class TimetableRow extends LitElement {
    static get styles() {
        return [textCss, timetableRowCss];
    }

    static get properties() {
        return {
            week: {type: String},
            day1: {type: Object},
            day2: {type: Object},
            day3: {type: Object},
            day4: {type: Object},
            day5: {type: Object},
            day: {type: String}
        };
    }
    
    constructor() {
        super();

        this.week = "";

        this.day1 = {};
        this.day2 = {};
        this.day3 = {};
        this.day4 = {};
        this.day5 = {};

        this.day = "";
    }

    render() {
        return html`
            <div class="period-nums">
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
            </div>

            <timetable-day name="MON ${this.week}"
                           data="${JSON.stringify(this.day1.periods)}"
                           day="${this.day}">
            </timetable-day>

            <timetable-day name="TUE ${this.week}"
                           data="${JSON.stringify(this.day2.periods)}"
                           day="${this.day}">
            </timetable-day>

            <timetable-day name="WED ${this.week}"
                           data="${JSON.stringify(this.day3.periods)}"
                           day="${this.day}">
            </timetable-day>

            <timetable-day name="THU ${this.week}"
                           data="${JSON.stringify(this.day4.periods)}"
                           day="${this.day}">
            </timetable-day>

            <timetable-day name="FRI ${this.week}"
                           data="${JSON.stringify(this.day5.periods)}"
                           day="${this.day}">
            </timetable-day>
        `;
    }
}

export class FullTimetable extends LitElement {
    static get styles() {
        return [containerCss, fullTimetableCss];
    }

    static get properties() {
        return {
            data: {type: Object},
            day: {type: String}
        }
    }

    constructor() {
        super();

        this.data = {
            days: {

            }
        };

        this.day = "";
    }

    render() {
        if (!this.hasAttribute("data")) {
            return html`<loading-element style="width: 80%; margin: auto;"></loading-element>`
        }

        this.day = this.day.slice(0, 3).toUpperCase() + " " + this.day.slice(-1);

        return html`
            <timetable-row week="A"
                           day1="${JSON.stringify(this.data.days['1'])}"
                           day2="${JSON.stringify(this.data.days['2'])}"
                           day3="${JSON.stringify(this.data.days['3'])}"
                           day4="${JSON.stringify(this.data.days['4'])}"
                           day5="${JSON.stringify(this.data.days['5'])}"
                           day="${this.day}">
            </timetable-row>

            <timetable-row week="B"
                           day1="${JSON.stringify(this.data.days['6'])}"
                           day2="${JSON.stringify(this.data.days['7'])}"
                           day3="${JSON.stringify(this.data.days['8'])}"
                           day4="${JSON.stringify(this.data.days['9'])}"
                           day5="${JSON.stringify(this.data.days['10'])}"
                           day="${this.day}">
            </timetable-row>

            <timetable-row week="C"
                           day1="${JSON.stringify(this.data.days['11'])}"
                           day2="${JSON.stringify(this.data.days['12'])}"
                           day3="${JSON.stringify(this.data.days['13'])}"
                           day4="${JSON.stringify(this.data.days['14'])}"
                           day5="${JSON.stringify(this.data.days['15'])}"
                           day="${this.day}">
            </timetable-row>
        `;
    }
}

customElements.define("timetable-period", TimetablePeriod);
customElements.define("timetable-day", TimetableDay);
customElements.define("timetable-row", TimetableRow);
customElements.define("full-timetable", FullTimetable);