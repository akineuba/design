# Table

Accounting tables are the primary source: [Customers](https://www.figma.com/design/TJAupALP2AYuN7NXNlY33g/w-Biz?node-id=191-3274),
[Bills](https://www.figma.com/design/TJAupALP2AYuN7NXNlY33g/w-Biz?node-id=4183-23454),
[Chart of Accounts](https://www.figma.com/design/TJAupALP2AYuN7NXNlY33g/w-Biz?node-id=1871-19163),
[Trial balance](https://www.figma.com/design/TJAupALP2AYuN7NXNlY33g/w-Biz?node-id=845-8824).

## Anatomy
`TableCard` (white, line-subtle border, 10px radius)
→ `TableToolbar` (24/20 padding; `TableToolbarGroup` left: `SearchField` 203×40 + `FilterDropdown`; right: Export / Bulk Upload (secondary), `ColumnCustomizer`, Add New (primary))
→ table (header 44px on `surface-page`, Inter 12 `fg-muted`, 24/12 padding; rows 44px, Inter 14 `fg-muted`, first column `fg-ink` medium, 16/12 padding, line-subtle dividers)
→ `TableFooter` (right-aligned: summary Inter 12 `fg-faint`, `Pagination` with 30px page buttons and a "Page" jump field).

## Styles
| Style | How |
|---|---|
| Standard | `DataTable` with `selectable`, `sortable` columns, `rowActions` |
| With avatars | `AvatarLabel` in the first column's `render` |
| Hierarchical | `getRowChildren`; first column is indented 16px per level with a chevron toggle |
| Grouped report | primitives + `TableSectionRow` for groups and an `emphasis="strong"` total row |
| Comfortable | `density="comfortable"`, 54px rows (new features) |

## States
Row default, hover (`interactive`), selected (`primary-subtle`, also used for ticked rows and `activeRowId`); `loading` skeleton rows; `empty` message; header checkbox indeterminate when some rows are ticked; sort arrow (dimmed when unsorted, rotated for ascending). Cells holding a 32px control use `tight` so rows stay 44px.

## Usage
See `instruction-notes/table.md` (shown in Storybook). Wide tables scroll inside the card.
