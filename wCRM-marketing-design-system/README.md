# wCRM Marketing design system

Design tokens, React components and Storybook for the Wragby wCRM **Marketing** module, extracted from the
Figma page *marketing design updates*.

```bash
npm install
npm run storybook   # component workbench at http://localhost:6006
```

* **Tokens:** `tokens/tokens.json` → `npm run tokens` → CSS variables (`src/styles/tokens.css`) + Tailwind preset (`tailwind.preset.js`).
* **Components (17):** Button, IconButton, Input, Select, Checkbox, Switch, Badge, Tag, Avatar, Tabs, Menu, FilterPopover, Accordion, Modal/ConfirmDialog, Drawer, Table (with empty, loading and expandable rows) and Pagination. Behaviour from Radix UI, styling from the tokens.
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
