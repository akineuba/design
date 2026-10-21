## When to use
Lists of records (customers, bills, accounts, employees) and reports (trial balance, ledgers).

## Placement
Inside a `TableCard` under the page title. Toolbar layout: **left** Search → Filters; **right** Export → Bulk Upload / Import → column picker → Add New. Pagination at the bottom right.

## How it behaves
- **Add New** opens a right-hand `SidePanel`, not a page. **Row click** or **View** opens the same panel in view mode; **Edit** opens it in edit mode.
- After a save, the list refreshes and the changed row is highlighted.
- **Selection**: ticking rows reveals bulk actions; the header box selects the visible page.
- **Sorting**: click a sortable header to cycle descending → ascending → off. Sort on names, dates, numbers and amounts; never on status or actions.
- **Row actions** (⋮): View, Edit, Delete, then related actions. Delete asks for confirmation in a centred modal.
- **Columns**: tables with more than ~6 columns, and every report, have the column picker. Remember each user's choice.
- Search, filters, sort and page size combine; changing any of them goes back to page 1.

## Choosing a style
| Style | Use it when |
|---|---|
| Standard | Most list pages. |
| With avatars | The record is a person: customers, employees, candidates, users. |
| Hierarchical | Records have parents: Chart of Accounts, cost centres, item categories. |
| Grouped report | Reports with sections and totals. |
| Comfortable density | Short lists with richer cells. Default is 44px rows. |

## States
| State | Use it when |
|---|---|
| Loading | First load and page changes. Skeleton rows; the toolbar stays usable. |
| Empty, no data | Nothing created yet: say what belongs here and how to add the first one. |
| Empty, no results | Search or filters matched nothing: say so and offer to clear filters. |

## Content
- The first column is the record's name or number, in dark medium text; other cells are grey.
- Drill-down values (codes, document numbers) are blue links.
- Overdue dates and balances are red, with a second line ("Overdue by 5 days").
- Amounts: "₦ 10,000.00".
