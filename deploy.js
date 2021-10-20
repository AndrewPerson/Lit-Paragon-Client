const { rm, readdir, writeFile, readFile } = require("fs/promises");
const { exec } = require('child_process');

function cmd(command) {
    return new Promise((resolve, reject) => {
        console.log(`> ${command}`);
        
        exec(command, (err, stdout, stderr) => {
            if (err) reject(err);

            console.log(`${stdout}\n${stderr}`);

            resolve();
        });
    });
}

async function getFiles(rootDir, relativeDir) {
    var items = await readdir(rootDir + relativeDir, {withFileTypes: true});
    var files = [];

    items.forEach(async item => {
        if (item.isDirectory()) {
            var fileResult = await getFiles(rootDir, relativeDir + item.name + '/');
            fileResult.forEach(file => {
                files.push(file);
            });
        }
        else {
            var name = item.name;

            if (name.endsWith(".html")) {
                files.push(relativeDir + name.substring(0, name.indexOf(".html")));
            }
            else {
                files.push(relativeDir + name);
            }
        }
    });

    return files;
}

var config = {};
try {
    config = require("./config.json");
}
catch (e) {}

rm(__dirname + "/build", { recursive: true, force: true }).then(async () => {
    await cmd("npx rollup -c");
    
    await cmd(`npx svgo -f ${__dirname}/build -r -p ${config.svg_precision || 1}`);

    var js = "self.assets = [\n\t\"/\",\n";

    var files = await getFiles(__dirname + "/build", "/");
    files.forEach(file => {
        if (!/\/(service-worker.*?\.js)|\/(index)$/g.test(file)) js += `\t"${file}",\n`;
    });

    js += "];";

    await writeFile(__dirname + "/build/assets.js", js);

    if (process.argv[2] == "deploy") {
        await cmd(config.deploy_md || "firebase deploy");
    }
    else {
        await writeFile(__dirname + "/build/service-worker.js",
                        await readFile(__dirname + "/src/service-worker.debug.js"));
    }
});