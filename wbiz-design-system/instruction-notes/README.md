# Instruction Notes

An **Instruction Note** says *when* and *how* to use a component: where it sits on the screen, how
it behaves, and which variant or state to pick. There is one Markdown file per component. Each note
appears at the top of that component's **Docs** tab in Storybook, under "Instruction Note".

Platform-wide rules that cover more than one component (e.g. "adding new data never opens a whole
page") live in [`../ui-rules/ui-rules.md`](../ui-rules/ui-rules.md). Notes link to those rules
instead of repeating them.

## Editing
- **On GitHub:** open the file, click the pencil icon, edit, commit (or open a pull request).
- **From Storybook:** every Docs page has an "Edit this note" link to the file in the GitHub editor.
- **Locally:** edit the file; Storybook reloads it while `npm run storybook` is running.

## File naming
The component name in kebab-case: `Button` → `button.md`, `SidePanel` → `side-panel.md`,
`StageProgress` → `stage-progress.md`. A component without a file shows no note.

## Template
Keep these headings so notes read the same everywhere. Leave out a section that doesn't apply.

```md
## When to use
## When not to use
## How it behaves
## Placement
## Choosing a variant or state
| Variant / state | Use it when |
|---|---|
## Content
## Don't
```

Write for the person building a screen, in short sentences. Visual specs (sizes, colours, Figma
nodes) belong in `docs/components/`, not here.
