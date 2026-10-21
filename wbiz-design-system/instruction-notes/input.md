## When to use
Free text, numbers, dates, emails and amounts. For a choice from a known list, use `Select` (searchable, with Add New).

## How it behaves
- Validate on blur and on submit, not on every keystroke. On submit, scroll to and focus the first invalid field.
- Errors say how to fix it: "Enter an email like name@company.com", not "Invalid input".
- Amounts: right-aligned in tables, two decimals, thousands separators; accept typing without separators.

## Choosing a state
| State | Use it when |
|---|---|
| Required | The record can't be saved without it (red asterisk). |
| Error | Validation failed. |
| Success | A check passed (TIN verified). Use sparingly. |
| Read-only | View mode, or a value the system works out. |
| Disabled | Locked because of another choice. Prefer read-only in view mode. |
| Loading | Looking something up from what was typed. |

## Content
- Labels end with a colon in side panels and forms ("First Name:").
- Use `hint` for format rules; placeholders disappear when typing, so they're never the only label.
