# ColumnCustomizer

"Customize Columns" button ([Trial balance](https://www.figma.com/design/TJAupALP2AYuN7NXNlY33g/w-Biz?node-id=845-8824): primary, `ColumnsIcon`)
and its popup ([Edit Column](https://www.figma.com/design/TJAupALP2AYuN7NXNlY33g/w-Biz?node-id=896-17474)): 354px, white, 8px radius, 24px padding,
"Visible Column" and "More Options" in Inter 20, 20px checkboxes, Cancel (outline) + Apply (primary).

Pass the result to `DataTable visibleColumns`. Changes are a draft until Apply. Locked columns and the last visible column can't be unticked.
The trigger is always a primary, icon-only button (columns icon); `label` is its accessible name and tooltip. There is no secondary or text version.
