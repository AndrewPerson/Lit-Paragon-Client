import { create } from "../../lib/function";
import { ErrorResponse } from "../../lib/error";
import { SBHSEnv } from "../../lib/env";

export const onRequestGet = create<SBHSEnv>(async ({ env, request }) => {
    throw new ErrorResponse("Fail", 500);
});