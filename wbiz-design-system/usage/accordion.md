## When to use
Splitting a long form into named sections that can be collapsed.

## Choosing a variant
| Variant | Use it when |
|---|---|
| `card` | Full-page forms (new features style). |
| `form` | Sections inside a `SidePanel` (accounting style: Primary contact, Company details…). |

## Rules
- Open the first section by default; required fields should not hide in closed sections, or show an "Incomplete" pill in `meta`.
- Use `type="single"` only when sections are alternatives; usually let several stay open.
