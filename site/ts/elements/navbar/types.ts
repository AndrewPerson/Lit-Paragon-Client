import { TemplateResult } from "lit";
import { NavItem } from "./navitem";

export type NavbarSortableEvent = {
    item: NavItem,
    oldIndex: number | undefined,
    newIndex: number | undefined
};