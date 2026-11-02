Data table (UI rules 22-29). First column is the record name (Medium); money right-aligned; drill-down values are teal links (`CellLink`); overdue figures red with a note (`CellWithNote`).

- `selectable` adds checkboxes; pair with **BulkActionsBar**.
- `rowActions` adds the ⋯ menu.
- Every table needs `loading`, an empty state and a no-results state (pass `empty`).
- More than ~6 columns: add **ColumnCustomizer**. Wide tables: `stickyFirstColumn`.
- Put **Pagination** in the card footer.
