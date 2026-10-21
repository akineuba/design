## When to use
Lists of records (customers, bills, accounts, employees) and reports (trial balance, ledgers). Accounting screens are the reference.

## Choosing a table style
| Style | Use it when |
|---|---|
| Standard (`DataTable` + toolbar) | Most list pages. Search + Filters left; Export, Bulk Upload, columns button, Add New right. |
| With avatars (`AvatarLabel` in the first column) | The record is a person: customers, employees, candidates, users. |
| Hierarchical (`getRowChildren`) | Records have parents: Chart of Accounts, cost centres, item categories. |
| Grouped report (`TableSectionRow` + total rows) | Reports with sections and totals: Trial balance, Income statement. |
| Comfortable density | Short lists with richer cells (new features screens). Default density is 44px rows. |

## Toolbar and features
- **Selection** (`selectable`): when there are bulk actions (export selected, delete, approve).
- **Sorting** (`sortable` on a column): name, date, amount, number columns. Not on status or actions.
- **Row actions** (`rowActions`): the kebab menu. Order: View, Edit, Delete, then related actions (Transactions, Receive Payment).
- **Customize Columns** (`ColumnCustomizer` + `visibleColumns`): tables with more than ~6 columns, and every report. Lock the record-name column.
- **Filters**: `FilterDropdown` on list pages, `FilterBar` on report pages.

## States
| State | Use it when |
|---|---|
| Loading | First load and page changes. Skeleton rows; keep the toolbar usable. |
| Empty, no data | Nothing created yet: say what the list holds and how to add the first one. |
| Empty, no results | Search or filters matched nothing: say so and suggest clearing filters. |
| Selected row | Ticked rows, or the record open in a side panel (`activeRowId`). |

## Content
- First column is the record's name or number, in dark medium text. Other cells are grey.
- Drill-down values (account codes, document numbers) are blue links.
- Overdue dates and balances are red with a second line ("Overdue by 5 days").
- Amounts: currency symbol, thousands separators, two decimals: "₦ 10,000.00".
