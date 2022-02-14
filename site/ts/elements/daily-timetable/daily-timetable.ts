import { Page } from "../page/page";

import { html } from "lit";
import { customElement, state, query } from "lit/decorators.js";

import { Resources } from "../../site/resources";

import "./bell";
import "./period";

import { DailyTimetable, Bell, Period, RoomVariation, ClassVariation, TeacherType } from "./types";
import { Timetable } from "../timetable/types";

import { Missing } from "../../missing";

//@ts-ignore
import textCss from "default/text.css";
//@ts-ignore
import cardElementCss from "default/pages/card.css";
//@ts-ignore
import pageCss from "default/pages/page.css";
//@ts-ignore
import dailyTimetableCss from "./daily-timetable.css";

declare const RESOURCE_CACHE: string;

@customElement("daily-timetable")
export class StudentDailyTimetable extends Page {
    static styles = [textCss, pageCss, cardElementCss, dailyTimetableCss];

    static updatingData: boolean = false;

    set dailyTimetable(value: DailyTimetable) {
        let bells = value.bells;

        if (bells === undefined || bells === null) {
            this._dailyTimetable = value;
            return;
        }

        let periods = value.timetable?.timetable?.periods ?? {};

        let foundStartofDay = false;

        let leadingIndiceCount = 0;
        let trailingIndiceCount = 0;

        for (let i = 0; i < bells.length; i++) {
            let bell: Bell = bells[i];

            if (bell.period !== undefined && bell.period !== null && bell.period in periods) {
                foundStartofDay = true;
                trailingIndiceCount = 0;
            }
            else {
                if (foundStartofDay == false) leadingIndiceCount++;
                else trailingIndiceCount++;
            }
        }

        for (let i = 0; i < trailingIndiceCount; i++)
            bells[bells.length - i - 1].display = false;

        for (let i = 0; i < leadingIndiceCount; i++)
            bells.shift();

        this._dailyTimetable = value;
    }

    @state()
    private _dailyTimetable: DailyTimetable;

    @query("#next-class", true)
    private _nextClass: HTMLParagraphElement | null;

    @query("#preposition", true)
    private _preposition: HTMLParagraphElement | null;

    @query("#timer", true)
    private _timer: HTMLHeadingElement | null;

    @query("#periods", true)
    private _periods: HTMLDivElement | null;

    private _nextPeriod: Element | null = null;

    static async UpdateData() {
        if (this.updatingData) return;
        this.updatingData = true;

        let resourceCache = await caches.open(RESOURCE_CACHE);
        let nextDailyTimetable = await resourceCache.match("next-dailytimetable");

        if (nextDailyTimetable === undefined) {
            let succeeded = await Resources.FetchResources();

            let currentDailyTimetable = await Resources.GetResourceNow("dailytimetable") as DailyTimetable | undefined | null;
            if (currentDailyTimetable === undefined || currentDailyTimetable === null)
                //Keep updatingData true so we don't keep trying
                return;

            if (currentDailyTimetable.date === undefined || currentDailyTimetable.date === null)
                //Keep updatingData true so we don't keep trying
                return;

                             //Check if the returned date is not today.
            if (succeeded && new Date(currentDailyTimetable.date) > new Date()) {
                this.updatingData = false;
                return;
            }

            if (currentDailyTimetable.timetable?.timetable?.dayNumber === undefined || currentDailyTimetable.timetable?.timetable?.dayNumber === null)
                //Keep updatingData true so we don't keep trying
                return;

            let timetable = await Resources.GetResourceNow("timetable") as Timetable | undefined | null;
            if (timetable === undefined || timetable === null)
                //Keep updatingData true so we don't keep trying
                return;

            let dailyTimetableDate = new Date(currentDailyTimetable.date);

            let bells = this.GetBells();

            let now = new Date();

            if (now.getDay() == 6)
                now.setDate(now.getDate() + 1);

            if (now.getDay() == 0)
                now.setDate(now.getDate() + 1);

            //Milliseconds before 3:15pm = 54900000
            if (now.getTime() % 86400000 > 54900000)
                now.setDate(now.getDate() + 1);

            //YYYY-MM-DD
            let date = now.toISOString().split("T")[0];

            if (date == currentDailyTimetable.date) {
                now.setDate(now.getDate() + 1);
                date = now.toISOString().split("T")[0];
            }

            //Day number (1 - 15)
            let dayNumber = (parseInt(currentDailyTimetable.timetable.timetable.dayNumber) + this.GetSchoolDayCount(dailyTimetableDate, now)) % 15 + 1;

            let day = timetable.days?.[dayNumber.toString()];
            if (day === null || day === undefined)
                //Keep updatingData true so we don't keep trying
                return;

            let dailyTimetable: DailyTimetable = {
                date: date,
                bells: bells,
                timetable: {
                    timetable: day,
                    subjects: Object.fromEntries(timetable.subjects?.map(subject => {
                        return [`${subject?.year}${subject?.shortTitle}`, subject];
                    }) ?? [])
                },
                roomVariations: [],
                classVariations: []
            }

            await Resources.SetResource("dailytimetable", JSON.stringify(dailyTimetable));

            this.updatingData = false;
        }
        else {
            await resourceCache.delete("next-dailytimetable");
            await Resources.SetResource("dailytimetable", await nextDailyTimetable.text());

            this.updatingData = false;
        }
    }

