import { Missing } from "../../missing";

export type Timetable = {
    days: {
        [index: string]: Day | Missing;
    } | Missing;

    subjects: (Subject | Missing)[] | Missing;
};

export type Day = {
    dayNumber: string | Missing;
    dayname: string | Missing;
    periods: {
        [index: string]: Period | Missing;
    } | Missing;
}

export type Period = {
    fullTeacher: string | Missing;
    room: string | Missing;
    teacher: string | Missing;
    title: string | Missing;
}

export type Subject = {
    fullTeacher: string | Missing;
    shortTitle: string | Missing;
    title: string | Missing;
    year: string | Missing;
}