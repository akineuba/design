# iBroka design system: rules for building

- **Tokens only.** Every colour, size, radius and shadow comes from `tokens/tokens.json` through Tailwind classes (`bg-primary`, `text-fg-muted`, `rounded-xl`, `h-control-md`). No hex values, no `px` in components. Add a token (mark it `"derived": true` with a note if it isn't in Figma) before using a new value.
- **Icons** come from `src/icons.tsx` only: Phosphor, filled weight; bold for line-only glyphs. Add a named export there before using a new icon.
- **Reuse** library components before writing new markup. Check Storybook and `src/index.ts`.
- **Contrast:** text and filled controls must pass WCAG AA (4.5:1). `npm run contrast` checks the token pairs. The brand teal `#36A59E` is for marks, not text or fills.
- **Rules:** follow `ui-rules/ui-rules.md`. Part B lists open decisions; don't treat those as settled.
- **Docs:** every component has a story file (one story per state, with a Figma link in `parameters.design`) and a note in `instruction-notes/<Component>.md`.
- **Names** describe what a thing is (`SidePanel`), not one feature (`PolicyDrawer`).
- **Logo:** `npm run logo` regenerates `src/components/logo-paths.ts` and `public/*.svg`.
