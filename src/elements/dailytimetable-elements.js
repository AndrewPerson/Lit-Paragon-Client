import { html, css, nothing, LitElement } from "lit";
import { bellCss, payloadBellCss, dailytimetableCss } from "./dailytimetable-css";

export class BellItem extends LitElement {
    static get styles() {
        return bellCss;
    }

    static get properties() {
        return {
            name: {type: String},
            time: {type: String}
        }
    }

    constructor() {
        super();

        this.name = "";
        this.time = "00:00";
    }

    render() {
        return html`
            <p class="start">${this.name}</p>
            <p class="end">${this.time}</p>
        `;
    }
}

export class PayloadBellItem extends LitElement {
    static get styles() {
        return [bellCss, payloadBellCss];
    }

    static get properties() {
        return {
            time: {type: String},
            timeChanged: {type: Boolean},
            name: {type: String},
            room: {type: String},
            roomChanged: {type: Boolean},
            teacher: {type: String},
            teacherChanged: {type: Boolean}
        }
    }

    constructor() {
        super();

        this.time = "";
        this.timeChanged = false;
        this.name = "";
        this.room = "";
        this.roomChanged = false;
        this.teacher = "";
        this.teacherChanged = false;
    }

    render() {
        var timeClass = this.timeChanged ? "changed" : "";
        var teacherClass = this.teacherChanged ? "changed" : "";
        var roomClass = this.roomChanged ? "changed" : "";

        return html`
            <div>
                <p class="start">${this.name}</p>
                <p class="time">at <span class="${timeClass}">${this.time}</span> with <span class="${teacherClass}">${this.teacher}</span></p>
            </div>
            
            <p class="end ${roomClass}">${this.room}</p>
        `;
    }
}

export class DailyTimetable extends LitElement {
    static get styles() {
        return dailytimetableCss;
    }

    static get properties() {
        return {
            data: {type: Object}
        }
    }

    getDate(bell) {
        var date = new Date(this.data.date);

        var parts = bell.time.split(":");

        var hours = Number.parseInt(parts[0]);
        var minutes = Number.parseInt(parts[1]);

        date.setHours(hours);
        date.setMinutes(minutes);

        return date;
    }

    getNextBell() {
        var now = new Date();

        for (var index in this.data.bells) {
            var bell = this.data.bells[index];

            var bellTime = this.getDate(bell);

            if (bellTime >= now) {
                return {bell: bell, time: Math.round((bellTime - now) / 1000)};
            }
        }

        return undefined;
    }

    secondsToString(time) {
        var seconds = time % 60;
        var minutes = ((time - seconds) / 60) % 60;
        var hours = ((time - seconds) / 60 - minutes) / 60;

        if (hours < 10) {
            hours = '0' + hours;
        }
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        if (seconds < 10) {
            seconds = '0' + seconds;
        }

        var formattedString = '';
        if (hours !== '00') {
            formattedString += hours + ':';
        }

        formattedString += minutes + ':' + seconds;

        return formattedString
    }

    updateCountdown() {
        var nextBell = this.getNextBell();

        if (!nextBell) {
            LoginIfNeeded().then(token => {
                UpdateResourcesIfNeeded(token, true).then(() => {
                    location.reload();
                });
            });
        }
        else {
            this.nextBell = nextBell.bell.bellDisplay;
            this.timeUntilNextBell = this.secondsToString(nextBell.time);
        }
    }

    constructor() {
        super();

        this.nextBell = "Nothing";
        this.timeUntilNextBell = "00:00";

        setInterval(() => {
            if (this.data) {
                this.updateCountdown();
                this.update();
            }
        }, 1000);

        this.data = {
            date: "0001-01-01",
            bells: [],
            timetable: {
                timetable: {
                    periods: {}
                }
            },
            roomVariations: [],
            classVariations: []
        };
    }

    render() {
        if (!this.data) {
            return html`
                <loading-element style="width: 80%"></loading-element>
            `;
        }

        this.updateCountdown();

        return html`
            <p>${this.nextBell}</p>
            <p>in</p>

            <div class="timer-container">
                <span class="line-right"></span>
                <p id="timer">${this.timeUntilNextBell}</p>
                <span class="line-left"></span>
            </div>

            ${
                this.data.bells.map(bell => {
                    var period = this.data.timetable.timetable.periods[bell.bell];

                    if (period) {
                        if (bell.bell == "R")
                            return nothing;
                        else {
                            var room = period.room;
                            var roomChanged = false;

                            if (bell.bell in this.data.roomVariations) {
                                roomChanged = true;
                                room = this.data.roomVariations[bell.bell].roomTo;
                            }
                            
                            var teacher = period.fullTeacher;
                            var teacherChanged = false;

                            if (bell.bell in this.data.classVariations) {
                                teacherChanged = true;
                                teacher = this.data.classVariations[bell.bell].casualSurname;
                            }

                            return html`
                                <payload-bell-item name="${period.title}"
                                                   time="${bell.time}"
                                                   ?timechanged="${bell.reason != ""}"
                                                   room="${room}"
                                                   ?roomChanged="${roomChanged}"
                                                   teacher="${teacher}"
                                                   ?teacherChanged="${teacherChanged}">
                                </payload-bell-item>`;
                        }
                    
                    }
                    else {
                        if (bell.bell == "Transition" || bell.bell == "End of Day")
                            return nothing;
                        else
                            return html`<bell-item name="${bell.bellDisplay}" time="${bell.time}"></bell-item>`;
                    }
                })
            }
        `;
    }
}

customElements.define("bell-item", BellItem);
customElements.define("payload-bell-item", PayloadBellItem);
customElements.define('daily-timetable', DailyTimetable);