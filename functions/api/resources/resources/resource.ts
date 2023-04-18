import { RequestTracer } from "@cloudflare/workers-honeycomb-logger";
import { Banditype } from "banditypes";

export abstract class Resource<OriginalT, TransformedT> {
    public abstract readonly name: string;
    public abstract readonly path: string;
    public abstract readonly validator: Banditype<OriginalT>;

    public async get(endpoint: string, token: string, tracer: RequestTracer): Promise<[TransformedT | null, number]> {
        const response = await tracer.fetch(`${endpoint}/api/${this.path}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) return [null, response.status];

        const json = await response.json();

        try {
            return [this.transform(this.validator(json)), response.status];
        }
        catch (e) {
            console.error(e);

            if (e instanceof Error) {
                console.error(e.message);
                console.error(e.stack);
            }

            return [null, response.status];
        }
    }

    public abstract transform(original: OriginalT): TransformedT;
}