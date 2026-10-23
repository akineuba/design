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

The Figma file has **no published variables or styles**. Tokens v0.1 were consolidated from a full audit of the page
(27k layers). **v0.2.0** adds every value found by the five per-area audits (shell/dashboard, CRM lists, social/emails,
settings/fields, mobile) so components can be **pixel-perfect to Figma**: values that were previously swapped for
contrast or treated as "legacy" (`#F32135`, `#EF2D38`, `#E53E3E`, `#151A33`, `#0F172A`, `#DDE3ED`, `#8F9BBA`, `#707EAE`, …)
are now real tokens with their Figma role. Each token in `tokens.json` carries `usage`, `figma` (node ids), `figmaUses`
where known, `previous` when its value changed, and `"derived"` when Figma does not draw it.

**Rule: use the token whose value equals the Figma value, never a near neighbour.** `#F8F9FC` table header is
`bg-surface-table-header`, not `bg-surface-subtle` (`#F8FAFC`); a `#A3AED0` menu border is `border-border-muted`.
Every colour works with every colour utility (`bg-`, `text-`, `border-`, `fill-`, `stroke-`, `divide-`, `ring-`).

### Colour (`color.<group>.<name>` → `--color-<group>-<name>` → `bg-<group>-<name>`, `text-<group>-<name>`, …)

