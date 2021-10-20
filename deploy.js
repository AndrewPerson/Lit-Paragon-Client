const { rm, readdir, writeFile, readFile } = require("fs/promises");
const { exec } = require('child_process');
const replace = require("replace-in-file");

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

async function replaceVar(file, key, value) {
    await replace({
        files: `build/${file}`,
        from: new RegExp(`${key} *= *".*"`),
        to: `${key} = "${value}"`
    });
}

async function replaceConfigVar(key, includeServiceWorker = true, includeInit = true) {
    if (!(key in config)) return;

    if (includeServiceWorker && includeInit) {
        await Promise.all([
            replaceVar("assets/init*.js", key.toUpperCase(), config[key]),
            replaceVar("service-worker.js", key.toUpperCase(), config[key])
        ]);
    }
    else if (includeInit) {
        await replaceVar("assets/init*.js", key.toUpperCase(), config[key]);
    }
    else if (includeServiceWorker) {
        await replaceVar("service-worker.js", key.toUpperCase(), config[key]);
    }
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

    await Promise.all([
        replaceConfigVar("offline_cache", true, false),
        replaceConfigVar("metadata_cache", true, true),
        replaceConfigVar("resource_cache", true, false),
        replaceConfigVar("server_endpoint", true, true),
        replaceConfigVar("metadata_endpoint", true, false),
        replaceConfigVar("client_id", false, true)
    ]);

    if (process.argv[2] == "deploy") {
        await cmd(config.deploy_md || "firebase deploy");
    }
    else {
        await writeFile(__dirname + "/build/service-worker.js",
                        await readFile(__dirname + "/src/service-worker.debug.js"));
    }
});