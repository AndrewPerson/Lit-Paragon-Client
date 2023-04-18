export type Announcement = {
    id: string,
    title: string,
    author: string,
    years: string[],
    dates: string[],
    content: string,
    weight: number,
    meeting?: {
        date: string,
        time: string,
        humanTime: string
    }
};

export type Announcements = Announcement[];
