import { RequestTracer } from "@cloudflare/workers-honeycomb-logger";
import { create } from "../../lib/function";
import { ErrorResponse } from "../../lib/error";
import { Token, TokenFactory } from "../../lib/token";
import { SBHSEnv } from "../../lib/env";

import { JsonWriter } from "./json-writer";

import { Resource } from "./resources/resource";
import { DailyTimetableResource } from "./resources/daily-timetable";
import { TimetableResource } from "./resources/timetable";
import { AnnouncementsResource } from "./resources/announcements";

export const onRequestGet = create<SBHSEnv>("resources", false, async ({ env, request, data: { tracer } }) => {
    const endpoint = env.SBHS_ENDPOINT ?? "https://student.sbhs.net.au";
    
    let token = TokenFactory.Create(JSON.parse(new URL(request.url).searchParams.get("token") ?? ""));

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
        token = await TokenFactory.Refresh(token, env.CLIENT_ID, env.CLIENT_SECRET, endpoint, tracer);
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

    const textEncoder = new TextEncoder();

    const { readable, writable } = new TransformStream({
        transform: (chunk, controller) => {
            controller.enqueue(textEncoder.encode(chunk));
        }
    });

    const rawWriter = writable.getWriter();

    // const tomorrow = new Date();
    // tomorrow.setDate(tomorrow.getDate() + 1);

    const resources: Resource<any>[] = [
        new DailyTimetableResource(),
        new TimetableResource(),
        new AnnouncementsResource()
    ];

    // const RESOURCES: [string, string][] = [
    //     ["dailynews/list.json", "announcements"],
    //     ["timetable/daytimetable.json", "dailytimetable"],
    //     // [`timetable/daytimetable.json?date=${tomorrow.getFullYear()}-${(tomorrow.getMonth() + 1).toString().padStart(2, "0")}-${tomorrow.getDate().toString().padStart(2, "0")}`, "next-dailytimetable"],
    //     ["timetable/timetable.json", "timetable"],
    //     ["details/userinfo.json", "userinfo"]
    // ];

    let result = new Response(readable, {
        headers: {
            "Content-Type": "application/json",
            "X-Resource-Count": resources.length.toString()
        }
    });

    await rawWriter.ready;

    const writer = new JsonWriter(rawWriter);

    streamResources(token, endpoint, resources, writer, tracer).then(() => {
        tracer.finishResponse(result);
        tracer.sendEvents();
    });

    return result;
});

async function streamResources(token: Token, endpoint: string, resources: Resource<any>[], writer: JsonWriter, tracer: RequestTracer, maxRetries = 3) {
    await writer.startObject();

    await writer.writeKey("token");
    await writer.writeRaw(JSON.stringify(token));

    await writer.writeKey("result");
    await writer.startObject();

    let failedResources: [Resource<any>, number][] = resources.map(x => [x, 500]);

    while(maxRetries > 0 && failedResources.length > 0) {
        let resourcePromises = [];

        let newFailedResources: [Resource<any>, number][] = [];

        for (const resource of failedResources) {
            resourcePromises.push(
                resource[0].get(endpoint, token.access_token, tracer).then(async result => {
                    if (resource == null) {
                        newFailedResources.push(result);
                    }
                    else {
                        await writer.writeKey(resource[0].name);
                        await writer.writeRaw(JSON.stringify(result[0]));
                    }
                })
            );
        }

        await Promise.all(resourcePromises);

        failedResources = newFailedResources;

        maxRetries--;
    }

    await writer.endObject();

    await writer.writeKey("errors");
    await writer.startObject();

    for (const resource of failedResources) {
        let responseStatus = 500;

        if (resource[1] == 401) responseStatus = 401;
        else if (resource[1] >= 500 && resource[1] < 600) responseStatus = 502;
        else if (resource[1] >= 400 && resource[1] < 500) responseStatus = 500;

        await writer.writeKey(resource[0].name);
        await writer.writeNumber(responseStatus);

        tracer.addData({
            errors: {
                [resource[0].name]: responseStatus
            }
        });
    }

    await writer.endObject();
    await writer.endObject();

    await writer.close();
}
