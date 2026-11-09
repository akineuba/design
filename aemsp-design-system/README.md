# AEMSP Design System

React components, design tokens and page patterns for AEMSP, documented in Storybook. Built from the AEMSP Figma file.

Published Storybook: https://claude.ai/artifact/GYYqpZBzLiGjGgtgLw9asb

## Run it

```bash
npm install
npm run icons        # bundles the Iconify icons listed in scripts/icon-map.json
npm run storybook    # http://localhost:6006
```

`npm run build-storybook` builds the static site into `storybook-static/`.

## Layout

| Path | What |
| --- | --- |
| `src/styles/tokens.css` | Colour, type, spacing, radius and shadow tokens, light and dark (`[data-theme="dark"]`) |
| `src/styles/components.css` | Component styles (`ae-` prefix) |
| `src/components/` | Components: primitives, forms, layout (sidebar, top bar), data (table, filters), overlays, charts, AEMSP domain |
| `src/stories/` | Storybook stories, the UI Rules and Introduction docs, and example pages |
| `src/data.ts` | Sample data used by stories |
| `scripts/` | Icon bundling (`icon-map.json` maps app names to Iconify icons) |

Fonts: LINE Seed JP (logo, titles) and Inter (UI), self-hosted via `@fontsource`.
