class ServiceWorker {
    middleware() {
        return async (ctx, next) => {
            if (ctx.request.method == "GET" && ctx.request.url == "/dist/service-worker/service-worker.js") {
                ctx.set("service-worker-allowed", "/");
            }

            await next();
        }
    }
}

export default ServiceWorker