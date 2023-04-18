import { Infer, type, array, string, number, boolean, coerce, intersection, union, literal } from "superstruct";

export const AnnouncementWithMeeting = type({
    isMeeting: literal(1),
    meetingDate: string(),
    meetingTimeParsed: string(),
    meetingTime: string(),
    meetingLocation: string()
});

export type AnnouncementWithMeeting = Infer<typeof AnnouncementWithMeeting>;

export const AnnouncementWithoutMeeting = type({
    isMeeting: literal(0)
});

export type AnnouncementWithoutMeeting = Infer<typeof AnnouncementWithoutMeeting>;

export const BaseAnnouncement = type({
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

export const Announcement = union([
    intersection([BaseAnnouncement, AnnouncementWithMeeting]),
    intersection([BaseAnnouncement, AnnouncementWithoutMeeting])
]);

export type Announcement = Infer<typeof Announcement>;

export const Announcements = type({
    notices: array(Announcement)
});

export type Announcements = Infer<typeof Announcements>;
