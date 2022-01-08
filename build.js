const start = new Date();

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const config = require("./build.json");

import path from "path";
import { fileURLToPath } from "url";

import { writeFile, readFile } from "fs/promises";

import { exec } from "child_process";

import { optimize } from "svgo";

import { build } from "esbuild";

import clear from "esbuild-plugin-clear";
import conditionalBuild from "esbuild-plugin-conditional-build";

function transformVars(vars) {
    for (let key of Object.keys(vars)) {
        let value = vars[key];

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
                if (Object.prototype.toString.call(obj[prop]) === "[object Object]") {
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

const specifiedEnvName = process.env.CF_PAGES != "1" ? process.argv[2] ?? "default" :
                         `${process.env.CF_PAGES_BRANCH}-preview` in config.env ? `${process.env.CF_PAGES_BRANCH}-preview` :
                         process.argv[2] ?? "default";


const specifiedEnv = config.env[specifiedEnvName] || {};
const sharedEnv = config.env["shared"] || {};

//Order matters here so values specified in the specified env override those in the sharedEnv
const env = merge(sharedEnv, specifiedEnv);

const dirname = path.dirname(fileURLToPath(import.meta.url));

writeFile(path.resolve(dirname, "site/metadata"), JSON.stringify(config.metadata));

let tsPromise = new Promise(res => {
    exec("npx tsc --noEmit", (err, stdout, stderr) => {
        console.log(stdout);
        console.log(stderr);
        console.log(err || "");
        res();
    });
});

let buildPromise = build({
    entryPoints: config.files.map(file => `site/${file}`),
    outdir: "site/dist",
    bundle: true,
    minify: true,
    splitting: true,
    treeShaking: true,
    format: "esm",
    target: "es2020",
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
        {
            name: "lit-svg",
            setup(build) {        
                build.onLoad({ filter: /\.svg$/ }, async args => {
                    let contents = await readFile(args.path, "utf8");

                    contents = optimize(contents, {
                        path: args.path,
                        floatPrecision: 1,
                        plugins: [
                            {
                                name: "preset-default",
                                params: {
                                    overrides: {
                                        removeViewBox: false
                                    }
                                }
                            }
                        ]
                    }).data;
        
                    return {
                        loader: "js",
                        contents: `import {svg} from "lit"; export default svg\`${contents}\`;`
                    };
                });
            }
        },
        {
            name: "lit-css",
            setup(build) {
                build.onLoad({ filter: /\.css$/, namespace: "file" }, async args => {
                    let textContent = await readFile(args.path, "utf8");

                    return {
                        loader: "js",
                        contents: `import {css} from "lit"; export default css\`${textContent}\`;`
                    }
                });
            }
        }
    ]
})
.catch(() => {
    process.exit(1);
});

Promise.all([tsPromise, buildPromise]).then(() => {
    console.log(`Time taken: ${(new Date() - start) / 1000}s`);
});