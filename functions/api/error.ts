import { create } from "../lib/function";
import { SBHSEnv } from "../lib/env";

export const onRequestPost = create<SBHSEnv>("error", true, async ({ env: { PARAGON_DB }, request, data: { tracer } }) => {
    const error = await request.json();

    if (typeof error !== "object") {
        return new Response("Body must be JSON object.", { status: 400 });
    }

    if (!("error_message" in error) || typeof error.error_message !== "string") {
        return new Response("Body must contain an error_message string", { status: 400 });
    }

    if (!("stack_trace" in error) || typeof error.stack_trace !== "string") {
        return new Response("Body must contain a stack_trace string", { status: 400 });
    }

    if (!("version" in error) || typeof error.version !== "string") {
        return new Response("Body must contain a version string", { status: 400 });
    }

    const errorRequest = PARAGON_DB.prepare("INSERT INTO errors (error_message, stack_trace, version, date) VALUES (?, ?, ?, ?)").bind(
        error.error_message,
        error.stack_trace,
        error.version,
        new Date()
    );

    const result = await errorRequest.run();

    if (result.changes != 1) {
        return new Response("Failed to report error.", { status: 500 });
    }

    return new Response("Reported error successfully.");
});