// Reads tokens.json and exposes it two ways:
//   cssVariables()  -> the :root block written to src/styles/tokens.css
//   themeCss()      -> the Tailwind 4 @theme block written to src/styles/theme.css
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

// Tailwind 4 theme namespace for each token group, e.g. color.fg.muted -> --color-fg-muted.
// Each namespace is reset first, so Tailwind's default palette and scale are unavailable:
// only wBiz tokens can be used. Other namespaces (breakpoints, easing, line height and so on)
// keep Tailwind's defaults.
const NAMESPACES = [
  ['color', 'color'],
  ['space', 'spacing'],
  ['size', 'spacing'],
  ['fontSize', 'text'],
  ['fontFamily', 'font'],
  ['fontWeight', 'font-weight'],
  ['radius', 'radius'],
  ['shadow', 'shadow'],
];

// Theme key for a token path: dots in keys are escaped (space.0.5 -> --spacing-0\.5) and
// DEFAULT is dropped (color.primary.DEFAULT -> --color-primary).
const themeKey = (ns, path) => {
  const rest = path.filter((p) => p !== 'DEFAULT').map((p) => String(p).replace('.', '\\.'));
  return `--${[ns, ...rest].join('-')}`;
};

// The `@theme inline` block written to src/styles/theme.css. `inline` makes utilities point
// straight at the --wbiz-* variables, so overriding a token on any element restyles it.
export function themeCss() {
  const lines = [];
  const reset = new Set();
  for (const [group, ns] of NAMESPACES) {
    if (!reset.has(ns)) {
      lines.push(`${lines.length ? '\n' : ''}  --${ns}-*: initial;`);
      reset.add(ns);
    }
    walk(tokens[group], [], (path) => {
      const ref = `var(${varName([group, ...path])})`;
      lines.push(`  ${themeKey(ns, path)}: ${ref};`);
      if (group === 'fontSize') {
        lines.push(`  ${themeKey(ns, path)}--line-height: var(${varName(['lineHeight', ...path])});`);
      }
    });
    if (group === 'size') lines.push('  --spacing-px: 1px;');
  }
  // Bare `rounded` and `shadow` utilities.
  lines.push('', `  --radius: var(${varName(['radius', 'lg'])});`, `  --shadow: var(${varName(['shadow', 'xs'])});`);

  // Tailwind 4 has no theme namespace for background images, so gradients become utilities.
  const utilities = [];
  walk(tokens.gradient, [], (path) => {
    const name = path.filter((p) => p !== 'DEFAULT').join('-');
    utilities.push(`@utility bg-${name} {\n  background-image: var(${varName(['gradient', ...path])});\n}`);
  });

  return `@theme inline {\n${lines.join('\n')}\n}\n\n${utilities.join('\n\n')}\n`;
}

export default tokens;
