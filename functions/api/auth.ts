import axios from "axios";
import { Token, TokenFactory } from "../lib/token";

declare const env: {[index: string]: any};

export async function onRequestGet(request: Request): Promise<Response> {
    let json: unknown = await request.json();

    if (typeof json !== "object") return new Response("Body must be JSON object.", { status: 400 });
    if (!("code" in json)) return new Response("You need to provide a code.", { status: 400 });
    if (typeof json["code"] !== "string") return new Response("Code must be a JSON string.", { status: 400 });

    let response = await axios.post("https://student.sbhs.net.au/api/token", new URLSearchParams({
        code: json["code"],
        grant_type: "authorization_code",
        client_id: env.CLIENT_ID,
        client_secret: env.CLIENT_SECRET,
        //TODO Change this to paragon.au if I get that domain
        redirect_uri: "https://paragon.pages.dev/callback"
    }),
    {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        } 
    });

    let token = TokenFactory.Create(response.data);

    return new Response(JSON.stringify(token), {
        headers: {
            "Content-Type": "application/json"
        }
    });
}