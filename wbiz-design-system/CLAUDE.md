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
| `usage/` | **Usage guidance**, one Markdown file per component (`side-panel.md`…). Shown on each Docs page in Storybook. Read the file before using a component; update it when behaviour changes. |
| `src/patterns/` | Story-only sample data (`demo-data.tsx`, the full menu in `navigation.tsx`), reusable story kits (`table-kits.tsx`, `panel-forms.tsx`) and full-page patterns. Not exported. |
| `src/assets/` | Brand assets (logo PNGs). |
| `docs/` | Written specs: foundations, component anatomy, Figma sync, contributing. |

Commands: `npm run storybook` (port 6006), `npm run build`, `npm run typecheck`, `npm run tokens`.

## How the rules apply here

**Rule 1: tokens only.** Tailwind's theme is *replaced*, so `bg-blue-500`, `p-7` or `rounded-md` from stock Tailwind do not exist. Use the token classes below. Arbitrary values (`w-[320px]`, `text-[#0070FF]`) are forbidden in components. If a value is missing, add a token to `tokens.json`, run `npm run tokens`, and mark it `"derived": true` if it is not in Figma.

**Rule 2: search before building.** Before writing a new component:
1. Check `src/components/` for an existing component or variant.
2. Search the Figma file with the Figma MCP (`search_design_system`, then `use_figma` read-only on the product pages). The file has **no published variables, styles or library components of its own**. Real UI is drawn as frames on the product pages, so inspect a screen that uses the element.
3. Only then build, and record the Figma node you matched in the component's doc comment and story `parameters.design.url`.

**Rule 3: Auto Layout → Flexbox/Grid.** Figma Auto Layout maps directly: horizontal → `flex`, vertical → `flex flex-col`, item spacing → `gap-*`, padding → `p*-*`, "fill container" → `flex-1` / `w-full`, "hug" → default sizing. Never position with absolute pixel offsets. Use `min-w-0` on flex children that hold text.

## Which Figma pages to use

| Page | Use |
|---|---|
| **accounting** (`0:1`) | **Primary reference for tables, toolbars, filters, pagination, side panels, the column popup and row action menus.** |
| **new features** (`7004:31166`) | Primary reference for the **sidebar and top bar** (current versions) and full-page forms. |
| hr, procurement, inventory, project | Product screens. Use for patterns not on the two pages above (e.g. New Employee panel). |
| landing page, email templates, icons & components | **Ignore.** Out of date or not product UI. |

## Tokens

Extracted by counting the values the product screens use (accounting `0:1`, inventory `4651:44574`, new features `7004:31166`). The file has no Figma variables or styles.

