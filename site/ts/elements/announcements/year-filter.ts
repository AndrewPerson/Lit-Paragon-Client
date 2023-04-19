import { Announcement } from "schemas/announcements";

export function filterYears(data: Announcement[], { years }: { years: string[] }): Announcement[] {
    if (years.length === 0) return data;

    return data.filter(announcement => {
        for (const year of years)
            if (announcement.years.includes(year))
                return true;

        return false;
    });
}
