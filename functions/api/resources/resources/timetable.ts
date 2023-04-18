import { Resource } from "./resource";
import { Timetable, Period } from "schemas/sbhs/timetable";
import { Timetable as TransformedTimetable, Week } from "schemas/timetable";

export class TimetableResource extends Resource<Timetable, TransformedTimetable> {
    public readonly name = "timetable";
    public readonly path = "timetable/timetable.json";
    public readonly validator = Timetable;

    public transform(original: Timetable): TransformedTimetable {
        let weeks: Week[] = [];

        Object.values(original.days).forEach(day => {
            // Day numbers are 1-indexed, but we want 0-indexed
            const weekIndex = Math.floor((day.dayNumber - 1) / 5);

            if (weeks[weekIndex] === undefined) {
                weeks[weekIndex] = {
                    weekName: String.fromCharCode(65 + weekIndex),
                    days: []
                };
            }

            const week = weeks[weekIndex];

            week.days.push({
                dayName: day.dayname,
                dayNumber: day.dayNumber,
                periods: (Object.entries(day.periods).filter(([_, period]) => period.room != null) as [string, Period][]).map(([periodIndexString, period]) => ({
                    name: period.title,
                    // TODO Get a proper short name
                    shortName: period.title,
                    periodIndex: parseInt(periodIndexString),
                    room: period.room,
                    teacher: period.fullTeacher
                }))
            });
        });

        return {
            weeks: weeks
        };
    }
}