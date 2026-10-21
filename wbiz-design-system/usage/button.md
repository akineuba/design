## When to use
Buttons start an action: save, create, export, open a panel. If it takes the user to another page, use a link.

## Choosing a variant
| Variant | Use it when |
|---|---|
| `primary` | The main action of the page, panel or popup (Add New, Save, Apply, Publish). **One per area.** |
| `secondary` | Supporting toolbar actions next to a primary (Export, Bulk Upload, Import, Settings). |
| `outline` | **Cancel** in side panels, popups and modals. Always to the left of the primary action. |
| `tertiary` | Low-emphasis actions inside content (Reset filters, Clear). |
| `destructive` | Deletes or clears data. Ask for confirmation in a `Modal` first. |

## States
| State | Use it when |
|---|---|
| Disabled | The action is not available yet (form incomplete). Explain why nearby if it is not obvious. |
| Loading | The action is running (saving, exporting). Keep the label; don't disable other buttons unless they conflict. |

## Content
- Verb first, title case, 1–3 words: "Add New", "Save", "Export", "Receive Payment".
- Icons go before the label: plus for create, tick-circle for save, close-circle for cancel.
- Icon-only buttons need an `aria-label`.

## Do and don't
- **Do** put Cancel (outline) then the primary action, right-aligned.
- **Don't** use two primary buttons side by side, or a purple/"soft" button. It isn't part of the system.