| Token | Value | Use |
|---|---|---|
| `brand.primary` / `-hover` / `-subtle` | `#EE1F2F` / `#D7192D` / `#FFF0F2` | Primary actions, active tab, selected nav, menu Delete / selected chips |
| `brand.primary-alt` | `#EF2D38` | Full-width drawer submit buttons, Filters Apply |
| `accent.navy` / `-hover` / `-subtle` | `#3D5A98` / `#2B3674` / `#F0F4FA` | Secondary actions, links / navy text (emphasis cells, KPI values, Save Draft) / selected rows, active nav fill |
| `text.primary` · `text.strong` · `text.ink` · `text.charcoal` | `#1E2238` · `#111827` · `#0F172A` · `#1E293B` | Body/headings · settings labels, modal titles · notification/detail values, Geist titles · avatar initials, email-builder labels |
| `text.secondary` · `text.slate` · `text.icon-strong` · `text.tertiary` · `text.nav` | `#64748B` · `#475569` · `#4B5563` · `#667085` · `#4F5966` | Supporting copy · mobile-sections labels · row icon glyphs, fields Type/Rule · header title, sidebar section label, hints · sidebar labels |
| `text.muted` · `text.placeholder` · `text.faint` · `text.hint` · `text.icon` | `#A3AED0` · `#98A4BF` · `#94A3B8` · `#9CA3AF` · `#8F9BB3` | Meta, table headers · placeholders · notification time · upload hints · view-toggle icons, archived badge |
| `text.navy-strong` · `text.navy-deep` · `text.greeting` · `text.qualifier` · `text.black` | `#1B2559` · `#1E3A8A` · `#B8B8C0` · `#C1C1C1` · `#000000` | Activity / breakdown text · pick-list chevron · header "Hi …" · "(including bots)" · calendar day numbers |
| `text.link` · `text.link-bright` · `text.link-blue` · `text.button-outline` · `text.avatar-gold` · `text.inverse` | `#3366E5` · `#0070FF` · `#3B82F6` · `#3B414D` · `#CA8A04` · `#FFFFFF` | Code links · "Move" link · picker actions · Upload label · gold initials · text on fills |
| `surface.default` · `canvas` · `subtle` · `table-header` · `sunken` · `group` | `#FFFFFF` · `#F4F6FA` · `#F8FAFC` · `#F8F9FC` · `#F1F5F9` · `#FAFBFC` | Cards · page bg · info cards, unread rows · table headers, expanded rows, key notes · disabled, pills · archived group |
| `surface.avatar` · `avatar-tint` · `toggle` · `scrollbar` · `overlay` | `#F6F8FB` · `rgba(226,232,240,.30)` · `#E5E7EB` · `#99A6B8` · `rgba(15,23,42,.45)` | Avatar fill · header avatar · theme toggle · scrollbar thumb · desktop scrim (derived) |
| `border.default` · `strong` · `subtle` · `muted` · `modal` · `neutral` · `module` · `ai-panel` · `danger-subtle` · `module-header` | `#E2E8F0` · `#CBD5E1` · `#EEF2F7` · `#A3AED0` · `#E5E7EB` · `#D1D5DB` · `#EDF2F7` · `#D1D6E0` · `#FECACA` · `rgba(193,193,193,.11)` | Dividers/outlines · mobile-sections inputs · inner rows · menus, popovers, outline avatars · modal · date chip, option ring · module card · AI panel · selected option · module header |
| `status.success` / `-text` / `-subtle` / `-strong` / `-dark` · `status.connected` | `#05D38A` / `#16966A` / `#EAF9F3` / `#059669` / `#05A86E` · `#10B981` | Success dot/text · chip text · fill · KPI trend up, success checkbox · fields Active badge · "Connected" |
| `status.warning` / `-text` / `-subtle` / `-bright` | `#DF9B17` / `#B54708` / `#FFF7E5` / `#E9BB2B` | Menu Edit, warning button · Change badges · fill · Scheduled tab, Spam badge, sun icon, Edit button |
| `status.danger` / `-subtle` / `-strong` / `-alt` | `#E11D48` / `#FFF1F2` / `#DC2626` / `#E53E3E` | Required asterisk, validation · fill · KPI trend down · settings checkbox, Failed badge |
| `status.info` / `-subtle` · `status.toggle-off` | `#409CFF` / `#EDF3FF` · `#9CA3AF` | Menu View, View link · fill · Switch off track (was `#CBD5E1`) |
| `badge.*` | translucent fills (`rgba`) + solid dots | Status badges (`active-bg/-dot`, `inactive-bg/-dot`, `nonuser-bg/-dot`), fields badges (`existing-bg`, `custom`/`custom-bg`, `change-bg`, `archived-bg`, `success-tint`, `neutral-tint`), `brand-tint`, `danger-tint`, `failed-tint`, `release-tint`, `info-tint`, `excluded-bg`, `spam-bg`, `added-tint`, `hidden-tint` |
| `alert.warning-bg` / `-border` / `-title` / `-body` / `-icon` | `#FFFAEB` / `#FEC84B` / `#7A2E0E` / `#93370D` / `#DC6803` | Draft banner and warning callouts |
| `chart.series-1..4` · `chart.legend` · `chart.purple` / `orange` · `platform.*` | `#2B3674` `#EE1F2F` `#4318FF` `#FFB547` · `#707EAE` · `#8262FF` / `#FF7A00` · IG `#E1306C`, YT `#FF0000`, LI `#0A66C2` / logo `#0076B2` | Dashboard charts, breakdown bars |
| `calendar.outside` / `today` / `chip-linkedin` · `chip.date-bg/-text/-icon` · `checkbox.disabled-checked` · `action.clone` | `#FAF9FC` / `#E8F2FF` / `#E6F0FA` · `#F3F4F6` `#374151` `#6B7280` · `#F4A3AA` · `#9747FF` | Month calendar · dashboard date chip · disabled checked box · Clone action |
| `copilot.*` | `#5B5FC7`, `rgba(91,95,199,.06/.07)`, `#F5F5F5`, `#3182CE`, `#22C55E` | Copilot chat panel |
| `mobile.*` | `brand #F32135`, `brand-subtle #FFF0F1`, `text #151A33`, `text-secondary #66728F`, `caption #8F9BBA`, `border #DDE3ED`, `canvas #F5F7FB`, `chip #F8FAFD`, `selected-border #FFC8CF`, `navy #4268B5`, `icon #292D32`, `scrim rgba(17,24,42,.6)`, `scrim-v1`, `warning-text #B6780E`, `warning-text-alt #D99114`, `info-text #3976D4`, `info-bg #EDF4FF`, `success-text #179C6B`, `success-bg #EAF8F2`, `success-text-v1 #179C6E`, `warning-bg-v1 #FFF8E8` | Mobile V2-flow / V2-sections / V1 dialects — use the dialect of the frame you build |

### Typography (`text-<name>` sets size, line height and default weight; Figma "auto" line height = CSS `normal`)

Fonts: **Inter** (`font-sans`, default), **Roboto** (`font-data`: sidebar, tabs, settings, mobile), **Poppins** (`font-display`: mobile titles,
module-picker title), **Geist** (`font-geist`: Settings › Profile), **Instrument Sans** (`font-instrument`: connect-social cards),
**Fira Code** (`font-mono`), **Roboto Mono** (`font-roboto-mono`: recovery codes). Weights `font-regular|medium|semibold|bold|extrabold` (800).
Combine a size utility with a weight/family/tracking/leading utility when Figma differs from the default — those
utilities are emitted after `text-*` and win deterministically (this is the one allowed exception to the
"no two classes for one property" rule).

