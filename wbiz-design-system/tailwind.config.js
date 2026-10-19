import { tailwindTheme } from './tokens/index.mjs';

/**
 * The theme is replaced (not extended) for colours, spacing, type, radius and shadow,
 * so Tailwind's default palette and scale are unavailable. Only wBiz tokens can be used.
 * @type {import('tailwindcss').Config}
 */
export default {
  content: ['./src/**/*.{ts,tsx,mdx}', './.storybook/**/*.{ts,tsx}'],
  theme: {
    ...tailwindTheme(),
    extend: {},
  },
  plugins: [],
};
