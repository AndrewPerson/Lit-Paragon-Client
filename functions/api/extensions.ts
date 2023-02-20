import { connect, ExecutedQuery } from "@planetscale/database";

import { create } from "../lib/function";
import { SBHSEnv } from "../lib/env";

export const onRequestGet = create<SBHSEnv>("extensions", true, async ({ env, request, data: { tracer } }) => {
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
    const result: ExecutedQuery = await connection.execute(`SELECT * FROM \`${env.PLANETSCALE_EXTENSIONS_TABLE}\` ORDER BY \`name\` LIMIT ?,?`, [
        pageSize * (page - 1),
        pageSize
    ]);

    //Convert the preview column from a number (the way MySQL internally stores boolean) to an actual boolean.
    const rows = result.rows.map(r => {
        r["preview"] = r["preview"] == 1
        return rows;
    });

    return new Response(JSON.stringify(rows), {
        headers: {
            "content-type": "application/json"
        }
    });
});