import { Missing } from "../../missing";

export type DailyTimetable = {
    bells: Bell[] | Missing,
    timetable: {
        timetable: {
            dayname: string | Missing,
            rollcall: RollCall | Missing,
            periods: {
                [index: string]: Period | RollCall | Missing
            } | Missing
        } | Missing,
        subjects: {
            [index: string]: Subject | Missing
        } | Missing
    } | Missing,
    roomVariations: {
        [index: string]: RoomVariation | Missing
    } | [] | Missing,
    classVariations: {
        [index: string]: ClassVariation | Missing
    } | [] | Missing
}

export type Bell = {
    period: string | Missing,
    startTime: string | Missing,
    endTime: string | Missing,
    type: string | Missing,
    time: string | Missing,
    bell: string | Missing,
    bellDisplay: string | Missing
}

export type RollCall = {
    title: string | Missing,
    teacher: string | Missing,
    room: string | Missing
}

export type Period = {
    title: string | Missing,
    teacher: string | Missing,
    room: string | Missing,
    fullTeacher: string | Missing,
    year: string | Missing
}

export type Subject = {
    title: string | Missing,
    shortTitle: string | Missing,
    teacher: string | Missing,
    subject: string | Missing,
    fullTeacher: string | Missing,
    year: string | Missing,
    colour: string | Missing
}

export type RoomVariation = {
    year: string | Missing,
    roomFrom: string | Missing,
    roomTo: string | Missing
}

export type ClassVariation = {
    year: string | Missing,
    teacher: string | Missing,
    type: TeacherType | Missing,
    casual: string | Missing,
    casualSurname: string | Missing
}

export enum TeacherType {
    NO_COVER = "nocover",
    REPLACEMENT = "replacement",
    NO_VARIATION = "novariation"
}