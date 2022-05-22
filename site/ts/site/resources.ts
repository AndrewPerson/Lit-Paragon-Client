import { Site } from "./site";

import { Callbacks, Callback } from "./callback";

import LOGIN_URL from "../login-url";

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
    private static _fetchCallbacks: Callbacks<boolean> = new Callbacks();

    private static _fetching: boolean = false;

    static ShowLoginNotification() {
        let content = document.createElement("p");
        content.innerHTML = `You need to <a href="${LOGIN_URL}">login</a> to see the latest information.`

        Site.ShowNotification(content);
    }

    static ShowResourceNotification() {
        return Site.ShowNotification("Updating resources...", true);
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

    static async SetResources(resources: {name: string, resource: string}[]) {
        let cache = await caches.open(RESOURCE_CACHE);

        let promises = resources.map(resourceGroup => {
            let name = resourceGroup.name;
            let resource = resourceGroup.resource;

            return cache.put(name, new Response(resource))
                        .then(() => this._resourceCallbacks.get(name)?.Invoke(JSON.parse(resource)));
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
        let callbacks = this._resourceCallbacks.get(name) ?? new Callbacks();

        callbacks.AddListener(callback);
        this._resourceCallbacks.set(name, callbacks);

        callback(await this.GetResourceNow(name));
    }

    static async FetchResources(): Promise<boolean> {
        if (this._fetching) return new Promise(resolve => this._fetchCallbacks.AddListener(resolve));
        this._fetching = true;

        let token = await this.GetToken();
        if (token === null) return false;

        let resourceNotification = this.ShowResourceNotification();

        let serverUrl = new URL(`${SERVER_ENDPOINT}/resources`);
        serverUrl.searchParams.append("token", JSON.stringify(token));

        let resourceResponse: Response | null = null;
        try {
            resourceResponse = await fetch(serverUrl.toString());
        }
        catch (e) {
            resourceResponse = null
        }

        //TODO Add more granular error handling
        if (resourceResponse === null || !resourceResponse.ok) {
            resourceNotification.Close();
            
            //Because when the response is null, it represents a network error
            if (resourceResponse !== null) this.ShowLoginNotification();

            this._fetchCallbacks.Invoke(false);
            this._fetching = false;

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

        resourceNotification.Close();

        this._fetchCallbacks.Invoke(true);
        this._fetching = false;

        return true;
    }
}