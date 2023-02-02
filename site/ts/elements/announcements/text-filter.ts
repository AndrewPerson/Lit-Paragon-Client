import { Announcement } from "./types";

export function filterText(data: Announcement[], { text }: { text?: string }): Announcement[] {
    let normalisedText = text?.trim().toLowerCase() ?? "";
    if (normalisedText === undefined || normalisedText.trim() === "") return data;

    return data.filter(announcement => {
        return (announcement.title?.toLowerCase().includes(normalisedText) ?? false) ||
               (announcement.content?.toLowerCase().includes(normalisedText) ?? false) ||
               (announcement.authorName?.toLowerCase().includes(normalisedText) ?? false);
    });
}