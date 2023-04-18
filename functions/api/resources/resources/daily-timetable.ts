import { Resource } from "./resource";
import { DailyTimetable } from "schemas/sbhs/daily-timetable";
import { DailyTimetable as TransformedDailyTimetable, Bell, Period } from "schemas/daily-timetable";

export class DailyTimetableResource extends Resource<DailyTimetable, TransformedDailyTimetable> {
    public readonly name = "dailytimetable";
    public readonly path = "timetable/daytimetable.json";
    public readonly struct = DailyTimetable;

    public transform(original: DailyTimetable): TransformedDailyTimetable {
        let timetable: (Bell | Period)[] = [];

        let periodIndex = 0;
        for (const bell of original.bells) {
            const periodIdentifier = bell.period;

            if (periodIdentifier in original.timetable.timetable.periods) {
                const period = original.timetable.timetable.periods[periodIdentifier];

                if (period === undefined) continue;

                const roomVariation = original.roomVariations?.[periodIdentifier];
                const classVariation = original.classVariations?.[periodIdentifier];

                timetable.push({
                    type: "period",
                    name: period.title,
                    periodIndex: periodIndex,
                    shortName: bell.bell ?? period.title,
                    startTime: bell.startTime,
                    endTime: bell.endTime ?? bell.startTime,
                    room: roomVariation?.roomTo ?? period.room,
                    roomChanged: roomVariation !== undefined,
                    teacher: classVariation?.casualSurname ?? classVariation?.casual ?? period.fullTeacher,
                    teacherChanged: classVariation !== undefined && classVariation.type !== "nocover",
                    shouldDisplay: true,
                });

                periodIndex++;
            }
            else
            {
                timetable.push({
                    type: "bell",
                    name: bell.bellDisplay,
                    shortName: bell.bell ?? bell.bellDisplay,
                    startTime: bell.startTime,
                    endTime: bell.endTime ?? bell.startTime,
                    shouldDisplay: true
                });
            }
        }

        return {
            date: original.date,
            dayNumber: original.timetable.timetable.dayNumber,
            dayName: original.timetable.timetable.dayname,
            timetable: timetable
        };
    }
}