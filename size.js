const { stat } = require("fs/promises");

const glob = require("glob");

const include = ["site/css/**/*", "site/dist/**/*", "site/icons/**/*", "site/images/**/*",
                 "site/*.html", "site/*.json", "site/metadata"];
const exclude = ["site/images/**/*.sketch", "js/**/types.ts"];

Main();

async function Main() {
    var files = (await Promise.all(include.map(file => new Promise((resolve, reject) => {
        glob.glob(file, (err, matches) => {
            if (err) reject(err);

            resolve(matches);
        });
    })))).flat();
    
    var excludedFiles = (await Promise.all(exclude.map(file => new Promise((resolve, reject) => {
        glob.glob(file, (err, matches) => {
            if (err) reject(err);

            resolve(matches);
        });
    })))).flat();

    let filesSize = 0;

    let filesInfo = {};

    for (let file of files) {
        if (excludedFiles.includes(file)) continue;

        let info = await stat(file);

        filesSize += info.size;

        filesInfo[file] = info;
    }
    
    for (let file of Object.keys(filesInfo)) {
        console.log(`${file}: ${Math.max(Math.round(filesInfo[file].size / 1000), 1)} kilobytes`);
    }

    console.log(`Total: ${Math.round(filesSize / 1000)} kilobytes`);
}