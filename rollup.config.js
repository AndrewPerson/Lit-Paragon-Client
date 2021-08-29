import {copy} from '@web/rollup-plugin-copy';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import {terser} from 'rollup-plugin-terser';
import html from '@web/rollup-plugin-html';

const ServiceWorkerConfig = {
    input: "src/service-worker.js",
    output: {dir: "build"},
    plugins: [
        nodeResolve(),
        terser({
            ecma: 2020,
            module: true,
            warnings: true
        })
    ]
};

function Config() {
    return [ServiceWorkerConfig, {
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
                    "images/*"
                ],
                exclude: [
                    "images/circle.svg",
                    "images/edit.svg",
                    "images/logo.svg",
                    "images/logo-with-rings.svg",
                    "images/moon.svg",
                    "images/*.sketch"
                ]
            })
        ]
    }];
}

export default Config();