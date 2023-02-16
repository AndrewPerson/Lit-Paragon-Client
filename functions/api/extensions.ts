import { connect } from "@planetscale/database";

import { create } from "../lib/function";
import { SBHSEnv } from "../lib/env";

export const onRequestPost = create<SBHSEnv>("extensions", true, async ({ env, request, data: { tracer } }) => {
    const searchParams = new URL(request.url).searchParams;

    const pageSize = parseInt(searchParams.get("page_size") ?? "0");
    const page = parseInt(searchParams.get("page") ?? "0");
    
    const connection = connect({
        host: env.PLANETSCALE_HOST,
        username: env.PLANETSCALE_USERNAME,
        password: env.PLANETSCALE_PASSWORD,
        fetch: tracer.fetch.bind(tracer)
    });

    //env comes from a trusted source so it should be okay to inject its values directly. (If someone manages to compromise the env, they could do whatever they want already.)
    const result = await connection.execute(`SELECT * FROM \`${env.PLANETSCALE_EXTENSIONS_TABLE}\` LIMIT (?,?)`, [
        pageSize * page,
        pageSize
    ]);

    if (result.rowsAffected != 1) {
        return new Response("Failed to report error.", { status: 500 });
    }

    return new Response("Reported error successfully.");
});