import { Infer, object, record, string } from "banditypes";
import { StringAsInteger } from "../utils";

export const Period = object({
    title: string(),
    room: string(),
    fullTeacher: string()
});

export type Period = Infer<typeof Period>;

export const Day = object({
    dayname: string(),
    dayNumber: StringAsInteger,
    periods: record(Period)
});

export type Day = Infer<typeof Day>;

export const Timetable = object({
    days: record(Day)
});

export type Timetable = Infer<typeof Timetable>;
