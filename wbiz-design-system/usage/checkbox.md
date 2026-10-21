## When to use
- Selecting rows in a table (the first column).
- Turning options on or off in a form or popup that is saved with a button (Customize Columns, Mark as Contra).
- Choosing several items from a short list.

## When not to use
A setting that takes effect immediately → `Switch`. One choice out of several → `RadioGroup`.

## States
| State | Use it when |
|---|---|
| Unticked / Ticked | Normal use. |
| Indeterminate | Header "select all" when only some rows are ticked. Set by `DataTable` automatically. |
| Disabled | The option can't change (a locked column, or the last visible column). |
