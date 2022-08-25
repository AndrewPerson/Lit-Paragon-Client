import honeycombPlugin from "@cloudflare/pages-plugin-honeycomb";

export const onRequest = honeycombPlugin({
    serviceName: "paragon",
    dataset: "test-paragon",
    apiKey: ""
});
