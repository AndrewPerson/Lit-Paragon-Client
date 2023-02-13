import { html, TemplateResult } from "lit";

import { Bell, Period, TeacherType, DailyTimetable } from "../types";
import { GetPeriodTitle, FormatCasualCode } from "../daily-timetable-utils";
import { PipelineMetadata } from "./pipeline";

function getPeriod(period: Period, bell: Bell, dailyTimetable: DailyTimetable, next: boolean) {
    let classVariations = (Array.isArray(dailyTimetable.classVariations) ? {} : dailyTimetable.classVariations) ?? {};
    let roomVariations = (Array.isArray(dailyTimetable.roomVariations) ? {} : dailyTimetable.roomVariations) ?? {};

    let classVariation = classVariations[bell.period!];
    let roomVariation = roomVariations[bell.period!];
    
    let teacherChanged = classVariation !== undefined && classVariation !== null && classVariation.type != TeacherType.NO_VARIATION;
    let roomChanged = roomVariation !== undefined && roomVariation !== null;

    return html`
    <daily-timetable-period title="${GetPeriodTitle(dailyTimetable, period.year ?? "?", period.title ?? "???")}"
                            class="${classVariation?.type == TeacherType.NO_COVER ? "cancelled" : ""} ${next ? "next" : ""}"
                            time="${bell.time ?? "??:??"}"
                            teacher="${classVariation === undefined || classVariation == null ? (period.fullTeacher?.trim().length == 0 ? "No one" : period.fullTeacher) ?? "???" :
                                       classVariation.type == TeacherType.NO_VARIATION ? period.fullTeacher ?? "???" :
                                       classVariation.type == TeacherType.NO_COVER ? "No one" :
                                       classVariation.casualSurname ?? FormatCasualCode(classVariation.casual ?? "????")}"
                            ?teacherChanged="${teacherChanged}"
                            room="${roomVariation?.roomTo ?? period.room ?? "???"}"
                            ?roomChanged="${roomChanged}"
                           ></daily-timetable-period>
    `;
}

function getBell(bell: Bell, next: boolean) {
    return html`<daily-timetable-bell title="${bell.bellDisplay ?? "???"}" class="${next ? "next" : ""}" time="${bell.time ?? "??:??"}"></daily-timetable-bell>`;
}

export function templateBells(data: { periods: [Bell, Period, number][], bells: [Bell, number][] }, metadata: PipelineMetadata) {
    return [
        data.periods.map(([bell, period, index]) => [getPeriod(period, bell, metadata.dailyTimetable, metadata.nextVisibleBell == index), index]),
        data.bells.map(([bell, index]) => [getBell(bell, metadata.nextVisibleBell == index), index])
    ].flat().sort((a, b) => (a[1] as number) - (b[1] as number)).map(a => a[0] as TemplateResult<1>);
}