import { RequestTracer } from "@cloudflare/workers-honeycomb-logger";

function isObject(item: any) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

function mergeDeep(target: any, ...sources: any[]) {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} });
                mergeDeep(target[key], source[key]);
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }

    return mergeDeep(target, ...sources);
}

export class Tracer extends RequestTracer {
    addData(data: object) {
        mergeDeep(this.data, data);
    }

    async sendEvents(excludeSpans?: string[]): Promise<void> {
        console.log(this.data);
        super.sendEvents(excludeSpans);
    }
}