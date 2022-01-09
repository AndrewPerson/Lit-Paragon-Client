export type DailyTimetable = {
    bells: Bell[],
    timetable: {
        timetable: {
            dayname: string,
            rollcall: RollCall,
            periods: {
                [index: string]: Period | RollCall
            }
        },
        subjects: {
            [index: string]: Subject
        }
    },
    roomVariations: {
        [index: string]: RoomVariation
    } | [],
    classVariations: {
        [index: string]: ClassVariation
    } | []
}

export type Bell = {
    period: string,
    startTime: string | null,
    endTime: string | null,
    type: string,
    time: string,
    bell: string,
    bellDisplay: string
}

export type RollCall = {
    title: string,
    teacher: string,
    room: null | string
}

export type Period = {
    title: string,
    teacher: string,
    room: string,
    fullTeacher: string,
    year: string
}

export type Subject = {
    title: string,
    shortTitle: string,
    teacher: string,
    subject: string,
    fullTeacher: string,
    year: string,
    colour: string
}

export type RoomVariation = {
    year: string,
    roomFrom: string,
    roomTo: string
}

export type ClassVariation = {
    year: string,
    teacher: string,
    type: TeacherType,
    casual: string | null,
    casualSurname: string | null
}

export enum TeacherType {
    NO_COVER = "nocover",
    REPLACEMENT = "replacement",
    NO_VARIATION = "novariation"
}