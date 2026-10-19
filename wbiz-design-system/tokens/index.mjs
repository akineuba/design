// Reads tokens.json and exposes it two ways:
//   cssVariables()  -> the :root block written to src/styles/tokens.css
//   tailwindTheme() -> Tailwind theme values that point at those CSS variables
import { readFileSync } from 'node:fs';

const tokens = JSON.parse(readFileSync(new URL('./tokens.json', import.meta.url), 'utf8'));

const PREFIX = 'wbiz';
const slug = (s) => String(s).replace('.', '_');

// CSS variable name for a token path, e.g. ['color', 'fg', 'muted'] -> --wbiz-color-fg-muted.
// DEFAULT is dropped so ['color', 'primary', 'DEFAULT'] -> --wbiz-color-primary.
export const varName = (path) =>
  `--${PREFIX}-${path.filter((p) => p !== 'DEFAULT').map(slug).join('-')}`;

const isLeaf = (node) => node && typeof node === 'object' && 'value' in node;

function walk(node, path, visit) {
  for (const [key, child] of Object.entries(node)) {
    if (key.startsWith('$')) continue;
    if (isLeaf(child)) visit([...path, key], child);
    else walk(child, [...path, key], visit);
  }
}

export function cssVariables() {
  const lines = [];
  walk(tokens, [], (path, leaf) => {
    if (path[0] === 'fontSize') {
      lines.push(`  ${varName(path)}: ${leaf.value};`);
      lines.push(`  ${varName(['lineHeight', ...path.slice(1)])}: ${leaf.lineHeight};`);
    } else {
      lines.push(`  ${varName(path)}: ${leaf.value};${leaf.derived ? ' /* derived: not in Figma */' : ''}`);
    }
  });
  return `:root {\n${lines.join('\n')}\n}\n`;
}

// Mirrors a token group as a nested object of var() references.
function refs(group) {
  const build = (node, path) => {
    const out = {};
    for (const [key, child] of Object.entries(node)) {
      out[key] = isLeaf(child) ? `var(${varName([group, ...path, key])})` : build(child, [...path, key]);
    }
    return out;
  };
  return build(tokens[group], []);
}

export function tailwindTheme() {
  const space = refs('space');
  const size = refs('size');
  const fontSize = Object.fromEntries(
    Object.keys(tokens.fontSize).map((k) => [
      k,
      [`var(${varName(['fontSize', k])})`, { lineHeight: `var(${varName(['lineHeight', k])})` }],
    ]),
  );
  const fontFamily = Object.fromEntries(
    Object.keys(tokens.fontFamily).map((k) => [k, `var(${varName(['fontFamily', k])})`]),
  );
  return {
    colors: { transparent: 'transparent', current: 'currentColor', inherit: 'inherit', ...refs('color') },
    spacing: { ...space, ...size, px: '1px' },
    fontSize,
    fontFamily,
    fontWeight: refs('fontWeight'),
    borderRadius: { ...refs('radius'), DEFAULT: `var(${varName(['radius', 'lg'])})` },
    boxShadow: { ...refs('shadow'), DEFAULT: `var(${varName(['shadow', 'xs'])})` },
  };
}

export default tokens;
