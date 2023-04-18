import { RequestTracer } from "@cloudflare/workers-honeycomb-logger";
import { Struct, validate } from "superstruct";

export abstract class Resource<OriginalT, TransformedT> {
    public abstract readonly name: string;
    public abstract readonly path: string;
    public abstract readonly struct: Struct<OriginalT>;

    public async get(endpoint: string, token: string, tracer: RequestTracer): Promise<[TransformedT | null, number]> {
        const response = await tracer.fetch(`${endpoint}/api/${this.path}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) return [null, response.status];

        const json = await response.json();

        const [err, value] = validate(json, this.struct, { coerce: true });

        console.log(err?.failures());

        if (err === undefined) return [this.transform(value), response.status];
        else return [null, response.status];
    }

    public abstract transform(original: OriginalT): TransformedT;
}