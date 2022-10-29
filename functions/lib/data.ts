import { RequestTracer } from "@cloudflare/workers-honeycomb-logger";

export type Data = {
    tracer: RequestTracer
}