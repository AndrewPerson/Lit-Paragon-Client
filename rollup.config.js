import {copy} from '@web/rollup-plugin-copy';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import {terser} from 'rollup-plugin-terser';
import html from '@web/rollup-plugin-html';

export default {
    input: "src/*.html",
    output: {dir: "build"},
    plugins: [
        nodeResolve(),
        html(),
        terser({
            ecma: 2020,
            module: true,
            warnings: true
        }),
        copy({
            rootDir: "src",
            patterns: [
                "icons/*",
                "images/*",
                "service-worker.js"
            ],
            exclude: [
                "images/logo.svg",
                "images/logo-with-rings.svg",
                "images/moon.svg",
                "images/*.sketch"
            ]
        })
    ]
};