### Colour (`bg-*`, `text-*`, `border-*`)
| Token | Value | Use |
|---|---|---|
| `primary` | #0070FF | Brand, primary actions, links |
| `primary-hover` | derived | Primary hover |
| `primary-subtle` / `primary-muted` | #F7FAFF / #EDF3FB | Selected rows, tinted panels |
| `primary-tint` | rgba(0,112,255,.05) | Active sidebar item, selected table row |
| `fg-ink` | #101828 | Accounting: first-column names, totals, report headings |
| `fg-strong` | #1D2939 | Headings, input values |
| `fg-black` | #000000 | Side-panel titles, section headers and form labels (accounting) |
| `fg-faint` | #979797 | Table footer summary |
| `fg` | #344054 | Sidebar items, secondary button label |
| `fg-muted` | #667085 | Body, labels, helper text, table headers |
| `fg-subtle` | #626D7C | Top bar icons and secondary labels |
| `fg-placeholder` / `fg-disabled` | #C1C4CB / #D0D5DD | Placeholders, disabled text |
| `fg-inverse` | #FFFFFF | Text on primary |
| `icon` / `icon-muted` | #292D32 / #475467 | Icon strokes / chevrons |
| `line-subtle` / `line` / `line-strong` | #EAECF0 / #D0D5DD / #667085 | Dividers, cards, tables / control borders / hover border and the outline (Cancel) button |
| `line-field` | #D1D5DB | Side-panel section borders |
| `action-{view,edit,delete,link,positive}` | #667085 / #D4A003 / #E81E25 / #0070FF / #00C167 | Row action menu items |
| `bg-avatar` / `bg-avatar-neutral` | gradients | Initials avatars: blue (people in tables), grey (top bar user) |
| `surface` / `surface-page` / `surface-muted` / `surface-sunken` | #FFFFFF / #FCFCFD / #F8F8F8 / #F3F3F3 | Cards / app background, table header / hover / sidebar, search |
| `surface-control` / `surface-track` | #F1F4F9 / #E5E7EB | Theme toggle / segmented control track |
| `surface-disabled` | #D0D5DD | Disabled primary button |
| `status-{warning,info,neutral,success,error}-{fg,bg}` | see tokens.json | Status pills (error is derived) |
| `badge` | #E52E40 | Notification count |
| `switch-off` | rgba(120,120,128,.16) | Switch track when off (on = `success`) |
| `success` / `success-strong` | #34C759 / #00C167 | Positive status, amounts |
| `error` | #FF2E3B | Destructive, validation, required asterisk |
| `warning` | #FF9500 | Warnings |
| `overlay` | derived | Modal backdrop |

### Typography
Families: `font-sans` (Inter: controls, labels, sidebar, top bar) and `font-data` (Roboto: tables, tabs, breadcrumb, page titles). Weights: `font-regular` 400, `font-medium` 500, `font-semibold` 600, `font-bold` 700.

| Class | Size / line height | Typical use |
|---|---|---|
| `text-2xs` | 10 / 14 | Badge counts, tags |
| `text-11` | 11 / 16 | Field hints, user role |
| `text-xs` | 12 / 18 | Field labels, table headers, status pills |
| `text-13` | 13 / 16 | Tabs, breadcrumb, pagination |
| `text-sm` | 14 / 20 | Buttons, inputs, body, table cells |
| `text-15` | 15 / 18 | Sidebar items, accordion titles |
| `text-md` | 16 / 24 | Card titles |
| `text-lg` | 20 / 28 | Section titles |
| `text-xl` | 24 / 32 | Modal titles |
| `text-28` | 28 / 34 | Page titles |
| `text-2xl` | 32 / 40 | Dashboard figures |

### Spacing, size, radius, shadow
- Spacing (`p-*`, `gap-*`, `m-*`): `0.5`=2, `1`=4, `1.5`=6, `2`=8, `2.5`=10, `3`=12, `3.5`=14, `4`=16, `5`=20, `6`=24, `7.5`=30, `8`=32, `10`=40, `12`=48 px.
- Controls: `control-xs` 32 (toolbar search, Filters, page buttons), `control-sm` 34, `control-md` 40 (default), `control-lg` 46. Icons: `icon` 20, `icon-sm` 16, `icon-xs` 14.
- Layout: `sidebar` 200, `sidebar-collapsed` 72 (derived), `topbar` 64, `nav-item` 48, `nav-subitem` 44, `nav-leaf` 36, `tab` 35, `row` 44, `row-head` 44, `row-comfortable` 54, `dialog` 515, `menu` 240, `field` 320 (derived), `filter-field` 235.
- Tables and panels: `search` 203, `page-btn` 30, `checkbox` 20, `radio` 16, `avatar-sm` 28, `action-menu` 138, `columns-popup` 354, `filter-control` 161, `panel-sm` 435, `panel-md` 541, `panel-lg` 562, `switch-sm-w`/`-h` 34×20, `knob-sm` 16.
- Radius: `rounded-xs` 2, `-sm` 4, `-md` 6 (pills), `-lg` 8 (**default**: buttons, inputs, menus, modal), `-xl` 10 (cards, table card, sidebar items), `-panel` 12 (form accordion), `-2xl` 16, `-3xl` 20 (segmented pill), `-full`.
- Shadow: `shadow-xs` (buttons), `shadow-md` (menus, popovers), `shadow-knob` (switch), `shadow-dialog`, `shadow-focus`, `shadow-focus-error` (last three derived).

