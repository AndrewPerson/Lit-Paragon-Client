import { html, nothing, LitElement } from "lit";
import { repeat } from 'lit/directives/repeat.js';
import { bellCss, payloadBellCss, dailytimetableCss, fullscreenDailytimetableCss } from "./dailytimetable.css";
import { textCss, imgCss, containerCss } from "./default.css";

export class BellItem extends LitElement {
    static get styles() {
        return [textCss, bellCss];
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
            <p>${this.name}</p>
            <p>${this.time}</p>
        `;
    }
}

export class PayloadBellItem extends LitElement {
    static get styles() {
        return [textCss, bellCss, payloadBellCss];
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
                <p>${this.name}</p>
                <p class="sub">at <span class="sub ${timeClass}">${this.time}</span> with <span class="sub ${teacherClass}">${this.teacher}</span></p>
            </div>
            
            <p class="${roomClass}">${this.room}</p>
        `;
    }
}

export class DailyTimetable extends LitElement {
    static get styles() {
        return [textCss, imgCss, containerCss, dailytimetableCss];
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
        if (this.data == undefined || this.data == null)
            return undefined;

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
            formattedString = hours + ':';
        }

        formattedString += minutes + ':' + seconds;

        return formattedString
    }

    updateCountdown() {
        if (!this.hasAttribute("data") || !this.data)
            return;

        var nextBell = this.getNextBell();

        if (!nextBell) {
            if (!this.gettingNextDay) {
                this.gettingNextDay = true;

                caches.open(window.RESOURCE_CACHE).then(async cache => {
                    var nextTimetableResponse = await cache.match("next-dailytimetable");

                    if (nextTimetableResponse) {
                        var clonedResponse = nextTimetableResponse.clone();

                        await cache.put("dailytimetable", clonedResponse);

                        var text = await nextTimetableResponse.text();

                        await cache.delete("next-dailytimetable");

                        this.setAttribute("data", text);
                    }
                    else {
                        this.setAttribute("data", "null");
                        this.data = null;

                        this.requestUpdate();

                        var token = await GetToken();
                        
                        var succeeded = await UpdateResourcesIfNeeded(token, true);
                        
                        if (succeeded) {
                            var response = await cache.match("dailytimetable");
                            var clonedResponse = response.clone();

                            this.setAttribute("data", await clonedResponse.text());
                        }
                    }
                });
            }
        }
        else {
            var periods = this.data.timetable.timetable.periods;
            var bellName = nextBell.bell.bell;

            if (bellName in periods && bellName != "R") {
                var period = periods[bellName];
                this.nextBell = this.getClassName(period);
                
                var classVariations = this.data.classVariations;
                if (bellName in classVariations) {
                    this.nextTeacherChanged = true;
                    this.nextTeacher = classVariations[bellName].type == "nocover" ? "No one" : classVariations[bellName].casualSurname;
                }
                else {
                    this.nextTeacherChanged = false;
                    this.nextTeacher = period.fullTeacher;
                }

                var roomVariations = this.data.roomVariations;
                if (bellName in roomVariations) {
                    this.nextRoomChanged = true;
                    this.nextRoom = roomVariations[bellName].roomTo;
                }
                else {
                    this.nextRoomChanged = false;
                    this.nextRoom = period.room;
                }
            }
            else {
                this.nextBell = nextBell.bell.bellDisplay;
                this.nextTeacher = null;
                this.nextRoom = null;
            }

            this.timeUntilNextBell = this.secondsToString(nextBell.time);
        }
    }

    getClassName(period) {
        var name = this.data.timetable.subjects[`${period.year}${period.title}`].title;
        return this.formatClassName(name);
    }

    formatClassName(name) {
        return name.split(" ").filter(value => isNaN(value) && value.length > 1).join(" ");
    }

    ToggleFullScreen() {
        this.fullscreen = !this.fullscreen;

        if (this.fullscreen) this.fullscreenElement.style.removeProperty("display");
        else this.fullscreenElement.style.display = "none";
    }

    static gettingNextDay = false;

    constructor() {
        super();

        this.nextBell = "Nothing";
        this.timeUntilNextBell = "00:00";

        this.nextTeacher = "";
        this.nextTeacherChanged = false;
        this.nextRoom = "";
        this.nextRoomChanged = false;

        this.fullscreen = false;
        this.fullscreenElement = document.querySelector("fullscreen-dailytimetable");

        this.countdownId = setInterval(() => {
            this.updateCountdown();
            this.requestUpdate();
        }, 1000);

        this.data = {
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

        this.gettingNextDay = false;

        this.firstRender = true;
    }

    render() {
        if (!this.hasAttribute("data"))
            return nothing;

        if (!this.data)
            return html`<loading-element style="width: 80%"></loading-element>`;

        if (this.data.status != "OK") {
            clearInterval(this.countdownId);
            return html`
                <p>There was an error with the school servers.</p>
            `;
        }

        if (this.firstRender) {
            this.firstRender = false;
            this.updateCountdown();
        }

        this.fullscreenElement.setAttribute("bell", this.nextBell);
        this.fullscreenElement.setAttribute("time", this.timeUntilNextBell);
        this.fullscreenElement.setAttribute("teacher", this.nextTeacher);

        if (this.nextTeacherChanged) this.fullscreenElement.setAttribute("teacherChanged", "");
        else this.fullscreenElement.removeAttribute("teacherChanged");

        this.fullscreenElement.setAttribute("room", this.nextRoom);
        
        if (this.nextRoomChanged) this.fullscreenElement.setAttribute("roomChanged", "");
        else this.fullscreenElement.removeAttribute("roomChanged");

        return html`
            <button id="fullscreen" title="Full Screen" @click="${this.ToggleFullScreen}">
                <img src="images/fullscreen.svg" />
            </button>

            <p>${this.nextBell}</p>
            <p>in</p>

            <div class="timer-container">
                <span class="line-right"></span>
                <p id="timer">${this.timeUntilNextBell}</p>
                <span class="line-left"></span>
            </div>

            ${
                repeat(this.data.bells, bell => bell.time, bell => {
                    var period = this.data.timetable.timetable.periods[bell.bell];

                    if (period) {
                        if (bell.bell == "R")
                            return nothing;
                        else {
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
                                    teacher = variation.casualSurname;
                                }
                            }

                            var title = this.getClassName(period);

                            return html`
                                <payload-bell-item name="${title}"
                                                   time="${bell.time}"
                                                   ?timechanged="${bell.reason != ""}"
                                                   room="${room}"
                                                   ?roomChanged="${roomChanged}"
                                                   teacher="${teacher == "" ? "No one" : teacher}"
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

export class FullscreenDailytimetable extends LitElement {
    static get styles() {
        return [textCss, imgCss, fullscreenDailytimetableCss];
    }

    static get properties() {
        return {
            bell: {type: String},
            time: {type: String},
            teacher: {type: String},
            teacherChanged: {type: Boolean},
            room: {type: String},
            roomChanged: {type: Boolean}
        };
    }

    Close() {
        this.style.display = "none";
    }

    constructor() {
        super();

        this.bell = "Nothing";
        this.time = "00:00";
        this.teacher = "";
        this.teacherChanged = false;
        this.room = "";
        this.roomChanged = false;
    }

    render() {
        if (this.teacher == "null") this.teacher = null;
        if (this.room == "null") this.room = null;

        return html`
            <img id="logo" src="images/logo${window.isDark() ? "-dark" : ""}.svg"/>
            <img id="rings" src="images/rings.svg"/>

            <button id="close" @click="${this.Close}">
                <img src="images/cross.svg" />
            </button>

            <p id="time">${this.time} until</p>
            <p id="bell">${this.bell}</p>
            <p id="details" style="${this.teacher && this.room ? "" : "display: none"}">
                with
                <span class="${this.teacherChanged ? "changed" : ""}">
                    ${this.teacher}
                </span>
                at
                <span class="${this.roomChanged ? "changed" : ""}">
                    ${this.room}
                </span>
            </p>
        `;
    }
}

customElements.define("bell-item", BellItem);
customElements.define("payload-bell-item", PayloadBellItem);
customElements.define('daily-timetable', DailyTimetable);
customElements.define("fullscreen-dailytimetable", FullscreenDailytimetable);