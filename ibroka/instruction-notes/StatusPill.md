Shows the state of a record in tables and record headers. Choose the tone **by meaning** (UI rule 35):

| Tone | Means | iBroka statuses |
|---|---|---|
| success | done, in force | Active, Renewed, Approved, Settled, Paid |
| warning | waiting on someone, due soon | Pending approval, Expiring, Under review, Unpaid |
| info | in progress | Quoted, Reported, Part paid |
| error | failed, late, ended badly | Expired, Lapsed, Repudiated, Overdue |
| neutral | draft, inactive | Draft, Cancelled, Inactive |

Prefer **RecordStatus** with a known status: it looks up the tone, so the same status always looks the same.
