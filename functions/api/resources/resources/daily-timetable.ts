import { Resource } from "./resource";
import { ClassVariation, DailyTimetable, Bell, Period, PartialPeriod, RoomVariation } from "schemas/sbhs/daily-timetable";
import { DailyTimetable as TransformedDailyTimetable, Bell as TransformedBell, Period as TransformedPeriod } from "schemas/daily-timetable";

export class DailyTimetableResource extends Resource<DailyTimetable, TransformedDailyTimetable> {
    public readonly name = "dailytimetable";
    public readonly path = "timetable/daytimetable.json";
    public readonly validator = DailyTimetable;

    public transform(original: DailyTimetable): TransformedDailyTimetable {
        let periodIndex = 0;

        let timetable = original.bells.map(bell => {
            const period: Period | PartialPeriod | undefined = original.timetable.timetable.periods[bell.period];

            if (period !== undefined && "fullTeacher" in period) {
                const roomVariation = original.roomVariations[bell.period] as RoomVariation | undefined;
                const classVariation = original.classVariations[bell.period] as ClassVariation | undefined;

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
                } as TransformedPeriod;
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
                } as TransformedBell;
            }
        });

        for (const bell of timetable) {
            if (bell.type == "period") break;

            bell.shouldDisplay = false;
        }

        for (const bell of timetable.reverse()) {
            if (bell.type == "period") break;

            bell.shouldDisplay = false;
        }

        return {
            date: original.date,
            dayNumber: original.timetable.timetable.dayNumber,
            dayName: original.timetable.timetable.dayname,
            timetable: timetable
        };
    }
}