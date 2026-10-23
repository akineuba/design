## When to use
Single-line text: names, emails, search. Use `Select` for a fixed list and a textarea for long text.

## Choosing a state
| State | Use it when |
|---|---|
| Default / placeholder | Empty field. The placeholder is an example, never the label. |
| Filled | Has a value. |
| Error | Validation failed. Show the message under the field ("Campaign name is required"). |
| Disabled | Can't be edited right now. |
| Read-only | System-filled values (auto-filled address). |

## Content
Every field has a visible label (hide it only for a toolbar search, and keep `hideLabel` so it's still announced). Mark required fields with the red asterisk.
