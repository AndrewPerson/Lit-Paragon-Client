import { Resource } from "./resource";
import { Timetable, Period } from "schemas/sbhs/timetable";
import { Timetable as TransformedTimetable, Week, Day } from "schemas/timetable";

export class TimetableResource extends Resource<Timetable, TransformedTimetable> {
    public readonly name = "timetable";
    public readonly path = "timetable/timetable.json";
    public readonly validator = Timetable;

    public transform(original: Timetable): TransformedTimetable {
        const weeks = Object.values(original.days).sort((a, b) => a.dayNumber - b.dayNumber)
        .reduce((days, day) => {
            const prevDay = days[days.length - 1] as Day | undefined;

            if (prevDay !== undefined) {
                for (let i = prevDay.dayNumber + 1; i < day.dayNumber; i++) {
                    days.push({
                        dayName: "",
                        dayNumber: i,
                        periods: []
                    });
                }
            }

            days.push({
                dayName: day.dayname,
                dayNumber: day.dayNumber,
                periods: (Object.entries(day.periods).filter(([_, period]) => period.room != null) as [string, Period][]).map(([periodIndexString, period]) => ({
                    name: period.title,
                    shortName: skipEnd(period.title.split(" "), 1).join(" "),
                    periodIndex: parseInt(periodIndexString),
                    room: period.room,
                    teacher: period.fullTeacher
                }))
            });

            return days;
        }, [] as Day[])
        .reduce((weeks, day) => {
            const currentWeek = weeks[weeks.length - 1];

            if (currentWeek.days.length == 5) {
                weeks.push({
                    days: [day]
                });
            }
            else {
                currentWeek.days.push(day);
            }

            return weeks;
        }, [{ days: [] }] as Week[]);

        return {
            weeks: weeks
        };
    }
}

function skipEnd<T>(arr: T[], n: number) {
    return arr.slice(0, arr.length - n);
}