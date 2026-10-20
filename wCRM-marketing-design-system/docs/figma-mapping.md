# Figma → code mapping

Source: Figma file `EIQlA9M6mP2KlskFFy2X2U`, page **marketing design updates** (`782:4598`), audited 20 Oct 2026.
The page has ~27,000 layers, 57 local components, and **no** variables, paint styles, text styles or effect styles,
so every token below is a consolidation of raw values.

## How values were chosen

| Category | Method | Result |
|---|---|---|
| Colour | Counted every solid fill, stroke and text colour; merged visually identical near-duplicates into the most used value | 30 colour tokens; 8 legacy values listed in `CLAUDE.md` |
| Type | Counted family / style / size combinations on all text layers | Inter (≈3.7k layers) for UI, Roboto (≈2.6k) for tables and mobile V2, Fira Code for timestamps |
| Spacing | Counted auto-layout `itemSpacing` and padding | 12 (1018), 8 (865), 10 (635), 6 (603), 4 (506), 16 (290) → 4px scale with 2/6/10/14 half-steps |
| Radius | Counted `cornerRadius` | 8 (1313), 5→6, 12 (485), 999/100 (full), 4, 16 |
| Shadow | Counted drop shadows | 0 4 12 4% (cards), 0 12 28 12% (drawers), 0 4 16 6% (popovers) |
| Control height | Heights of button and input frames | 44 (forms, mobile), 40 (desktop toolbar), 36/37 (compact) |

## Components

### Button

| Figma frame | Node | Maps to |
|---|---|---|
| `create-button` "Create Audience" | 817:8441 | `variant="primary" size="md" leadingIcon={<Plus/>}` |
| `Button` "Send invitation" (Mobile V2 · Settings) | 1931:24592 | `variant="primary" size="lg" fullWidth` |
| `create-button` "Connection History" (Settings · Social media) | 1513:5551 sibling 1224:25718 | `variant="secondary"` |
| `Button` "Clear all" | 1926:27101 | `variant="outline" size="lg"` |
| `Button` "Save as draft" (text-only) | 1926:27165 | `variant="ghost" size="lg"` |
| `assign-task-button` "Apply" | 869:11910 | `variant="primary"` (24px inset in Figma is a one-off; 16px is standard) |

Derived (not in Figma): hover colours, `disabled` (sunken fill, muted label), `loading` (spinner, label kept for width,
`aria-busy`), `focus-visible` ring, `sm` size.

### Input

| Figma frame | Node | Maps to |
|---|---|---|
| `Field input` "Active" | 1926:27086 | `size="lg"` filled |
| `Field input` "Select audience" | 1926:27094 | placeholder state |
| `Field input` with red stroke + "Campaign name is required" | 1926:27124 | `error="…"` |
| `Input` "Bamidele Olatunde" (Mobile V2 · Settings) | 1931:24364 | `size="lg"` |
| `input-box` "Enter first name" (Create User drawer) | 1823:7673 | label 14/500 with 8px gap |
| `Search` "Search settings" | 1931:24240 | `size="md" hideLabel leadingIcon` |
| `auto-filled-address-input` | I1556:14072;1555:13421 | `readOnly` |

Derived (not in Figma): focus (navy border + `shadow-focus`), hover border, disabled, error focus ring, error icon.

## Known inconsistencies in Figma

* Brand red appears as `#EE1F2F`, `#F32135`, `#EF2D38` and `#E53E3E`. Code uses `#EE1F2F` only.
* Input borders alternate between `#E2E8F0`, `#DDE3ED` and `#CBD5E1`. Code uses `border.default` and reserves `border.strong` for hover.
* Mobile V2 labels are Roboto SemiBold 11; desktop labels are Inter Medium 14. Code uses the desktop label everywhere; mobile density can be added as a `size="sm"` later.
* Validation red on mobile is the brand red; code uses `status.danger` (`#E11D48`) so errors are distinguishable from primary actions.
