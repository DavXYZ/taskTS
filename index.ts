const fs = require('fs');
const path = require('path');

function listFiles(dir, indentTabs = '') {
  fs.readdir(dir, { withFileTypes: true }, (err, data) => {
    if (err) {
      console.error(`Error ${dir}: ${err.message}`);
      return;
    }
    data.forEach(entry => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        console.log(`${indentTabs}Dir: ${entry.name}`);
        listFiles(fullPath, indentTabs + '  ');
      } else {
        console.log(`${indentTabs}File: ${entry.name}`);
      }
    });
  });
}

const rootDir = 'node_modules';
listFiles(rootDir);
