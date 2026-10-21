## When to use
Buttons start an action: save, create, export, open a panel or modal. If it only navigates to another page, use a link.

## Placement
- Table toolbars: secondary actions first, **Add New (primary) last on the right**.
- Panels, modals and popups: footer, right-aligned, **Cancel (outline) then the primary action**.
- Page-level actions sit in the `PageHeader`, right side; don't repeat a toolbar's Add New there.

## Choosing a variant
| Variant | Use it when |
|---|---|
| `primary` | The main action of the page, panel or popup (Add New, Save, Apply, Publish). **One per area.** |
| `secondary` | Supporting actions next to a primary (Export, Bulk Upload, Import, Settings). |
| `outline` | **Cancel** in side panels, modals and popups. |
| `tertiary` | Low-emphasis actions inside content (Reset, Clear). |
| `destructive` | Deletes or clears data. Always confirm in a centred `Modal` first. |

## States
| State | Use it when |
|---|---|
| Disabled | The action isn't available yet. If the reason isn't obvious, say it nearby. |
| Loading | The action is running. Keep the label and block double clicks; leave other buttons alone unless they conflict. |

## Content
- Verb first, title case, 1–3 words: "Add New", "Save", "Export", "Receive Payment".
- Icons go before the label: plus = create, tick-circle = save/apply, close-circle = cancel, pen = edit.
- Icon-only buttons need an `aria-label`.

## Don't
Put two primary buttons side by side, or use a purple "soft" button (it isn't part of the system).