    static GetBells() {
        let date = new Date();
        let day = (date.getDay() + (((date.getHours() == 14 && date.getMinutes() >= 15) || date.getHours() > 14) ? 1 : 0)) % 7;

        let bells: Bell[];

        if (day == 4) {
            bells = [
                {
                    period: "0",
                    time: "08:00",
                    bell: "0",
                    bellDisplay: "Period 0",
                    display: undefined
                },
                {
                    period: "RC",
                    time: "09:25",
                    bell: "RC",
                    bellDisplay: "Roll Call",
                    display: undefined
                },
                {
                    period: "1",
                    time: "09:30",
                    bell: "1",
                    bellDisplay: "Period 1",
                    display: undefined
                },
                {
                    period: "2",
                    time: "10:30",
                    bell: "2",
                    bellDisplay: "Period 2",
                    display: undefined
                },
                {
                    period: "R",
                    time: "11:25",
                    bell: "R",
                    bellDisplay: "Recess",
                    display: undefined
                },
                {
                    period: "3",
                    time: "11:45",
                    bell: "3",
                    bellDisplay: "Period 3",
                    display: undefined
                },
                {
                    period: "WFL1",
                    time: "12:40",
                    bell: "WFL1",
                    bellDisplay: "Lunch 1",
                    display: undefined
                },
                {
                    period: "WFL2",
                    time: "13:00",
                    bell: "WFL2",
                    bellDisplay: "Lunch 2",
                    display: undefined
                },
                {
                    period: "4",
                    time: "13:20",
                    bell: "4",
                    bellDisplay: "Period 4",
                    display: undefined
                },
                {
                    period: "5",
                    time: "14:20",
                    bell: "5",
                    bellDisplay: "Period 5",
                    display: undefined
                },
                {
                    period: "EoD",
                    time: "15:15",
                    bell: "End of Day",
                    bellDisplay: "",
                    display: undefined
                }
            ];
        }
        else {
            bells = [
                {
                    bell: "0",
                    bellDisplay: "Period 0",
                    period: "0",
                    time: "08:00",
                    display: undefined
                },
                {
                    bell: "RC",
                    bellDisplay: "Roll Call",
                    period: "RC",
                    time: "09:00",
                    display: undefined
                },
                {
                    bell: "1",
                    bellDisplay: "Period 1",
                    period: "1",
                    time: "09:05",
                    display: undefined
                },
                {
                    bell: "2",
                    bellDisplay: "Period 2",
                    period: "2",
                    time: "10:10",
                    display: undefined
                },
                {
                    bell: "R",
                    bellDisplay: "Recess",
                    period: "R",
                    time: "11:10",
                    display: undefined
                },
                {
                    bell: "3",
                    bellDisplay: "Period 3",
                    period: "3",
                    time: "11:30",
                    display: undefined
                },
                {
                    bell: "WFL1",
                    bellDisplay: "Lunch 1",
                    period: "WFL1",
                    time: "12:30",
                    display: undefined
                },
                {
                    bell: "WFL2",
                    bellDisplay: "Lunch 2",
                    period: "WFL2",
                    time: "12:50",
                    display: undefined
                },
                {
                    bell: "4",
                    bellDisplay: "Period 4",
                    period: "4",
                    time: "13:10",
                    display: undefined
                },
                {
                    bell: "5",
                    bellDisplay: "Period 5",
                    period: "5",
                    time: "14:15",
                    display: undefined
                },
                {
                    bell: "EoD",
                    bellDisplay: "End of Day",
                    period: "EoD",
                    time: "15:15",
                    display: undefined
                }
            ];
        }

        return bells;
    }

