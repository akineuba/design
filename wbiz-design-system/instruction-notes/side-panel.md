## When to use
Creating, editing or viewing a **record** without leaving the list: New Customer, Edit Account, View Vendor, New Employee, Create Tax, Create Department. This is the default way to add data. See [UI rule 2](../ui-rules/ui-rules.md).

## When not to use
- Quick-adding a value from a dropdown, or confirming something → centred `Modal`.
- Documents with many line items (invoices, bills, journals) are full pages in Figma today; that is under review (see the proposals in the UI rules).

## How it behaves
- **Slides in from the right edge**, full height, over a dimmed backdrop. The list stays in place behind it. Panels never open from the left (the menu lives there) or the top.
- Focus moves into the panel; Escape, Cancel and the backdrop close it and return focus to the button or row that opened it.
- With unsaved changes, set `closeOnBackdrop={false}` so a stray click doesn't lose work (a "Discard changes?" prompt is proposal B10).
- The footer stays visible at the bottom while the body scrolls.
- After saving: close the panel, refresh the list, and highlight the new or changed row (`activeRowId`).
- A dropdown's "Add New" inside a panel opens a centred modal **above** the panel; the panel stays open.

## Choosing a size and mode
| Size | Use it when |
|---|---|
| `sm` 435px | A single column of fields (Account, Tax, Budget, Currency). |
| `md` 541px | Contact-style records with name rows (Customer, Project). |
| `lg` 562px | Records with two-column rows (Vendor, Employee, Department). |

| Mode | Title | Footer |
|---|---|---|
| Create | "New Customer" | Cancel + Save (Publish for accounts) |
| Edit | "Edit Customer" | Cancel + Save |
| View | "View Customer", fields read-only | Cancel + **Edit** (switches the same panel to edit mode) |

## Content
- Group fields into `Accordion variant="form"` sections. Open the first; required fields must not hide in a closed section.
- Labels end with a colon ("First Name:"); required fields show a red asterisk.
