export type Announcements = {
    notices: Announcement[]
}

export type Announcement = {
    title: string,
    content: string,
    years: string[],
    relativeWeight: number,
    isMeeting: number,
    meetingDate: string | null,
    //TODO Check all possible types
    meetingTimeParsed: string | undefined,
    meetingTime: string,
    displayYears: string,
    authorName: string
}