import { PluginData } from "@cloudflare/pages-plugin-honeycomb";

export function create<Env>(func: PagesFunction<Env, any, PluginData>): PagesFunction<Env, any, PluginData> {
    return async (context) => {
        context.data.honeycomb.tracer.addRequest(context.request);

        try {
            let result = await func(context);
            context.data.honeycomb.tracer.addResponse(result);
            context.data.honeycomb.tracer.addData({ error: !result.ok });

            return result;
        }
        catch (error) {
            if (error instanceof Error) {
                let result = new Response(JSON.stringify({ error: error.message }), {
                    status: 500,
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                context.data.honeycomb.tracer.addResponse(result);
                context.data.honeycomb.tracer.addData({ error: true });

                return result;
            }
            else {
                let result = new Response("An error occured", {
                    status: 500
                });

                context.data.honeycomb.tracer.addResponse(result);
                context.data.honeycomb.tracer.addData({ error: true });

                return result;
            }
        }
    }
}