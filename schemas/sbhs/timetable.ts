import { Infer, nullable, object, record, string } from "banditypes";
import { ArrayAsRecord, StringAsInteger } from "../utils";

export const Period = object({
    title: string(),
    room: string(),
    fullTeacher: string()
});

export type Period = Infer<typeof Period>;

export const BlankPeriod = object({
    title: string(),
    room: nullable()
});

export type BlankPeriod = Infer<typeof BlankPeriod>;

export const Day = object({
    dayname: string(),
    dayNumber: StringAsInteger,
    periods: record(Period.or(BlankPeriod)).or(ArrayAsRecord(Period.or(BlankPeriod)))
});

export type Day = Infer<typeof Day>;

export const Timetable = object({
    days: record(Day)
});

export type Timetable = Infer<typeof Timetable>;
