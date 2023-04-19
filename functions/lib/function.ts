import { resolve } from "@cloudflare/workers-honeycomb-logger";
import { Tracer } from "./tracer";
import { ErrorResponse } from "./error";
import { Data } from "./data";

export function create<Env extends { HONEYCOMB_API_KEY: string }>(honeycombDataset: string, autoTrace: boolean, func: PagesFunction<Env, any, Data>): PagesFunction<Env, any, Data> {
    return async (context) => {
        const tracer = new Tracer(context.request, resolve({
            dataset: honeycombDataset,
            apiKey: context.env.HONEYCOMB_API_KEY,
            serviceName: "paragon"
        }));

        tracer.start();

        context.data.tracer = tracer;

        try {
            const result = await func(context);

            if (autoTrace) {
                tracer.finishResponse(result);
                tracer.addData({ error: !result.ok });

                tracer.sendEvents();
            }

            return result;
        }
        catch (error) {
            console.log(error);

            if (error instanceof ErrorResponse) {
                const result = new Response(error.body, {
                    status: error.statusCode,
                    headers: error.headers
                });

                console.log(error.message);
                console.log(error.stack);
                console.log(error.body);

                tracer.finishResponse(result);
                tracer.addData({ error: true });

                tracer.sendEvents();

                return result;
            }
            else if (error instanceof Error) {
                const result = new Response(error.message, {
                    status: 500
                });

                console.log(error.message);
                console.log(error.stack);

                tracer.finishResponse(result);
                tracer.addData({ error: true });

                tracer.sendEvents();

                return result;
            }
            else {
                const result = new Response("An unknown error occurred.", {
                    status: 500
                });

                tracer.finishResponse(result);
                tracer.addData({ error: true });

                tracer.sendEvents();

                return result;
            }
        }
    }
}