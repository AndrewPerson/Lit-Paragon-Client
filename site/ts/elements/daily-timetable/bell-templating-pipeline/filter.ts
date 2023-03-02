import { Bell } from "../types";
import { Missing } from "../../../missing";

export function filterBells(bells: (Bell | Missing)[], _: any): [Bell, number][] {
    return bells.map((bell, index) => [bell, index] as [Bell, number]).filter(([bell]) => bell !== undefined && bell !== null && (bell.display ?? true)) as [Bell, number][];
}