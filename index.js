var fs = require('fs');
var path = require('path');
function listFiles(dir, indentTabs) {
    if (indentTabs === void 0) { indentTabs = ''; }
    fs.readdir(dir, { withFileTypes: true }, function (err, data) {
        if (err) {
            console.error("Error ".concat(dir, ": ").concat(err.message));
            return;
        }
        data.forEach(function (entry) {
            var fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                console.log("".concat(indentTabs, "Dir: ").concat(entry.name));
                listFiles(fullPath, indentTabs + '  ');
            }
            else {
                console.log("".concat(indentTabs, "File: ").concat(entry.name));
            }
        });
    });
}
var rootDir = 'node_modules';
listFiles(rootDir);
