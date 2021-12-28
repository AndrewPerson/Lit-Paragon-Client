export type Timetable = {
    days: {
        [index: string]: Day;
    }
}

export type Day = {
    dayname: string;
    periods: Periods;
}

export type Periods = {
    [index: string]: Period;
}

export type Period = {
    title: string;
    teacher: string;
    room: string;
    year: string;
}