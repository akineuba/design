// Tailwind preset that maps every utility onto the CSS variables generated from
// tokens/tokens.json. Consuming apps add `presets: [require('wcrm-marketing-design-system/tailwind.preset')]`
// and import `src/styles/tokens.css` once. Never add raw hex or px values here.
import { readFileSync } from 'node:fs';

const tokens = JSON.parse(readFileSync(new URL('./tokens/tokens.json', import.meta.url), 'utf8'));

const v = (name) => `var(--${name})`;
const group = (prefix, entries, keyFn = (k) => k) =>
  Object.fromEntries(Object.keys(entries).map((k) => [keyFn(k), v(`${prefix}-${k.replace(/\./g, '_')}`)]));

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
    backgroundImage: { none: 'none', ...group('gradient', tokens.gradient) },
    fontFamily: group('font', tokens.font.family),
    fontWeight: group('font-weight', tokens.font.weight),
    fontSize,
    // Letter spacing and line height are replaced too: only the Figma values exist (tracking-wide, leading-140, …).
    letterSpacing: group('tracking', tokens.letterSpacing),
    lineHeight: group('leading', tokens.lineHeight),
    extend: {
      // Extend (not replace) so Tailwind's 0/1/2/4/8 widths stay available alongside the Figma 0.5 and 1.5.
      borderWidth: group('border-width', tokens.borderWidth),
      strokeWidth: group('stroke-width', tokens.strokeWidth),
      height: group('size', tokens.size),
      width: group('size', tokens.size),
      minWidth: group('size', tokens.size),
      size: group('size', tokens.size),
      maxWidth: group('size', tokens.size),
      minHeight: group('size', tokens.size),
      keyframes: {
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        'pop-in': { from: { opacity: '0', transform: 'translateY(4px) scale(0.98)' }, to: { opacity: '1', transform: 'none' } },
        'slide-in-right': { from: { transform: 'translateX(100%)' }, to: { transform: 'none' } },
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
        shimmer: { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.5' } },
      },
      animation: {
        'fade-in': 'fade-in var(--motion-duration-fast) var(--motion-easing)',
        'pop-in': 'pop-in var(--motion-duration-fast) var(--motion-easing)',
        'slide-in-right': 'slide-in-right var(--motion-duration-base) var(--motion-easing)',
        'accordion-down': 'accordion-down var(--motion-duration-base) var(--motion-easing)',
        'accordion-up': 'accordion-up var(--motion-duration-base) var(--motion-easing)',
        shimmer: 'shimmer 1.4s ease-in-out infinite',
      },
      transitionDuration: { fast: v('motion-duration-fast'), base: v('motion-duration-base') },
      transitionTimingFunction: { standard: v('motion-easing') },
    },
  },
};
