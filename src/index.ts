import * as fs from 'fs/promises';
import * as path from 'path';

async function listFiles(dir: string, indent: string = '', last: boolean = true): Promise<void> {
  try {
    const data = (await fs.readdir(dir, { withFileTypes: true })).sort((a, b) => {
      if (a.isDirectory() && !b.isDirectory()) return -1;
      if (!a.isDirectory() && b.isDirectory()) return 1;
      return a.name.localeCompare(b.name);
    });
    for (const [index, entry] of data.entries()) {
      const fullPath = path.join(dir, entry.name);
      const isLast = index === data.length - 1;
      if (entry.isDirectory()) {
        console.log(`${indent}${isLast ? '└── ' : '├── '}${entry.name}`);
        await listFiles(fullPath, `${indent}${isLast ? '    ' : '│   '}`, isLast);
      } else {
        console.log(`${indent}${isLast ? '└── ' : '├── '}${entry.name}`);
      }
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Error: ${dir}: ${err.message}`);
    } else {
      console.error(`Unknown error: ${dir}`);
    }
  }
}

const rootDir = 'node_modules'; 
listFiles(rootDir);
