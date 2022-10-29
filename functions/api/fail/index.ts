import { create } from "../../lib/function";
import { ErrorResponse } from "../../lib/error";
import { SBHSEnv } from "../../lib/env";

export const onRequestGet = /*create<SBHSEnv>(async ({ env, request }) => {
    throw new ErrorResponse("Fail", 500);
});*/
(context) => {
    context.data.honeycomb.tracer.addRequest(context.request);

    let result = new Response("Fail", {
        status: 500
    });

    context.data.honeycomb.tracer.addResponse(result);
    context.data.honeycomb.tracer.addData({ error: true });

    return result;
}