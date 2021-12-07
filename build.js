const start = new Date();

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const config = require("./build.json");

import path from "path";
import { fileURLToPath } from "url";

import { writeFile } from "fs/promises";

import { exec } from "child_process";

import { build } from "esbuild";

import clear from "esbuild-plugin-clear";
import conditionalBuild from "esbuild-plugin-conditional-build";
import svg from "esbuild-plugin-svg";
import { litCssPlugin } from "esbuild-plugin-lit-css";

function transformVars(vars) {
    for (var key of Object.keys(vars)) {
        var value = vars[key];

        if (typeof value === "object")
            vars[key] = JSON.stringify(value);
        else if (typeof value === "string")
            vars[key] = `"${value}"`;
    }

    return vars;
}

function merge() {
    let target = {};

    function merger(obj) {
        for (let prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                if (Object.prototype.toString.call(obj[prop]) === '[object Object]') {
                    // if the property is a nested object
                    target[prop] = merge(target[prop], obj[prop]);
                } else {
                    // for regular property
                    target[prop] = obj[prop];
                }
            }
        }
    }

    // iterate through all objects and 
    // deep merge them with target
    for (let i = 0; i < arguments.length; i++) {
        merger(arguments[i]);
    }

    return target;
}

const specifiedEnv = (process.argv.length > 2 ? config.env[process.argv[2]] : config.env.default) || {};
const sharedEnv = config.env["shared"] || {};

//Order matters here so values specified in the specified env override those in the sharedEnv
const env = merge(sharedEnv, specifiedEnv);

const dirname = path.dirname(fileURLToPath(import.meta.url));

writeFile(path.resolve(dirname, "site/metadata"), JSON.stringify(config.metadata));

var tsPromise = new Promise(res => {
    exec("npx tsc --noEmit", res);
});

var buildPromise = build({
    entryPoints: config.files.map(file => `site/${file}`),
    bundle: true,
    outdir: "site/dist",
    minify: env.js.minify,
    define: transformVars(env.vars),
    plugins: [
        clear("./site/dist"),
        {
            name: "css-redirect",
            setup(build) {
                build.onResolve({ filter: /^default\/.*\.css$/, namespace: "file" }, args => {
                    return {
                        path: path.resolve(dirname, "site/css", args.path)
                    };
                });
            }
        },
        {
            name: "svg-redirect",
            setup(build) {
                build.onResolve({ filter: /\.svg$/, namespace: "file" }, args => {
                    return {
                        path: path.resolve(dirname, "site/images", args.path)
                    };
                });
            }
        },
        conditionalBuild(env.constants),
        svg({
            minify: env.svg.minify,
            minifyOptions: {
                floatPrecision: env.svg.floatPrecision
            }
        }),
        litCssPlugin()
    ]
})
.catch(() => {
    process.exit(1);
});

Promise.all([tsPromise, buildPromise]).then(() => {
    console.log(`Time taken: ${(new Date() - start) / 1000}s`);
});