import { parseJSONStream } from "@andrewperson/parse-json-stream";

import { Callbacks, Callback } from "./callback";

declare const RESOURCE_CACHE: string;
declare const SERVER_ENDPOINT: string;

export type ResourceResult = {
    result: {
        [index: string]: any
    },
    token: Token
};

export type Token = {
    access_token: string,
    refresh_token: string,
    expiry: Date,
    termination: Date
};

export enum UpdateFailure {
    NoToken,
    Server,
    SBHS,
    Client,
    InvalidToken,
    Network,
    Unknown
}

export class Resources {
    private static _resourceCallbacks: Map<string, Callbacks<[any]>> = new Map();
    private static _updateResourceReceivedCallbacks = new Callbacks<[number, number]>();
    private static _updateEndCallbacks = new Callbacks<[UpdateFailure | null]>();

    private static _updating: boolean = false;

    static onReceivedResource(callback: Callback<[number, number]>) {
        this._updateResourceReceivedCallbacks.add(callback);
    }

    static onEndUpdatingResources(callback: Callback<[UpdateFailure | null]>) {
        this._updateEndCallbacks.add(callback);
    }

    static async token(): Promise<Token | null> {
        const cache = await caches.open(RESOURCE_CACHE);
        const tokenResponse = await cache.match("Token");

        if (tokenResponse === undefined) return null;

        const token: Token = await tokenResponse.json();

        if (new Date() > token.termination) return null;

        return token;
    }

    static async set(name: string, resource: string) {
        const cache = await caches.open(RESOURCE_CACHE);
        await cache.put(name, new Response(resource));

        this._resourceCallbacks.get(name)?.invoke(JSON.parse(resource));
    }

    static async get<T>(name: string): Promise<T | undefined> {
        const cache = await caches.open(RESOURCE_CACHE);
        const response = await cache.match(name);

        if (response === undefined) return undefined;
        else return await response.json();
    }

    static async onChange<T>(name: string, callback: Callback<[T | undefined]>): Promise<void> {
        let callbacks = this._resourceCallbacks.get(name) ?? new Callbacks();

        callbacks.add(callback);
        this._resourceCallbacks.set(name, callbacks);

        callback(await this.get<T>(name));
    }

    static async update(): Promise<UpdateFailure | null> {
        if (this._updating) {
            let promiseResolve: (value: UpdateFailure | null | PromiseLike<UpdateFailure | null>) => void = null!;
            return new Promise<UpdateFailure | null>(resolve => {
                promiseResolve = resolve;
                this._updateEndCallbacks.add(resolve);
            }).then(result => {
                this._updateEndCallbacks.remove(promiseResolve);
                return result;
            });
        }

        this._updating = true;

        const token = await this.token();
        if (token == null) {
            this._updateEndCallbacks.invoke(UpdateFailure.NoToken);
            this._updating = false;
            return UpdateFailure.NoToken;
        }

        let serverUrl = new URL(`${SERVER_ENDPOINT}/resources`);
        serverUrl.searchParams.append("token", JSON.stringify(token));

        let resourceResponse: Response;
        try {
            resourceResponse = await fetch(serverUrl.toString());
        }
        catch (e) {
            this._updateEndCallbacks.invoke(UpdateFailure.Network);
            this._updating = false;
            return UpdateFailure.Network;
        }

        if (!resourceResponse.ok) {
            const failure = statusCodeToFailure(resourceResponse.status);
            this._updateEndCallbacks.invoke(failure);
            this._updating = false;
            return failure;
        }

        const resourceCount = parseInt(resourceResponse.headers.get("X-Resource-Count") ?? "0");
        let receivedResourceCount = 0;

        this._updateResourceReceivedCallbacks.invoke(receivedResourceCount, resourceCount);

        const parser = parseJSONStream([
            ["result", "*"],
            ["token"],
            ["error"]
        ]);

        let finishedPiping = false;
        let objectHandlerCount = 0;

        let objectHandlerPromiseResolve: (value: UpdateFailure | null | PromiseLike<UpdateFailure | null>) => void = null!;

        const objectHandlerPromise = new Promise<UpdateFailure | null>(resolve => {
            objectHandlerPromiseResolve = resolve;

            parser.onObject(async (path, object) => {
                objectHandlerCount++;

                if (path[0] == "token") {
                    let cache = await caches.open(RESOURCE_CACHE);

                    await cache.put("Token", new Response(object));
                }
                else if (path[0] == "error") {
                    resolve(statusCodeToFailure(parseInt(object)));
                }
                else {
                    await this.set(path[1], object);
                    receivedResourceCount++;

                    this._updateResourceReceivedCallbacks.invoke(receivedResourceCount, resourceCount);
                }

                objectHandlerCount--;

                if (objectHandlerCount == 0 && finishedPiping) resolve(null);
            });
        });

        await resourceResponse.body?.pipeTo(new WritableStream({
            write: parser.write.bind(parser)
        }));

        parser.finish();
        finishedPiping = true;

        // Possible that all processing finished before we finished piping
        if (objectHandlerCount == 0) objectHandlerPromiseResolve(null);

        const failure = await objectHandlerPromise;

        if (failure == null) {
            this._updateEndCallbacks.invoke(null);
            this._updating = false;
            return null;
        }
        else {
            this._updateEndCallbacks.invoke(failure);
            this._updating = false;
            return failure;
        }
    }
}

function statusCodeToFailure(status: number) {
    if (status == 401 || status == 422) {
       return UpdateFailure.InvalidToken;
    }
    else if (status >= 400 && status < 500) {
        return UpdateFailure.Client;
    }
    else if (status == 500) {
        return UpdateFailure.Server;
    }
    else if (status == 502) {
        return UpdateFailure.SBHS;
    }
    else if (status >= 500 && status < 600) {
        return UpdateFailure.Server;
    }
    else {
        return UpdateFailure.Unknown;
    }
}