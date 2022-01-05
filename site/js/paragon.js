customElements.define("extension-main", class extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="https://paragon.pages.dev/css/default/elements/${size}.css">
            <slot></slot>
        `;
    }

    static get observedAttributes() { return ["size"]; }
});

var version = undefined;

var resourceCallbacks = new Map();
var tokenCallbacks = [];
var refreshTokenCallbacks = [];

var initialised = false;

export function Init() {
    return new Promise(resolve => {
        if (initialised) resolve();

        window.addEventListener("message", e => {
            let command = e.data.command;
            let data = e.data.data;

            if (command == "Initialise") {

                document.documentElement.classList.toggle("dark", data.dark);
                document.documentElement.style.setProperty("--main-hue", data.hue);
                document.documentElement.style.setProperty("--hue-rotate", `${parseFloat(data.hue) - 200}deg`);
                
                version = data.version;

                if (!initialised) {
                    initialised = true;
                    resolve();
                }

                return;
            }

            if (command == "Resource") {
                var callbacks = resourceCallbacks.get(data.name) ?? [];

                for (var callback of callbacks)
                    callback(data.resource);

                return;
            }

            if (command == "Token") {
                for (var callback of tokenCallbacks)
                    callback(data);

                tokenCallbacks = [];

                return;
            }

            if (command == "Refreshed Token") {
                for (var callback of refreshTokenCallbacks)
                    callback(data);

                refreshTokenCallbacks = [];

                return;
            }

            if (command == "Set Dark") {
                document.documentElement.classList.toggle("dark", data.dark);

                return;
            }

            if (command == "Set Hue") {
                document.documentElement.style.setProperty("--main-hue", data.hue);
                document.documentElement.style.setProperty("--hue-rotate", `${parseFloat(data.hue) - 200}deg`);

                return;
            }
        });

        window.parent.postMessage({
            command: "Initialise"
        }, "*");
    });
}

export function GetVersion() {
    return version;
}

export function GetResource(resourceName, callback) {
    let callbacks = resourceCallbacks.get(resourceName) ?? [];
    callbacks.push(callback);
    resourceCallbacks.set(resourceName, callbacks);

    window.parent.postMessage({
        command: "Get Resource",
        data: {
            name: resourceName
        }
    }, "*");
}

export function GetToken() {
    return new Promise(resolve => {
        let callbacksEmpty = tokenCallbacks.length == 0;

        tokenCallbacks.push(resolve);

        if (callbacksEmpty) {
            window.parent.postMessage({
                command: "Get Token"
            }, "*");
        }
    });
}

export function RefreshToken() {
    return new Promise(resolve => {
        let callbacksEmpty = refreshTokenCallbacks.length == 0;

        refreshTokenCallbacks.push(resolve);

        if (callbacksEmpty) {
            window.parent.postMessage({
                command: "Refresh Token"
            }, "*");
        }
    });
}