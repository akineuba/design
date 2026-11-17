## When to use
Filtering a **list page** table (Customers, Bills, Employees).

## Placement
- In the table toolbar, **left side, immediately after the search field**. Never on the right with the actions, never above the table card.
- Order on the left: Search → Filters. Order on the right: Export → Bulk Upload / Import → column picker → **Add New** (always last).

## How it behaves
- Clicking "Filters" opens a panel under the button, aligned to its left edge, over the table.
- Changes apply only on **Apply filters**. Reset clears every filter and applies straight away.
- When filters are active, the button turns blue and shows the count ("Filters 2"). The empty-state message must mention filters ("No customers match your filters").
- Escape or a click outside closes the panel without applying.
- Search and filters combine (AND). Changing either goes back to page 1.

## Content
Field labels end with a colon ("Status:"). Placeholders read "All …" ("All statuses") so the default is clear.

## When not to use
Report pages, where filters come before results → `FilterBar`.
