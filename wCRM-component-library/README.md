# wCRM design system

Design tokens and React components for the Wragby wCRM platform, with a Storybook that documents them. Extracted from the
Figma page *marketing design updates*.

```bash
npm install
npm run storybook   # component workbench at http://localhost:6006
```

* **Tokens:** `tokens/tokens.json` → `npm run tokens` → CSS variables (`src/styles/tokens.css`) + Tailwind preset (`tailwind.preset.js`).
* **Components (21 families):** Button, IconButton, FilterButton, ViewToggle (swap buttons), Input, Select, Checkbox, Switch, Badge, Tag, Avatar, Tabs (underline, pill, dot), Menu, FilterPopover, Accordion, Modal/ConfirmDialog, Drawer, Cards (stat, summary, metric, progress, module, activity), Table (contacts, email, campaign and social-post styles; empty, loading, expandable, compact), RowActions (menu, inline link, inline buttons) and Pagination. Behaviour from Radix UI, styling from the tokens.
* **Dark mode:** set `data-theme="dark"` on `<html>`; every component follows. Storybook has a Dark mode switch on the right of the toolbar.
* **Docs:** Storybook → *Overview/Foundations* for the full token sheet; `docs/figma-mapping.md` for Figma sources.
* **Contributors and AI assistants:** read [`CLAUDE.md`](./CLAUDE.md) first.

```
tokens/            tokens.json (source of truth)
scripts/           build-tokens.mjs, render-foundations.tsx
src/
  components/      one folder per component (component, stories, index); __tests__/
  docs/            Foundations page, Getting started
  icons/           outline icon set, Spinner, AlertCircle
  utils/           cn, focusFirstField
  styles/          index.css, tokens.css (generated)
  tokens/          tokens.ts (generated)
.storybook/        main, preview, manager theme
docs/              figma-mapping.md
```
