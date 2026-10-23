## When to use
The trigger for a list's filters. Pair it with `FilterPopover` on desktop and a bottom sheet on mobile.

## Choosing a variant
| Display | Use it when |
|---|---|
| `labelled` | Desktop toolbars: calendar-outline icon + "Filter". |
| `icon` | Mobile toolbars: 40px square with the funnel icon. |
| `responsive` | One toolbar for both: labelled from `sm` up, icon-only below. |

## How it behaves
Pass `count` to show how many filters are applied; the button switches to its applied style. The accessible name includes the count.
