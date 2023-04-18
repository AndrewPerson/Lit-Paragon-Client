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
        startTime: { hours: 8, minutes: 0, seconds: 0 },
        endTime: { hours: 9, minutes: 0, seconds: 0 },
        shouldDisplay: true,
    },
    {
        type: "bell",
        name: "Roll Call",
        shortName: "RC",
        startTime: { hours: 9, minutes: 0, seconds: 0 },
        endTime: { hours: 9, minutes: 5, seconds: 0 },
        shouldDisplay: true,
    },
    {
        type: "period",
        name: "Period 1",
        shortName: "1",
        linkedIndex: 1,
        startTime: { hours: 9, minutes: 5, seconds: 0 },
        endTime: { hours: 10, minutes: 5, seconds: 0 },
        shouldDisplay: true
    },
    {
        type: "period",
        name: "Period 2",
        shortName: "2",
        linkedIndex: 2,
        startTime: { hours: 10, minutes: 10, seconds: 0 },
        endTime: { hours: 11, minutes: 10, seconds: 0 },
        shouldDisplay: true
    },
    {
        type: "bell",
        name: "Recess",
        shortName: "R",
        startTime: { hours: 11, minutes: 10, seconds: 0 },
        endTime: { hours: 11, minutes: 27, seconds: 0 },
        shouldDisplay: true
    },
    {
        type: "period",
        name: "Period 3",
        shortName: "3",
        linkedIndex: 3,
        startTime: { hours: 11, minutes: 30, seconds: 0 },
        endTime: { hours: 12, minutes: 30, seconds: 0 },
        shouldDisplay: true
    },
    {
        type: "period",
        name: "Period 4",
        shortName: "4",
        linkedIndex: 4,
        startTime: { hours: 12, minutes: 35, seconds: 0 },
        endTime: { hours: 13, minutes: 35, seconds: 0 },
        shouldDisplay: true
    },
    {
        type: "bell",
        name: "Lunch 1",
        shortName: "MTL1",
        startTime: { hours: 13, minutes: 35, seconds: 0 },
        endTime: { hours: 13, minutes: 55, seconds: 0 },
        shouldDisplay: true
    },
    {
        type: "bell",
        name: "Lunch 2",
        shortName: "MTL2",
        startTime: { hours: 13, minutes: 55, seconds: 0 },
        endTime: { hours: 14, minutes: 12, seconds: 0 },
        shouldDisplay: true
    },
    {
        type: "period",
        name: "Period 5",
        shortName: "5",
        linkedIndex: 5,
        startTime: { hours: 14, minutes: 15, seconds: 0 },
        endTime: { hours: 15, minutes: 15, seconds: 0 },
        shouldDisplay: true
    },
    {
        type: "bell",
        name: "End of Day",
        shortName: "EoD",
        startTime: { hours: 15, minutes: 15, seconds: 0 },
        endTime: { hours: 15, minutes: 15, seconds: 0 },
        shouldDisplay: true
    }
];

const bells2: (Bell | TemplatePeriod)[] = [
    {
        type: "period",
        name: "Period 0",
        shortName: "0",
        linkedIndex: 0,
        startTime: { hours: 8, minutes: 0, seconds: 0 },
        endTime: { hours: 9, minutes: 0, seconds: 0 },
        shouldDisplay: true
    },
    {
        type: "bell",
        name: "Roll Call",
        shortName: "RC",
        startTime: { hours: 9, minutes: 0, seconds: 0 },
        endTime: { hours: 9, minutes: 5, seconds: 0 },
        shouldDisplay: true
    },
    {
        type: "period",
        name: "Period 1",
        shortName: "1",
        linkedIndex: 1,
        startTime: { hours: 9, minutes: 5, seconds: 0 },
        endTime: { hours: 10, minutes: 5, seconds: 0 },
        shouldDisplay: true
    },
    {
        type: "period",
        name: "Period 2",
        shortName: "2",
        linkedIndex: 2,
        startTime: { hours: 10, minutes: 10, seconds: 0 },
        endTime: { hours: 11, minutes: 10, seconds: 0 },
        shouldDisplay: true
    },
    {
        type: "bell",
        name: "Recess",
        shortName: "R",
        startTime: { hours: 11, minutes: 10, seconds: 0 },
        endTime: { hours: 11, minutes: 27, seconds: 0 },
        shouldDisplay: true
    },
    {
        type: "period",
        name: "Period 3",
        shortName: "3",
        linkedIndex: 3,
        startTime: { hours: 11, minutes: 30, seconds: 0 },
        endTime: { hours: 12, minutes: 30, seconds: 0 },
        shouldDisplay: true
    },
    {
        type: "bell",
        name: "Lunch 1",
        shortName: "WFL1",
        startTime: { hours: 12, minutes: 30, seconds: 0 },
        endTime: { hours: 12, minutes: 50, seconds: 0 },
        shouldDisplay: true
    },
    {
        type: "bell",
        name: "Lunch 2",
        shortName: "WFL2",
        startTime: { hours: 12, minutes: 50, seconds: 0 },
        endTime: { hours: 13, minutes: 7, seconds: 0 },
        shouldDisplay: true
    },
    {
        type: "period",
        name: "Period 4",
        shortName: "4",
        linkedIndex: 4,
        startTime: { hours: 13, minutes: 10, seconds: 0 },
        endTime: { hours: 14, minutes: 10, seconds: 0 },
        shouldDisplay: true
    },
    {
        type: "period",
        name: "Period 5",
        shortName: "5",
        linkedIndex: 5,
        startTime: { hours: 14, minutes: 15, seconds: 0 },
        endTime: { hours: 15, minutes: 15, seconds: 0 },
        shouldDisplay: true
    },
    {
        type: "bell",
        name: "End of Day",
        shortName: "EoD",
        startTime: { hours: 15, minutes: 15, seconds: 0 },
        endTime: { hours: 15, minutes: 15, seconds: 0 },
        shouldDisplay: true
    }
];

