## When to use
A short, focused task that must be finished or cancelled before going on:
- **Quick-add** from a dropdown's "Add New" (a new salutation, tax code, customer with only the essentials).
- **Confirm** something destructive or irreversible ("Clear all lines?", "Void invoice?").
- **Small task** with a few fields that belongs to the current screen (Tax Deduction, Payment Mode).

## When not to use
- Creating, editing or viewing a **whole record** → `SidePanel` (slides in from the right).
- Information people need to keep visible while they work → put it on the page.

## How it behaves
- **Centred** on the screen, horizontally and vertically, over a dimmed backdrop. Never slides in from the left or right; that's the side panel.
- Width 515px (`dialog`); height grows with content up to the viewport, then the body scrolls.
- Opens on top of what the user was doing and returns them to exactly that place on close. Focus moves into the modal and comes back to the button that opened it.
- Closes on Cancel, Escape and backdrop click. For confirmations and unsaved quick-add forms, set `closeOnBackdrop={false}`.
- Only one modal at a time. A quick-add opened from inside a side panel sits centred above the panel.

## Content
- Title states the task or question: "New Salutation", "Clear all lines?".
- Confirmations say what will happen and whether it can be undone. The destructive button names the action ("Clear all lines"), not "OK".
- Footer, right-aligned: Cancel (outline or secondary) then the primary or destructive action.
