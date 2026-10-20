# Modal

Dialog from the accounting Tax Deduction popup ([tax popup](https://www.figma.com/design/TJAupALP2AYuN7NXNlY33g/w-Biz?node-id=3564-23503)).

## Anatomy
515px wide (shrinks on small screens), white, 8px radius, 20/24 padding, 20px gaps. Title Inter Semibold 24; optional description; actions right-aligned with the primary action last. A close (×) button and the backdrop are derived.

## Behaviour
Built on the native `<dialog>`: focus is trapped, Escape closes, focus returns to the trigger. Backdrop clicks close unless `closeOnBackdrop={false}`.

## Usage
Use for short, focused tasks and confirmations. Destructive confirmations use a `destructive` primary action and say exactly what will happen. `ModalPanel` renders the layout inline.
