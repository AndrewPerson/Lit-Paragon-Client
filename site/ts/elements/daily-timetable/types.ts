import { Missing } from "../../missing";

export type DailyTimetable = {
    date: string | Missing,
    bells: Bell[] | Missing,
    timetable: {
        timetable: {
            dayname: string | Missing,
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
    bellDisplay: string | Missing,
    display: boolean | Missing
}

export type RollCall = {
    title: string | Missing,
    teacher: string | Missing,
    room: string | Missing
}

export type Period = {
    title: string | Missing,
    room: string | Missing,
    fullTeacher: string | Missing,
    year: string | Missing
}

export type Subject = {
    title: string | Missing
}

export type RoomVariation = {
    roomFrom: string | Missing,
    roomTo: string | Missing
}

export type ClassVariation = {
    type: TeacherType | Missing,
    casual: string | Missing,
    casualSurname: string | Missing
}

export enum TeacherType {
    NO_COVER = "nocover",
    REPLACEMENT = "replacement",
    NO_VARIATION = "novariation"
}