import { Bell } from "./types";

const bells1: Bell[] = [
    {
        bell: "0",
        bellDisplay: "Period 0",
        period: "0",
        time: "08:00"
    },
    {
        bell: "RC",
        bellDisplay: "Roll Call",
        period: "RC",
        time: "09:00"
    },
    {
        bell: "1",
        bellDisplay: "Period 1",
        period: "1",
        time: "09:05"
    },
    {
        bell: "R",
        bellDisplay: "Recess",
        period: "R",
        time: "11:10"
    },
    {
        bell: "2",
        bellDisplay: "Period 2",
        period: "2",
        time: "10:10"
    },
    {
        bell: "3",
        bellDisplay: "Period 3",
        period: "3",
        time: "11:30"
    },
    {
        bell: "WFL1",
        bellDisplay: "Lunch 1",
        period: "WFL1",
        time: "12:30"
    },
    {
        bell: "WFL2",
        bellDisplay: "Lunch 2",
        period: "WFL2",
        time: "12:50"
    },
    {
        bell: "4",
        bellDisplay: "Period 4",
        period: "4",
        time: "13:10"
    },
    {
        bell: "5",
        bellDisplay: "Period 5",
        period: "5",
        time: "14:15"
    },
    {
        bell: "EoD",
        bellDisplay: "End of Day",
        period: "EoD",
        time: "15:15"
    }
];

const bells2: Bell[] = [
    {
        bell: "0",
        bellDisplay: "Period 0",
        period: "0",
        time: "08:00"
    },
    {
        bell: "RC",
        bellDisplay: "Roll Call",
        period: "RC",
        time: "09:00"
    },
    {
        bell: "1",
        bellDisplay: "Period 1",
        period: "1",
        time: "09:05"
    },
    {
        bell: "2",
        bellDisplay: "Period 2",
        period: "2",
        time: "10:10"
    },
    {
        bell: "R",
        bellDisplay: "Recess",
        period: "R",
        time: "11:10"
    },
    {
        bell: "3",
        bellDisplay: "Period 3",
        period: "3",
        time: "11:30"
    },
    {
        bell: "WFL1",
        bellDisplay: "Lunch 1",
        period: "WFL1",
        time: "12:30"
    },
    {
        bell: "WFL2",
        bellDisplay: "Lunch 2",
        period: "WFL2",
        time: "12:50"
    },
    {
        bell: "4",
        bellDisplay: "Period 4",
        period: "4",
        time: "13:10"
    },
    {
        bell: "5",
        bellDisplay: "Period 5",
        period: "5",
        time: "14:15"
    },
    {
        bell: "EoD",
        bellDisplay: "End of Day",
        period: "EoD",
        time: "15:15"
    }
];

const bells3: Bell[] = [
    {
        bell: "0",
        bellDisplay: "Period 0",
        period: "0",
        time: "08:00"
    },
    {
        bell: "RC",
        bellDisplay: "Roll Call",
        period: "RC",
        time: "09:25"
    },
    {
        bell: "1",
        bellDisplay: "Period 1",
        period: "1",
        time: "09:30"
    },
    {
        bell: "2",
        bellDisplay: "Period 2",
        period: "2",
        time: "10:30"
    },
    {
        bell: "R",
        bellDisplay: "Recess",
        period: "R",
        time: "11:25"
    },
    {
        bell: "3",
        bellDisplay: "Period 3",
        period: "3",
        time: "11:45"
    },
    {
        bell: "WFL1",
        bellDisplay: "Lunch 1",
        period: "WFL1",
        time: "12:40"
    },
    {
        bell: "WFL2",
        bellDisplay: "Lunch 2",
        period: "WFL2",
        time: "13:00"
    },
    {
        bell: "4",
        bellDisplay: "Period 4",
        period: "4",
        time: "13:20"
    },
    {
        bell: "5",
        bellDisplay: "Period 5",
        period: "5",
        time: "14:20"
    },
    {
        bell: "EoD",
        bellDisplay: "End of Day",
        period: "EoD",
        time: "15:15"
    }
];

export const bells = new Map<number, Bell[]>([
    [0, bells1],
    [1, bells1],
    [2, bells2],
    [3, bells2],
    [4, bells3]
]);