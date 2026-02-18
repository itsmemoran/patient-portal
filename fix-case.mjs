import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { resolve, dirname, basename } from 'path';
import { glob } from 'glob';

const files = await glob('src/**/*.{jsx,js}');

function findRealPath(dir, importPath) {
  try {
    const parts = importPath.split('/');
    let currentDir = dir;

    for (const part of parts) {
      if (part === '.' || part === '..') {
        currentDir = resolve(currentDir, part);
        continue;
      }

      const entries = readdirSync(currentDir);
      const match = entries.find(e => e.toLowerCase() === part.toLowerCase());

      if (!match) return null;
      currentDir = resolve(currentDir, match);
    }

    return currentDir;
  } catch {
    return null;
  }
}

for (const file of files) {
  let content = readFileSync(file, 'utf8');
  let changed = false;

  const newContent = content.replace(
    /from\s+['"](\.[^'"]+)['"]/g,
    (original, importPath) => {
      const dir = dirname(resolve(file));
      const realPath = findRealPath(dir, importPath);

      if (!realPath) return original;

      // Rebuild the import path with correct casing
      const corrected = importPath.split('/').reduce((acc, part, i, arr) => {
        if (part === '.' || part === '..') return acc + part + '/';
        const currentDir = resolve(dir, arr.slice(0, i).join('/'));
        const entries = readdirSync(currentDir);
        const match = entries.find(e => e.toLowerCase() === part.toLowerCase());
        return acc + (match || part) + (i < arr.length - 1 ? '/' : '');
      }, '');

      if (corrected !== importPath) {
        console.log(`[${file}]\n  ✗ ${importPath}\n  ✓ ${corrected}\n`);
        changed = true;
        return original.replace(importPath, corrected);
      }

      return original;
    }
  );

  if (changed) writeFileSync(file, newContent);
}

console.log('✅ All import paths corrected. Now run:\ngit add -A && git commit -m "fix: correct import path casing" && git push');