const plugin = require('tailwindcss/plugin');
const { tokens, light, dark, nested, varName } = require('./tokens/build.cjs');

const fontSize = Object.fromEntries(
  Object.keys(tokens.fontSize).map((k) => [
    k,
    [`var(${varName(['fontSize', k])})`, { lineHeight: `var(${varName(['lineHeight', k])})` }],
  ]),
);

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx,mdx}', './.storybook/**/*.{ts,tsx}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    colors: { transparent: 'transparent', current: 'currentColor', white: '#FFFFFF', ...nested(tokens.color, ['color']) },
    fontFamily: { sans: `var(${varName(['fontFamily', 'sans'])})` },
    fontSize,
    borderRadius: { ...nested(tokens.radius, ['radius']), DEFAULT: `var(${varName(['radius', 'md'])})` },
    boxShadow: { ...nested(tokens.shadow, ['shadow']), none: 'none' },
    extend: {
      // Token spacing matches Tailwind's default 4px scale step for step, plus 4.5 (18px) and 7.5 (30px).
      spacing: nested(tokens.space, ['space']),
      width: nested(tokens.size, ['size']),
      height: nested(tokens.size, ['size']),
      size: nested(tokens.size, ['size']),
      minWidth: nested(tokens.size, ['size']),
      maxWidth: nested(tokens.size, ['size']),
      minHeight: nested(tokens.size, ['size']),
      keyframes: {
        'slide-in-right': { from: { transform: 'translateX(100%)' }, to: { transform: 'translateX(0)' } },
        'fade-in': { from: { opacity: '0', transform: 'translateY(4px)' }, to: { opacity: '1', transform: 'none' } },
      },
      animation: {
        'slide-in-right': 'slide-in-right 200ms ease-out',
        'fade-in': 'fade-in 150ms ease-out',
      },
    },
  },
  plugins: [
    plugin(({ addBase }) => {
      addBase({
        ':root': { ...light, colorScheme: 'light' },
        '[data-theme="dark"]': { ...dark, colorScheme: 'dark' },
      });
    }),
  ],
};
