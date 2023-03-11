import { create } from "../lib/function";
import { SBHSEnv } from "../lib/env";

export const onRequestGet = create<SBHSEnv>("extensions", true, async ({ env: { PARAGON_DB }, request, data: { tracer } }) => {
    const searchParams = new URL(request.url).searchParams;

    const pageSize = parseInt(searchParams.get("page_size") ?? "0");
    const page = parseInt(searchParams.get("page") ?? "0");

    const extensionsRequest = PARAGON_DB.prepare("SELECT * FROM extensions ORDERBY name LIMIT ?,?").bind(pageSize * (page - 1), pageSize);
    const extensions = (await extensionsRequest.all<object>()).results.map(e => {
        return {
            ...e,
            preview: e["preview"] == 1
        }
    }) as object[];

    return new Response(JSON.stringify(extensions), {
        headers: {
            "content-type": "application/json",
            "Cache-Control": "max-age=86400, immutable"
        }
    });
});