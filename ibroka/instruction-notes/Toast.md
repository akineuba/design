Short confirmation after an action: "Client saved", "Policy deleted" (UI rule 42). Bottom right, hides after 5 seconds; errors stay until dismissed. Offer **Undo** after deletes. Wrap the app in `ToastProvider` once and call `useToast()`.

Write past-tense, specific messages. Don't toast things the user can already see change on screen unless it's a delete.
