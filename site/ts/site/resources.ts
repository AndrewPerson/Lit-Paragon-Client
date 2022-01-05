import { Site } from "./site";

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

export class Resources {
    private static _resourceCallbacks: Map<string, Callbacks<any>> = new Map();

    static ShowLoginNotification() {
        let content = document.createElement("p");
        content.innerHTML = `You need to <a>login</a> to see the latest information.`

        Site.ShowNotification(content);
    }

    static async GetToken(): Promise<{valid: boolean, token: Token | null}> {
        let cache = await caches.open(RESOURCE_CACHE);
        let tokenResponse = await cache.match("Token");

        if (!tokenResponse) {
            location.href = `${location.origin}/login`;
            return {
                valid: false,
                token: null
            };
        }

        let token: Token = await tokenResponse.json();

        if (new Date() > token.termination) {
            this.ShowLoginNotification();
            return {
                valid: false,
                token: null
            };
        }

        return {
            valid: true,
            token: token
        };
    }

    static async SetResources(resources: {name: string, resource: string}[]) {
        let cache = await caches.open(RESOURCE_CACHE);

        let promises: Promise<void>[] = [];

        resources.forEach(resourceGroup => {
            let name = resourceGroup.name;
            let resource = resourceGroup.resource;

            promises.push(cache.put(name, new Response(resource))
                               .then(() => this._resourceCallbacks.get(name)?.Invoke(JSON.parse(resource))));
        });

        await Promise.all(promises);
    }

    static async SetResource(name: string, resource: string) {
        let cache = await caches.open(RESOURCE_CACHE);
        await cache.put(name, new Response(resource));

        this._resourceCallbacks.get(name)?.Invoke(JSON.parse(resource));
    }

    static async GetResourceNow(name: string) {
        let cache = await caches.open(RESOURCE_CACHE);
        let response = await cache.match(name);

        if (response) {
            let resource = await response.json();
            return resource;
        }
        else return undefined;
    }

    static async GetResource(name: string, callback: Callback<any>): Promise<void> {
        let callbacks = this._resourceCallbacks.get(name);

        if (callbacks !== undefined) {
            callbacks.AddListener(callback);
            this._resourceCallbacks.set(name, callbacks);
        }

        callback(await this.GetResourceNow(name));
    }

    static async FetchResources(): Promise<boolean> {
        let { valid, token } = await this.GetToken();

        if (!valid) return false;

        let serverUrl = new URL(SERVER_ENDPOINT + "/resources");
        serverUrl.searchParams.append("token", JSON.stringify(token));

        let resourceResponse = await fetch(serverUrl.toString());

        //TODO Add more granular error handling
        if (!resourceResponse.ok) {
            this.ShowLoginNotification();
            return false;
        }

        let resourceResult: ResourceResult = await resourceResponse.json();

        let cache = await caches.open(RESOURCE_CACHE);
        
        await cache.put("Token", new Response(JSON.stringify(resourceResult.token)));

        await this.SetResources(Object.keys(resourceResult.result).map(key => {
            return {
                name: key,
                resource: JSON.stringify(resourceResult.result[key])
            };
        }));

        return true;
    }
}