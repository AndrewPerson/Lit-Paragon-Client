import type { PluginData } from "@cloudflare/pages-plugin-honeycomb";

export const onRequest: PagesFunction<unknown, any, PluginData> = async ({
    data,
    request
}) => {
    data.honeycomb.tracer.addData({ message: "Hi!" });
    return new Response((data.honeycomb !== null && data.honeycomb !== undefined) ? "Honeycomb working" : "Honeycomb not working");
};
  