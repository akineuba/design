# wBiz Design System

Design tokens and React components for wBizManager, built from the
[w-Biz Figma file](https://www.figma.com/design/TJAupALP2AYuN7NXNlY33g/w-Biz).

## Quick start

```bash
npm install
npm run storybook        # http://localhost:6006
```

| Script | What it does |
|---|---|
| `npm run storybook` | Storybook dev server with every component and token page |
| `npm run build-storybook` | Static Storybook in `storybook-static/` |
| `npm run build` | Regenerates tokens, builds `dist/index.js`, `dist/style.css` and type declarations |
| `npm run typecheck` | TypeScript check of components and stories |
| `npm run tokens` | Rewrites `src/styles/tokens.css` and `src/styles/theme.css` from `tokens/tokens.json` |

## Using it in an app

```tsx
import { Button, Input } from '@wbiz/design-system';
import '@wbiz/design-system/styles.css';

<Input label="Ref. Number" placeholder="JV-2026-00418" />
<Button leadingIcon={<PlusIcon />}>Create New</Button>
```

Apps on Tailwind CSS 4 can share the theme so their own markup uses the same tokens.
Import it after Tailwind in the app's stylesheet:

```css
/* app.css */
@import 'tailwindcss';
@import '@wbiz/design-system/tokens.css'; /* --wbiz-* variables */
@import '@wbiz/design-system/theme.css';  /* @theme mapping tokens to utilities */
```

Dark mode: set `data-theme="dark"` on `<html>` (or any container). The `--wbiz-*` tokens switch
and every component follows; `dark:` utilities use the same attribute.

The library is built with Tailwind CSS 4 through the `@tailwindcss/vite` plugin. There is no
`tailwind.config.js`: the theme is CSS, generated from `tokens/tokens.json`.

## Structure

```
tokens/            tokens.json (source of truth) and the CSS/Tailwind mappers
src/styles/        generated tokens.css and theme.css + Tailwind entry (index.css)
src/components/    Button, Input, Select, FilterDropdown, Table, StatusPill, Accordion, Modal,
                   Tabs, SegmentedControl, Switch, Sidebar, TopBar, PageHeader, Card, Spinner
src/icons/         Vuesax-style line icons used by the components
src/patterns/      full-screen reference layouts (Storybook only)
src/foundations/   Storybook token pages
docs/              foundations, component specs, Figma sync, contributing
CLAUDE.md          rules and token reference for AI-assisted code generation
```

See [docs/README.md](docs/README.md) for the full documentation.
