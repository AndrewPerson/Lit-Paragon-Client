import { RequestTracer } from "@cloudflare/workers-honeycomb-logger";
import { create } from "../lib/function";
import { ErrorResponse } from "../lib/error";
import { Token, TokenFactory } from "../lib/token";
import { SBHSEnv } from "../lib/env";

const RESOURCES: Map<string, string> = new Map([
    ["dailynews/list.json", "announcements"],
    ["timetable/daytimetable.json", "dailytimetable"],
    ["timetable/timetable.json", "timetable"],
    ["details/userinfo.json", "userinfo"]
]);

async function getResource(resource: string, token: Token, tracer: RequestTracer) {
    let response = await tracer.fetch(`https://student.sbhs.net.au/api/${resource}`, {
        headers: {
            "Authorization": `Bearer ${token.access_token}`
        }
    });

    if (!response.ok) {
        if (response.status >= 500) {
            throw new ErrorResponse("An error occurred on the SBHS servers.", 502);
        }

        if (response.status == 401) {
            throw new ErrorResponse("Unauthorised.", 401);
        }

        if (response.status >= 400) {
            throw new ErrorResponse("An error occurred on the Paragon servers.", 500);
        }

        throw new ErrorResponse("An unknown error occurred.", 500);
    }

    return await response.json();
}

export const onRequestGet = create<SBHSEnv>("stream", async ({ env, request, data: { tracer } }) => {
    let token = TokenFactory.Create(JSON.parse(new URL(request.url).searchParams.get("token")));

    const requestInit = {
        headers: { "Authorization": `Bearer ${token.access_token}` }
    };

    const fetches = [
        "https://student.sbhs.net.au/api/dailynews/list.json",
        "https://student.sbhs.net.au/api/timetable/daytimetable.json"
    ].map(url => fetch(url, requestInit))

    // Wait for each fetch() to complete.
    let responses = await Promise.all(fetches)

    // Make sure every subrequest succeeded.
    if (!responses.every(r => r.ok)) {
        return new Response(null, { status: 502 });
    }

    // Create a pipe and stream the response bodies out
    // as a JSON array.
    let { readable, writable } = new TransformStream();
    streamJsonBodies(responses.map(r => r.body), writable);

    return new Response(readable);
});

async function streamJsonBodies(bodies, writable) {
    // We're presuming these bodies are JSON, so we
    // concatenate them into a JSON array. Since we're
    // streaming, we can't use JSON.stringify(), but must
    // instead manually write an initial '[' before the
    // bodies, interpolate ',' between them, and write a
    // terminal ']' after them.

    let writer = writable.getWriter()
    let encoder = new TextEncoder()

    await writer.write(encoder.encode("[\n"))

    for (let i = 0; i < bodies.length; ++i) {
        if (i == 1) {
            await new Promise((resolve, reject) => {
                setTimeout(resolve, 5000, undefined);
            });
        }

        if (i > 0) {
            await writer.write(encoder.encode(",\n"))
        }
        writer.releaseLock();
        await bodies[i].pipeTo(writable, { preventClose: true });
        writer = writable.getWriter();
    }

    await writer.write(encoder.encode("]"))

    await writer.close()
}
