import { Infer, object, record, array, string, nullable, enums } from "banditypes";
import { StringAsTime, StringAsInteger, ArrayAsRecord } from "../utils";

export const Bell = object({
    period: string(),
    startTime: StringAsTime,
    endTime: StringAsTime.or(nullable()),
    bell: string(),
    bellDisplay: string()
});

export type Bell = Infer<typeof Bell>;

export const Period = object({
    title: string(),
    room: string(),
    fullTeacher: string(),
    year: string(),
});

export type Period = Infer<typeof Period>;

// i.e. Roll call
export const PartialPeriod = object({
    
});

export type PartialPeriod = Infer<typeof PartialPeriod>;

export const Subject = object({
    title: string()
});

export type Subject = Infer<typeof Subject>;

export const RoomVariation = object({
    roomTo: string()
});

export type RoomVariation = Infer<typeof RoomVariation>;

export const ClassVariation = object({
    type: enums(["nocover", "novariation", "replacement"]),
    casual: string(),
    casualSurname: string().or(nullable())
});

export type ClassVariation = Infer<typeof ClassVariation>;

export const DailyTimetable = object({
    date: string(),
    bells: array(Bell),
    timetable: object({
        timetable: object({
            dayname: string(),
            dayNumber: StringAsInteger,
            periods: record(Period.or(PartialPeriod))
        }),
        subjects: record(Subject)
    }),
    roomVariations: record(RoomVariation).or(ArrayAsRecord(RoomVariation)),
    classVariations: record(ClassVariation).or(ArrayAsRecord(ClassVariation))
});

export type DailyTimetable = Infer<typeof DailyTimetable>;
