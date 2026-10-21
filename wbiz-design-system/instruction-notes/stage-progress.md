## When to use
Records that move through fixed steps: approvals (Draft → Submitted → Step 1 → Step 2 → Posted), recruitment (Applied → Screening → Interview → Offer → Hired), loans, expense claims, requisitions.

## Placement
- **Horizontal** at the top of the record (side panel or detail page), under the title and above the fields.
- **Vertical** as an approval trail (who acted and when), in a panel section or the side of a detail page.
- In tables, don't show the full progression. Show the current stage as a `StatusPill`.

## How it behaves
- **Forward only through the current stage's action.** The record moves on only when the person responsible clicks that stage's primary button ("Submit", "Approve", "Approve & Post"). Users can't click a stage to jump to it.
- **One current stage at a time**, highlighted in blue. Earlier stages show a green tick; later ones are grey and numbered.
- **Rejecting sends the record back** to an earlier stage (usually Submitted or Draft). The stage that rejected it shows a red ✕ with the reason in its description until it is resubmitted.
- Completed stages record **who and when** ("Approved by Ada Obi · 12 Aug 2025"); show it in the vertical trail.
- Fields lock once a record leaves Draft. Editing after submission requires sending it back first.
- The table's status pill always matches the current stage (Pending Approval while in an approval step).

## Content
Stage names are short nouns or past-tense outcomes, the same in every module: "Draft", "Submitted", "Approval (Step 1)", "Posted".

## Status
Derived: there is no stage component in Figma yet. Design should review it.
