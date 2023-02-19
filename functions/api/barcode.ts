import { encodeDigitsToCode128Svg } from "../lib/code128";

import { create } from "../lib/function";
import { SBHSEnv } from "../lib/env";

export const onRequestGet = create<SBHSEnv>("barcode", true, async ({ request }) => {
    const studentID = new URL(request.url).searchParams.get("studentID");

    if (studentID == "") {
        return new Response("Missing studentID parameter.", {
            status: 400
        });
    }

    return new Response(encodeDigitsToCode128Svg(studentID), {
        headers: {
            "Content-Type": "image/svg+xml",
            "X-Paragon-Cache": "etag"
        }
    });
});