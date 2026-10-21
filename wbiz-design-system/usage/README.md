# Usage guidance

One Markdown file per component. Each file is shown at the top of that component's **Docs** tab in
Storybook under "Usage guidance", so designers and PMs can change the guidance without touching code.

## Editing

- **On GitHub:** open the file below, click the pencil icon, edit, and commit (or open a pull request).
- **Locally:** edit the file; Storybook reloads it while `npm run storybook` is running.
- Every Docs page also has an "Edit this guidance" link that opens the file in the GitHub editor.

## File naming

The file name is the component name in kebab-case: `Button` → `button.md`, `SidePanel` → `side-panel.md`,
`ColumnCustomizer` → `column-customizer.md`. A component without a file simply shows no guidance section.

## Suggested sections

Keep the headings below so pages stay consistent. Plain Markdown: headings, lists, tables, **bold**, `code`.

```md
## When to use
## When not to use
## Choosing a variant or state
| State | Use it when |
|---|---|
## Content
## Do and don't
```

Write for the person building a screen: what to pick and why, in short sentences. Visual specs
(sizes, colours, Figma nodes) belong in `docs/components/`, not here.
