import { Struct, coerce, record, array, string, integer, date, optional, nullable, defaulted, unknown, is, create, validate, type } from "superstruct";

export function arrayAsRecord<T, U>(struct: Struct<T, U>) {
    return coerce(record(string(), struct), array(unknown()), value => Object.fromEntries(Object.entries(value)));
}

export function recordAsArray<T, U>(struct: Struct<T, U>) {
    // Has to be a record of string and unknown, because the values aren't actually converted yet. *shrug*
    return coerce(array(struct), record(string(), unknown()), value => {
        const result: T[] = [];

        for (const [key, item] of Object.entries(value)) {
            const [err, value] = validate(item, struct, { coerce: true });

            if (err) continue;

            try {
                result[parseInt(key)] = value;
            }
            catch (_) { }
        }

        return result;
    });
}

export function missing<T, U>(struct: Struct<T, U>) {
    return defaulted(optional(nullable(struct)), null) as Struct<T | null, U>;
}

export function invalidAsUndefined<T, U>(struct: Struct<T, U>) {
    return coerce(optional(struct), unknown(), value => {
        const [err, result] = validate(value, struct, { coerce: true });

        if (err) return undefined;
        else return result;
    });
}

export function removeUndefinedFromArray<U>(struct: Struct<(U | undefined)[], Struct<U | undefined>>): Struct<U[], U> {
    return coerce(struct, struct, value => {
        return value.filter(item => item !== undefined)
    }) as Struct<U[], U>;
}

export function removeUndefinedFromRecord<T extends Record<string, U | undefined>, U>(struct: Struct<T>) {
    return coerce(struct, struct, value => {
        const result: Record<string, U> = {};

        for (const [key, item] of Object.entries(value)) {
            if (item !== undefined) result[key] = item;
        }

        return result;
    }) as Struct<T, U>;
}

export const StringAsInteger = coerce(integer(), string(), value => parseInt(value));
export const StringAsDate = coerce(date(), string(), value => new Date(value));
