import honeycombPlugin from "@cloudflare/pages-plugin-honeycomb";

export const onRequest: PagesFunction = (context) => {
    return honeycombPlugin({
        //@ts-ignore
        dataset: context.env.HONEYCOMB_DATASET,
        //@ts-ignore
        apiKey: context.env.HONEYCOMB_API_KEY
    })(context);
}
