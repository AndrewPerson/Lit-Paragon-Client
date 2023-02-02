import { Bell } from "../types";
import { Missing } from "../../../missing";

export function filterBells(bells: (Bell | Missing)[], _: any): Bell[] {
    return bells.filter(bell => bell !== undefined && bell !== null && (bell.display ?? true)) as Bell[];
}