## When to use
A setting that takes effect **immediately**: an account's Active status in a table, a feature toggle in Settings.

## When not to use
Inside a form with a Save button → `Checkbox`, so nothing changes until the user saves.

## How it behaves
- Saves on click. If saving fails, it flips back and says why next to it.
- Turning off something with consequences (deactivating an account in use) asks for confirmation in a centred modal first.
- Size `sm` in table rows, `md` in settings.

## Content
Label the thing being turned on ("Mark account as active"), not the action ("Toggle").
