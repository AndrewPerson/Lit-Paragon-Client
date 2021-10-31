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

    for (var item of items) {
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
    }

    return files;
}

async function replaceVar(file, key, value) {
    if (value.includes("{location}")) {
        var parts = value.split("{location}");

        var newValue = parts.join("${location.origin}");
        
        await replace({
            files: `src/${file}`,
            from: new RegExp(`${key} *= *".*"`),
            to: `${key} = \`${newValue}\``
        });

        return;
    }

    await replace({
        files: `src/${file}`,
        from: new RegExp(`${key} *= *("|\`|').*("|\`|')`),
        to: `${key} = "${value}"`
    });
}

async function replaceConstants(constants, files) {
    for (var file in files) {
        var constantTypes = files[file];
        for (var constantType in files[file]) {
            if (!(constantType in constants)) {
                console.log(`Skipping constant category ${constantType} because it doesn't exist.`);
                continue;
            }

            var constantNames = constantTypes[constantType];
            for (var constant of constantNames) {
                if (!(constant in constants[constantType].constants)) {
                    console.log(`Skipping constant ${constant} because it doesn't exist in constant category ${constantType}.`);
                    continue;
                }

                await replaceVar(file,
                                 `${constant}${constants[constantType].suffix}`.toUpperCase(),
                                 constants[constantType].constants[constant]);
            }
        }
    }
}

function scaffold(template, object) {
    for (var key in template) {
        if (!(key in object) ||
            (template[key] != null && template[key] != undefined && typeof object[key] !== typeof template[key]) ||
            Array.isArray(object[key]) != Array.isArray(template[key])) object[key] = template[key];

        if (!Array.isArray(template[key]) && template[key] != null && typeof template[key] === "object" && Object.keys(template[key]).length != 0) object[key] = scaffold(template[key], object[key]);
    }

    return object;
}

var start = Date.now();

var config = {};
try {
    config = require("./config.json");
}
catch (e) {}

config = scaffold({
    metadata: {
        version: "0.0.0",
        pages: {}
    },
    build: {
        deploy_cmd: null,
        svg_precision: 1
    },
    constants: {},
    filesWithConstants: {}
}, config);

for (var constant in config.constants) {
    config.constants[constant] = scaffold({
        constants: {},
        suffix: ""
    }, config.constants[constant]);
}

replaceConstants(config.constants, config.filesWithConstants).then(async () => {
    await rm(__dirname + "/build", { recursive: true, force: true });
    
    await cmd("npx rollup -c");
    
    if (process.argv[2] == "deploy") await cmd(`npx svgo -f ${__dirname}/build -r -p ${config.build.svg_precision || 1}`);

    var js = "self.assets = [\n\t\"/\",\n";

    var files = await getFiles(__dirname + "/build", "/");
    files.forEach(file => {
        if (!/\/(service-worker.*?\.js)|\/(index)$|(metadata)/g.test(file)) js += `\t"${file}",\n`;
    });

    js += "];";

    await writeFile(__dirname + "/build/assets.js", js);

    await writeFile(__dirname + "/build/metadata", JSON.stringify({
        version: config.metadata.version,
        pages: config.metadata.pages
    }));

    if (process.argv[2] == "deploy") {
        if (config.build.deploy_cmd) await cmd(config.build.deploy_cmd);
    }
    else {
        await writeFile(__dirname + "/build/service-worker.js",
                        await readFile(__dirname + "/src/service-worker.debug.js"));
    }

    var end = Date.now();

    console.log(`${process.argv[2] == "deploy" ? "Deploying" : "Generating preview assets"} took ${(end - start)/1000} seconds`);
});