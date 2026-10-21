## When to use
Free text, numbers, dates, emails and amounts the user types. For a choice from a known list, use `Select`.

## States
| State | Use it when |
|---|---|
| Default | Editable field. |
| Required (`required`) | The record cannot be saved without it. Shows a red asterisk. |
| Error (`error`) | Validation failed. Say what to fix: "Enter an email like name@company.com". |
| Success (`success`) | A check passed (e.g. TIN verified). Use sparingly. |
| Read-only (`readOnly`) | View mode in a side panel, or a value the system calculates. |
| Disabled | Not editable *because of another choice*. Prefer read-only for view mode. |
| Loading | Looking something up from what was typed. |

## Content
- Labels end with a colon in side panels ("First Name:"), as in the accounting screens.
- Use `hint` for format rules ("Maximum 30 characters"), not the placeholder; placeholders disappear when typing.

## Do and don't
- **Do** validate on blur or submit, not on every keystroke.
- **Don't** use placeholder text as the only label.
