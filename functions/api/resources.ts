import axios from "axios";
import { Token, TokenFactory } from "../lib/token";
import { SBHSEnv } from "../lib/env";

const RESOURCES: Map<string, string> = new Map([
    ["dailynews/list.json", "announcements"],
    ["timetable/daytimetable.json", "dailytimetable"],
    ["timetable/timetable.json", "timetable"],
    ["details/userinfo.json", "userinfo"]
]);

async function getResource(resource: string, token: Token) {
    let response = await axios.get(`https://student.sbhs.net.au/api/${resource}`, {
        headers: {
            "Authorization": `Bearer ${token.access_token}`
        }
    });

    return response.data;
}

export const onRequestGet: PagesFunction<SBHSEnv> = async (context) => {
    const {
        env,
        request
    } = context;

    let json: unknown = await request.json();

    if (typeof json !== "object") return new Response("Body must be JSON object.", { status: 400 });
    if (!("token" in json)) return new Response("You must provide a token.", { status: 200 });
    if (typeof json["token"] !== "string") return new Response("Token must be a JSON string.", { status: 400 });

    let token = JSON.parse(json["token"]);

    console.log(`Token iteration: ${token.iteration}`);
    console.log(`Previous token: ${JSON.stringify(token.previousToken)}`);

    if (new Date() > token.termination)
        return new Response("The token is terminated.", { status: 422 });

    if (new Date() > token.expiry)
        token = await TokenFactory.Refresh(token, env.CLIENT_ID, env.CLIENT_SECRET);

    let result: {
        result: {[index: string]: any},
        token: Token
    } = {
        result: {},
        token: token
    };

    let promises = [];

    for (let [url, name] of RESOURCES.entries()) {
        promises.push(getResource(url, token).then(resourceResponse => {
            result.result[name] = resourceResponse;
        }));
    }

    let now = new Date();

    let year = (now.getFullYear()).toString();

    let month: string;
    if (now.getMonth() + 1 < 10) month = `0${now.getMonth() + 1}`;
    else month = (now.getMonth() + 1).toString();

    let day: string;
    if (now.getDate() + 1 < 10) day = `0${now.getDate() + 1}`;
    else day = (now.getDate() + 1).toString();

    promises.push(getResource(`timetable/daytimetable.json?date=${year}-${month}-${day}`, token).then(resourceResponse => {
        result.result["next-dailytimetable"] = resourceResponse;
    }));

    await Promise.all(promises);

    return new Response(JSON.stringify(result), {
        headers: {
            "Content-Type": "application/json"
        }
    });
}