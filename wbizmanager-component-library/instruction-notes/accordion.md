## When to use
Splitting a long form into named sections that can be collapsed.

## Choosing a variant
| Variant | Use it when |
|---|---|
| `form` | Sections inside a `SidePanel` (Primary contact, Company details…). |
| `card` | Full-page forms. |

## How it behaves
- The first section is open; others start closed unless they hold required fields.
- Several sections can stay open (`multiple`). Use `single` only when sections are alternatives.
- If a closed section holds an error after Save, it opens and focuses the first invalid field.
