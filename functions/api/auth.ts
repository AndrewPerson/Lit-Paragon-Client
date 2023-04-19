import { create } from "../lib/function";
import { ErrorResponse } from "../lib/error";
import { TokenFactory } from "../lib/token";
import { SBHSEnv } from "../lib/env";

export const onRequestPost = create<SBHSEnv>("auth", true, async ({ env, request, data: { tracer } }) => {
    const json: unknown = await request.json();

    if (typeof json !== "object" || json == null) return new Response("Body must be JSON object.", { status: 400 });
    if (!("code" in json)) return new Response("You need to provide a code.", { status: 400 });
    if (typeof json["code"] !== "string") return new Response("Code must be a JSON string.", { status: 400 });

    const endpoint = env.SBHS_ENDPOINT ?? "https://student.sbhs.net.au";

    const response = await tracer.fetch(`${endpoint}/api/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
            code: json["code"],
            grant_type: "authorization_code",
            client_id: env.CLIENT_ID,
            client_secret: env.CLIENT_SECRET,
            redirect_uri: env.REDIRECT_URI
        })
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

    return new Response(JSON.stringify(TokenFactory.Create(await response.json())), {
        headers: {
            "Content-Type": "application/json"
        }
    });
});