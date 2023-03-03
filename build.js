import path from "path";
import { fileURLToPath } from "url";

import { writeFile, readFile, rm, readdir } from "fs/promises";

import { exec } from "child_process";

import { build } from "esbuild";
import conditionalBuild from "esbuild-plugin-conditional-build";

import { minimatch } from "minimatch";

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

async function walk(dir) {
    let files = await readdir(dir, { withFileTypes: true });

    let result = [];

    for (let file of files) {
        if (file.isDirectory()) {
            result.push(...await walk(path.join(dir, file.name)));
        }
        else {
            result.push(path.resolve(dir, file.name));
        }
    }

    return result;
}

Main()
async function Main() {
    const dirname = path.dirname(fileURLToPath(import.meta.url));

    const config = JSON.parse(await readFile(path.resolve(dirname, "build.json")));

    const specifiedEnvName = process.env.CF_PAGES != "1" ? process.argv[2] ?? "default" :
                             `${process.env.CF_PAGES_BRANCH}-branch` in config.env ? `${process.env.CF_PAGES_BRANCH}-branch` :
                             process.argv[2] ?? "default";

    const specifiedEnv = config.env[specifiedEnvName] || {};
    const sharedEnv = config.env["shared"] || {};

    //Order matters here so values specified in the specified env override those in the sharedEnv
    const env = merge(sharedEnv, specifiedEnv);

    await rm(path.resolve(dirname, "site/dist"), { force: true, recursive: true });

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
        minify: env.js.minify,
        //splitting: true,
        treeShaking: env.js.treeShaking,
        sourcemap: env.js.sourcemaps,
        format: "esm",
        target: "es2016",
        define: transformVars(env.vars),
        metafile: true,
        plugins: [
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
            conditionalBuild(env.constants),
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

    let [_, buildResult] = await Promise.all([tsPromise, buildPromise]);

    await writeFile(path.resolve(dirname, "site/dist/esbuild-metadata.json"), JSON.stringify(buildResult.metafile));

    let files = (await walk(path.resolve(dirname, "site"))).filter(file => {
        for (let glob of env["service-worker"].ignore) {
            if (minimatch(path.relative(path.resolve(dirname, "site"), file), glob))
                return false;
        }

        return true;
    }).map(file => `"/${path.relative(path.resolve(dirname, "site"), file)}"`);

    for (let extra of env["service-worker"].extras) {
        files.push(`"${extra}"`);
    }

    await writeFile(
        path.resolve(dirname, "site/dist/service-worker/assets.js"),
        `self.assets=[${files.join(",")}];`
    );
}