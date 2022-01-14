export type Timetable = {
    days: {
        [index: string]: Day;
    }
}

export type Day = {
    dayname: string;
    periods: {
        [index: string]: Period;
    };
}

export type Period = {
    title: string;
    room: string;
}