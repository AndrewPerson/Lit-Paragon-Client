import { Infer, object, array, string, number } from "banditypes";
import { literal, intersection } from "schemas/utils";

export const AnnouncementWithMeeting = object({
    // TODO Update this to make the type parameter const. This has to be like because wrangler uses an old version of ts.
    isMeeting: literal(1 as const),
    meetingDate: string(),
    meetingTimeParsed: string(),
    meetingTime: string(),
    meetingLocation: string()
});

export type AnnouncementWithMeeting = Infer<typeof AnnouncementWithMeeting>;

export const AnnouncementWithoutMeeting = object({
    // TODO Update this to make the type parameter const. This has to be like because wrangler uses an old version of ts.
    isMeeting: literal(0 as const)
});

export type AnnouncementWithoutMeeting = Infer<typeof AnnouncementWithoutMeeting>;

export const BaseAnnouncement = object({
    id: string(),
    title: string(),
    content: string(),
    years: array(string()),
    displayYears: string(),
    authorName: string(),
    dates: array(string()),
    relativeWeight: number()
});

export type BaseAnnouncement = Infer<typeof BaseAnnouncement>;

export const Announcement = intersection(BaseAnnouncement, AnnouncementWithMeeting.or(AnnouncementWithoutMeeting));

export type Announcement = Infer<typeof Announcement>;

export const Announcements = object({
    notices: array(Announcement)
});

export type Announcements = Infer<typeof Announcements>;
