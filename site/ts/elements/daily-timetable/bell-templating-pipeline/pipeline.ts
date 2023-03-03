import { Pipeline } from "../../../site/pipeline";
import { Missing } from "../../../missing";
import { Bell, DailyTimetable } from "../types";

import { filterBells } from "./filter";
import { splitBells } from "./split";
import { templateBells } from "./template";

export type PipelineMetadata = {
    dailyTimetable: DailyTimetable,
    nextVisibleBell: number
}

export let bellTemplatingPipeline = new Pipeline<(Bell | Missing)[], PipelineMetadata>()
                                    .transform(filterBells)
                                    .transform(splitBells)
                                    .transform(templateBells);