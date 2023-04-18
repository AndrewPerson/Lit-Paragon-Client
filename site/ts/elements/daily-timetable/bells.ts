import { BaseBell, Bell } from "schemas/daily-timetable";

export type TemplatePeriod = BaseBell & {
    type: "period",
    linkedIndex: number
}

const bells1: (Bell | TemplatePeriod)[] = [
    {
        type: "period",
        name: "Period 0",
        shortName: "0",
        linkedIndex: 0,
        startTime: "08:00",
        endTime: "09:00",
        shouldDisplay: true,
    },
    {
        type: "bell",
        name: "Roll Call",
        shortName: "RC",
        startTime: "09:00",
        endTime: "09:05",
        shouldDisplay: true,
    },
    {
        type: "period",
        name: "Period 1",
        shortName: "1",
        linkedIndex: 1,
        startTime: "09:05",
        endTime: "10:05",
        shouldDisplay: true
    },
    {
        type: "period",
        name: "Period 2",
        shortName: "2",
        linkedIndex: 2,
        startTime: "10:10",
        endTime: "11:10",
        shouldDisplay: true
    },
    {
        type: "bell",
        name: "Recess",
        shortName: "R",
        startTime: "11:10",
        endTime: "11:27",
        shouldDisplay: true
    },
    {
        type: "period",
        name: "Period 3",
        shortName: "3",
        linkedIndex: 3,
        startTime: "11:30",
        endTime: "12:30",
        shouldDisplay: true
    },
    {
        type: "period",
        name: "Period 4",
        shortName: "4",
        linkedIndex: 4,
        startTime: "12:35",
        endTime: "13:35",
        shouldDisplay: true
    },
    {
        type: "bell",
        name: "Lunch 1",
        shortName: "MTL1",
        startTime: "13:35",
        endTime: "13:55",
        shouldDisplay: true
    },
    {
        type: "bell",
        name: "Lunch 2",
        shortName: "MTL2",
        startTime: "13:55",
        endTime: "14:12",
        shouldDisplay: true
    },
    {
        type: "period",
        name: "Period 5",
        shortName: "5",
        linkedIndex: 5,
        startTime: "14:15",
        endTime: "15:15",
        shouldDisplay: true
    },
    {
        type: "bell",
        name: "End of Day",
        shortName: "EoD",
        startTime: "15:15",
        endTime: "15:15",
        shouldDisplay: true
    }
];

const bells2: (Bell | TemplatePeriod)[] = [
    {
        type: "period",
        name: "Period 0",
        shortName: "0",
        linkedIndex: 0,
        startTime: "08:00",
        endTime: "09:00",
        shouldDisplay: true
    },
    {
        type: "bell",
        name: "Roll Call",
        shortName: "RC",
        startTime: "09:00",
        endTime: "09:05",
        shouldDisplay: true
    },
    {
        type: "period",
        name: "Period 1",
        shortName: "1",
        linkedIndex: 1,
        startTime: "09:05",
        endTime: "10:05",
        shouldDisplay: true
    },
    {
        type: "period",
        name: "Period 2",
        shortName: "2",
        linkedIndex: 2,
        startTime: "10:10",
        endTime: "11:10",
        shouldDisplay: true
    },
    {
        type: "bell",
        name: "Recess",
        shortName: "R",
        startTime: "11:10",
        endTime: "11:27",
        shouldDisplay: true
    },
    {
        type: "period",
        name: "Period 3",
        shortName: "3",
        linkedIndex: 3,
        startTime: "11:30",
        endTime: "12:30",
        shouldDisplay: true
    },
    {
        type: "bell",
        name: "Lunch 1",
        shortName: "WFL1",
        startTime: "12:30",
        endTime: "12:50",
        shouldDisplay: true
    },
    {
        type: "bell",
        name: "Lunch 2",
        shortName: "WFL2",
        startTime: "12:50",
        endTime: "13:07",
        shouldDisplay: true
    },
    {
        type: "period",
        name: "Period 4",
        shortName: "4",
        linkedIndex: 4,
        startTime: "13:10",
        endTime: "14:10",
        shouldDisplay: true
    },
    {
        type: "period",
        name: "Period 5",
        shortName: "5",
        linkedIndex: 5,
        startTime: "14:15",
        endTime: "15:15",
        shouldDisplay: true
    },
    {
        type: "bell",
        name: "End of Day",
        shortName: "EoD",
        startTime: "15:15",
        endTime: "15:15",
        shouldDisplay: true
    }
];

const bells3: (Bell | TemplatePeriod)[] = [
    {
        type: "period",
        name: "Period 0",
        shortName: "0",
        linkedIndex: 0,
        startTime: "08:00",
        endTime: "08:50",
        shouldDisplay: true
    },
    {
        type: "bell",
        name: "Roll Call",
        shortName: "RC",
        startTime: "09:25",
        endTime: "09:30",
        shouldDisplay: true
    },
    {
        type: "period",
        name: "Period 1",
        shortName: "1",
        linkedIndex: 1,
        startTime: "09:30",
        endTime: "10:25",
        shouldDisplay: true
    },
    {
        type: "period",
        name: "Period 2",
        shortName: "2",
        linkedIndex: 2,
        startTime: "10:30",
        endTime: "11:25",
        shouldDisplay: true
    },
    {
        type: "bell",
        name: "Recess",
        shortName: "R",
        startTime: "11:25",
        endTime: "11:42",
        shouldDisplay: true
    },
    {
        // period: "3",
        // startTime: "11:45",
        // endTime: "12:40",
        // time: "11:45",
        // bell: "3",
        // bellDisplay: "Period 3"
        type: "period",
        name: "Period 3",
        shortName: "3",
        linkedIndex: 3,
        startTime: "11:45",
        endTime: "12:40",
        shouldDisplay: true
    },
    {
        type: "bell",
        name: "Lunch 1",
        shortName: "WFL1",
        startTime: "12:40",
        endTime: "13:00",
        shouldDisplay: true
    },
    {
        type: "bell",
        name: "Lunch 2",
        shortName: "WFL2",
        startTime: "13:00",
        endTime: "13:17",
        shouldDisplay: true
    },
    {
        type: "period",
        name: "Period 4",
        shortName: "4",
        linkedIndex: 4,
        startTime: "13:20",
        endTime: "14:15",
        shouldDisplay: true
    },
    {
        type: "period",
        name: "Period 5",
        shortName: "5",
        linkedIndex: 5,
        startTime: "14:20",
        endTime: "15:15",
        shouldDisplay: true
    },
    {
        type: "bell",
        name: "End of Day",
        shortName: "EoD",
        startTime: "15:15",
        endTime: "15:15",
        shouldDisplay: true
    }
];

export default [
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