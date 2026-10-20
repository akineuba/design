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
| `npm run tokens` | Rewrites `src/styles/tokens.css` from `tokens/tokens.json` |

## Using it in an app

```tsx
import { Button, Input } from '@wbiz/design-system';
import '@wbiz/design-system/styles.css';

<Input label="Ref. Number" placeholder="JV-2026-00418" />
<Button leadingIcon={<PlusIcon />}>Create New</Button>
```

Apps that use Tailwind can share the theme so their own markup uses the same tokens:

```js
// tailwind.config.js
import wbiz from '@wbiz/design-system/tailwind.config';
export default { presets: [wbiz], content: ['./src/**/*.{ts,tsx}'] };
```

## Structure

```
tokens/            tokens.json (source of truth) and the CSS/Tailwind mappers
src/styles/        generated tokens.css + Tailwind entry
src/components/    Button, Input, Select, FilterDropdown, Table, StatusPill, Accordion, Modal,
                   Tabs, SegmentedControl, Switch, Sidebar, TopBar, PageHeader, Card, Spinner
src/icons/         Vuesax-style line icons used by the components
src/patterns/      full-screen reference layouts (Storybook only)
src/foundations/   Storybook token pages
docs/              foundations, component specs, Figma sync, contributing
CLAUDE.md          rules and token reference for AI-assisted code generation
```

See [docs/README.md](docs/README.md) for the full documentation.
