import { create } from "../../lib/function";

export const onRequestPost = create(async (context) => {
    //Workaround until I work out how to connect to the database from Cloudflare Workers
    return await fetch("https://au-syd.functions.appdomain.cloud/api/v1/web/6bbc35c7-dc9e-4df5-9708-71beb3b96f36/default/error", {
        method: "POST",
        body: context.request.body
    });
});