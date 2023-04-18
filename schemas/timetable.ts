export type Period = {
    name: string,
    shortName: string,
    room: string,
    teacher: string
};

export type Day = {
    dayName: string,
    dayNumber: number,
    periods: {
        [key: number]: Period
    }
};

export type Week = {
    weekName: string,
    days: Day[]
};

export type Timetable = {
    weeks: Week[]
}
