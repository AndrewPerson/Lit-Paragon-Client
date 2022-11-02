import { RequestTracer } from "@cloudflare/workers-honeycomb-logger";
import { create } from "../lib/function";
import { ErrorResponse, SBHSError, UnauthorisedError } from "../lib/error";
import { Token, TokenFactory } from "../lib/token";
import { SBHSEnv } from "../lib/env";

type Responses = {
    name: string,
    response: Response
}[];


const RESOURCES: Map<string, string> = new Map([
    ["dailynews/list.json", "announcements"],
    ["timetable/daytimetable.json", "dailytimetable"],
    ["timetable/timetable.json", "timetable"],
    ["details/userinfo.json", "userinfo"]
]);

async function getResources(token: Token, tracer: RequestTracer) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    RESOURCES.set(`timetable/daytimetable.json?date=${tomorrow.getFullYear()}-${(tomorrow.getMonth() + 1).toString().padStart(2, "0")}-${tomorrow.getDate().toString().padStart(2, "0")}`, "next-dailytimetable");

    const requestInit = {
        headers: { "Authorization": `Bearer ${token.access_token}` }
    };

    let requests = [...RESOURCES.entries()].map(([url, name]) => tracer.fetch(`https://student.sbhs.net.au/api/${url}`, requestInit).then(response => ({
        name: name,
        response: response
    })));

    // Wait for each fetch() to complete.
    let responses = await Promise.all(requests);
    
    if (!responses.every(r => r.response.ok)) {
        for (let { response } of responses) {
            if (response.status >= 500) {
                throw new SBHSError();
            }
    
            if (response.status == 401) {
                throw new UnauthorisedError();
            }
    
            if (response.status >= 400) {
                throw new Error("An error occurred on the Paragon servers.");
            }
    
            throw new Error("An unknown error occurred.");
        }
    }

    return responses;
}

//TODO Add token refreshing. Oops...
export const onRequestGet = create<SBHSEnv>("stream", async ({ env, request, data: { tracer } }) => {
    let token = TokenFactory.Create(JSON.parse(new URL(request.url).searchParams.get("token")));

    if (new Date() > token.termination) {
        tracer.addData({
            token: {
                termination: {
                    terminated: true,
                    date: token.termination
                }
            }
        });

        throw new ErrorResponse("The token is terminated.", 422);
    }

    tracer.addData({
        token: {
            termination: {
                terminated: false
            }
        }
    });

    if (new Date() > token.expiry) {
        token = await TokenFactory.Refresh(token, env.CLIENT_ID, env.CLIENT_SECRET, tracer);
    }
    else {
        tracer.addData({
            token: {
                refresh: {
                    attempted: false
                }
            }
        });
    }

    let responses: Responses;
    let maxRetries = 3;

    while (maxRetries > 0) {
        try {
            responses = await getResources(token, tracer);
            break;
        }
        catch (e) {
            if (e instanceof SBHSError) {
                maxRetries--;
            }
            else if (e instanceof UnauthorisedError) {
                token = await TokenFactory.Refresh(token, env.CLIENT_ID, env.CLIENT_SECRET, tracer);
                maxRetries--;
            }
            else {
                throw new ErrorResponse(e.message, 500);
            }
        }
    }

    // Create a pipe and stream the response bodies out
    // as a JSON array.
    let { readable, writable } = new TransformStream();

    let writer = writable.getWriter();
    await writer.ready;
    writer.write(new TextEncoder().encode(`{"token":${JSON.stringify(token)},"result":{`));

    streamJsonBodies(responses, writer);

    return new Response(readable, {
        headers: {
            "Content-Type": "application/json"
        }
    });
});

async function streamJsonBodies(responses: Responses, writer: WritableStreamDefaultWriter) {
    // We're presuming these bodies are JSON, so we
    // concatenate them into a JSON object. Since we're
    // streaming, we can't use JSON.stringify()

    let encoder = new TextEncoder();

    let writeCount = 0;
    for (let i = 0; i < responses.length; i++) {
        responses[i].response.text().then(async result => {
            writeCount++;

            if (writeCount == responses.length) {
                writer.write(encoder.encode(`"${responses[i].name}":${result}}}`));
                writer.close();
            }
            else {
                writer.write(encoder.encode(`"${responses[i].name}":${result},`));
            }
        });
    }
}
