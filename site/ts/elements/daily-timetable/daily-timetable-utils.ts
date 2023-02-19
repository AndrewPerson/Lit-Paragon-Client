import { Missing } from "../../missing";
import { DailyTimetable, Bell } from "./types";

export function BellToDate(bell: Bell, day: Date) {
    //Copy the date to make sure we don't change it
    let time = new Date(day);

    let parts = bell.time?.split(":") ?? [day.getHours().toString(), day.getMinutes().toString()];

    let hours = Number.parseInt(parts[0] ?? day.getHours().toString());
    let minutes = Number.parseInt(parts[1] ?? day.getMinutes().toString());

    time.setHours(hours);
    time.setMinutes(minutes);
    time.setSeconds(0);

    return time;
}

export function GetCurrentBell(dailyTimetable: DailyTimetable, now: Date) {
    let dailyTimetableDate = new Date(dailyTimetable.date ?? "");

    let bells = dailyTimetable.bells ?? [];

    for (let i = 0; i < bells.length; i++) {
        if (bells[i].time === undefined || bells[i].time == null) continue;

        let time = BellToDate(bells[i], dailyTimetableDate);

        if (time.getTime() >= now.getTime()) return {
            index: i,
            bell: bells[i]
        };
    }

    return undefined;
}

export function GetPeriodTitle(dailyTimetable: DailyTimetable | Missing, year: string, title: string) {
    let fullName = dailyTimetable?.timetable?.subjects?.[`${year}${title}`]?.title;

    if (fullName === undefined || fullName == null) {
        let words = title.split(" ");
        words.pop();

        return words.join(" ");
    }

    let words = fullName.split(" ");
    words.shift();
    words.pop();

    return words.join(" ");
}

export function FormatCasualCode(code: string) {
    if (code.length == 0) return code;
    if (code.length == 1) return `${code.toUpperCase()}.`;

    return `${code[code.length - 1].toUpperCase()} ${code[0].toUpperCase()}${code.substring(1, code.length - 1).toLowerCase()}.`;
}

//Not my code, I just cleaned it up a bit. Code from https://snipplr.com/view/4086/calculate-business-days-between-two-dates
export function GetSchoolDayCount(startDate: Date, endDate: Date) {
    if (endDate.getTime() < startDate.getTime()) return -1;

    let startDay = startDate.getDay();
    let endDay = endDate.getDay();

    // change Sunday from 0 to 7
    startDay = (startDay == 0) ? 7 : startDay;
    endDay = (endDay == 0) ? 7 : endDay;

    // adjustment if both days on weekend
    let adjust = 0;
    if ((startDay > 5) && (endDay > 5)) adjust = 1;

    // only count weekdays
    startDay = (startDay > 5) ? 5 : startDay;
    endDay = (endDay > 5) ? 5 : endDay;

    // calculate difference in weeks (1000ms * 60sec * 60min * 24hrs * 7 days = 604800000)
    let weeks = Math.floor((endDate.getTime() - startDate.getTime()) / 604800000);

    let dateDiff;
    if (startDay <= endDay) dateDiff = weeks * 5 + endDay - startDay;
    else dateDiff = (weeks + 1) * 5 + endDay - startDay;

    // take into account both days on weekend
    dateDiff -= adjust;

    return dateDiff;
}