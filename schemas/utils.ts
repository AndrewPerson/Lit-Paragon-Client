import { Infer, type, string, number, pattern, coerce, validate } from "superstruct";

export const Time = type({
    hours: number(),
    minutes: number(),
    seconds: number()
});

export type Time = Infer<typeof Time>;

export const StringAsTime = coerce(Time, pattern(string(), /\d+:\d+(:\d+)?/), value => {
    const parts = value.split(":");

    if (parts.length == 2) {
        return {
            hours: parseInt(parts[0]),
            minutes: parseInt(parts[1]),
            seconds: 0
        }
    }
    else if (parts.length == 3) {
        return {
            hours: parseInt(parts[0]),
            minutes: parseInt(parts[1]),
            seconds: parseInt(parts[2])
        }
    }
    else {
        throw new Error("Invalid time format");
    }
});
