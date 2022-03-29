export function create<Env>(func: PagesFunction<Env>): PagesFunction<Env> {
    return async (context) => {
        try {
            return await func(context);
        }
        catch (error) {
            if (error instanceof Error) {
                return new Response(JSON.stringify({ error: error.message }), {
                    status: 500,
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
            }
            else {
                return new Response("An error occured", {
                    status: 500
                });
            }
        }
    }
}