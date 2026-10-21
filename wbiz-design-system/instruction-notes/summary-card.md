## When to use
The headline figures at the top of a page or dashboard: this period's net pay, gross pay, headcount, year to date.

## When not to use
Smaller figures inside a side panel or a dense dashboard grid → `StatCard`.

## Placement
- Directly under the page title, above filters and tables.
- Four in a row on desktop (two on tablet, one on mobile), equal widths.

## How it behaves
- The label says **what and when**: "Net pay — October", "YTD net pay — 2026".
- Large amounts are shortened (`₦15.2M`, `₦1B`) so the card never truncates; the exact figure is in the table or record.
- A **trend** compares with the previous period ("-93.5% vs September"). Set `goodWhen="down"` for figures where a rise is bad (overdue, costs), so the colour reflects good or bad news, not just the direction.
- With no sensible comparison, use a **hint** instead ("1 run this month", "28 runs total").
- Read-only. If clicking a card should filter the page, say so in the hint.

## Choosing a colour
Give each card in a row its own tile colour, and keep a metric's colour the same across pages (net pay green, gross pay blue, people amber, year to date teal, problems red).
