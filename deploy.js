const {readdirSync, writeFileSync, readFileSync, rmSync} = require('fs');
const {exec} = require('child_process');

function getFiles(rootDir, relativeDir) {
    var items = readdirSync(rootDir + relativeDir, {withFileTypes: true});
    var files = [];

    items.forEach((item, index, array) => {
        if (item.isDirectory()) {
            getFiles(rootDir, relativeDir + item.name + '/').forEach(file => {
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

rmSync(__dirname.replace('\\', '/') + "/build", { recursive: true, force: true });

exec("rollup -c", (err, stdout, stderr) => {
    if (err) {
        console.log(err);
        return;
    }
    
    console.log(`${stdout}\n${stderr}`);
    
    var js = "self.assets = [\n\t\"/\",\n"

    getFiles(__dirname.replace('\\', '/') + "/build", "/").forEach(file => {
        if (!/(service-worker.*?\.js)|(index)$/g.test(file)) js += `\t"${file}",\n`;
    });

    js += "];";

    writeFileSync(__dirname.replace('\\', '/') + "/build/assets.js", js);

    if (process.argv[2] != "release") {
        writeFileSync(__dirname.replace('\\', '/') + "/build/service-worker.js",
                    readFileSync(__dirname.replace('\\', '/') + "/src/service-worker.debug.js"));
    }
});