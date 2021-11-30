import { createRequire } from "module";
const require = createRequire(import.meta.url);
const config = require("./build.json");

import { build } from "esbuild";
import clear from "esbuild-plugin-clear";
import conditionalBuild from "esbuild-plugin-conditional-build";
import svg from "esbuild-plugin-svg";
import { litCssPlugin } from "esbuild-plugin-lit-css";

const env = (process.argv.length > 2 ? config.env[process.argv[2]] : config.env.default) || {};

build({
    entryPoints: config.files.map(file => `site/${file}`),
    bundle: true,
    outdir: "site/dist",
    minify: env.minify || false,
    plugins: [
        clear("./site/dist"),
        conditionalBuild(env.constants),
        svg(),
        litCssPlugin()
    ]
})
.catch(() => {
    process.exit(1);
});