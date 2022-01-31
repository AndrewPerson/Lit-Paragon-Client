import { Missing } from "../../missing";

export type Timetable = {
    days: {
        [index: string]: Day | Missing;
    } | Missing;
};

export type Day = {
    dayname: string | Missing;
    periods: {
        [index: string]: Period | Missing;
    } | Missing;
}

export type Period = {
    title: string | Missing;
    teacher: string | Missing;
    room: string | Missing;
}