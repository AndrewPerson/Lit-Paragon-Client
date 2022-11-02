import { create } from "../lib/function";
import { ErrorResponse } from "../lib/error";
import { TokenFactory } from "../lib/token";
import { SBHSEnv } from "../lib/env";

const RESOURCES: Map<string, string> = new Map([
    ["dailynews/list.json", "announcements"],
    ["timetable/daytimetable.json", "dailytimetable"],
    ["timetable/timetable.json", "timetable"],
    ["details/userinfo.json", "userinfo"]
]);

//TODO Add token refreshing. Oops...
export const onRequestGet = create<SBHSEnv>("stream", async ({ env, request, data: { tracer } }) => {
    let token = TokenFactory.Create(JSON.parse(new URL(request.url).searchParams.get("token")));

    const requestInit = {
        headers: { "Authorization": `Bearer ${token.access_token}` }
    };

    let requests = [...RESOURCES.entries()].map(([url, name]) => tracer.fetch(`https://student.sbhs.net.au/api/${url}`, requestInit).then(response => ({
        name: name,
        response: response
    })));

    // Wait for each fetch() to complete.
    let responses = await Promise.all(requests)

    // Make sure every subrequest succeeded.
    if (!responses.every(r => r.response.ok)) {
        for (let { response } of responses) {
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
    }

    // Create a pipe and stream the response bodies out
    // as a JSON array.
    let { readable, writable } = new TransformStream();

    writable.getWriter().write(new TextEncoder().encode(`{"token":${JSON.stringify(token)},"data":{`));

    streamJsonBodies(responses, writable);

    return new Response(readable, {
        headers: {
            "Content-Type": "application/json"
        }
    });
});

async function streamJsonBodies(responses: { name: string, response: Response }[], writable: WritableStream) {
    // We're presuming these bodies are JSON, so we
    // concatenate them into a JSON array. Since we're
    // streaming, we can't use JSON.stringify()

    let writer = writable.getWriter()
    let encoder = new TextEncoder()

    for (let i = 0; i < responses.length; i++) {
        if (i > 0) {
            await writer.write(",");
        }

        await writer.write(`"${responses[i].name}":`)

        writer.releaseLock();
        await responses[i].response.body.pipeTo(writable, { preventClose: true });

        writer = writable.getWriter();
    }

    await writer.write(encoder.encode("}}"));

    await writer.close();
}
