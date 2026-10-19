# Button

Source: `_Button base` frames on the accounting screens ([primary](https://www.figma.com/design/TJAupALP2AYuN7NXNlY33g/w-Biz?node-id=6125-58412)).

## Anatomy
Horizontal Auto Layout → `inline-flex`, 8px gap, 10/16 padding, 40px tall, 8px radius, 1px border, Inter Medium 14/20, optional 20px icon before or after the label.

## Variants
| `variant` | Figma example | Fill / border / label |
|---|---|---|
| `primary` | Create New, Receive Payment | primary / primary / fg-inverse + shadow-xs |
| `secondary` | Import | surface / line / fg |
| `tertiary` | Tertiary | none / none / fg-muted |
| `soft` | Secondary (purple) | accent-subtle / accent-subtle / accent + shadow-xs |
| `destructive` | Clear all lines | surface / error / error |

Sizes: `sm` 34px, `md` 40px (default), `lg` 46px. `iconOnly` makes a square button and needs `aria-label`.

## States
- **Hover**: darker fill (primary) or `surface-muted` (others). Not drawn in Figma; uses derived tokens.
- **Focus**: `shadow-focus` ring on keyboard focus only.
- **Disabled**: primary turns `surface-disabled` with white text, matching the inventory screens. Other variants fade to `fg-disabled`.
- **Loading**: a spinner replaces the leading icon, the label stays, `aria-busy` is set and clicks are ignored. Colours stay the same because it's a busy state, not an unavailable one.

## Usage
- One primary button per view or form section.
- Use `destructive` only for irreversible actions, and confirm them first.
- Labels are verbs in title case, matching the screens: "Create New", "Save and Send".
