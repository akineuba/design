import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { getIconData, iconToSVG } from '@iconify/utils';
const require = createRequire(import.meta.url);
const map = JSON.parse(readFileSync(new URL('./icon-map.json', import.meta.url)));
const sets = {};
const out = {};
const missing = [];
for (const [name, full] of Object.entries(map)) {
  const [prefix, icon] = full.split(':');
  sets[prefix] ??= require(`@iconify-json/${prefix}/icons.json`);
  const data = getIconData(sets[prefix], icon);
  if (!data) { missing.push(full); continue; }
  const r = iconToSVG(data, { height: '1em' });
  out[name] = { viewBox: r.attributes.viewBox, body: r.body, source: full };
}
if (missing.length) { console.error('Missing icons:', missing.join(', ')); process.exit(1); }
mkdirSync(new URL('../src/icons/', import.meta.url), { recursive: true });
writeFileSync(new URL('../src/icons/icons.json', import.meta.url), JSON.stringify(out));
console.log(`Wrote ${Object.keys(out).length} icons`);
