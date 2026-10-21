## When to use
Picking one value from a list the system already knows: customer, vendor, account, department, salutation, status.

## When not to use
- 2–4 options that should all be visible → `RadioGroup`.
- An on/off choice → `Checkbox` in a form, `Switch` if it applies immediately.

## How it behaves
- **Every dropdown is searchable.** The menu opens with a search box; typing on the closed field opens it and starts the search. Search matches anywhere in the label.
- **Every dropdown that lists records the user can create has "Add New"** at the bottom of the menu (customers, vendors, accounts, items, departments, tax codes…). See [UI rule 1](../ui-rules/ui-rules.md).
- "Add New" opens a **centred quick-add modal** over the current screen, never a new page. The modal holds only the fields needed to create the record; the search text prefills its name.
- On save the modal closes, the new value appears in the list **and is selected**, and the user carries on where they were. On cancel nothing changes.
- When the search finds nothing, the menu says so and "Add New" reads `Add New: "what you typed"`.
- Keyboard: arrows move, Enter picks, Escape closes and returns focus to the field.

## Choosing a state
| State | Use it when |
|---|---|
| Placeholder | Nothing chosen yet. Say what to pick: "Select account". |
| Selected | A value is set. |
| Required / Error | Same rules as `Input`. |
| Disabled | It depends on another field (e.g. Parent waits for Account Type). Say what unlocks it in a hint. |
| Size `sm` (34px) | Filter bars and filter dropdowns. |
| Size `md` (40px) | Forms, side panels, modals. |

## Don't
- Send the user to another page to create a missing value.
- Turn search off for long lists. Only very short fixed lists (Mr / Mrs / Ms / Dr) may use `searchable={false}`.
