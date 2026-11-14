# iBroka Design System

Design tokens, React components and Storybook docs for **iBroka**, the ERP for insurance brokers. Built from the [iBroka v2 Figma file](https://www.figma.com/design/TiBSQBxrErJvtrBwZxRsY9/iBroka-v2) in the same structure as the wBiz design system, and sharing its UI rules.

```bash
npm install
npm run storybook        # http://localhost:6006
npm run build-storybook  # static site in storybook-static/
npm run typecheck
npm run contrast         # WCAG checks on token pairs
```

| Folder | What's in it |
|---|---|
| `tokens/tokens.json` | Every colour (light and dark), type size, space, radius, shadow and size. Feeds CSS variables (`--ib-*`) and the Tailwind theme. |
| `src/components/` | General components (Button, Table, SidePanel, Sidebar, Charts…). |
| `src/insurance/` | Broker-specific components (PolicyCard, ExpiryBadge, Money, InsurerChip, PremiumBreakdown, DocumentList). |
| `src/patterns/` | Full screens rebuilt from the Figma frames. |
| `src/icons.tsx` | The icon set: Phosphor, filled. |
| `instruction-notes/` | One Markdown note per component, shown at the top of its Docs page. |
| `ui-rules/ui-rules.md` | Platform rules (Part A) and open questions from the build (Part B). |
