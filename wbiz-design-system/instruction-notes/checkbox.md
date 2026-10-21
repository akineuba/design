## When to use
- Selecting rows in a table.
- On/off options in a form or popup that is saved with a button (Customize Columns, Mark as Contra).
- Choosing several items from a short list.

## When not to use
A setting that takes effect immediately → `Switch`. One option out of several → `RadioGroup`.

## How it behaves
| State | Use it when |
|---|---|
| Unticked / Ticked | Normal use. Clicking the label toggles it too. |
| Indeterminate | Header "select all" when some rows are ticked. Clicking it selects all. |
| Disabled | The option can't change (a locked column). |
