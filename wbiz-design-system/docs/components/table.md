# Table

Table card from Consumption Requisitions ([table-card](https://www.figma.com/design/TJAupALP2AYuN7NXNlY33g/w-Biz?node-id=7053-5545)).

## Anatomy
`TableCard` (white, line-subtle border, 10px radius) → `TableToolbar` (16px padding: `SearchField` + `FilterDropdown`) → table → `TableFooter` (`surface-page`, summary + `Pagination`). Header row 38px on `surface-page`, Roboto Semibold 12, `fg-muted`. Body rows 54px, Roboto 14, `fg-strong`, line-subtle dividers. 24px outer and 16px inner cell padding.

## States
Row default, hover (`interactive`), selected (`primary-tint`); `loading` skeleton rows; `empty` message. Pagination: active page 32px primary, others derived; previous/next appear when there is more than one page.

## Usage
Use `DataTable` for lists. Compose the primitives for editable grids such as requisition line items. Link the record ID in `primary` Semibold. Wide tables scroll inside the card.
