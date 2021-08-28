import {copy} from '@web/rollup-plugin-copy';
import {nodeResolve} from '@rollup/plugin-node-resolve';
//import {terser} from 'rollup-plugin-terser';
//import minifyHTML from 'rollup-plugin-minify-html-literals';

var fileConfig = [
    {
        folder: "src",
        files: ["service-worker"],
    },
    {
        folder: "src/elements",
        files: ["main", "dailytimetable", "announcement", "timetable"],
        suffix: "-elements"
    }
];

function Config() {
    var firstFile = true;

    var configs = fileConfig.map(fileGroup => {
        return fileGroup.files.map(file => {
            var config = {
                input: `${fileGroup.folder}/${file}${fileGroup.suffix??""}.js`,
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
                    //})
                ],
                output: {
                    dir: 'build',
                },
                preserveEntrySignatures: 'strict',
            }
        
            if (firstFile) {
                firstFile = false;

                config.plugins.push(
                    copy({
                        rootDir: 'src',
                        patterns: [
                            'css/**/*',
                            'icons/**/*',
                            'images/**/*.svg',
                            'images/**/*.webp',
                            'scripts/**/*',
                            //'loading/**/*',
                            '*.html',
                            'manifest.json',
                            'main.js'
                        ]
                    })
                );
            }
    
            return config;
        });
    });

    var result = [];

    configs.forEach(config => result.push(...config));
    
    return result;
}

export default Config();