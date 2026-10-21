## When to use
Report pages (General ledger, Trial balance, statements, aging reports) where filters are chosen **before** results load.

## States
| State | Use it when |
|---|---|
| Default | Show the one or two filters everyone uses (usually Date), "More Filters" and Apply. |
| More Filters open | Secondary filters (name, account, class, dimensions). The toggle turns tinted. |
| Applying | Results are loading after Apply. |
| Advanced | Offer only when there is a full advanced-filter screen or panel to open. |

## Do and don't
- **Do** keep Apply explicit; reports can be slow, so don't refresh on every change.
- **Don't** use it on simple list pages; use `FilterDropdown` there.
