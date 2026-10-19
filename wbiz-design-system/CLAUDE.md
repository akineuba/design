# Project Design System Context

* **Figma File URL:** [w-Biz](https://www.figma.com/design/TJAupALP2AYuN7NXNlY33g/w-Biz?node-id=0-1)
* **Rules for Frontend Code Generation:**

  1. Never use raw hardcoded hex values or arbitrary pixel spacing; always bind to design tokens.
  2. Search connected Figma libraries and component registries before building any UI element from scratch.
  3. Ensure all components use proper responsive Auto Layout equivalents (e.g., Flexbox/Grid constraints).

---

## What this repository is

`@wbiz/design-system`: the design tokens and React + TypeScript components for wBizManager, documented in Storybook.

| Path | Purpose |
|---|---|
| `tokens/tokens.json` | **Single source of truth** for every token. Edit tokens here only. |
| `tokens/index.mjs` | Turns tokens into CSS variables and the Tailwind theme. |
| `src/styles/tokens.css` | Generated `--wbiz-*` CSS variables. Never edit; run `npm run tokens`. |
| `tailwind.config.js` | Replaces Tailwind's default palette, spacing, type, radius and shadow with tokens. |
| `src/components/<Name>/` | `<Name>.tsx`, `<Name>.stories.tsx`, `index.ts`. One folder per component. |
| `src/foundations/` | Storybook pages for tokens, plus story-only icons. |
| `docs/` | Written guidance: foundations, component specs, Figma sync, contributing. |

Commands: `npm run storybook` (port 6006), `npm run build`, `npm run typecheck`, `npm run tokens`.

## How the rules apply here

**Rule 1: tokens only.** Tailwind's theme is *replaced*, so `bg-blue-500`, `p-7` or `rounded-md` from stock Tailwind do not exist. Use the token classes below. Arbitrary values (`w-[320px]`, `text-[#0070FF]`) are forbidden in components. If a value is missing, add a token to `tokens.json`, run `npm run tokens`, and mark it `"derived": true` if it is not in Figma.

**Rule 2: search before building.** Before writing a new component:
1. Check `src/components/` for an existing component or variant.
2. Search the Figma file with the Figma MCP (`search_design_system`, then `use_figma` read-only on the product pages). The file has **no published variables, styles or library components of its own**. Real UI is drawn as frames on the product pages, so inspect a screen that uses the element.
3. Only then build, and record the Figma node you matched in the component's doc comment and story `parameters.design.url`.

**Rule 3: Auto Layout → Flexbox/Grid.** Figma Auto Layout maps directly: horizontal → `flex`, vertical → `flex flex-col`, item spacing → `gap-*`, padding → `p*-*`, "fill container" → `flex-1` / `w-full`, "hug" → default sizing. Never position with absolute pixel offsets. Use `min-w-0` on flex children that hold text.

## Tokens

Extracted 2026-10-19 from the accounting (`0:1`) and inventory (`4651:44574`) pages by counting the values the screens use. The "icons & components" page was intentionally excluded at the team's request.

### Colour (`bg-*`, `text-*`, `border-*`)
| Token | Value | Use |
|---|---|---|
| `primary` | #0070FF | Brand, primary actions, links |
| `primary-hover` | derived | Primary hover |
| `primary-subtle` / `primary-muted` | #F7FAFF / #EDF3FB | Selected rows, active nav |
| `accent` / `accent-subtle` | #6941C6 / #F9F5FF | Soft button |
| `fg-strong` | #101828 | Headings, input values |
| `fg` | #344054 | Secondary button label |
| `fg-muted` | #667085 | Body, labels, helper text |
| `fg-placeholder` / `fg-disabled` | #C1C4CB / #D0D5DD | Placeholders, disabled text |
| `fg-inverse` | #FFFFFF | Text on primary |
| `icon` | #292D32 | Default icon stroke |
| `line-subtle` / `line` / `line-strong` | #EAECF0 / #D0D5DD / #667085 | Dividers / control borders / hover border |
| `surface` / `surface-page` / `surface-muted` / `surface-sunken` | #FFFFFF / #FCFCFD / #F8F8F8 / #F3F3F3 | Cards / app background / hover, read-only / search |
| `surface-disabled` | #D0D5DD | Disabled primary button |
| `success` / `success-strong` | #34C759 / #00C167 | Positive status, amounts |
| `error` | #FF2E3B | Destructive, validation |
| `warning` | #FF9500 | Warnings |

### Typography
Families: `font-sans` (Inter: controls, labels, UI) and `font-data` (Roboto: tables and dense screen copy). Weights: `font-regular` 400, `font-medium` 500, `font-semibold` 600.

| Class | Size / line height | Typical use |
|---|---|---|
| `text-2xs` | 10 / 14 | Chart labels, tags |
| `text-xs` | 12 / 18 | Field labels (Inter Medium) |
| `text-sm` | 14 / 20 | Buttons, inputs, body |
| `text-md` | 16 / 24 | Emphasised body |
| `text-lg` | 20 / 28 | Section titles |
| `text-xl` | 24 / 32 | Page titles |
| `text-2xl` | 32 / 40 | Dashboard figures |

### Spacing, size, radius, shadow
- Spacing (`p-*`, `gap-*`, `m-*`): `0.5`=2, `1`=4, `2`=8, `2.5`=10, `3`=12, `4`=16, `5`=20, `6`=24, `7.5`=30, `8`=32, `10`=40, `12`=48 px.
- Sizes: `h-control-sm` 34, `h-control-md` 40 (default), `h-control-lg` 46, `size-icon` 20, `w-field` 320 (derived).
- Radius: `rounded-xs` 2, `-sm` 4, `-md` 6, `-lg` 8 (**default**), `-xl` 10, `-2xl` 16 (badges), `-3xl` 20, `-full`.
- Shadow: `shadow-xs` (buttons), `shadow-md` (menus), `shadow-focus` / `shadow-focus-error` (derived focus rings).

Derived tokens (not drawn in Figma): `primary-hover`, `accent-muted`, `success-subtle`, `error-subtle`, `shadow-focus`, `shadow-focus-error`, `size-field`. Replace them when design defines these states.

## Components

| Component | Figma source (product screens) | Variants |
|---|---|---|
| `Button` | `_Button base` frames: Button 9 `6125:58412`, Button 5 `6309:33037`, Button 04 `209:4260`, Button 03 `209:4263`, Button 6 `6309:33224`, icon button `209:4284` | `variant`: primary, secondary, tertiary, soft, destructive · `size`: sm, md, lg · `disabled`, `loading`, `leadingIcon`, `trailingIcon`, `iconOnly`, `fullWidth` |
| `Input` | Journal Date / Ref. Number fields `6309:33026`, Customer Type select `203:6216`, global search `6309:32999` | `size`: sm, md, lg · `label`, `hint`, `error`, `success`, `required`, `disabled`, `readOnly`, `loading`, `leadingIcon`, `trailingIcon` |
| `Spinner` | n/a (shared by loading states) | `label` |

Known inconsistencies in the Figma screens, normalised in code (tell design if any should differ):
- Two type families. Controls use Inter; tables and many labels use Roboto (14/20). Some screens also use Segoe UI. Code uses Inter for components and exposes Roboto as `font-data`.
- Off-grid values such as 5px, 15px and 18px gaps and fractional sizes from scaled frames. These snap to the nearest token.
- Field borders appear as both #D0D5DD and #D1D5DB. Code uses `line` (#D0D5DD).
- The "Button / texts" and 608-variant "Button" sets in the file are **remote library components** with an orange palette (#EB5017) that isn't wBiz's. Do not copy their colours.

## Conventions
- Components are `forwardRef`, accept `className`, spread native props, and default `type="button"`.
- Variant styles live in typed `Record<Variant, string>` maps; combine with `cx()` from `src/utils/cx`.
- Accessibility: visible focus via `focus-visible:shadow-focus`; `aria-busy` while loading; `aria-invalid` + `aria-describedby` on inputs with messages; icon-only buttons require `aria-label`.
- Each component needs a story per Figma variant, a states matrix, and `parameters.design.url` pointing to its Figma node.

## Accessibility gaps inherited from Figma
White on `primary` is 4.41:1 (AA needs 4.5), `error` text is 3.68:1 and `success-strong` text is 2.38:1 on white. They are kept to match the screens and tracked in `docs/foundations/colors.md`. Never convey state by colour alone.
