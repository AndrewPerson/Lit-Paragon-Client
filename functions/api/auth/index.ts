import { create } from "../../lib/function";
import { TokenFactory } from "../../lib/token";
import { SBHSEnv } from "../../lib/env";

export const onRequestPost = create<SBHSEnv>(async ({ env, request, data: { honeycomb: { tracer } } }) => {
    tracer.start();

    let json: unknown = await request.json();

    if (typeof json !== "object") return new Response("Body must be JSON object.", { status: 400 });
    if (!("code" in json)) return new Response("You need to provide a code.", { status: 400 });
    if (typeof json["code"] !== "string") return new Response("Code must be a JSON string.", { status: 400 });

    let response = await tracer.fetch("https://student.sbhs.net.au/api/token", {
        method: "POST",
        body: new URLSearchParams({
            code: json["code"],
            grant_type: "authorization_code",
            client_id: env.CLIENT_ID,
            client_secret: env.CLIENT_SECRET,
            //TODO Change this to paragon.au if I get that domain
            redirect_uri: "https://paragon.pages.dev/callback"
        })
    });

    let token = TokenFactory.Create(await response.json());

    return new Response(JSON.stringify(token), {
        headers: {
            "Content-Type": "application/json"
        }
    });
});