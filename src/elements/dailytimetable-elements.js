import { html, nothing, LitElement } from "lit";
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
        this.name = "";
        this.room = "";
        this.roomChanged = false;
        this.teacher = "";
        this.teacherChanged = false;
    }

    render() {
        var teacherClass = this.teacherChanged ? "changed" : "";
        var roomClass = this.roomChanged ? "changed" : "";

        return html`
            <div>
                <p class="start">${this.name}</p>
                <p class="time">at ${this.time} with <span class="${teacherClass}">${this.teacher}</span></p>
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
            data: {
                type: Object,
                converter: value => {
                    var data = JSON.parse(value);

                    if (!data.timetable.timetable.periods["0"]) {
                        for (var i = 0; i < data.bells.length; i++) {
                            if (data.bells[i].period == "0") {
                                data.bells.splice(i, 1);
                                break;
                            }
                        }
                    }

                    return data;
                }
            }
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
        if (hours != '00') {
            formattedString += hours + ':';
        }

        formattedString += minutes + ':' + seconds;

        return formattedString
    }

    updateCountdown() {
        var nextBell = this.getNextBell();

        if (!nextBell) {
            if (!DailyTimetable.gettingNextDay) {
                DailyTimetable.gettingNextDay = true;

                caches.open("User Resources").then(async cache => {
                    this.setAttribute("data", "null");
                    this.data = null;

                    this.requestUpdate();

                    var token = await LoginIfNeeded();
                    
                    var succeeded = await UpdateResourcesIfNeeded(token, true);
                    
                    if (succeeded) {
                        var response = await cache.match("dailytimetable");
                        var clonedResponse = response.clone();

                        this.setAttribute("data", await clonedResponse.text());
                    }
                });
            }
        }
        else {
            if (nextBell.bell.bell in this.data.timetable.timetable.periods && nextBell.bell.bell != "RC")
                this.nextBell = this.data.timetable.timetable.periods[nextBell.bell.bell].title;
            else
                this.nextBell = nextBell.bell.bellDisplay;

            this.timeUntilNextBell = this.secondsToString(nextBell.time);
        }
    }

    static gettingNextDay = false;

    constructor() {
        super();

        this.nextBell = "Nothing";
        this.timeUntilNextBell = "00:00";

        this.countdownId = setInterval(() => {
            if (this.data) {
                this.updateCountdown();
                this.update();
            }
        }, 1000);

        this.data = {
            status: "",
            date: "",
            bells: [],
            timetable: {
                timetable: {
                    periods: {}
                },
                subjects: {}
            },
            roomVariations: [],
            classVariations: []
        };
    }

    firstUpdated() {
        if (this.data) {
            this.updateCountdown();
            this.update();
        }
    }

    render() {
        if (!this.data) {
            return html`
                <loading-element style="width: 80%"></loading-element>
            `;
        }

        if (this.data.status != "OK" || !this.data.timetable || !this.data.timetable.timetable) {
            clearInterval(this.countdownId);
            return html`
                <p>
                    There is an error with the school servers.
                </p>
            `;
        }

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
                    if (bell.bell == "RC" || bell.bell == "EoD")
                        return nothing;
                    
                    var period = this.data.timetable.timetable.periods[bell.bell];

                    if (period) {
                        var room = period.room;
                        var roomChanged = false;

                        if (bell.bell in this.data.roomVariations) {
                            var variation = this.data.roomVariations[bell.bell];

                            if (period.year == variation.year) {
                                roomChanged = true;
                                room = variation.roomTo;
                            }
                        }
                        
                        var teacher = period.fullTeacher;
                        var teacherChanged = false;

                        if (bell.bell in this.data.classVariations) {
                            var variation = this.data.classVariations[bell.bell];

                            if (period.year == variation.year) {
                                teacherChanged = true;

                                teacher = variation.casualSurname || `${variation.casual[3]} ${variation.casual[0]}${variation.casual.substring(1, 3).toLowerCase()}`;
                            }
                        }

                        var title = this.data.timetable.subjects[`${period.year}${period.title}`].title;

                        title = title.split(" ").filter(value => isNaN(value) && value.length > 1).join(" ");

                        return html`
                            <payload-bell-item name="${title}"
                                                time="${bell.time}"
                                                room="${room}"
                                                ?roomChanged="${roomChanged}"
                                                teacher="${teacher == "" ? "No one" : teacher}"
                                                ?teacherChanged="${teacherChanged}">
                            </payload-bell-item>`;
                    
                    }
                    else
                        return html`<bell-item name="${bell.bellDisplay}" time="${bell.time}"></bell-item>`;
                })
            }
        `;
    }
}

customElements.define("bell-item", BellItem);
customElements.define("payload-bell-item", PayloadBellItem);
customElements.define('daily-timetable', DailyTimetable);