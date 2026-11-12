## When to use
Switching how the same records are shown: list ↔ calendar, list ↔ grid. Not for filtering; use Tabs for subsets. For options that need a visible text label, use `SegmentedControl`.

## How it behaves
A radio group: Tab lands on the selected view, arrow keys move and select, Home and End jump to the first and last. The selected cell is solid blue with a white icon; the others are grey icons. Every option needs a `label`: it is read by screen readers and shown as a tooltip. Switching is instant, and the chosen view is remembered per user.

## Placement
Right end of the toolbar, after the primary action.
