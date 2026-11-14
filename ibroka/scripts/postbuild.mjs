// Post-processes the static Storybook:
// 1. a real page title (Storybook ships "@storybook/core - Storybook");
// 2. the literal U+FFFD character in vendor bundles becomes the equivalent � escape,
//    so the files are plain ASCII-safe JavaScript for hosts that reject replacement characters.
import fs from 'node:fs';
import path from 'node:path';

const out = 'storybook-static';
const index = path.join(out, 'index.html');
fs.writeFileSync(index, fs.readFileSync(index, 'utf8').replace(/<title>.*?<\/title>/, '<title>iBroka Design System</title>'));

const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => (d.isDirectory() ? walk(path.join(dir, d.name)) : [path.join(dir, d.name)]));
let fixed = 0;
for (const f of walk(out).filter((f) => f.endsWith('.js'))) {
  const s = fs.readFileSync(f, 'utf8');
  if (s.includes('�')) {
    fs.writeFileSync(f, s.replaceAll('�', '\\uFFFD'));
    fixed++;
  }
}
console.log(`postbuild: title set, ${fixed} bundle(s) escaped`);
