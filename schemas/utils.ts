import { Infer, object, number, banditype, fail, Banditype, string } from "banditypes";

export function literal<T>(value: T) {
    return banditype((raw) => (raw === value ? raw as T : fail()));
}

export function intersection<T, U>(type1: Banditype<T>, type2: Banditype<U>) {
    return banditype((raw) => {
        const result1 = type1(raw);
        const result2 = type2(raw);

        return {
            ...result1,
            ...result2
        }
    });
}

export const Time = object({
    hours: number(),
    minutes: number(),
    seconds: number()
});

export type Time = Infer<typeof Time>;

export const StringAsTime: Banditype<Time> = string().map(value => {
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
        return fail();
    }
});

export const StringAsInteger = string().map(value => {
    try
    {
        return parseInt(value);
    }
    catch
    {
        return fail();
    }
});

// export const StringAsTime = coerce(Time, pattern(string(), /\d+:\d+(:\d+)?/), value => {
//     const parts = value.split(":");

//     if (parts.length == 2) {
//         return {
//             hours: parseInt(parts[0]),
//             minutes: parseInt(parts[1]),
//             seconds: 0
//         }
//     }
//     else if (parts.length == 3) {
//         return {
//             hours: parseInt(parts[0]),
//             minutes: parseInt(parts[1]),
//             seconds: parseInt(parts[2])
//         }
//     }
//     else {
//         throw new Error("Invalid time format");
//     }
// });
