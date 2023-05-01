import { Resource } from "./resource";
import { ClassVariation, DailyTimetable, Bell, Period, PartialPeriod, RoomVariation, Subject } from "schemas/sbhs/daily-timetable";
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
                const subject = original.timetable.subjects[`${period.year}${period.title}`] as Subject | undefined;

                const titleParts = subject?.title.split(" ");
                const title = titleParts?.slice(1, titleParts.length).join(" ");

                return {
                    type: "period",
                    name: title ?? period.title,
                    periodIndex: periodIndex++,
                    startTime: bell.startTime,
                    endTime: bell.endTime ?? bell.startTime,
                    room: roomVariation?.roomTo ?? period.room,
                    roomChanged: roomVariation !== undefined,
                    teacher: classVariation?.casualSurname ?? classVariation?.casual ?? period.fullTeacher,
                    teacherChanged: classVariation !== undefined && classVariation.type !== "nocover",
                    shouldDisplay: true
                } as TransformedPeriod;
            }
            else
            {
                return {
                    type: "bell",
                    name: bell.bellDisplay,
                    startTime: bell.startTime,
                    endTime: bell.endTime ?? bell.startTime,
                    shouldDisplay: true
                } as TransformedBell;
            }
        });

        hideLeadingBells(timetable.reverse());
        hideLeadingBells(timetable.reverse());

        return {
            date: original.date,
            dayNumber: original.timetable.timetable.dayNumber,
            dayName: original.timetable.timetable.dayname,
            timetable: timetable
        };
    }
}

function hideLeadingBells(bells: (TransformedBell | TransformedPeriod)[]) {
    let prevBell = null;

    for (const bell of bells) {
        if (bell.type == "period") {
            if (prevBell != null) prevBell.shouldDisplay = true;
            break;
        }

        bell.shouldDisplay = false;
        prevBell = bell;
    }

    return bells;
}