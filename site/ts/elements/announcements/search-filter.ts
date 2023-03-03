import { Announcement } from "./types";

export function filterSearch(data: Announcement[], { search }: { search?: string }): Announcement[] {
    let normalisedText = search?.trim().toLowerCase() ?? "";
    if (normalisedText === undefined || normalisedText.trim() === "") return data;

    return data.filter(announcement => {
        return (announcement.title?.toLowerCase().includes(normalisedText) ?? false) ||
               (announcement.content?.toLowerCase().includes(normalisedText) ?? false) ||
               (announcement.authorName?.toLowerCase().includes(normalisedText) ?? false);
    });
}