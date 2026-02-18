import { readFileSync, readdirSync, renameSync, writeFileSync } from 'fs';
import { resolve, dirname, extname, basename } from 'path';
import { execSync } from 'child_process';
import { glob } from 'glob';

const files = await glob('src/**/*.{jsx,tsx,js,ts}');

for (const file of files) {
  let content = readFileSync(file, 'utf8');
  const newContent = content.replace(
    /from\s+['"](\.[^'"]+)['"]/g,
    (match, importPath) => {
      const dir = dirname(resolve(file));
      const fullPath = resolve(dir, importPath);
      
      // Try common extensions
      const exts = ['', '.jsx', '.tsx', '.js', '.ts', '/index.jsx', '/index.tsx'];
      for (const ext of exts) {
        try {
          const candidate = fullPath + ext;
          const parentDir = dirname(candidate);
          const fileName = basename(candidate);
          
          const actualFiles = readdirSync(parentDir);
          const match2 = actualFiles.find(f => f.toLowerCase() === fileName.toLowerCase());
          
          if (match2 && match2 !== fileName) {
            const fixedImport = importPath.replace(fileName, match2);
            console.log(`Fixed in ${file}: ${importPath} → ${fixedImport}`);
            return match.replace(importPath, fixedImport);
          }
        } catch {}
      }
      return match;
    }
  );
  
  if (content !== newContent) {
    writeFileSync(file, newContent);
  }
}

console.log('Done! Now run: git add -A && git commit -m "fix: all import case sensitivity" && git push');