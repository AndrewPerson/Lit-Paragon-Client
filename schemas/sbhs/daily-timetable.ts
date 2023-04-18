import { Infer, type, record, array, union, string, nullable, literal, enums } from "superstruct";
import { missing, arrayAsRecord, StringAsInteger, StringAsDate, invalidAsUndefined, removeUndefinedFromArray, removeUndefinedFromRecord } from "./utils";
import { StringAsTime } from "../utils";

export const Bell = type({
    period: string(),
    startTime: StringAsTime,
    endTime: nullable(StringAsTime),
    bell: missing(string()),
    bellDisplay: string()
});

export type Bell = Infer<typeof Bell>;

export const Period = type({
    title: string(),
    room: string(),
    fullTeacher: string()
});

export type Period = Infer<typeof Period>;

export const Subject = type({
    title: string(),
    shortTitle: missing(string())
});

export type Subject = Infer<typeof Subject>;

export const RoomVariation = type({
    roomTo: string()
});

export type RoomVariation = Infer<typeof RoomVariation>;

export const ClassVariation = type({
    type: enums(["nocover", "novariation", "replacement"]),
    casual: string(),
    casualSurname: missing(string())
});

export type ClassVariation = Infer<typeof ClassVariation>;

export const DailyTimetable = type({
    date: string(),
    bells: removeUndefinedFromArray(array(invalidAsUndefined(Bell))),
    timetable: type({
        timetable: type({
            dayname: string(),
            dayNumber: StringAsInteger,
            periods: removeUndefinedFromRecord(record(string(), invalidAsUndefined(Period)))
        }),
        subjects: removeUndefinedFromRecord(record(string(), invalidAsUndefined(Subject)))
    }),
    roomVariations: missing(removeUndefinedFromRecord(union([
        arrayAsRecord(invalidAsUndefined(RoomVariation)),
        record(string(), invalidAsUndefined(RoomVariation))
    ]))),
    classVariations: missing(removeUndefinedFromRecord(union([
        arrayAsRecord(invalidAsUndefined(ClassVariation)),
        record(string(), invalidAsUndefined(ClassVariation))
    ])))
});

export type DailyTimetable = Infer<typeof DailyTimetable>;
