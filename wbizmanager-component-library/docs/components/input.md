# Input

Source: journal-entry fields on the accounting screens ([Journal Date / Ref. Number](https://www.figma.com/design/TJAupALP2AYuN7NXNlY33g/w-Biz?node-id=6309-33026)).

## Anatomy
Vertical stack with a 4px gap:
1. **Label**: Inter Medium 12/18, `fg-muted`. A red `*` shows when `required`.
2. **Field**: 40px tall, `surface` fill, 1px `line` border, 8px radius, 16px horizontal padding, 8px gap. Optional leading and trailing 20px icons.
3. **Message**: Inter Regular 14/20. Helper text in `fg-muted`, errors in `error`, success in `success-strong`.

## States
| State | Treatment |
|---|---|
| Default | `line` border |
| Hover | `line-strong` border (derived) |
| Focus | `primary` border + `shadow-focus` (derived) |
| Error | `error` border, red message, `aria-invalid` |
| Success | `success` border and message |
| Disabled | `surface-muted` fill, `line-subtle` border, `fg-disabled` text |
| Read-only | `surface-muted` fill, text stays readable |
| Loading | Spinner in the trailing slot, `aria-busy` |

Sizes: `sm` 34px, `md` 40px (default), `lg` 46px.

## Usage
- Always give a `label`. For search fields without a visible label, pass `aria-label`.
- Write errors that say what to fix: "Reference must start with JV- and a four-digit year."
- Date and select-style fields use `trailingIcon` (calendar, chevron). A dedicated Select component should come next.
