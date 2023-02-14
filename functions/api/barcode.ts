import { Canvas } from "canvas";
import JsBarcode = require("jsbarcode");

import { create } from "../lib/function";
import { SBHSEnv } from "../lib/env";

export const onRequestGet = create<SBHSEnv>("barcode", true, async ({ request }) => {
    const studentID = new URLSearchParams(request.url).get("studentID");

    if (studentID == "") {
        return new Response("Missing studentID parameter.", {
            status: 400
        });
    }

    const canvas = new Canvas(200, 100);

    JsBarcode(canvas, studentID, {
        format: "CODE128",
        displayValue: false,
        margin: 0
    });

    return new Response(canvas.toBuffer(), {
        headers: {
            "Content-Type": "image/png"
        }
    });
});