const bells3: (Bell | TemplatePeriod)[] = [
    {
        type: "period",
        name: "Period 0",
        shortName: "0",
        linkedIndex: 0,
        startTime: { hours: 8, minutes: 0, seconds: 0 },
        endTime: { hours: 8, minutes: 50, seconds: 0 },
        shouldDisplay: true
    },
    {
        type: "bell",
        name: "Roll Call",
        shortName: "RC",
        startTime: { hours: 9, minutes: 25, seconds: 0 },
        endTime: { hours: 9, minutes: 30, seconds: 0 },
        shouldDisplay: true
    },
    {
        type: "period",
        name: "Period 1",
        shortName: "1",
        linkedIndex: 1,
        startTime: { hours: 9, minutes: 30, seconds: 0 },
        endTime: { hours: 10, minutes: 25, seconds: 0 },
        shouldDisplay: true
    },
    {
        type: "period",
        name: "Period 2",
        shortName: "2",
        linkedIndex: 2,
        startTime: { hours: 10, minutes: 30, seconds: 0 },
        endTime: { hours: 11, minutes: 25, seconds: 0 },
        shouldDisplay: true
    },
    {
        type: "bell",
        name: "Recess",
        shortName: "R",
        startTime: { hours: 11, minutes: 25, seconds: 0 },
        endTime: { hours: 11, minutes: 42, seconds: 0 },
        shouldDisplay: true
    },
    {
        type: "period",
        name: "Period 3",
        shortName: "3",
        linkedIndex: 3,
        startTime: { hours: 11, minutes: 45, seconds: 0 },
        endTime: { hours: 12, minutes: 40, seconds: 0 },
        shouldDisplay: true
    },
    {
        type: "bell",
        name: "Lunch 1",
        shortName: "WFL1",
        startTime: { hours: 12, minutes: 40, seconds: 0 },
        endTime: { hours: 13, minutes: 0, seconds: 0 },
        shouldDisplay: true
    },
    {
        type: "bell",
        name: "Lunch 2",
        shortName: "WFL2",
        startTime: { hours: 13, minutes: 0, seconds: 0 },
        endTime: { hours: 13, minutes: 17, seconds: 0 },
        shouldDisplay: true
    },
    {
        type: "period",
        name: "Period 4",
        shortName: "4",
        linkedIndex: 4,
        startTime: { hours: 13, minutes: 20, seconds: 0 },
        endTime: { hours: 14, minutes: 15, seconds: 0 },
        shouldDisplay: true
    },
    {
        type: "period",
        name: "Period 5",
        shortName: "5",
        linkedIndex: 5,
        startTime: { hours: 14, minutes: 20, seconds: 0 },
        endTime: { hours: 15, minutes: 15, seconds: 0 },
        shouldDisplay: true
    },
    {
        type: "bell",
        name: "End of Day",
        shortName: "EoD",
        startTime: { hours: 15, minutes: 15, seconds: 0 },
        endTime: { hours: 15, minutes: 15, seconds: 0 },
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