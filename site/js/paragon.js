var version = undefined;

var resourceCallbacks = new Map();
var tokenCallbacks = [];
var refreshTokenCallbacks = [];
var darkCallbacks = [];
var hueCallbacks = [];

var dark = false;
var hue = 200;

var initialised = false;

export function Init() {
    return new Promise(resolve => {
        if (initialised) resolve();

        window.addEventListener("message", e => {
            const command = e.data.command;
            const data = e.data.data;

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
                dark = data.dark;

                for (const callback of darkCallbacks)
                    callback(data.dark);

                return;
            }

            if (command == "Set Hue") {
                document.documentElement.style.setProperty("--main-hue", data.hue);
                document.documentElement.style.setProperty("--hue-rotate", `${parseFloat(data.hue) - 200}deg`);
                hue = data.hue;

                for (const callback of hueCallbacks)
                    callback(data.hue);

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
        const callbacksEmpty = tokenCallbacks.length == 0;

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
        const callbacksEmpty = refreshTokenCallbacks.length == 0;

        refreshTokenCallbacks.push(resolve);

        if (callbacksEmpty) {
            window.parent.postMessage({
                command: "Refresh Token"
            }, "*");
        }
    });
}

export function ShowNotification(id, content, loader = false) {
    window.parent.postMessage({
        command: "Show Notification",
        data: {
            id: id,
            content: content,
            loader: loader
        }
    }, "*");
}

export function CloseNotification(id) {
    window.parent.postMessage({
        command: "Close Notification",
        data: {
            id: id
        }
    }, "*");
}

export function GetDark() {
    return dark;
}

export function ListenForDark(callback) {
    darkCallbacks.push(callback);
}

export function GetHue() {
    return hue;
}

export function ListenForHue(callback) {
    hueCallbacks.push(callback);
}

export function RegisterSkin(name, css, icons) {
    window.parent.postMessage({
        command: "Register Skin",
        data: {
            name: name,
            css: css,
            icons: icons
        }
    }, "*");
}