| Utility | Size / weight (lh `normal` unless noted) | Use |
|---|---|---|
| `text-display` | 28 / 700 | StatCard value, Create New Post title (`font-extrabold` for SummaryCard) |
| `text-heading-xl` | 24 / 700 | Notifications page title, MetricCard value (`font-extrabold`) |
| `text-kpi-value` | 22 / 700 | Dashboard KPI, mobile metric (Poppins) |
| `text-mobile-title-lg` / `-sm` | 21 / 700 · 17 / 700 | Mobile success / step titles (Poppins) |
| `text-heading-1` | 20 / 700 | Header title, drawer titles, filter popover title |
| `text-heading-2` | 18 / 700 | Modal titles, mobile app-bar title |
| `text-heading-3` | 16 / 700 | Section card titles |
| `text-card-title` | 15 / 700 | Dashboard card titles, Inter 15 tabs (`font-semibold`) |
| `text-body` / `text-label` | 14 / 400 · 14 / 600 | Input values / buttons, tabs, labels |
| `text-nav` | 14 / 500, lh 28, −0.02em | Sidebar settings group and sub-items (Roboto) |
| `text-body-sm` / `text-field-label` / `text-stat-label` / `text-label-sm` | 13 / 400 · 13 / 400 · 13 / 500 · 13 / 600 | Table cells · drawer field labels · KPI label · emphasis cells, compact buttons |
| `text-caption` / `text-badge-lg` | 12 / 400 · 12 / 700 | Helper text · 23/27px status badges |
| `text-caption-sm` / `text-badge` / `text-overline` | 11 / 400 · 11 / 700 · 11 / 700 +0.5px uppercase | Chart labels, notification time · fields badges, mobile chips (`font-semibold`) · table headers |
| `text-caption-xs` | 10 / 400 | Chart axis, cell meta, calendar chips, mobile detail rows |
| `text-micro` | 9 / 400 | Mobile nav labels, list metadata, owner initials (`font-bold`) |

Letter spacing: `tracking-tighter` −0.03em · `tracking-tight` −0.02em · `tracking-snug` −0.01em · `tracking-normal` 0 · `tracking-wide-sm` 0.4px · `tracking-wide` 0.5px · `tracking-wider` 1px.
Line height: `leading-normal` (Figma auto) · `leading-none` · `leading-120` · `leading-135` · `leading-140` · `leading-145` · `leading-150` · `leading-nav` 28px. Italic hints: `italic`.

### Spacing (`p-*`, `gap-*`, `m-*`, also `w/h/size-*`; key = px ÷ 4)

`0.5`=2 · `0.75`=3 · `1`=4 · `1.25`=5 · `1.5`=6 · `1.75`=7 · `2`=8 · `2.25`=9 · `2.5`=10 · `2.75`=11 · `3`=12 · `3.25`=13 · `3.5`=14 ·
`3.75`=15 · `4`=16 · `4.25`=17 · `4.5`=18 · `4.75`=19 · `5`=20 · `5.25`=21 · `5.5`=22 · `5.75`=23 · `6`=24 · `6.5`=26 · `6.75`=27 · `7`=28 ·
`7.5`=30 · `7.75`=31 · `8`=32 · `8.75`=35 · `9`=36 · `9.25`=37 · `10`=40 · `12`=48 · `12.5`=50 · `13.5`=54 · `14`=56 · `16`=64 · `18`=72 · `20`=80 · `50`=200 px; `px`=1px.
Main content padding is `p-10` (40px); dashboard content `py-6 px-10`; cards `p-4`/`p-5`/`p-6` as drawn.

### Radius, shadow, borders, sizes

