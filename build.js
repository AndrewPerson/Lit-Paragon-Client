const start = new Date();

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const config = require("./build.json");

import path from "path";
import { fileURLToPath } from "url";

import { writeFile, readFile } from "fs/promises";

import { exec } from "child_process";

import { optimize } from 'svgo';

import { build } from "esbuild";

import clear from "esbuild-plugin-clear";
import conditionalBuild from "esbuild-plugin-conditional-build";

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
    exec("npx tsc --noEmit", (err, stdout, stderr) => {
        console.log(stdout);
        console.log(stderr);
        console.log(err ?? "");
        res();
    });
});

var buildPromise = build({
    entryPoints: config.files.map(file => `site/${file}`),
    outdir: "site/dist",
    bundle: true,
    minify: env.js.minify,
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
                    let contents = await readFile(args.path, 'utf8');
        
                    if (env.svg.floatPrecision)
                        contents = optimize(contents, {
                            path: args.path,
                            floatPrecision: env.svg.floatPrecision,
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
                    var textContent = await readFile(args.path, "utf8");

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