Derived tokens (not drawn in Figma): `primary-hover`, `success-subtle`, `error-subtle`, `status-error-bg`, `overlay`, `shadow-focus`, `shadow-focus-error`, `shadow-dialog`, `size-field`, `size-sidebar-collapsed`, `size-popover-max`. Replace them when design defines these states.

## Components

All live in `src/components/<Name>/` with stories. Figma node IDs are in each story's `parameters.design.url`.

| Component | Figma source | Key props / states |
|---|---|---|
| `Button` | `_Button base` frames (accounting) | `variant`: primary, secondary, outline (Cancel in panels), tertiary, destructive · `size`: sm, md, lg · `disabled`, `loading`, icons, `iconOnly`, `fullWidth` |
| `Input` | Journal fields `6309:33026` (accounting) | `size` · `label`, `hint`, `error`, `success`, `required`, `disabled`, `readOnly`, `loading`, icons |
| `Select` | dropdown-inner `7092:1508` (new features); open menu `5184:46439` (accounting) | `options`, `value`/`defaultValue`, `placeholder`, `required`, `error`, `hint`, `disabled`, `size`, `menuAction` ("Add New"). Listbox keyboard support |
| `FilterDropdown` + `FilterField` | "Filters" on Customers `191:3274`; panel `7099:7787` | list pages · closed / open / `activeCount`, `onApply`, `onReset` |
| `FilterBar` + `FilterBarField` | filter, General ledger `1752:21749` | report pages · default / "More Filters" open / `applying` / Advanced |
| `Table` primitives, `DataTable`, `TableCard`, `TableToolbar`, `TableToolbarGroup`, `SearchField`, `TableSectionRow`, `TableFooter`, `Pagination` | Customers `191:3274`, Bills `4183:23454`, Chart of Accounts `1871:19163`, Trial balance `845:8824` | `selectable`, `sortable` columns, `rowActions`, `getRowChildren` (tree), `visibleColumns`, `density`, `activeRowId`, `loading`, `empty`; cell `emphasis` strong / link, `tight`; pagination with page jump |
| `ColumnCustomizer` + `ColumnCustomizerPanel` | Customize Columns `845:8824`, Edit Column `896:17474` | trigger `variant` / `iconOnly`; columns (`locked`), More Options; draft until Apply |
| `ActionMenu` | actions `191:3853` | item `tone`: view, edit, delete, link, positive; disabled items; keyboard menu |
| `SidePanel` + `SidePanelContent` | New Customer `209:4142`, New Account `1871:19941`, New Vendor `254:5423`, New Employee `4306:39199` | `size` sm / md / lg; create / edit / view footers; `showClose`, `closeOnBackdrop` |
| `Checkbox` | `896:17613` | unticked / ticked / indeterminate / disabled |
| `Radio` + `RadioGroup` | Customer Type `209:4142` | horizontal / vertical / disabled |
| `Avatar` + `AvatarLabel` | top bar avatar `7075:190`; blue reference image | `tone` blue / neutral · `size` sm / md · `description` line |
| `Logo` | brand PNG supplied by design | `variant` full / mark |
| `StatusPill` | Status column `7053:5433` | `tone`: warning (Pending Approval), info (Ready for Issue), neutral (Partially Issued), success (Completed), error (derived) |
| `Accordion` + `AccordionItem` | block-basic-info `7092:1482`; panel sections `209:4142` | `variant` card / form · open / closed / `disabled` / `meta`; group `type`: single or multiple |
| `Modal` + `ModalPanel` | tax popup `3564:23503` (accounting) | native `<dialog>`; `title`, `description`, `footer`, `closeOnBackdrop` |
| `Tabs` + `TabPanel` | sub-menu-list `7053:5433` | selected / unselected / disabled; arrow-key navigation |
| `SegmentedControl` | Inventory/Free Text `7053:5632`; List/Card `7053:5973` | `appearance`: pill, boxed; icons; disabled options |
| `Switch` | "Toggle" instances (accounting) | `size` md / sm (table rows) · on / off / disabled; optional `label` and `description` |
| `Sidebar` | sidebar-content `7067:32543` (metrics) + the unfolded menu reference (structure) | three levels, any can be a group; active page and module; `expandAll`; `collapsed` icon rail (derived) |
| `TopBar` | top-header `7053:5510` (**current top bar**) | breadcrumb; Tour, theme toggle, notifications badge, user menu, app launcher (each shown when its handler is passed) |
| `PageHeader` | action-row `7053:5433` | `title`, `description`, `actions`, `back` link |
| `Card` | settings cards `7053:6444` | `title`, `description`, `actions`, `divided` |
| `Spinner` | n/a | `label` |
| Icons (`src/icons`) | Vuesax linear style | `currentColor`, size via wrapper (`size-icon`) |

