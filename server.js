import WebDevServer from "web-dev-server";

import path from "path";
import { fileURLToPath } from "url";

import { readFile } from "fs/promises";

const dirname = path.dirname(fileURLToPath(import.meta.url));

WebDevServer.Server.CreateNew()
.SetDocumentRoot(path.resolve(dirname, "site"))
.SetPort(5555)
.SetHostname("127.0.0.1")
.SetErrorHandler(async err => {
    console.error(err);
})
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
        case "/metadata":
            res.SetHeader("Content-Type", "application/json");
            break;
    }
})
.Start(function (success, err) {
    if (!success) return console.error(err);
    console.log("Server is running.");
});