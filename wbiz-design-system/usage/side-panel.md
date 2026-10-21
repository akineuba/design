## When to use
Creating, editing or viewing a record **without leaving the list**: New Customer, Edit Account, View Vendor, New Employee, Create Tax.

## When not to use
- Long, multi-step documents with line items (invoices, journals, bills): use a full page.
- Short questions or confirmations: use `Modal`.

## Choosing a size
| Size | Use it when |
|---|---|
| `sm` 435px | Few fields in one column (New Account, Tax, Budget, Currency). |
| `md` 541px | Contact-style records with name rows (Customer, Project). |
| `lg` 562px | Records with two-column rows (Vendor, Employee, Department). |

## Modes
| Mode | Title | Footer |
|---|---|---|
| Create | "New Customer" | Cancel + Save (or Publish for accounts) |
| Edit | "Edit Customer" | Cancel + Save |
| View | "View Customer" | Cancel + **Edit** (fields read-only) |

## Content and behaviour
- Group fields in `Accordion variant="form"` sections; open the first, keep the rest closed.
- Escape, Cancel and the backdrop close the panel. Set `closeOnBackdrop={false}` when there are unsaved changes, and confirm before discarding.
- After saving, close the panel, refresh the list and highlight the new or changed row.