`Patterns/Pages` in Storybook composes these into full screens: a list page (Customers with side panels), a hierarchical list (Chart of Accounts), a report page (Trial balance with the filter bar) and a people directory. **Don't name components, stories or docs after one feature**; the system is used across the whole platform.

Inside `SidePanel` and `FilterBar`, `Input` and `Select` labels switch to the accounting form style through `FieldLabelContext`; don't restyle labels by hand.

Known inconsistencies in the Figma screens, normalised in code (tell design if any should differ):
- Two type families: Inter for controls and navigation, Roboto for tables, tabs, breadcrumb and page titles. Some older screens use Segoe UI.
- Field heights differ: 40px on accounting, 37px on new features. Inputs and selects use 40px (`control-md`).
- Off-grid values (5, 15, 18px gaps, fractional sizes) snap to the nearest token. Field borders appear as #D0D5DD and #D1D5DB; code uses `line`.
- The modal's Cancel button is grey-filled in Figma and looks like a disabled button; code uses `secondary` there and `outline` in side panels.
- "Mark as Contra" on New Account is a lone radio in Figma; code uses a checkbox, since a lone radio can't be turned off.
- Side-panel footers stay pinned to the bottom of the panel; in Figma they follow the last section.
- The supplied sidebar reference shows some pages as collapsed groups (Inventory Reports, Requisitions, Employee Records, Onboarding, Attendance, Performance, Payroll). Their sub-pages aren't visible, so they are single pages in `src/patterns/navigation.tsx` for now. One Purchases label was unreadable and is listed as "RFQs".
- The "Button / texts" and 608-variant "Button" sets are **remote library components** with an orange palette (#EB5017) that isn't wBiz's. Do not copy them.
- There is no "soft" (purple) button in the design system; don't reintroduce it.

## Conventions
- Components are `forwardRef`, accept `className`, spread native props, and default `type="button"`.
- Variant styles live in typed `Record<Variant, string>` maps; combine with `cx()` from `src/utils/cx`.
- Accessibility: visible focus via `focus-visible:shadow-focus`; `aria-busy` while loading; `aria-invalid` + `aria-describedby` on inputs with messages; icon-only buttons require `aria-label`.
- Each component needs a story per Figma variant, a states matrix, and `parameters.design.url` pointing to its Figma node.

## Accessibility gaps inherited from Figma
Kept to match the screens and tracked in `docs/foundations/colors.md`. Never convey state by colour alone.
- White on `primary`: 4.41:1 (AA needs 4.5). `error` text: 3.68:1. `success-strong` text: 2.38:1.
- Status pills: Pending Approval 1.57:1, Completed 2.11:1, Rejected 3.2:1, Ready for Issue 4.07:1, Partially Issued 4.14:1. All are below 4.5:1; the pill text always names the status.
