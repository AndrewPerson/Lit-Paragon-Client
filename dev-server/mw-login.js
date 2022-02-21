class Login {
    middleware() {
        return async (ctx, next) => {
            if (ctx.request.method == "GET" && ctx.request.url == "/login") {
                ctx.set("Location", "/callback");
                ctx.status = 302;
            }

            await next();
        }
    }
}

export default Login