## When to use
Let users choose which table columns they see, plus report options (Include Inactive Accounts, Hide Zero-Balance Accounts, Show Subtotals).

## Placement
- One button everywhere: a **primary, icon-only** button showing the columns icon. No text label and no secondary version.
- **List pages:** in the toolbar's right group, just before Add New.
- **Report pages:** next to Export, top right of the table card.
- Its accessible name and hover tooltip is "Customize Columns" (or the `label` you pass, e.g. "Customize Invoice").

## How it behaves
- Opens a popup under the button, aligned to its right edge.
- Ticks are a draft: only **Apply** changes the table. Cancel, Escape or a click outside discard them.
- The column that identifies the record (Name, Account name) is locked on; the last visible column can't be turned off.
- The choice is saved per user, per table, and restored next time.
