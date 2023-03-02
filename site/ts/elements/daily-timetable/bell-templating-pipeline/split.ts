import { Bell, Period } from "../types";
import { PipelineMetadata } from "./pipeline";

export function splitBells(bells: [Bell, number][], metadata: PipelineMetadata) {
    let periodsDict = metadata.dailyTimetable.timetable?.timetable?.periods ?? {};

    let periods: [Bell, Period, number][] = [];
    let newBells: [Bell, number][] = [];

    for (let [bell, index] of bells) {
        if (bell.period !== undefined && bell.period !== null && bell.period in periodsDict) {
            let period = periodsDict[bell.period];

            if (period !== undefined && period !== null &&
                "fullTeacher" in period && period.fullTeacher !== undefined && period.fullTeacher !== null &&
                period.room !== undefined && period.room !== null) {
                periods.push([bell, period, index]);
            }
            else {
                newBells.push([bell, index]);
            }
        }
        else {
            newBells.push([bell, index]);
        }
    }

    return {
        periods: periods,
        bells: newBells
    }
}