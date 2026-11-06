# Colour

Tokens live under `color` in `tokens/tokens.json` and are exposed as `--wbiz-color-*` variables and Tailwind classes (`bg-primary`, `text-fg-muted`, `border-line`).

## Roles

- **primary**: the wBiz blue (#0070FF). Primary buttons, links, selected states. It is by far the most-used colour on the product screens.
- **fg**: text, from `fg-strong` (headings, values) through `fg` and `fg-muted` (body, labels) to `fg-placeholder` and `fg-disabled`.
- **line**: borders. `line-subtle` for dividers and cards, `line` for interactive controls, `line-strong` for hover.
- **surface**: backgrounds. `surface-page` behind everything, `surface` for cards and fields, `surface-muted` for hover and read-only, `surface-sunken` for the global search.
- **status**: tinted pairs (`status-*-fg` on `status-*-bg`) for status pills: warning, info, neutral, success, and a derived error.
- **navigation**: `primary-tint` for the active sidebar item, `surface-sunken` for the sidebar, `surface-control` for the theme toggle, `badge` for notification counts.
- **success / error / warning**: status. Never use them for decoration.

## Derived colours

`primary-hover`, `success-subtle`, `error-subtle`, `status-error-bg` and `overlay` are computed with `color-mix()` from Figma colours, because the screens don't draw hover or tinted status states. Replace them with designed values when they exist.

## Contrast (WCAG 2.1, on `surface` unless noted)

| Pair | Ratio | AA for 14px text? |
|---|---|---|
| `fg` #344054 | 10.46:1 | Pass |
| `fg-muted` #667085 | 4.97:1 | Pass |
| `fg-inverse` on `primary` #0070FF | 4.41:1 | **Fails narrowly** (needs 4.5) |
| `error` #FF2E3B | 3.68:1 | **Fails** for message text |
| `success-strong` #00C167 | 2.38:1 | **Fails** for message text |
| `fg-placeholder` #C1C4CB | 1.75:1 | Fails (exempt for placeholder text only) |
| Pill: Pending Approval (warning) | 1.57:1 | **Fails** |
| Pill: Completed (success) | 2.11:1 | **Fails** |
| Pill: Rejected (error, derived) | 3.2:1 | **Fails** |
| Pill: Ready for Issue (info) | 4.07:1 | **Fails narrowly** |
| Pill: Partially Issued (neutral) | 4.14:1 | **Fails narrowly** |

These colours come straight from the Figma screens and are kept as-is. Raise these failures with design; the yellow Pending Approval pill is the most urgent. A slightly darker primary (around #0066E8) would pass, and the error and success message text needs darker shades. Until then, error and success messages never rely on colour alone: the field border and the message wording also carry the state.

## Dark mode

Every colour token, and the shadows that need it, has a `dark` value in `tokens/tokens.json`. `npm run tokens` writes them to a `[data-theme='dark']` block in `src/styles/tokens.css`, so dark mode applies to any element with `data-theme="dark"` and everything inside it. Set it on `<html>` for a whole app. Components need no changes: their utilities point at the `--wbiz-*` variables, which the block swaps. For the rare style that must differ by theme, use the `dark:` variant (it follows the same attribute).

The Figma file has no dark designs, so **all dark values are derived**: neutral greys for surfaces, lines and text (darkest `surface-page`, then `surface`, then `surface-muted`), and lighter tints of the brand, status and tile colours so they read on dark surfaces. `fg-inverse` stays white (text on primary) and `fg-black` turns white (it is "highest-contrast label", not literally black). Replace them with designed values when design produces a dark theme.

In Storybook, switch with the Light/Dark tab on the right edge of every story and docs page, the Theme menu in the toolbar, or the moon/sun button in the pattern pages' top bar. The choice is kept in the URL (`&globals=theme:dark`).

The logo has no dark asset; in dark mode `Logo` inverts the PNG and rotates its hues back so the wordmark reads. Ask design for a proper dark logo.

### Dark contrast (on `surface` #161B26)

| Pair | Ratio | AA for 14px text? |
|---|---|---|
| `fg` #D0D5DD | 11.69:1 | Pass |
| `fg-muted` #98A2B3 | 6.69:1 | Pass |
| `primary` #2B84FF as text | 4.80:1 | Pass |
| `fg-inverse` on `primary` | 3.59:1 | **Fails** |
| `error` #F97066 | 6.18:1 | Pass |
| `success-strong` #47CD89 | 8.50:1 | Pass |
| `fg-placeholder` #667085 | 3.46:1 | Fails (exempt for placeholder text only) |
| Pills: warning / success / error / info / neutral | 9.33 / 6.26 / 4.90 / 5.28 / 5.53:1 | Pass |

One primary blue can't pass both as link text on dark surfaces and under white button labels. #2B84FF favours text and links; button labels on primary fall short, as they narrowly do in light mode.
