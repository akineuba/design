## When to use
**Report pages** (General ledger, Trial balance, statements, aging reports), where the user picks filters **before** results load.

## Placement
- Full width, **directly under the page title (and tabs)**, above the report heading and the table. Never inside the table card.
- Row 1: the one or two filters everyone uses (usually Date) → "More Filters" → Apply.
- Row 2 (when "More Filters" is open): secondary filters in a line, wrapping as needed, with "Advanced" at the far right.

## How it behaves
| State | What happens |
|---|---|
| Default | Main fields, "More Filters" and Apply. |
| More Filters open | The toggle turns tinted and a divider plus the second row appear. Closing it keeps the values. |
| Applying | Apply shows a spinner while the report loads; fields stay editable. |
| Advanced | Opens a side panel with the full filter set. Show it only when that panel exists. |

- Nothing refreshes until **Apply**: reports can be slow, so don't reload on every change.
- The report heading under the bar repeats the applied range ("From 1st Aug 2025 to 8th Aug 2025").

## When not to use
List pages with a toolbar → `FilterDropdown`.
