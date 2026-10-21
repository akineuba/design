## When to use
A row of key figures at the top of a dashboard or list page (Total runs, Total net pay, Awaiting approval), or inside a record panel (Gross pay, Deductions, Net pay).

## Placement
- Under the page title, above filters and tables. 3–5 cards in one row, equal widths, wrapping to two columns on narrow screens.
- In a side panel, a 2×2 grid under the stage progress.

## How it behaves
- Read-only. If a card should filter the table (e.g. "Awaiting approval"), make that obvious with a hint ("needs action") and apply the matching filter on click.
- Large amounts are shortened (`₦ 76.37M`) with the exact figure in the hint line, so cards never truncate.

## Choosing a tone
| Tone | Use it when |
|---|---|
| `default` | Neutral totals (gross pay). |
| `primary` | Counts (runs, employees). |
| `success` | Good outcomes (net pay, paid). |
| `warning` | Things waiting on someone (awaiting approval). |
| `error` | Bad or outgoing figures (overdue, deductions). |
