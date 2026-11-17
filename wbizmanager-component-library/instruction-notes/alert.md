## When to use
A message about the whole page or record, placed **under the page title**:
- **Error:** a validation summary when saving fails ("Fix these before issuing the invoice"), listing each problem.
- **Success:** confirming a finished action, with the next step ("Receive Payment").
- **Warning:** something the user should know before continuing (credit limit exceeded).
- **Info:** neutral context.

## How it behaves
- Field-level errors still show on the fields themselves; the error alert lists them so nothing is missed on long forms.
- The error alert disappears once the problems are fixed and the action is retried, or when dismissed.
- Keep one alert at a time per page.
