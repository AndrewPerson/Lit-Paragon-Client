import { Announcement } from "schemas/announcements";

export function filterSearch(data: Announcement[], { search }: { search?: string }): Announcement[] {
    let normalisedText = search?.trim().toLowerCase();
    if (normalisedText === undefined) return data;

    return data.filter(announcement => {
        return (announcement.title.toLowerCase().includes(normalisedText!)) ||
               (announcement.content.toLowerCase().includes(normalisedText!)) ||
               (announcement.author.toLowerCase().includes(normalisedText!));
    });
}