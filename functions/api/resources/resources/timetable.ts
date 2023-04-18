import { Resource } from "./resource";
import { Timetable, Period } from "schemas/sbhs/timetable";
import { Timetable as TransformedTimetable, Week, Day } from "schemas/timetable";

export class TimetableResource extends Resource<Timetable, TransformedTimetable> {
    public readonly name = "timetable";
    public readonly path = "timetable/timetable.json";
    public readonly struct = Timetable;

    public transform(original: Timetable): TransformedTimetable {
        return {
            weeks: original.days.map(day => {
                if (day === undefined) return null;

                return {
                    dayName: day.dayname,
                    dayNumber: day.dayNumber,
                    periods: Object.fromEntries(
                        (day.periods
                            .map((period, index) => [index, period])
                            .filter(([_, period]) => period !== undefined) as [number, Period][])
                        .map(([index, period]) => {
                            return [index, {
                                name: period.title,
                                shortName: period.title,
                                room: period.room,
                                teacher: period.fullTeacher
                            }];
                        })
                    )
                };
            }).reduce((weeks: Week[], day) => {
                let week = weeks[weeks.length - 1];

                if (week === undefined || week.days.length === 5) {
                    week = {
                        weekName: String.fromCharCode(65 + weeks.length),
                        days: []
                    };

                    weeks.push(week);
                }

                week.days.push(day);

                return weeks;
            }, [])
        }
    }
}