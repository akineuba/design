## When to use
Buttons start an action: create, save, apply, send. If it only navigates, use a link.

## Placement
- Table toolbars: search and Filter on the left, the primary **Create …** button on the right.
- Drawers and modals: footer, right-aligned, **Cancel (outline) then the primary action**.
- Mobile forms: full-width primary at the bottom; a text-only (ghost) "Save as draft" may sit beside or above it.

## Choosing a variant
| Variant | Use it when |
|---|---|
| `primary` | The main action of the page, drawer or modal. **One per area.** |
| `secondary` | Supporting actions beside a primary (Connection history, Export). |
| `outline` | Cancel / Clear all in footers and sheets. |
| `ghost` | Low-emphasis text actions (Save as draft). |
| `danger` | Deletes data. Always confirm first with `ConfirmDialog`. |

## States
| State | Use it when |
|---|---|
| Disabled | The action isn't available yet; say why nearby if it isn't obvious. |
| Loading | The action is running. The label stays so the width doesn't jump; double clicks are blocked. |

## Content
Verb first, sentence case, 1–3 words: "Create audience", "Send invitation". Icon-only buttons are `IconButton`.

## Don't
Put two primary buttons side by side, or use red for anything but the main action.
