# Contributing

## Adding a token
Follow [Figma sync → Updating tokens](figma-sync.md#updating-tokens). Name tokens by role (`fg-muted`, `line-subtle`), not by colour (`grey-500`).

## Adding a component
1. **Search first.** Check `src/components/`, then the Figma screens (see `CLAUDE.md`, rule 2). Note the node ID you're matching.
2. Create `src/components/<Name>/` with `<Name>.tsx`, `<Name>.stories.tsx` and `index.ts`, and export it from `src/index.ts`.
3. Style only with token classes. No hex values, no arbitrary `[...]` values, no inline pixel styles.
4. Use `forwardRef`, spread native props, accept `className`, and keep variant classes in a typed `Record`.
5. Stories: one per Figma variant, a states matrix, and `parameters.design.url` linking to the Figma node.
6. Add `docs/components/<name>.md` (anatomy, variants, states, usage) and a row in the `CLAUDE.md` component table.
7. Run `npm run typecheck` and `npm run build-storybook` before opening a PR.
