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
      width: sizes,
      height: sizes,
      minWidth: sizes,
      maxWidth: sizes,
      minHeight: sizes,
      size: sizes,
    },
  },
};
