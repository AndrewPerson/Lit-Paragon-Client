import { DOMImplementation, XMLSerializer } from "@xmldom/xmldom";
import JsBarcode from "jsbarcode";

import { create } from "../lib/function";
import { SBHSEnv } from "../lib/env";

export const onRequestGet = create<SBHSEnv>("barcode", true, async ({ request }) => {
    const studentID = new URL(request.url).searchParams.get("studentID");

    if (studentID == "") {
        return new Response("Missing studentID parameter.", {
            status: 400
        });
    }

    const xmlSerializer = new XMLSerializer();
    const document = new DOMImplementation().createDocument('http://www.w3.org/1999/xhtml', 'html', null);
    const svgNode = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

    JsBarcode(svgNode, studentID, {
        xmlDocument: document,
        displayValue: false,
        margin: 0
    });

    svgNode.removeAttribute("x");
    svgNode.removeAttribute("y");
    svgNode.removeAttribute("transform");
    svgNode.setAttribute("preserveAspectRatio", "none");

    return new Response(xmlSerializer.serializeToString(svgNode), {
        headers: {
            "Content-Type": "image/svg+xml",
            "X-Paragon-Cache": "etag"
        }
    });
});