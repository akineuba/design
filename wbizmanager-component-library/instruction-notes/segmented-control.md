## When to use
**Icon options** (list / cards / calendar, with or without a short label): use freely, like `ViewToggle`.

**Text-only options:** rarely. Only for **two or three short, mutually exclusive options that change how one control or line behaves, right where the user is working**, and that switch instantly: Inventory / Free Text on an invoice line. One per screen at most, and never as a page or card heading.

## Use something lighter instead
This applies to **text-only** segmented controls: a filled pill of words is a heavy element, and several on a page make it look clunky. Icon segmented controls are fine.

| You want to… | Use |
|---|---|
| Swap between sibling pages, or show status subsets on a table (All / Pending / Paid) | `Tabs` (underline, with counts on tables) |
| Switch what a card shows (Pay / Deductions, This month / This year) | a small `Select` in the card header |
| Switch how records are shown (list / cards / calendar) | `ViewToggle` (icon-only) |
| Pick a unit or mode next to a field (% / ₦, Daily / Monthly) | a small `Select` attached to the field |
| Choose one option in a form | `Radio` / `RadioGroup` |
| Turn one setting on or off | `Switch` or `Checkbox` |
| Narrow a list (status, type) | the Filters dropdown, or `Tabs` for 2–5 fixed subsets |
| More than three options, or labels longer than a word or two | `Select` |

## How it behaves
Switches instantly, without a save. Arrow keys move the selection.
