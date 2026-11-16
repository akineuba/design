import { readFileSync } from 'node:fs';
import dsPreset from '../wCRM-marketing-design-system/tailwind.preset.js';

// The design-system preset replaces Tailwind's defaults with the wCRM tokens; this config only *extends*
// it with the website tokens from tokens/site-tokens.json. Never add raw hex or px values here.
const site = JSON.parse(readFileSync(new URL('./tokens/site-tokens.json', import.meta.url), 'utf8'));
const v = (name) => `var(--${name})`;
const key = (k) => k.replace(/\./g, '_');
const group = (prefix, entries) => Object.fromEntries(Object.keys(entries).map((k) => [k, v(`${prefix}-${key(k)}`)]));

const colors = Object.fromEntries(
  Object.entries(site.color).map(([g, entries]) => [g, Object.fromEntries(Object.keys(entries).map((k) => [k, v(`color-${g}-${k}`)]))]),
);
const fontSize = Object.fromEntries(
  Object.keys(site.typography).map((name) => [
    name,
    [v(`text-${name}-size`), { lineHeight: v(`text-${name}-line-height`), fontWeight: v(`text-${name}-weight`) }],
  ]),
);
const sizes = group('size', site.size);

/** @type {import('tailwindcss').Config} */
export default {
  presets: [dsPreset],
  content: ['./index.html', './src/**/*.{ts,tsx}', '../wCRM-marketing-design-system/src/components/**/*.tsx'],
  theme: {
    extend: {
      colors,
      fontFamily: group('font', site.font.family),
      fontSize,
      lineHeight: group('leading', site.lineHeight),
      spacing: group('space', site.space),
      borderRadius: group('radius', site.radius),
      boxShadow: group('shadow', site.shadow),
      backgroundImage: group('gradient', site.gradient),
      scale: group('scale', site.scale),
      transitionDuration: { 'site-slow': v('motion-site-duration-slow') },
      // Website motion. Durations and easing are the design-system motion tokens (fast 120ms, base 200ms).
      keyframes: {
        'fade-out': { from: { opacity: '1' }, to: { opacity: '0' } },
        'pop-out': { from: { opacity: '1', transform: 'none' }, to: { opacity: '0', transform: 'translateY(4px) scale(0.98)' } },
        'menu-in': { from: { opacity: '0', transform: 'translateY(-6px) scale(0.98)' }, to: { opacity: '1', transform: 'none' } },
        'menu-out': { from: { opacity: '1', transform: 'none' }, to: { opacity: '0', transform: 'translateY(-6px) scale(0.98)' } },
        'page-in': { from: { opacity: '0', transform: 'translateY(8px)' }, to: { opacity: '1', transform: 'none' } },
        'swap-in': { from: { opacity: '0', transform: 'translateX(12px)' }, to: { opacity: '1', transform: 'none' } },
        'value-in': { from: { opacity: '0', transform: 'translateY(-4px)' }, to: { opacity: '1', transform: 'none' } },
        'pop-bounce': { '0%': { opacity: '0', transform: 'scale(0.6)' }, '60%': { opacity: '1', transform: 'scale(1.06)' }, '100%': { transform: 'scale(1)' } },
        shake: { '0%, 100%': { transform: 'none' }, '20%, 60%': { transform: 'translateX(-4px)' }, '40%, 80%': { transform: 'translateX(4px)' } },
      },
      animation: {
        'fade-out': 'fade-out var(--motion-duration-fast) var(--motion-easing) forwards',
        'pop-out': 'pop-out var(--motion-duration-fast) var(--motion-easing) forwards',
        'menu-in': 'menu-in var(--motion-duration-base) var(--motion-easing)',
        'menu-out': 'menu-out var(--motion-duration-fast) var(--motion-easing) forwards',
        'page-in': 'page-in var(--motion-site-duration-slow) var(--motion-easing) both',
        'swap-in': 'swap-in var(--motion-duration-base) var(--motion-easing) both',
        'value-in': 'value-in var(--motion-duration-base) var(--motion-easing) both',
        'pop-bounce': 'pop-bounce var(--motion-site-duration-slow) var(--motion-easing) both',
        shake: 'shake var(--motion-site-duration-slow) var(--motion-easing)',
      },
      width: sizes,
      height: sizes,
      minWidth: sizes,
      maxWidth: sizes,
      minHeight: sizes,
      size: sizes,
    },
  },
};
