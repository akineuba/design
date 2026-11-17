## When to use
Switching between sibling pages of one module that share context: Chart of accounts / Journal / Receive payment / Budget.

## Placement
Under the top bar, above the page title.

## How it behaves
Each tab is its own page with its own URL; the selected tab matches the sidebar's current page. Arrow keys move between tabs.

## When not to use
Steps in a process → `StageProgress`. Filtering a list → filters.

## On tables (not in cards)
- **Table status subsets:** put `Tabs` with `count` at the top of the `TableCard` (All · Pending · Paid…), above the toolbar. Switching a tab returns to page 1. Keep Search and Filters in the toolbar for everything else.
- **Not in cards.** To switch what a card shows (Pay / Deductions on a chart card), use a small `Select` in the card header's `actions`.
- Tabs are for swapping pages (section tabs under the top bar) and for table subsets. Prefer them over a segmented control there: an underline adds far less weight than a filled pill.

