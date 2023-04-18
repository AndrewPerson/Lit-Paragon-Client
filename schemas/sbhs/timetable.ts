import { Infer, type, string } from "superstruct";
import { StringAsInteger, invalidAsUndefined, recordAsArray } from "./utils";

export const Period = type({
    title: string(),
    room: string(),
    fullTeacher: string()
});

export type Period = Infer<typeof Period>;

export const Day = type({
    dayname: string(),
    dayNumber: StringAsInteger,
    periods: recordAsArray(invalidAsUndefined(Period))
});

export type Day = Infer<typeof Day>;

export const Timetable = type({
    // TODO This inserts undefined at [0], remove this, as the days are 1-indexed.
    days: recordAsArray(invalidAsUndefined(Day))
});

export type Timetable = Infer<typeof Timetable>;
