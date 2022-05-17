import { create } from "../lib/function";

export const onRequestGet = create(async (context) => {
    const {
        request
    } = context;

    return await fetch(`https://student.sbhs.net.au/api/${new URL(request.url).searchParams.get("resource")}`, {
        headers: {
            "Authorization": request.headers.get("Authorization")
        }
    });
});