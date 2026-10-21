# Contributing

## Adding a token
Follow [Figma sync → Updating tokens](figma-sync.md#updating-tokens). Name tokens by role (`fg-muted`, `line-subtle`), not by colour (`grey-500`).

## Adding a component
1. **Search first.** Check `src/components/`, then the Figma screens (see `CLAUDE.md`, rule 2). Note the node ID you're matching.
2. Create `src/components/<Name>/` with `<Name>.tsx`, `<Name>.stories.tsx` and `index.ts`, and export it from `src/index.ts`.
3. Style only with token classes. No hex values, no arbitrary `[...]` values, no inline pixel styles.
4. Use `forwardRef`, spread native props, accept `className`, and keep variant classes in a typed `Record`.
5. Stories: one per Figma variant, a states matrix, and `parameters.design.url` linking to the Figma node.
6. Add `docs/components/<name>.md` (anatomy, variants, states) and a row in the `CLAUDE.md` component table.
7. Add `instruction-notes/<name>.md` (kebab-case of the component name): when and how to use it, behaviour, placement, which state to pick. It appears on the component's Docs tab automatically. If it introduces a platform-wide rule, add it to `ui-rules/ui-rules.md` Part B for design to vet.
8. Run `npm run typecheck` and `npm run build-storybook` before opening a PR.

## Editing Instruction Notes and UI Rules
Anyone can change `instruction-notes/*.md` and `ui-rules/ui-rules.md` without touching code: on GitHub open the file and
use the pencil icon, or follow the "Edit this note" / "Edit these rules" links in Storybook.
See [`instruction-notes/README.md`](../instruction-notes/README.md) and [`ui-rules/README.md`](../ui-rules/README.md).
