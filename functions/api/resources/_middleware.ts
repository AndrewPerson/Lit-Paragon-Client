import honeycombPlugin from "@cloudflare/pages-plugin-honeycomb";

export const onRequest: PagesFunction = (context) => {
    return honeycombPlugin({
        dataset: "resources",
        //@ts-ignore
        apiKey: context.env.HONEYCOMB_API_KEY,
        serviceName: "paragon"
    })(context);
}
