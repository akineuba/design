## When to use
The state of a record in a table row or record header: Paid, Overdue, Pending Approval, Active.

## Choosing a tone
Pick by meaning. The same status uses the same tone in every module.

| Tone | Meaning | Examples |
|---|---|---|
| `warning` | Waiting on someone | Pending Approval, On Leave |
| `info` | In progress / open | Awaiting Payment, Probation |
| `neutral` | Partial, inactive or ended | Partially Paid, Exited, Archived |
| `success` | Done, good | Paid, Completed, Active, Approved |
| `error` | Failed or late | Overdue, Rejected |

## How it behaves
Read-only. It always matches the record's current stage (see `StageProgress`). To change status, use the stage action, not the pill.

## Don't
Rely on colour alone: all pill colours are below WCAG contrast, so the text must name the status.
