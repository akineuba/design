# SegmentedControl

Single-choice toggle from the new features screens. **Text-only segmented controls: use sparingly**; icon ones (view switches) are fine: see the instruction note for when it fits and what to use instead (Tabs for pages and tables, a small Select for cards and units, ViewToggle, Radio, Switch).

## Appearances
`pill`: rounded `surface-track` track (#F2F4F7, lightened Nov 2026) with a primary pill for the selected option (Inventory / Free Text on line items). `boxed`: bordered 34px group with a primary selected segment and optional icons. For icon-only view switches use `ViewToggle` instead of `boxed`.

## States
Selected, unselected, hover (derived), disabled option. Arrow keys move the selection.

## Usage
Icon options (view switches): use freely. Text-only: two or three short, mutually exclusive options that switch immediately, inside a form or line, at most one per screen; never for page sections or table subsets (use `Tabs`) or to switch what a card shows (use a small `Select` in the card header).
