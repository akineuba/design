## When to use
Showing the state of a record in a table row or record header: Paid, Overdue, Pending Approval, Active.

## Choosing a tone
Pick by meaning, never by colour preference. The same status uses the same tone everywhere.

| Tone | Meaning | Examples |
|---|---|---|
| `warning` | Waiting on someone | Pending Approval, On Leave, Draft awaiting review |
| `info` | In progress / open | Awaiting Payment, Ready for Issue, Probation |
| `neutral` | Partial, inactive or ended | Partially Paid, Exited, Archived |
| `success` | Done, good | Paid, Completed, Active, Approved |
| `error` | Failed or late | Overdue, Rejected, Failed |

## Do and don't
- **Do** keep labels to 1–3 words in title case.
- **Don't** rely on colour alone. All pill colours are below WCAG contrast (see docs/foundations/colors.md), so the text must name the status.
