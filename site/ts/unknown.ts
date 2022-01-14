export type DefinedUnknown = bigint | boolean | Function | number | string | symbol | Unknown[] | { [index: string]: Unknown };
export type Unknown = undefined | null | DefinedUnknown;

export function SafeAccess<T>(obj: Unknown, types: string[], fields: (string | number)[]): T | undefined {
    let value: any = obj;
    for (let i = 0; i < types.length; i++) {
        if (value === undefined || value === null) {
            return undefined;
        }

        if (typeof value !== types[i]) {
            return undefined;
        }

        if (i < fields.length) value = value[fields[i]];
    }

    return value;
}