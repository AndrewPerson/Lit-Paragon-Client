import { Missing } from "../../missing"

export type Announcements = {
    notices: Announcement[] | Missing
}

export type Announcement = {
    title: string | Missing,
    content: string | Missing,
    years: string[] | Missing,
    relativeWeight: number | Missing,
    isMeeting: number | Missing,
    meetingDate: string | Missing,
    //TODO Check all possible types
    meetingTimeParsed: string | Missing,
    meetingTime: string | Missing,
    displayYears: string | Missing,
    authorName: string | Missing
}