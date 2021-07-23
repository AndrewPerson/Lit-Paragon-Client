import {copy} from '@web/rollup-plugin-copy';
import {nodeResolve} from '@rollup/plugin-node-resolve';
//import {terser} from 'rollup-plugin-terser';
//import minifyHTML from 'rollup-plugin-minify-html-literals';
//import summary from 'rollup-plugin-summary';

export default {
    input: "src/elements.js",
    plugins: [
        // Resolve bare module specifiers to relative paths
        nodeResolve(),
        // Minify HTML template literals
        //minifyHTML(),
        // Minify JS
        //terser({
        //  ecma: 2020,
        //  module: true,
        //  warnings: true,
        //}),
        // Print bundle summary
        //summary(),
        // Optional: copy any static assets to build directory
        copy({
            rootDir: 'src',
            patterns: [
                'css/**/*',
                'icons/**/*',
                'images/**/*.svg',
                'images/**/*.webp',
                //'js/**/*',
                //'loading/**/*',
                '*.html',
                'manifest.json',
                'service-worker.js',
                'main.js'
            ]
        }),
    ],
    output: {
        dir: 'build',
    },
    preserveEntrySignatures: 'strict',
};