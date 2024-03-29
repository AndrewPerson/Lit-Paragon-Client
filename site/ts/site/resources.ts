import { parseJSONStream } from "@andrewperson/parse-json-stream";

import { Callbacks, Callback } from "./callback";

import LOGIN_URL from "../login-url";

import { InlineNotification } from "../elements/notification/notification";

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

export class Resources {
    private static _resourceCallbacks: Map<string, Callbacks<any>> = new Map();
    private static _fetchCallbacks = new Callbacks<boolean>();

    private static _fetching: boolean = false;

    static ShowLoginNotification() {
        let content = document.createElement("p");
        content.innerHTML = `You need to <a href="${LOGIN_URL}">login</a> to see the latest information.`

        InlineNotification.ShowNotification(content);
    }

    static ShowResourceNotification() {
        return InlineNotification.ShowNotification("Updating resources...", true);
    }

    static async GetToken(): Promise<Token | null> {
        let cache = await caches.open(RESOURCE_CACHE);
        let tokenResponse = await cache.match("Token");

        if (!tokenResponse) {
            location.href = `${location.origin}/login`;
            return null;
        }

        let token: Token = await tokenResponse.json();

        if (new Date() > token.termination) {
            this.ShowLoginNotification();
            return null;
        }

        return token;
    }

    static async SetResource(name: string, resource: string) {
        let cache = await caches.open(RESOURCE_CACHE);
        await cache.put(name, new Response(resource));

        this._resourceCallbacks.get(name)?.Invoke(JSON.parse(resource));
    }

    static async GetResource<T>(name: string): Promise<T | undefined> {
        let cache = await caches.open(RESOURCE_CACHE);
        let response = await cache.match(name);

        if (response === undefined) return undefined;
        else {
            let resource = await response.json();
            return resource;
        }
    }

    static async ListenForResource<T>(name: string, callback: Callback<T | undefined>): Promise<void> {
        let callbacks = this._resourceCallbacks.get(name) ?? new Callbacks();

        callbacks.AddListener(callback);
        this._resourceCallbacks.set(name, callbacks);

        callback(await this.GetResource<T>(name));
    }

    static async FetchResources(): Promise<boolean> {
        if (this._fetching) return new Promise(resolve => this._fetchCallbacks.AddListener(resolve));
        this._fetching = true;

        let token = await this.GetToken();
        if (token == null) return false;

        let resourceNotification = this.ShowResourceNotification();

        let serverUrl = new URL(`${SERVER_ENDPOINT}/resources`);
        serverUrl.searchParams.append("token", JSON.stringify(token));

        let resourceResponse: Response;
        try {
            resourceResponse = await fetch(serverUrl.toString());
        }
        catch (e) {
            resourceNotification.Close();
            InlineNotification.ShowNotification("No network connection.");

            this._fetchCallbacks.Invoke(false);
            this._fetching = false;

            return false;
        }

        //TODO Add more granular error handling
        if (!resourceResponse.ok) {
            resourceNotification.Close();

            if (resourceResponse.status == 401 || resourceResponse.status == 422) {
                this.ShowLoginNotification();
            }
            else {
                InlineNotification.ShowNotification(await resourceResponse.text());
            }

            this._fetchCallbacks.Invoke(false);
            this._fetching = false;

            return false;
        }

        let resourceCount = parseInt(resourceResponse.headers.get("X-Resource-Count") ?? "0");
        let receivedResourceCount = 0;

        let parser = parseJSONStream([
            ["result", "*"],
            ["token"]
        ]);

        let finishedPiping = false;
        let objectHandlerCount = 0;

        let objectHandlerPromise = new Promise<void>(resolve => {
            parser.onObject(async (path, object) => {
                objectHandlerCount++;

                if (path[0] == "token") {
                    let cache = await caches.open(RESOURCE_CACHE);

                    await cache.put("Token", new Response(object));
                }
                else {
                    await this.SetResource(path[1], object);
                    receivedResourceCount++;

                    resourceNotification.percentage = resourceCount == 0 ? 1 : receivedResourceCount / resourceCount;
                }

                objectHandlerCount--;

                if (objectHandlerCount == 0 && finishedPiping) resolve();
            });
        });

        const decoder = new TextDecoder();
        let totalStream = "";
        await resourceResponse.body?.pipeTo(new WritableStream({
            write(chunk) {
                totalStream += decoder.decode(chunk);
                parser.write(chunk);
            }
        }));

        parser.finish();

        finishedPiping = true;

        if (!(objectHandlerCount == 0 && finishedPiping)) await objectHandlerPromise;

        resourceNotification.Close();

        let fullJSON = JSON.parse(totalStream);

        if ("error" in fullJSON) {
            if (fullJSON["error"] == 401) {
                this.ShowLoginNotification();
            }
            else if (fullJSON["error"] == 500) {
                InlineNotification.ShowNotification("An error occurred on the Paragon servers.");
            }
            else if (fullJSON["error"] == 502) {
                InlineNotification.ShowNotification("An error occurred on the SBHS servers.");
            }
            else {
                InlineNotification.ShowNotification("An unknown error occurred.");
            }

            this._fetchCallbacks.Invoke(false);
            this._fetching = false;

            return false;
        }

        this._fetchCallbacks.Invoke(true);
        this._fetching = false;

        return true;
    }
}