    static GetSchoolDayCount(startDate: Date, endDate: Date) {
        var diff = endDate.getTime() - startDate.getTime();
        
        //Milliseconds in a day = 86400000
        var days = Math.floor(diff / 86400000);

        // Subtract two weekend days for every week in between
        var weeks = Math.floor(days / 7);
        days = days - (weeks * 2);

        // Handle special cases
        var startDay = startDate.getDay();
        var endDay = endDate.getDay();

        // Remove weekend not previously removed.   
        if (startDay - endDay > 1)         
            days = days - 2;      

        // Remove start day if span starts on Sunday but ends before Saturday
        if (startDay == 0 && endDay != 6)
            days = days - 1  

        // Remove end day if span ends on Saturday but starts after Sunday
        if (endDay == 6 && startDay != 0)
            days = days - 1  

        return days;
    }

    constructor() {
        super();

        this.AddResource("dailytimetable", "dailyTimetable");

        setInterval(() => {
            //We need this because this can run before _dailyTimetable is initialised.
            if (this._dailyTimetable === undefined) return;

            this.RenderNextBell();
        }, 1000);
    }

    BellDate(bell: Bell) {
        let time = new Date(this._dailyTimetable.date ?? "");

        let parts = bell.time?.split(":") ?? ["00", "00"];

        let hours = Number.parseInt(parts[0]);
        let minutes = Number.parseInt(parts[1]);

        time.setHours(hours);
        time.setMinutes(minutes);

        return time;
    }

    NextBell() {
        let now = new Date();

        let bells = this._dailyTimetable.bells ?? [];

        for (let i = 0; i < bells.length; i++) {
            if (bells[i].time === undefined || bells[i].time === null) continue;

            let time = this.BellDate(bells[i]);

            if (time.getTime() >= now.getTime()) return {
                index: i,
                bell: bells[i]
            };
        }

        return undefined;
    }

    TimeDisplay(bell: Bell) {
        let time = this.BellDate(bell);
        let now = new Date();

        let timeDifference = time.getTime() - now.getTime();

        if (now.getMonth() > time.getMonth() && now.getDate() > time.getDate()) {
            let difference = (time.getMonth() < now.getMonth() ? time.getMonth() + 12 : time.getMonth()) - now.getMonth();

            return {
                preposition: "in",
                time: difference +
                      (difference == 1 ?
                      " Month" :
                      " Months")
            };
        }
        //Length of one day in ms
        else if (timeDifference > 86400000) {
            var days = Math.round(timeDifference / 86400000);

            if (days == 1)
                return {
                    preposition: "is",
                    time: "Tomorrow"
                };

            return {
                preposition: "in",
                time: days + " Days"
            };
        }
        else {
            let hours = Math.floor(timeDifference / 3600000).toString();
            let minutes = Math.floor((timeDifference % 3600000) / 60000).toString();
            let seconds = Math.floor(((timeDifference % 3600000) % 60000) / 1000).toString();

            if (hours.length < 2)
                hours = "0" + hours;

            if (minutes.length < 2)
                minutes = "0" + minutes;

            if (seconds.length < 2)
                seconds = "0" + seconds;
            
            if (hours == "00")
                return {
                    preposition: "in",
                    time: `${minutes}:${seconds}`
                };

            return {
                preposition: "in",
                time: `${hours}:${minutes}:${seconds}`
            }
        }
    }

    GetBell(bell: Bell) {
        return html`<daily-timetable-bell title="${bell.bellDisplay ?? "???"}" time="${bell.time ?? "??:??"}"></daily-timetable-bell>`;
    }

    GetPeriodTitle(year: string, title: string) {
        let fullName = this._dailyTimetable?.timetable?.subjects?.[`${year}${title}`]?.title;
        
        if (fullName === undefined || fullName === null) {
            let words = title.split(" ");
            words.pop();
            
            return words.join(" ");
        }

        let words = fullName.split(" ");
        words.shift();
        words.pop();

        return words.join(" ");
    }

