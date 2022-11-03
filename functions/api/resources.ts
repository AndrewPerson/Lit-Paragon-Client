import { RequestTracer } from "@cloudflare/workers-honeycomb-logger";
import { create } from "../lib/function";
import { ErrorResponse, SBHSError, UnauthorisedError } from "../lib/error";
import { Token, TokenFactory } from "../lib/token";
import { SBHSEnv } from "../lib/env";

export const onRequestGet = create<SBHSEnv>("resources", async ({ env, request, data: { tracer } }) => {
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

    const { readable, writable } = new TransformStream();

    const writer = writable.getWriter();

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const RESOURCES: [string, string][] = [
        ["dailynews/list.json", "announcements"],
        ["timetable/daytimetable.json", "dailytimetable"],
        [`timetable/daytimetable.json?date=${tomorrow.getFullYear()}-${(tomorrow.getMonth() + 1).toString().padStart(2, "0")}-${tomorrow.getDate().toString().padStart(2, "0")}`, "next-dailytimetable"],
        ["timetable/timetable.json", "timetable"],
        ["details/userinfo.json", "userinfo"]
    ];

    await writer.ready;

    writer.write(new TextEncoder().encode(`{"result":{`));

    streamResources(token, env.CLIENT_ID, env.CLIENT_SECRET, RESOURCES, writer, tracer);

    return new Response(readable, {
        headers: {
            "Content-Type": "application/json",
            "X-Resource-Count": RESOURCES.length.toString()
        }
    });
});

async function streamResources(token: Token, clientId: string, clientSecret: string, resources: [string, string][], writer: WritableStreamDefaultWriter, tracer: RequestTracer, maxRetries = 3, resourcesAlreadyWritten = false) {
    const encoder = new TextEncoder();

    let receivedResourceCount = 0;
    let writtenResourceCount = 0;
    let failedResources: [string, string, number][] = [];
    let refreshToken = false;

    let responsesReceivedResolve: (value: void | PromiseLike<void>) => void;
    let responsesReceived = new Promise<void>(resolve => responsesReceivedResolve = resolve);

    for (const resource of resources) {
        //setTimeout is debug code. TODO Remove when done.
        setTimeout(async () => {
            tracer.fetch(`https://student.sbhs.net.au/api/${resource[0]}`, {
                headers: {
                    "Authorization": `Bearer ${token.access_token}`
                }
            }).then(async response => {
                receivedResourceCount++;

                if (response.ok) {
                    writtenResourceCount++;

                    if (writtenResourceCount == 1 && !resourcesAlreadyWritten) {
                        resourcesAlreadyWritten = true;
                        await writer.write(encoder.encode(`"${resource[1]}":${await response.text()}`));
                    }
                    else if (writtenResourceCount == resources.length) {
                        await writer.write(encoder.encode(`,"${resource[1]}":${await response.text()}}`));
                    }
                    else {
                        await writer.write(encoder.encode(`,"${resource[1]}":${await response.text()}`));
                    }
                }
                else {
                    failedResources.push([...resource, response.status]);

                    if (response.status == 401) {
                        refreshToken = true;
                    }
                }

                if (receivedResourceCount == resources.length) {
                    responsesReceivedResolve();
                }
            });
        }, Math.random() * 10000);
    }

    await responsesReceived;

    if (failedResources.length > 0) {
        if (maxRetries > 0) {
            if (refreshToken) {
                token = await TokenFactory.Refresh(token, clientId, clientSecret, tracer);
            }

            await streamResources(token, clientId, clientSecret, failedResources.map(x => [x[0], x[1]]), writer, tracer, maxRetries - 1, resourcesAlreadyWritten);
        }
        else {
            let unauthorised = false;
            let sbhsError = false;
            let serverError = false;
            let unknownError = false;

            for (const resource of failedResources) {
                if (resource[2] == 401) {
                    unauthorised = true;
                }

                if (resource[2] >= 500 && resource[2] < 600) {
                    sbhsError = true;
                }

                if (resource[2] >= 400 && resource[2] < 500) {
                    serverError = true;
                }

                if (resource[2] < 400 || resource[2] >= 600) {
                    unknownError = true;
                }
            }

            if (unauthorised) {
                await writer.write(encoder.encode(`},"error":401`));
            }
            else if (sbhsError) {
                await writer.write(encoder.encode(`},"error":502`));
            }
            else if (serverError) {
                await writer.write(encoder.encode(`},"error":500`));
            }
            else if (unknownError) {
                await writer.write(encoder.encode(`},"error":500`));
            }
            else {
                await writer.write(encoder.encode(`},"error":500`));
            }

            await writer.write(encoder.encode(`,"token":${JSON.stringify(token)}}`));
            await writer.close();
        }
    }
    else {
        await writer.write(encoder.encode(`,"token":${JSON.stringify(token)}}`));
        await writer.close();
    }
}