* Radius: `rounded-bar` 2 · `rounded-checkbox` 3 · `rounded-xs` 4 · `rounded-nav` 5 · `rounded-sm` 6 · `rounded-md` 8 · `rounded-logo` 9 · `rounded-callout` 10 · `rounded-lg` 12 · `rounded-tile` 14 · `rounded-xl` 16 · `rounded-pill` 20 · `rounded-sheet` 22 (`rounded-t-sheet`) · `rounded-full`.
* Shadow: `shadow-sm` cards · `shadow-md` (derived) · `shadow-lg` (derived) · `shadow-menu` / `shadow-drawer` 0 8 16 #A3AED0@25% · `shadow-modal` (2 layers, −12 spread) · `shadow-dialog` 0 16 32 #0F172A@12% · `shadow-dropdown` profile menu · `shadow-panel` notification panel · `shadow-card` module / email preview card · `shadow-listbox` field-type menu · `shadow-tile` block tiles · `shadow-copilot` / `shadow-copilot-fab` · `shadow-mobile` sheets, FAB, mobile dialog · `shadow-mobile-v1` · `shadow-focus` / `shadow-focus-danger` (derived).
* Border widths: Tailwind `border` (1) / `border-2` plus `border-0.5` (sidebar footer) and `border-1.5` (mobile focus, 18px list checkbox). SVG strokes: `stroke-1`, `stroke-1.5`, `stroke-1.8`, `stroke-2`.
* Gradients: `bg-feature` (#324BF2 → #8E30F2, featured stat card) · `bg-ai` (#EE1F2F → #F172FF, Compose with AI).
* Layout: `w-sidebar` 217 · `w-sidebar-item` 191 · `h-header` 63 · `h-module-header` 56 · `w-content` 1143 · `max-w-page` 1440 · `h-nav-indicator` 35 / `-sm` 21.
* Control heights: `h-control-23/26/27/30/31/37/38/39/41/42/48` plus `h-control-sm` 36 · `h-control-md` 40 · `h-control-lg` 44 · `h-fab` 52. Badges `h-badge-xs` 17 · `h-badge-sm` 19 · `h-badge` 21 · `h-badge-md` 23 · `h-badge-lg` 27 · `h-chip-sm` 23 · `h-chip` 28.
* Tables: `h-table-header` **37** (was 40) · `h-table-header-39/43/50` · `h-table-row` 52 · `h-table-row-sm` 44 · `h-table-row-45/46/47/56/58/60/61/68` · `h-table-totals` 48 · `h-toolbar` 72 (`-73`, `-82`) · `h-table-footer` 58 (`-sm` 51, `-lg` 68).
* Controls: `size-checkbox-sm` 14 · `size-checkbox` 16 · `size-checkbox-list` 18 · `size-checkbox-lg` 20 · `size-radio` 16 · `size-radio-sheet` 18 · `size-check-circle` 22 · `w-switch-width`/`h-switch-height` 42×22 (`w-switch-width-sm` 38) · `size-switch-thumb` 18.
* Avatars: `size-avatar-sm/md/lg` 28/32/40 · `size-avatar-36/38/42/44/56/60/64/72/80`. Icons use the spacing scale (`size-3.5` 14 … `size-5` 20, `size-icon-md` 18, `size-icon-tile` 28).
* Overlays: `w-menu-sm` 135 · `min-w-menu` 160 · `w-popover-sm` 229 · `w-popover` 240 · `w-profile-menu` 220 · `w-notification-panel` 420 · `w-listbox-lg` 456 · `w-schedule-popover` 375 · `w-date-picker` 188 · `w-modal-xs` 360 · `w-modal-sm` 400 · `w-modal-smart-field` 454 · `w-modal-template` 480 · `w-modal-md` 560 · `w-modal-review` 680 · `w-modal-lg` 720 · `w-drawer` 462 (`w-drawer-content` 398, `w-drawer-lg` 520) · `w-chat-panel` 496 · `max-w-chat-bubble` 280 · `max-h-menu-max-height` 320.
* Pages/patterns: `w-search-sm/md/lg/xl` 220/260/360/415 · `w-field-sm` 320 · composer `w-composer-editor` 695 / `w-composer-preview` 440 · email builder `w-email-builder-side` 447 / `-preview` 666 / `w-email-preview-card` 602 · `h-textarea` 200 (`-sm` 146, `-post` 104, `-mobile-v1` 72, `-mobile` 70) · `h-dropzone` 81 · `h-block-tile` 127 · `h-calendar-row` 130 · `h-calendar-weekday` 33 · dashboard `w-card-activity` 541, `w-card-growth` 578, `size-donut` 140 / `size-donut-ring` 130, `w-chart-bar` 33, `h-chart-plot` 120, `h-chart-bar-group` 212, `h-chart-line-plot` 200, `w-progress-counter` 100, `w-progress-breakdown` 190 · `size-module-card` 196 (`w/h-module-media-*` 100×84) · `w-logo-w` 140.
* Mobile: `w-mobile-frame` 390 · `w-mobile-content` 358 · `w-mobile-dialog` 326 · `w-mobile-half` 170 · `w-mobile-dialog-button` 138 · `w-mobile-menu-item` 346 · `h-mobile-bar` 68 · `h-mobile-bar-sm` 58 · `h-bottom-nav-sm` 64 · `w-sheet-handle` 42 (`-lg` 98) · `h-day-pill-h` 54.

Tailwind's default colours, spacing, radii, letter spacing and line heights are **removed** by the preset, so `bg-blue-500`,
`p-2.2` or `rounded-2xl` will not compile to anything. If you need a value that does not exist, add it to
`tokens/tokens.json` with its Figma source (`usage`, `figma`), run `npm run tokens`, and document it here.

Not tokenised on purpose: the 0.5×-scale dark `TimePickerSection` / `calendar-time-picker` mocks (build them at full scale with these tokens),
device status bars / home indicators / device-frame shadows, and hidden layers.

## Components

Interactive behaviour (focus trapping, keyboard navigation, ARIA) comes from **Radix UI** primitives
(`@radix-ui/react-*`); every visual style comes from the tokens. Don't re-implement these behaviours by hand.

| Component | Figma source | Variants / states |
|---|---|---|
| `Button` | `create-button`, `Button`, `Save-Btn` (817:8441, 1926:27103, 1926:27101, 1931:24592) | primary · secondary · outline · ghost · danger; sm/md/lg; loading, disabled, icons, fullWidth |
| `IconButton` | toolbar tools, drawer close, inline row actions | outline · ghost; tone default/danger; sm/md/lg; `active`, disabled. `aria-label` required |
| `FilterButton` | desktop `filter-button` (1230:26010), mobile `Filter button` (1931:24248 / active 1931:24486) | labelled (calendar icon) · icon (funnel) · responsive; applied `count`; active; disabled. Use as the `FilterPopover` trigger |
| `ViewToggle` | Social posts view switch (`btn-list-view` / `btn-calendar-view`) | swap buttons: 2+ icon options, radio-group keyboard model |
| `Input` | `Field input`, `Input`, `input-box` (1926:27086, 1926:27124, 1931:24364) | md/lg; default, focus, error, disabled, read-only, leading/trailing icon |
| `Select` | `Selector Dropdown` (1147:17013, 1225:25729), form selects in Filters panels | md/lg; placeholder, value, toolbar `prefix` ("Accounts: All"), required, error, disabled, open |
| `Checkbox` | `checkbox-checked` in `filter-popup`, pref rows, frequency checklist | unchecked, checked, indeterminate, disabled; optional label + description |
| `Switch` | `toggle-switch` in `pref-row-4` (1529:9553) | on, off, disabled; label start/end |
| `Badge` | `status-badge` (1126:16406), Active/Inactive/Failed pills | success · warning · danger · info · neutral · brand; sm/md; dot |
| `Tag` | `filter-tag-chip` Active Filters (1039:3995) | default, selected, removable |
| `Avatar` | 28px initials circles in Contacts/Owners columns | sm 28 / md 32 / lg 40; image or initials |
| `Tabs` | settings `sub-tabs` (1224:25545), mobile list filters, status `subtabs` | underline · pill · dot (status dot per `tone`); counts; disabled |
| `Menu` | `context-menu` (795:6000) | item tones default/info/warning/danger, icons, label, separator, disabled, shortcut |
| `FilterPopover` + `FilterCheckboxList` | `filter-popup` (1233:5729), `dropdown-panel` (1228:25996), `filters` (1036:6256) | checkbox list, searchable list, stacked selects; Clear all / Apply; trigger active state |
| `Accordion` | drawer sections `Component 15/16/17` (808:6625), `pref-row-4` (1529:9554) | section · card; description, trailing `actions` (e.g. Switch), disabled |
| `Modal`, `ConfirmDialog` | `Move To New Audience - Modal` (1446:32223), mobile "Delete 3 contacts?" | sm/md/lg; picker, form, destructive confirm, loading confirm |
| `Drawer` | `new contact` (808:6024), `create user` (1823:7659) | 462px right sheet, scrolling body, sticky footer |
| `Table` (`TableCard`, `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`, `TableEmpty`, `TableSkeleton`, `TableExpandableRow`, `TableCellStack`) | Contacts (817:8972), Social accounts (1224:25339), `company-row-expanded` (817:8786), Email marketing, Campaigns, Social posts | toolbar, sortable headers, selection, selected/interactive rows, empty/no-results, loading skeleton, expandable rows, two-line cells, `density` default/compact |
| `Pagination` | Contacts / User management footers | summary, ellipses, current page, page size |
| `Card`, `CardHeader`, `StatCard`, `SummaryCard`, `MetricCard`, `ProgressBar`, `ModuleCard`, `ActivityFeed` | `stats-row` / `stat-card-*` (Social posts, Email), audience summaries, email performance, module picker, activity panel | stat: featured gradient, icon tile, trend up/down (`invert` when a drop is good); summary tones; metric details; progress tones; module selected/disabled |
| `RowActionsMenu`, `RowActionLink`, `RowActionButtons`, `TableLink` | `more-horizontal` + `context-menu`, Campaigns "View" link and code link | View/Edit/Delete from handlers or custom actions with separators; inline link (a or button); inline icon buttons with optional hover reveal |

Icons live in `src/icons` (outline set matching Figma's vuesax/lucide icons): `PlusIcon`, `SearchIcon`, `FilterIcon`,
`CloseIcon`, `ChevronDownIcon`, `MoreIcon`, `EyeIcon`, `PencilIcon`, `TrashIcon`, `UploadIcon`, `DownloadIcon`,
`HistoryIcon`, `UsersIcon`, `MailIcon`, `ListIcon`, `CalendarIcon`, `GridIcon`, `TrendUpIcon`, `TrendDownIcon`, `SendIcon`,
`CheckIcon`, `CopyIcon`, plus `Spinner` and `AlertCircle`. `FilterIcon`, `CalendarOutlineIcon`, `ListIcon` and `CalendarIcon` are the exact Figma vector exports.
The labelled `FilterButton` uses `CalendarOutlineIcon` (as drawn in Figma); the icon-only one uses `FilterIcon`.

Figma does not draw focus, hover, disabled or loading states for most of these; those were derived and are listed in
`docs/figma-mapping.md`. Patterns in Figma that are still not components: date/time pickers, the frequency
day-picker, sidebar navigation, app header, charts.

### Conventions for new components

* One folder per component with `Component.tsx`, `Component.stories.tsx`, `Component.test.tsx`, `index.ts`; export it from `src/index.ts`.
* `forwardRef`, spread remaining native props, accept `className` last in `cn(...)` so callers can extend but not fight the base styles.
* Variants are typed unions mapped to class strings in a `Record<Variant, string>`; never build class names dynamically from props.
* Lay out with flex/grid exactly as Figma Auto Layout does: direction → `flex-row`/`flex-col`, spacing → `gap-*`, padding → `p*-*`, "Fill container" → `w-full`/`flex-1`, "Hug" → default.
* Never combine two classes that set the same property (e.g. `text-text-primary` and `text-text-muted`); pick one with a ternary. The preset does not de-duplicate them, so the result depends on CSS order.
* Dialogs and popovers use `focusFirstField` (src/utils/focus.ts) so opening one focuses the first field, not the close button.
* Accessibility: native elements first, visible label for every field, `aria-invalid` + `aria-describedby` for errors, `focus-visible:shadow-focus` on every interactive element, 44px minimum touch target on mobile.
* Every Figma variant gets a story; add a `Matrix`/`States` story for side-by-side review and a `play` test for interactive behaviour.

## Working with Figma (for Claude)

* File key `EIQlA9M6mP2KlskFFy2X2U`; marketing page `782:4598`. Desktop screens use Inter (sidebar, tabs and settings use Roboto); mobile frames use Roboto with Poppins titles (V2-sections use Roboto titles).
* Before building UI, search this repo's `src/components` and the Figma page (`search_design_system`, `get_metadata`) for an existing component or pattern.
* Use `get_design_context` on the specific frame, then translate its output onto these tokens and components. Never paste its raw hex/px values.
* Components must be pixel-perfect to Figma: map every Figma value to the token with that exact value (tokens v0.2.0 cover every value in the audits, including former "legacy" colours). If Figma introduces a value with no token, add one to `tokens/tokens.json` with its node id rather than reusing a near neighbour.
