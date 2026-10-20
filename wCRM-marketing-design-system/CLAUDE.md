# Project Design System Context

* **Figma File URL:** https://www.figma.com/design/EIQlA9M6mP2KlskFFy2X2U/wCRM-updates (page **marketing design updates**, node `782:4598`)
* **Rules for Frontend Code Generation:**

  1. Never use raw hardcoded hex values or arbitrary pixel spacing; always bind to design tokens.
  2. Search connected Figma libraries and component registries before building any UI element from scratch.
  3. Ensure all components use proper responsive Auto Layout equivalents (e.g., Flexbox/Grid constraints).

---

## What this repository is

The design system for the Wragby **wCRM Marketing** module: design tokens, React + TypeScript components,
and a Storybook that documents both. Everything here was extracted from the Figma page above.

| Path | Purpose |
|---|---|
| `tokens/tokens.json` | **Single source of truth** for every token. Edit values here only. |
| `scripts/build-tokens.mjs` | Generates `src/styles/tokens.css` and `src/tokens/tokens.ts`. |
| `src/styles/tokens.css` | Generated CSS custom properties (`--color-brand-primary`, …). Do not edit. |
| `src/tokens/tokens.ts` | Generated typed token object for JS use. Do not edit. |
| `tailwind.preset.js` | Maps Tailwind utilities onto the CSS variables; **replaces** Tailwind defaults. |
| `src/components/<Name>/` | `Name.tsx`, `Name.stories.tsx`, `Name.test.tsx`, `index.ts`. |
| `src/docs/` | Storybook overview pages (Foundations, Getting started). |
| `docs/figma-mapping.md` | Which Figma frames each token and component came from. |

## Commands

```bash
npm install
npm run tokens          # regenerate CSS/TS after editing tokens/tokens.json
npm run tokens:check    # fails if generated files are stale (run in CI)
npm run storybook       # http://localhost:6006
npm run build-storybook # static build in storybook-static/
npm run typecheck
npm test                # vitest + Testing Library
npm run build           # emits dist/ for consumers
```

Before committing: `npm run tokens:check && npm run typecheck && npm test && npm run build-storybook`.

## Tokens

The Figma file has **no published variables or styles**. Tokens were consolidated from a full audit of the page
(27k layers): the most frequent raw value for each role was kept, near-duplicates were merged, and states that
Figma does not draw were added and marked `"derived"` in `tokens.json`.

### Colour (`color.*` → `--color-<group>-<name>` → Tailwind `bg-<group>-<name>`, `text-<group>-<name>`, `border-<group>-<name>`)

| Token | Value | Use |
|---|---|---|
| `brand.primary` | `#EE1F2F` | Primary buttons, active tab underline, selected nav, required asterisk |
| `brand.primary-hover` | `#D7192D` | Hover/pressed primary |
| `brand.primary-subtle` | `#FFF0F2` | Selected chips and filters |
| `accent.navy` | `#3D5A98` | Secondary (outline) buttons, focus ring, info links |
| `accent.navy-hover` | `#2B3674` | Secondary hover |
| `accent.navy-subtle` | `#F0F4FA` | Selected rows, info panels |
| `text.primary` | `#1E2238` | Headings and body |
| `text.strong` | `#111827` | Dense table values |
| `text.secondary` | `#64748B` | Supporting copy, table headers, helper text |
| `text.muted` | `#A3AED0` | Inactive tabs, meta, disabled text |
| `text.placeholder` | `#98A4BF` | Placeholders |
| `text.inverse` | `#FFFFFF` | Text on brand fills |
| `surface.default` | `#FFFFFF` | Cards, inputs, tables |
| `surface.canvas` | `#F4F6FA` | Page background |
| `surface.subtle` | `#F8FAFC` | Table header, read-only fields |
| `surface.sunken` | `#F1F5F9` | Disabled controls |
| `surface.overlay` | `rgba(15,23,42,.45)` | Drawer/modal scrim |
| `border.default` | `#E2E8F0` | All 1px dividers and outlines |
| `border.strong` | `#CBD5E1` | Hovered inputs, checkboxes |
| `status.success` / `-text` / `-subtle` | `#05D38A` / `#16966A` / `#EAF9F3` | Active, sent, connected |
| `status.warning` / `-text` / `-subtle` | `#DF9B17` / `#B54708` / `#FFF7E5` | Pending, needs attention |
| `status.danger` / `-subtle` | `#E11D48` / `#FFF1F2` | Validation, failed |
| `status.info` / `-subtle` | `#409CFF` / `#EDF3FF` | Scheduled, informational |

Legacy values seen in Figma that **must not** be used: `#F32135`, `#EF2D38` (use `brand.primary`); `#DDE3ED`
(use `border.default`); `#151A33`, `#0F172A` (use `text.primary`); `#8F9BBA`, `#707EAE` (use `text.muted`).

### Typography (`text-<name>` sets size, line height and weight together)

