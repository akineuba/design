# Colour

Tokens live under `color` in `tokens/tokens.json` and are exposed as `--wbiz-color-*` variables and Tailwind classes (`bg-primary`, `text-fg-muted`, `border-line`).

## Roles

- **primary**: the wBiz blue (#0070FF). Primary buttons, links, selected states. It is by far the most-used colour on the product screens.
- **fg**: text, from `fg-strong` (headings, values) through `fg` and `fg-muted` (body, labels) to `fg-placeholder` and `fg-disabled`.
- **line**: borders. `line-subtle` for dividers and cards, `line` for interactive controls, `line-strong` for hover.
- **surface**: backgrounds. `surface-page` behind everything, `surface` for cards and fields, `surface-muted` for hover and read-only, `surface-sunken` for the global search.
- **accent**: purple used only by the soft button.
- **success / error / warning**: status. Never use them for decoration.

## Derived colours

`primary-hover`, `accent-muted`, `success-subtle` and `error-subtle` are computed with `color-mix()` from Figma colours, because the screens don't draw hover or tinted status states. Replace them with designed values when they exist.

## Contrast (WCAG 2.1, on `surface` unless noted)

| Pair | Ratio | AA for 14px text? |
|---|---|---|
| `fg` #344054 | 10.46:1 | Pass |
| `accent` on `accent-subtle` | 6.16:1 | Pass |
| `fg-muted` #667085 | 4.97:1 | Pass |
| `fg-inverse` on `primary` #0070FF | 4.41:1 | **Fails narrowly** (needs 4.5) |
| `error` #FF2E3B | 3.68:1 | **Fails** for message text |
| `success-strong` #00C167 | 2.38:1 | **Fails** for message text |
| `fg-placeholder` #C1C4CB | 1.75:1 | Fails (exempt for placeholder text only) |

These colours come straight from the Figma screens and are kept as-is. Raise the three failures with design. A slightly darker primary (around #0066E8) would pass, and the error and success message text needs darker shades. Until then, error and success messages never rely on colour alone: the field border and the message wording also carry the state.
