import WebDevServer from "web-dev-server";

import path from "path";
import { fileURLToPath } from "url";

import { readFile } from "fs/promises";

const dirname = path.dirname(fileURLToPath(import.meta.url));

// Create web server instance.
WebDevServer.Server.CreateNew()
// Required.
.SetDocumentRoot(path.resolve(dirname, "site"))
// Optional, 8000 by default.
.SetPort(5555)
// Optional, '127.0.0.1' by default.
.SetHostname('127.0.0.1')
// Optional, custom place to log any unhandled errors.
.SetErrorHandler(async function (err, code, req, res) {
    console.error(err);
})
// Optional, to prepend any execution before `web-dev-server` module execution.
.AddPreHandler(async function (req, res, event) {
    switch (req.GetPath()) {
        case "/dist/service-worker/service-worker.js":
            res.SetHeader("service-worker-allowed", "/");
            break;
        case "/callback":
            res.SetBody(await readFile(path.resolve(dirname, "site/callback.html"), "utf8")).Send();
            event.PreventDefault();
            break;
        case "/login":
            res.SetBody(await readFile(path.resolve(dirname, "site/login.html"), "utf8")).Send();
            event.PreventDefault();
            break;
        case "/unsupported":
            res.SetBody(await readFile(path.resolve(dirname, "site/unsupported.html"), "utf8")).Send();
            event.PreventDefault();
            break;
        case "/dist/index.js":
            res.SetBody(await readFile(path.resolve(dirname, "site/dist/index.js"), "utf8")).Send();
            event.PreventDefault();
            break;
        default:
            break;
    }
})
// Callback param is optional. called after server has been started or after error occurred.
.Start(function (success, err) {
    if (!success) return console.error(err);
    console.log("Server is running.");
});