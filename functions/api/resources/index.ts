import { create } from "../../lib/function";
import { Token, TokenFactory } from "../../lib/token";
import { SBHSEnv } from "../../lib/env";
import { RequestTracer } from "@cloudflare/workers-honeycomb-logger";

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

    return await response.json();
}

export const onRequestGet = create<SBHSEnv>(async ({ env, request, data: { honeycomb: { tracer } } }) => {
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

        return new Response("The token is terminated.", { status: 422 });
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

    let result: {
        result: {[index: string]: any},
        token: Token
    } = {
        result: {},
        token: token
    };

    let promises = [];

    for (let [url, name] of RESOURCES.entries()) {
        promises.push(getResource(url, token, tracer).then(resourceResponse => {
            result.result[name] = resourceResponse;
        }));
    }

    let now = new Date();

    let month = (now.getMonth() + 1).toString().padStart(2, "0");
    let day = (now.getDate() + 1).toString().padStart(2, "0");

    promises.push(getResource(`timetable/daytimetable.json?date=${now.getFullYear()}-${month}-${day}`, token, tracer).then(resourceResponse => {
        result.result["next-dailytimetable"] = resourceResponse;
    }));

    await Promise.all(promises);

    return new Response(JSON.stringify(result), {
        headers: {
            "Content-Type": "application/json"
        }
    });
});