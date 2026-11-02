// Checks WCAG contrast for the token pairs the components actually use, in light and dark.
// Run: npm run contrast
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const t = JSON.parse(fs.readFileSync(path.join(root, 'tokens/tokens.json'), 'utf8')).color;
const get = (p, mode) => {
  const leaf = p.split('.').reduce((n, k) => n[k], t);
  const node = leaf.value ? leaf : leaf.DEFAULT;
  return mode === 'dark' ? node.dark ?? node.value : node.value;
};
const lum = (hex) => {
  const c = hex.replace('#', '').match(/../g).map((x) => parseInt(x, 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((m, n) => m - n);
  return (y + 0.05) / (x + 0.05);
};

// [foreground, background, minimum, what]
const pairs = [
  ['fg.inverse', 'primary', 4.5, 'Primary button'],
  ['fg.inverse', 'secondary', 4.5, 'Secondary button'],
  ['fg.inverse', 'danger', 4.5, 'Destructive button'],
  ['fg.inverse', 'info', 4.5, 'Quick action blue'],
  ['fg.inverse', 'success', 4.5, 'Quick action green'],
  ['primary', 'surface', 4.5, 'Links, active nav text'],
  ['primary', 'brand.subtle', 4.5, 'Active sub-page, bulk bar'],
  ['fg.strong', 'surface', 4.5, 'Body text'],
  ['fg.strong', 'surface.page', 4.5, 'Page title'],
  ['fg.muted', 'surface', 4.5, 'Muted text'],
  ['fg.muted', 'surface.header', 4.5, 'Table header'],
  ['fg.breadcrumb', 'surface.chrome', 4.5, 'Breadcrumb'],
  ['fg', 'surface.chrome', 4.5, 'Sidebar items'],
  ['danger', 'surface', 4.5, 'Negative amounts'],
  ['warning', 'surface', 4.5, 'Edit action'],
  ['status.success.fg', 'status.success.bg', 4.5, 'Pill success'],
  ['status.warning.fg', 'status.warning.bg', 4.5, 'Pill warning'],
  ['status.error.fg', 'status.error.bg', 4.5, 'Pill error'],
  ['status.info.fg', 'status.info.bg', 4.5, 'Pill info'],
  ['status.neutral.fg', 'status.neutral.bg', 4.5, 'Pill neutral'],
  ['avatar.fg', 'avatar.bg', 4.5, 'Avatar initials'],
  ['tile.teal.fg', 'tile.teal.bg', 3, 'Summary icon teal'],
  ['tile.green.fg', 'tile.green.bg', 3, 'Summary icon green'],
  ['tile.purple.fg', 'tile.purple.bg', 3, 'Summary icon purple'],
  ['tile.blue.fg', 'tile.blue.bg', 3, 'Summary icon blue'],
  ['tile.amber.fg', 'tile.amber.bg', 3, 'Summary icon amber'],
  ['tile.red.fg', 'tile.red.bg', 3, 'Summary icon red'],
  ['tile.ink.fg', 'tile.ink.bg', 3, 'Summary icon ink'],
];

let fails = 0;
for (const mode of ['light', 'dark']) {
  console.log(`\n${mode}`);
  for (const [fg, bg, min, what] of pairs) {
    const r = ratio(get(fg, mode), get(bg, mode));
    const ok = r >= min;
    if (!ok) fails++;
    console.log(`${ok ? 'PASS' : 'FAIL'}  ${r.toFixed(2).padStart(5)}:1  (≥${min})  ${what}  ${fg} on ${bg}`);
  }
}
if (fails) {
  console.log(`\n${fails} pair(s) fail.`);
  process.exit(1);
}
console.log('\nAll pairs pass.');
