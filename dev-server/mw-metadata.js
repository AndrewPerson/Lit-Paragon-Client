class Metadata {
    middleware() {
        return async (ctx, next) => {
            if (ctx.request.method == "GET" && ctx.request.url == "/metadata") {
                ctx.set("Content-Type", "application/json");
            }

            await next();
        }
    }
}

export default Metadata