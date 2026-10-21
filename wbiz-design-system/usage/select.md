## When to use
Picking one value from a known list: account type, salutation, department, status. Up to ~50 options.

## When not to use
- 2–4 options that should all be visible → `RadioGroup`.
- On/off → `Checkbox` (in a form) or `Switch` (applies immediately).

## States
| State | Use it when |
|---|---|
| Placeholder | Nothing chosen yet. Placeholder says what to pick: "Select account". |
| Selected | A value is set. |
| Required / Error | Same rules as `Input`. |
| Disabled | Depends on another field (e.g. Parent before Account Type). |
| With "Add New" (`menuAction`) | Users often need a record that doesn't exist yet (customer, vendor). Opens the matching side panel. |

## Sizes
`sm` (34px) in filter bars and filter dropdowns, `md` (40px) in forms and panels.
