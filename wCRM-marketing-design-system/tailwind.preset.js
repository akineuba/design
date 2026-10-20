// Tailwind preset that maps every utility onto the CSS variables generated from
// tokens/tokens.json. Consuming apps add `presets: [require('wcrm-marketing-design-system/tailwind.preset')]`
// and import `src/styles/tokens.css` once. Never add raw hex or px values here.
import { readFileSync } from 'node:fs';

const tokens = JSON.parse(readFileSync(new URL('./tokens/tokens.json', import.meta.url), 'utf8'));

const v = (name) => `var(--${name})`;
const group = (prefix, entries, keyFn = (k) => k) =>
  Object.fromEntries(Object.keys(entries).map((k) => [keyFn(k), v(`${prefix}-${k.replace('.', '_')}`)]));

const colors = Object.fromEntries(
  Object.entries(tokens.color).map(([g, entries]) => [
    g,
    Object.fromEntries(Object.keys(entries).map((k) => [k, v(`color-${g}-${k}`)])),
  ]),
);

const fontSize = Object.fromEntries(
  Object.entries(tokens.typography).map(([name, t]) => [
    name,
    [
      v(`text-${name}-size`),
      {
        lineHeight: v(`text-${name}-line-height`),
        fontWeight: v(`text-${name}-weight`),
        ...(t.letterSpacing ? { letterSpacing: v(`text-${name}-letter-spacing`) } : {}),
      },
    ],
  ]),
);

/** @type {import('tailwindcss').Config} */
export default {
  plugins: [
    // fontSize tuples cannot carry text-transform, so typography tokens that set one get a companion rule.
    ({ addUtilities }) =>
      addUtilities(
        Object.fromEntries(
          Object.entries(tokens.typography)
            .filter(([, t]) => t.textTransform)
            .map(([name, t]) => [`.text-${name}`, { textTransform: t.textTransform }]),
        ),
      ),
  ],
  theme: {
    // Replace (not extend) the defaults so off-system values are unavailable.
    colors: { transparent: 'transparent', current: 'currentColor', ...colors },
    spacing: { ...group('space', tokens.space), px: '1px' },
    borderRadius: { none: '0px', ...group('radius', tokens.radius) },
    boxShadow: { none: 'none', ...group('shadow', tokens.shadow) },
    fontFamily: group('font', tokens.font.family),
    fontWeight: group('font-weight', tokens.font.weight),
    fontSize,
    extend: {
      height: group('size', tokens.size),
      width: group('size', tokens.size),
      maxWidth: group('size', tokens.size),
      minHeight: group('size', tokens.size),
      transitionDuration: { fast: v('motion-duration-fast') },
      transitionTimingFunction: { standard: v('motion-easing') },
    },
  },
};
