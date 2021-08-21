import { html, LitElement } from "lit"
import { timetablePeriodCss, timetableDayCss, timetableRowCss, fullTimetableCss } from "./timetable-css";

export class TimetablePeriod extends LitElement {
    static get styles() {
        return timetablePeriodCss;
    }

    static get properties() {
        return {
            name: {type: String}
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

        this.onmouseover = () => TimetablePeriod.highlight(this.name);
        this.onmouseleave = () => TimetablePeriod.highlight("");
    }

    render() {
        return html`
            <p class="${TimetablePeriod.highlighted == this.name && this.name ? 'highlighted' : ''}">${this.name}</p>
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
            period1: {type: String},
            period2: {type: String},
            period3: {type: String},
            period4: {type: String},
            period5: {type: String}
        };
    }
    
    constructor() {
        super();

        this.name = "";

        this.period1 = "";
        this.period2 = "";
        this.period3 = "";
        this.period4 = "";
        this.period5 = "";
    }

    render() {
        return html`
            <p class="name">${this.name}</p>
            <timetable-period name="${this.period1}"></timetable-period>
            <timetable-period name="${this.period2}"></timetable-period>
            <timetable-period name="${this.period3}"></timetable-period>
            <timetable-period name="${this.period4}"></timetable-period>
            <timetable-period name="${this.period5}"></timetable-period>
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
            day5: {type: Object}
        };
    }
    
    constructor() {
        super();

        this.week = "";

        this.day1 = {
            periods: {
                
            }
        };

        this.day2 = {
            periods: {
                
            }
        };
        
        this.day3 = {
            periods: {
                
            }
        };
        
        this.day4 = {
            periods: {
                
            }
        };
        
        this.day5 = {
            periods: {
                
            }
        };
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
                           period1="${this.day1.periods['1']?.title}"
                           period2="${this.day1.periods['2']?.title}"
                           period3="${this.day1.periods['3']?.title}"
                           period4="${this.day1.periods['4']?.title}"
                           period5="${this.day1.periods['5']?.title}">
            </timetable-day>

            <timetable-day name="TUE ${this.week}"
                           period1="${this.day2.periods['1']?.title}"
                           period2="${this.day2.periods['2']?.title}"
                           period3="${this.day2.periods['3']?.title}"
                           period4="${this.day2.periods['4']?.title}"
                           period5="${this.day2.periods['5']?.title}">
            </timetable-day>

            <timetable-day name="WED ${this.week}"
                           period1="${this.day3.periods['1']?.title}"
                           period2="${this.day3.periods['2']?.title}"
                           period3="${this.day3.periods['3']?.title}"
                           period4="${this.day3.periods['4']?.title}"
                           period5="${this.day3.periods['5']?.title}">
            </timetable-day>

            <timetable-day name="THU ${this.week}"
                           period1="${this.day4.periods['1']?.title}"
                           period2="${this.day4.periods['2']?.title}"
                           period3="${this.day4.periods['3']?.title}"
                           period4="${this.day4.periods['4']?.title}"
                           period5="${this.day4.periods['5']?.title}">
            </timetable-day>

            <timetable-day name="FRI ${this.week}"
                           period1="${this.day5.periods['1']?.title}"
                           period2="${this.day5.periods['2']?.title}"
                           period3="${this.day5.periods['3']?.title}"
                           period4="${this.day5.periods['4']?.title}"
                           period5="${this.day5.periods['5']?.title}">
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
            data: {type: Object}
        }
    }

    constructor() {
        super();

        this.data = {
            days: {

            }
        };
    }

    render() {
        if (!this.data) {
            return html`<loading-element></loading-element>`
        }

        return html`
            <timetable-row week="A"
                           day1="${JSON.stringify(this.data.days['1'])}"
                           day2="${JSON.stringify(this.data.days['2'])}"
                           day3="${JSON.stringify(this.data.days['3'])}"
                           day4="${JSON.stringify(this.data.days['4'])}"
                           day5="${JSON.stringify(this.data.days['5'])}">
            </timetable-row>

            <timetable-row week="B"
                           day1="${JSON.stringify(this.data.days['6'])}"
                           day2="${JSON.stringify(this.data.days['7'])}"
                           day3="${JSON.stringify(this.data.days['8'])}"
                           day4="${JSON.stringify(this.data.days['9'])}"
                           day5="${JSON.stringify(this.data.days['10'])}">
            </timetable-row>

            <timetable-row week="C"
                           day1="${JSON.stringify(this.data.days['11'])}"
                           day2="${JSON.stringify(this.data.days['12'])}"
                           day3="${JSON.stringify(this.data.days['13'])}"
                           day4="${JSON.stringify(this.data.days['14'])}"
                           day5="${JSON.stringify(this.data.days['15'])}">
            </timetable-row>
        `;
    }
}

customElements.define("timetable-period", TimetablePeriod);
customElements.define("timetable-day", TimetableDay);
customElements.define("timetable-row", TimetableRow);
customElements.define("full-timetable", FullTimetable);