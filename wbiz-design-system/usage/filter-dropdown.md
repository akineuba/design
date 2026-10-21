## When to use
Filtering a **list page** table from its toolbar. The "Filters" button sits right after the search field.

## When not to use
Report pages with a date range and many fields → `FilterBar`.

## States
| State | Use it when |
|---|---|
| Closed | Default. |
| Open | User is choosing filters. Apply closes it; Reset clears all. |
| Applied (count badge) | Filters are active. Always show the count so users know the list is filtered. |

## Content
Each field label ends with a colon ("Status:"). Placeholders read "All …" ("All statuses") so the default is clear.
