import { Resource } from "./resource";
import { ClassVariation, DailyTimetable, Period, RollCall, RoomVariation } from "schemas/sbhs/daily-timetable";
import { DailyTimetable as TransformedDailyTimetable } from "schemas/daily-timetable";

export class DailyTimetableResource extends Resource<DailyTimetable, TransformedDailyTimetable> {
    public readonly name = "dailytimetable";
    public readonly path = "timetable/daytimetable.json";
    public readonly validator = DailyTimetable;

    public transform(original: DailyTimetable): TransformedDailyTimetable {
        let periodIndex = 0;

        const roomVariations = Object.fromEntries(Object.entries(original.roomVariations));
        const classVariations = Object.fromEntries(Object.entries(original.classVariations));

        return {
            date: original.date,
            dayNumber: original.timetable.timetable.dayNumber,
            dayName: original.timetable.timetable.dayname,
            timetable: original.bells.map(bell => {
                const period: Period | RollCall | undefined = original.timetable.timetable.periods[bell.period];

                if (period !== undefined && "fullTeacher" in period) {
                    const roomVariation: RoomVariation | undefined = roomVariations[bell.period];
                    const classVariation: ClassVariation | undefined = classVariations[bell.period];

                    return {
                        type: "period",
                        name: period.title,
                        periodIndex: periodIndex++,
                        shortName: bell.bell ?? period.title,
                        startTime: bell.startTime,
                        endTime: bell.endTime ?? bell.startTime,
                        room: roomVariation?.roomTo ?? period.room,
                        roomChanged: roomVariation !== undefined,
                        teacher: classVariation?.casualSurname ?? classVariation?.casual ?? period.fullTeacher,
                        teacherChanged: classVariation !== undefined && classVariation.type !== "nocover",
                        shouldDisplay: true,
                    }
                }
                else
                {
                    return {
                        type: "bell",
                        name: bell.bellDisplay,
                        shortName: bell.bell ?? bell.bellDisplay,
                        startTime: bell.startTime,
                        endTime: bell.endTime ?? bell.startTime,
                        shouldDisplay: true
                    };
                }
            })
        };
    }
}