Fonts: **Inter** (`font-sans`, default for all UI), **Roboto** (`font-data`, dense tables, sidebar, mobile V2),
**Fira Code** (`font-mono`, timestamps, internal keys).

| Utility | Size / line / weight | Use |
|---|---|---|
| `text-display` | 28 / 36 / 700 | KPI figures, empty-state titles |
| `text-heading-1` | 20 / 28 / 700 | App header page title, drawer titles |
| `text-heading-2` | 18 / 26 / 700 | Section and card titles |
| `text-heading-3` | 16 / 24 / 700 | Sub-sections, modal headings |
| `text-body` | 14 / 20 / 400 | Default text, input values |
| `text-body-sm` | 13 / 18 / 400 | Table cells |
| `text-label` | 14 / 20 / 600 | Buttons, tabs (add `font-medium` for field labels) |
| `text-label-sm` | 13 / 18 / 600 | Compact buttons, row titles |
| `text-caption` | 12 / 16 / 400 | Helper and validation text |
| `text-overline` | 11 / 14 / 700, +0.04em, uppercase | Table headers, badges, eyebrows |

### Spacing (4px base, `p-*`, `gap-*`, `m-*`)

`0.5`=2 · `1`=4 · `1.5`=6 · `2`=8 · `2.5`=10 · `3`=12 · `3.5`=14 · `4`=16 · `5`=20 · `6`=24 · `8`=32 · `10`=40 · `12`=48 px.
Controls use 8–16px inside; groups use 24–40px between. Main content padding is `p-10` (40px), cards `p-5`/`p-6`.

### Radius, shadow, sizes

* Radius: `rounded-xs` 4 · `rounded-sm` 6 · `rounded-md` 8 (controls) · `rounded-lg` 12 (cards, tables) · `rounded-xl` 16 (modals) · `rounded-full` (badges, avatars).
* Shadow: `shadow-sm` resting cards · `shadow-md` dropdowns · `shadow-lg` drawers/modals · `shadow-focus` / `shadow-focus-danger` keyboard focus.
* Heights: `h-control-sm` 36 · `h-control-md` 40 · `h-control-lg` 44. Widths: `w-mobile-content` 358, `w-drawer` 462, `max-w-page` 1440, `w-field-sm` 320.

Tailwind's default colours, spacing and radii are **removed** by the preset, so `bg-blue-500`, `p-7` or
`rounded-2xl` will not compile to anything. If you need a value that does not exist, add it to
`tokens/tokens.json` with its Figma source, run `npm run tokens`, and document it here.

## Components

| Component | Figma source | Variants / props |
|---|---|---|
| `Button` | `Button`, `create-button`, `Save-Btn` frames (817:8441, 1926:27103, 1926:27101, 1931:24592) | `variant`: primary · secondary · outline · ghost; `size`: sm 36 · md 40 · lg 44; `loading`, `disabled`, `leadingIcon`, `trailingIcon`, `fullWidth` |
| `Input` | `Field input`, `Input`, `input-box` frames (1926:27086, 1926:27124, 1931:24364, 1823:7673) | `label` (required), `hideLabel`, `helperText`, `error`, `size`: md 40 · lg 44; `leadingIcon`, `trailingIcon`, `required`, `disabled`, `readOnly` |

Figma does not draw focus, hover, disabled or loading states for these; they were derived and are listed in
`docs/figma-mapping.md`. Patterns that exist in Figma but are not yet components: status badge, table row,
tabs, selector dropdown, drawer, modal, toolbar search, pagination, sidebar nav.

### Conventions for new components

* One folder per component with `Component.tsx`, `Component.stories.tsx`, `Component.test.tsx`, `index.ts`; export it from `src/index.ts`.
* `forwardRef`, spread remaining native props, accept `className` last in `cn(...)` so callers can extend but not fight the base styles.
* Variants are typed unions mapped to class strings in a `Record<Variant, string>`; never build class names dynamically from props.
* Lay out with flex/grid exactly as Figma Auto Layout does: direction → `flex-row`/`flex-col`, spacing → `gap-*`, padding → `p*-*`, "Fill container" → `w-full`/`flex-1`, "Hug" → default.
* Accessibility: native elements first, visible label for every field, `aria-invalid` + `aria-describedby` for errors, `focus-visible:shadow-focus` on every interactive element, 44px minimum touch target on mobile.
* Every Figma variant gets a story; add a `Matrix`/`States` story for side-by-side review and a `play` test for interactive behaviour.

## Working with Figma (for Claude)

* File key `EIQlA9M6mP2KlskFFy2X2U`; marketing page `782:4598`. Desktop screens use Inter; "Mobile V2" frames use Roboto.
* Before building UI, search this repo's `src/components` and the Figma page (`search_design_system`, `get_metadata`) for an existing component or pattern.
* Use `get_design_context` on the specific frame, then translate its output onto these tokens and components. Never paste its raw hex/px values.
* If Figma introduces a new value, decide whether it is a genuine new token or a drift from an existing one (see the legacy list above) before adding it.
