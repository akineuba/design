// Turns tokens.json into CSS variables and a Tailwind theme. Used by tailwind.config.cjs.
const tokens = require('./tokens.json');

const isLeaf = (n) => n && typeof n === 'object' && 'value' in n;
const varName = (path) =>
  '--ib-' + path.filter((p) => p !== 'DEFAULT').map((p) => String(p).replace('.', '_')).join('-');

function walk(node, path, out) {
  for (const [k, v] of Object.entries(node)) {
    if (k.startsWith('$')) continue;
    if (isLeaf(v)) out.push({ path: [...path, k], leaf: v });
    else walk(v, [...path, k], out);
  }
  return out;
}

const leaves = walk(tokens, [], []);
const light = {};
const dark = {};
for (const { path, leaf } of leaves) {
  light[varName(path)] = leaf.value;
  if (leaf.lineHeight) light[varName(['lineHeight', ...path.slice(1)])] = leaf.lineHeight;
  if (leaf.dark) dark[varName(path)] = leaf.dark;
}

function nested(node, path) {
  const res = {};
  for (const [k, v] of Object.entries(node)) {
    if (isLeaf(v)) res[k] = `var(${varName([...path, k])})`;
    else res[k] = nested(v, [...path, k]);
  }
  return res;
}

module.exports = { tokens, leaves, light, dark, nested, varName };
