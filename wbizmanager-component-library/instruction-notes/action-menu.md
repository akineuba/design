## When to use
The ⋮ button at the end of a table row, holding actions for that one record.

## How it behaves
- Opens under the button, aligned to the right; flips above when there's no room below.
- Order: **View**, **Edit**, **Delete**, then related actions (Transactions, Receive Payment).
- View and Edit open the record's side panel; Delete opens a centred confirmation modal.
- Hide actions the user can never take on that record; disable (with a reason) only temporary blocks.

| Tone | Use for |
|---|---|
| `view` grey | View |
| `edit` amber | Edit |
| `delete` red | Delete, Deactivate, Void |
| `link` blue | Go to related records (Transactions, History) |
| `positive` green | Money in or approval (Receive Payment, Approve) |
