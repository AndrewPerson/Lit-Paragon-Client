import { Bell } from "./types";

const bells1: Bell[] = [
    {
        period: "0",
        startTime: "08:00",
        endTime: "09:00",
        time: "08:00",
        bell: "0",
        bellDisplay: "Period 0"
    },
    {
        period: "RC",
        startTime: "09:00",
        endTime: "09:05",
        time: "09:00",
        bell: "RC",
        bellDisplay: "Roll Call"
    },
    {
        period: "1",
        startTime: "09:05",
        endTime: "10:05",
        time: "09:05",
        bell: "1",
        bellDisplay: "Period 1"
    },
    {
        period: "2",
        startTime: "10:10",
        endTime: "11:10",
        time: "10:10",
        bell: "2",
        bellDisplay: "Period 2"
    },
    {
        period: "R",
        startTime: "11:10",
        endTime: "11:27",
        time: "11:10",
        bell: "R",
        bellDisplay: "Recess"
    },
    {
        period: "3",
        startTime: "11:30",
        endTime: "12:30",
        time: "11:30",
        bell: "3",
        bellDisplay: "Period 3"
    },
    {
        period: "4",
        startTime: "12:35",
        endTime: "13:35",
        time: "12:35",
        bell: "4",
        bellDisplay: "Period 4"
    },
    {
        period: "MTL1",
        startTime: "13:35",
        endTime: "13:55",
        time: "13:35",
        bell: "MTL1",
        bellDisplay: "Lunch 1"
    },
    {
        period: "MTL2",
        startTime: "13:55",
        endTime: "14:12",
        time: "13:55",
        bell: "MTL2",
        bellDisplay: "Lunch 2"
    },
    {
        period: "5",
        startTime: "14:15",
        endTime: "15:15",
        time: "14:15",
        bell: "5",
        bellDisplay: "Period 5"
    },
    {
        period: "EoD",
        startTime: "15:15",
        endTime: null,
        time: "15:15",
        bell: "EoD",
        bellDisplay: "End of Day"
    }
];

const bells2: Bell[] = [
    {
        period: "0",
        startTime: "08:00",
        endTime: "09:00",
        time: "08:00",
        bell: "0",
        bellDisplay: "Period 0"
    },
    {
        period: "RC",
        startTime: "09:00",
        endTime: "09:05",
        time: "09:00",
        bell: "RC",
        bellDisplay: "Roll Call"
    },
    {
        period: "1",
        startTime: "09:05",
        endTime: "10:05",
        time: "09:05",
        bell: "1",
        bellDisplay: "Period 1"
    },
    {
        period: "2",
        startTime: "10:10",
        endTime: "11:10",
        time: "10:10",
        bell: "2",
        bellDisplay: "Period 2"
    },
    {
        period: "R",
        startTime: "11:10",
        endTime: "11:27",
        time: "11:10",
        bell: "R",
        bellDisplay: "Recess"
    },
    {
        period: "3",
        startTime: "11:30",
        endTime: "12:30",
        time: "11:30",
        bell: "3",
        bellDisplay: "Period 3"
    },
    {
        period: "WFL1",
        startTime: "12:30",
        endTime: "12:50",
        time: "12:30",
        bell: "WFL1",
        bellDisplay: "Lunch 1"
    },
    {
        period: "WFL2",
        startTime: "12:50",
        endTime: "13:07",
        time: "12:50",
        bell: "WFL2",
        bellDisplay: "Lunch 2"
    },
    {
        period: "4",
        startTime: "13:10",
        endTime: "14:10",
        time: "13:10",
        bell: "4",
        bellDisplay: "Period 4"
    },
    {
        period: "5",
        startTime: "14:15",
        endTime: "15:15",
        time: "14:15",
        bell: "5",
        bellDisplay: "Period 5"
    },
    {
        period: "EoD",
        startTime: "15:15",
        endTime: null,
        time: "15:15",
        bell: "EoD",
        bellDisplay: "End of Day"
    }
];

const bells3: Bell[] = [
    {
        period: "0",
        startTime: "08:00",
        endTime: "08:50",
        time: "08:00",
        bell: "0",
        bellDisplay: "Period 0"
    },
    {
        period: "RC",
        startTime: "09:25",
        endTime: "09:30",
        time: "09:25",
        bell: "RC",
        bellDisplay: "Roll Call"
    },
    {
        period: "1",
        startTime: "09:30",
        endTime: "10:25",
        time: "09:30",
        bell: "1",
        bellDisplay: "Period 1"
    },
    {
        period: "2",
        startTime: "10:30",
        endTime: "11:25",
        time: "10:30",
        bell: "2",
        bellDisplay: "Period 2"
    },
    {
        period: "R",
        startTime: "11:25",
        endTime: "11:42",
        time: "11:25",
        bell: "R",
        bellDisplay: "Recess"
    },
    {
        period: "3",
        startTime: "11:45",
        endTime: "12:40",
        time: "11:45",
        bell: "3",
        bellDisplay: "Period 3"
    },
    {
        period: "WFL1",
        startTime: "12:40",
        endTime: "13:00",
        time: "12:40",
        bell: "WFL1",
        bellDisplay: "Lunch 1"
    },
    {
        period: "WFL2",
        startTime: "13:00",
        endTime: "13:17",
        time: "13:00",
        bell: "WFL2",
        bellDisplay: "Lunch 2"
    },
    {
        period: "4",
        startTime: "13:20",
        endTime: "14:15",
        time: "13:20",
        bell: "4",
        bellDisplay: "Period 4"
    },
    {
        period: "5",
        startTime: "14:20",
        endTime: "15:15",
        time: "14:20",
        bell: "5",
        bellDisplay: "Period 5"
    },
    {
        period: "EoD",
        startTime: "15:15",
        endTime: null,
        time: "15:15",
        bell: "EoD",
        bellDisplay: "End of Day"
    }
];

export const bells = [
    bells1,
    bells1,
    bells2,
    bells2,
    bells3,
    bells1,
    bells1,
    bells2,
    bells2,
    bells3,
    bells1,
    bells1,
    bells2,
    bells2,
    bells3
];