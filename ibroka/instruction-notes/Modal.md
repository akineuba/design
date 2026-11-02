Centred dialog (UI rule 7) for:

- **Quick-add** of a small record from a Select (new insurer, new client essentials).
- **Confirmation** of a destructive action. Name it ("Delete policy POL-2026-00975?") and say whether it can be undone. Use `tone="danger"` and a destructive button.
- **Discard changes?** when closing a form with unsaved edits.
- **Previews** of documents (`size="lg"`).

Full records are created and edited in a **SidePanel**, not a modal. Footer: Cancel (outline) then the primary action. Escape and the backdrop close it; set `closeOnBackdrop={false}` while there are unsaved changes.
