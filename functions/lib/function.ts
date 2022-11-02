import { resolve } from "@cloudflare/workers-honeycomb-logger";
import { Tracer } from "./tracer";
import { ErrorResponse } from "./error";
import { Data } from "./data";

export function create<Env>(honeycombDataset: string, func: PagesFunction<Env, any, Data>): PagesFunction<Env, any, Data> {
    return async (context) => {
        const tracer = new Tracer(context.request, resolve({
            dataset: honeycombDataset,
            //@ts-ignore
            apiKey: context.env.HONEYCOMB_API_KEY,
            serviceName: "paragon"
        }));

        context.data.tracer = tracer;

        try {
            let result = await func(context);
            tracer.addResponse(result);
            tracer.addData({ error: !result.ok });

            tracer.sendEvents();

            return result;
        }
        catch (error) {
            if (error instanceof ErrorResponse) {
                let result = new Response(error.body, {
                    status: error.statusCode,
                    headers: error.headers
                });

                tracer.addResponse(result);
                tracer.addData({ error: true });

                tracer.sendEvents();

                return result;
            }
            else if (error instanceof Error) {
                let result = new Response(JSON.stringify({ error: error.message }), {
                    status: 500,
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                tracer.addResponse(result);
                tracer.addData({ error: true });

                tracer.sendEvents();

                return result;
            }
            else {
                let result = new Response("An unknown error occurred.", {
                    status: 500
                });

                tracer.addResponse(result);
                tracer.addData({ error: true });

                tracer.sendEvents();

                return result;
            }
        }
    }
}