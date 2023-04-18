import { Resource } from "./resource";
import { Announcements } from "schemas/sbhs/announcements";
import { Announcements as TransformedAnnouncements, Announcement } from "schemas/announcements";

export class AnnouncementsResource extends Resource<Announcements, TransformedAnnouncements> {
    public readonly name = "announcements";
    public readonly path = "dailynews/list.json";
    public readonly validator = Announcements;

    public transform(original: Announcements): TransformedAnnouncements {
        let transformedAnnouncements: TransformedAnnouncements = [];

        for (const announcement of original.notices) {
            let transformedAnnouncement: Announcement = {
                id: announcement.id,
                title: announcement.title,
                author: announcement.authorName,
                years: announcement.years,
                dates: announcement.dates,
                content: announcement.content,
                weight: announcement.relativeWeight + announcement.isMeeting,
                meeting: undefined
            };

            if (announcement.isMeeting == 1) {
                transformedAnnouncement.meeting = {
                    date: announcement.meetingDate,
                    time: announcement.meetingTimeParsed,
                    humanTime: announcement.meetingTime
                };
            }

            transformedAnnouncements.push(transformedAnnouncement);
        }

        return transformedAnnouncements;
    }
}