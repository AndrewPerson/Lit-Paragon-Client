import { html, LitElement, nothing } from "lit"
import { roomPopupCss, timetablePeriodCss, timetableDayCss, timetableRowCss, fullTimetableCss } from "./timetable-css";

export class RoomPopup extends LitElement {
    static get styles() {
        return roomPopupCss;
    }

    static get properties() {
        return {
            room: {type: String}
        }
    }

    constructor() {
        super();

        this.room = "";
    }

    render() {
        return html`
            <p>${this.room}</p>
        `;
    }
}

export class TimetablePeriod extends LitElement {
    static get styles() {
        return timetablePeriodCss;
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
        this.instances.forEach(instance => instance.update());
    }

    constructor() {
        super();

        TimetablePeriod.instances.push(this);

        this.name = "";
        this.room = "";

        this.onmouseover = () => TimetablePeriod.highlight(this.name);
        this.onmouseleave = () => TimetablePeriod.highlight("");
    }

    render() {
        var highlighted = TimetablePeriod.highlighted == this.name && this.name;

        return html`
            <div>
                <p class="${highlighted ? 'highlighted' : ''}">
                    ${this.name}
                </p>
                ${
                    highlighted ?  html`<room-popup room="${this.room}"
                                                    style="top: ${this.offsetTop + this.clientHeight}px; width: ${this.style.width}">
                                        </room-popup>`
                                        :
                                        nothing
                }
            </div>
        `;
    }
}

export class TimetableDay extends LitElement {
    static get styles() {
        return timetableDayCss;
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
        return timetableRowCss;
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
        return fullTimetableCss;
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
        if (!this.data) {
            return html`<loading-element style="width: 80%"></loading-element>`
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

customElements.define("room-popup", RoomPopup);
customElements.define("timetable-period", TimetablePeriod);
customElements.define("timetable-day", TimetableDay);
customElements.define("timetable-row", TimetableRow);
customElements.define("full-timetable", FullTimetable);