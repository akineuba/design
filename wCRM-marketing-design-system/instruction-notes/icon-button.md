## When to use
A single icon action where the icon is unambiguous: close, edit, move up/down, more, toolbar tools.

## How it behaves
Always needs an `aria-label`. `active` keeps it pressed (e.g. an open panel). `tone="danger"` turns the icon red on hover for delete.

## Don't
Use it for the table filter (use `FilterButton`) or the row overflow menu (use `RowActionsMenu`).