    FormatCasualCode(code: string) {
        if (code.length == 0) return code;
        if (code.length == 1) return `${code.toUpperCase()}.`;
        
        return `${code[code.length - 1].toUpperCase()} ${code[0].toUpperCase()}${code.substring(1, code.length - 1).toLowerCase()}.`;
    }

    GetPeriod(period: Period, bell: Bell, classVariation: ClassVariation | Missing, roomVariation: RoomVariation | Missing) {
        let teacherChanged = classVariation !== undefined && classVariation !== null && classVariation.type != TeacherType.NO_VARIATION;
        let roomChanged = roomVariation !== undefined && roomVariation !== null;

        return html`
        <daily-timetable-period title="${this.GetPeriodTitle(period.year ?? "?", period.title ?? "???")}"
                                time="${bell.time ?? "??:??"}"
                                teacher="${classVariation === undefined || classVariation === null ? (period.fullTeacher?.trim().length == 0 ? "No one" : period.fullTeacher) ?? "???" :
                                           classVariation.type == TeacherType.NO_VARIATION ? period.fullTeacher ?? "???" :
                                           classVariation.type == TeacherType.NO_COVER ? "No one" :
                                           classVariation.casualSurname ?? this.FormatCasualCode(classVariation.casual ?? "????")}"
                                ?teacherChanged="${teacherChanged}"
                                room="${roomVariation?.roomTo ?? period.room ?? "???"}"
                                ?roomChanged="${roomChanged}"></daily-timetable-period>
        `;
    }

    RenderNextBell() {
        let nextBellInfo = this.NextBell();

        if (nextBellInfo === undefined)
            StudentDailyTimetable.UpdateData();

        let nextClass = this._dailyTimetable?.timetable?.timetable?.periods?.[nextBellInfo?.bell?.period ?? ""];
        let nextClassName = nextBellInfo?.bell?.bellDisplay ?? "Nothing";

        if (nextClass !== undefined && nextClass !== null && "year" in nextClass)
            nextClassName = this.GetPeriodTitle(nextClass.year ?? "?", nextClass.title ?? "???");

        let timeDisplay = { time: "Never", preposition: "in" };
        if (nextBellInfo?.bell !== undefined) timeDisplay = this.TimeDisplay(nextBellInfo.bell);

        if (this._nextClass !== null) this._nextClass.innerText = nextClassName ?? "Nothing";
        if (this._preposition !== null) this._preposition.innerText = timeDisplay?.preposition ?? "in";
        if (this._timer !== null) this._timer.innerText = timeDisplay?.time ?? "Never";

        let nextPeriod = this._periods?.children[nextBellInfo?.index ?? 0];

        if (nextPeriod !== this._nextPeriod) {
            this._nextPeriod?.classList.remove("next");
            this._nextPeriod = nextPeriod ?? null;
        }

        nextPeriod?.classList.add("next");
    }

    updated() {
        //We need this because this can run before _dailyTimetable is initialised.
        if (this._dailyTimetable === undefined) return;

        this.RenderNextBell();
    }

    renderPage() {
        let bells = this._dailyTimetable.bells ?? [];
        let periods = this._dailyTimetable.timetable?.timetable?.periods ?? {};

        let roomVariations = (Array.isArray(this._dailyTimetable.roomVariations) ? {} : this._dailyTimetable.roomVariations) ?? {};
        let classVariations = (Array.isArray(this._dailyTimetable.classVariations) ? {} : this._dailyTimetable.classVariations) ?? {};

        return html`
            <div class="next-display">
                <p id="next-class">Nothing</p>
                <p id="preposition">in</p>
                <h1 id="timer">Never</h1>
            </div>

            <div id="periods">
                ${bells.filter(bell => bell.display !== false).map(bell => {
                    if (bell.period !== undefined && bell.period !== null && bell.period in periods) {
                        let period = periods[bell.period];

                        if (period !== undefined && period !== null &&
                            "fullTeacher" in period && period.fullTeacher !== undefined && period.fullTeacher !== null &&
                            "year" in period && period.year !== undefined && period.year !== null &&
                            period.room !== undefined && period.room !== undefined)
                            return this.GetPeriod(period, bell, classVariations[bell.period], roomVariations[bell.period]);
                        else
                            return this.GetBell(bell);
                    }
                    else
                        return this.GetBell(bell);
                })}
            </div>
        `;
    }
}
