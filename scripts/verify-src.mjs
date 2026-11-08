// Compares your project with the original files. Run from the project root:  npm run verify
// Line endings are ignored (Windows vs Mac/Linux). `businessInfo.js` is expected to differ once you have
// typed in your real business details.
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const manifest = JSON.parse(fs.readFileSync(new URL('./manifest.json', import.meta.url), 'utf8'));
const hash = (file) => crypto.createHash('sha256').update(fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n')).digest('hex');
const expectedToDiffer = new Set(['src/data/businessInfo.js', 'package.json']);

const missing = [];
const different = [];
let same = 0;
for (const [file, sha] of Object.entries(manifest)) {
  if (!fs.existsSync(file)) missing.push(file);
  else if (hash(file) !== sha) different.push(file);
  else same += 1;
}

const walk = (dir) =>
  fs.existsSync(dir)
    ? fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name).split(path.sep).join('/')]))
    : [];
const extra = walk('src').filter((f) => !(f in manifest) && !/^src\/assets\/products\/.+\.(webp|avif|jpe?g|png)$/i.test(f));

console.log(`\n${same} files match the original.`);
if (missing.length) console.log(`\nMISSING (copy these back in):\n  ${missing.join('\n  ')}`);
if (different.length) {
  console.log('\nDIFFERENT from the original (replace with the original unless you edited them on purpose):');
  different.forEach((f) => console.log(`  ${f}${expectedToDiffer.has(f) ? '   <- normal if you added your own details/dependencies' : ''}`));
}
if (extra.length) console.log(`\nEXTRA files not in the original (old files you can delete if unused):\n  ${extra.join('\n  ')}`);
if (!missing.length && !different.length && !extra.length) console.log('Everything matches.');
process.exitCode = missing.length || different.some((f) => !expectedToDiffer.has(f)) ? 1 : 0;
