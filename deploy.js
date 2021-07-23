const {readdirSync, writeFileSync} = require('fs');
const {exec} = require('child_process');

function getFiles(rootDir, relativeDir) {
    var items = readdirSync(rootDir + relativeDir, {withFileTypes: true});
    var files = [];

    items.forEach((item, index, array) => {
        if (item.isDirectory()) {
            getFiles(rootDir, relativeDir + item.name + '/').forEach((file, index, array) => {
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

exec("rollup -c", (err, stdout, stderr) => {
    if (err) {
        // node couldn't execute the command
        return;
    }
    
    // the *entire* stdout and stderr (buffered)
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
      
    var js = "self.assets = [\n"

    getFiles(__dirname.replace('\\', '/') + "/build", "/").forEach((file, index, array) => {
        js += `\t"${file}",\n`;
    });

    js += "];";

    writeFileSync(__dirname.replace('\\', '/') + "/build/assets.js", js);
});