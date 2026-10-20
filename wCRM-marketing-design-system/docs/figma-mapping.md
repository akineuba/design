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

### Overlays, selection and data display (added)

| Component | Figma frame(s) | Notes / derived |
|---|---|---|
| Select | `Selector Dropdown` 1147:17013, 1225:25729, 1438:31619; `filters` panel selects | Option height 36px; check mark on the selected option and red text are derived. |
| Menu | `context-menu` 795:6000, 869:11860 | Figma uses a #A3AED0 border on menus; code uses `border.default` + `shadow.menu` (same blur/offset as Figma). Item colours follow Figma (View blue → `accent.navy`, Edit amber → `status.warning-text`, Delete red → `status.danger`). |
| FilterPopover | `filter-popup` 1233:5729, `dropdown-panel` 1228:25996, `filters` 1036:6256 | Figma's "Clear All" is a navy outline 27px button; code uses `Button variant="secondary" size="sm"`. |
| Tag | `filter-tag-chip` 1039:3995 | Remove (×) button is derived; Figma chips are static. |
| Badge | `status-badge` 1126:16406 | Figma's yellow `#E9BB2B` badge text maps to `status.warning-text` for contrast. |
| Checkbox | `checkbox-checked` (16px, r4, `#E53E3E`) | Uses `brand.primary`. Indeterminate and disabled states are derived. |
| Switch | `toggle-switch` 42×22 `#05D38A` | Off track `status.toggle-off` is derived. |
| Accordion | `Component 15/16/17` (section), `pref-row-4` (card) | Card variant uses `radius.lg`; Figma pref rows are square-cornered inside a card list. |
| Modal / ConfirmDialog | `Move To New Audience - Modal` 1446:32223; mobile Contacts "Delete 3 contacts?" | Selected option card uses `status.danger-subtle` + `border.danger-subtle` (#FECACA) as in Figma. |
| Drawer | `new contact` 808:6024, `create user` 1823:7659, `email config` 1556:14067 | Width `size.drawer` 462. |
| Table | Contacts 817:8972, Social accounts 1224:25339, `company-row-expanded` 817:8786 | Header 11px Inter Bold `text.muted` on `surface.subtle`; name cells semibold `accent.navy-hover` (#2B3674). Sort affordance, selection, skeleton and empty states are derived. |
| Pagination | Contacts list footer | Ellipsis rules derived. |
| IconButton | toolbar tools, close, inline row actions | `tone="danger"` hover is derived. |
| FilterButton | `filter-button` 1230:26010 (desktop), `Filter button` 1931:24248 / 1931:24486 (mobile, active) | Desktop: 40px, transparent, 1px `border.default`, r8, 10/16 padding, 8px gap, 14/500 `text.secondary`. Figma's desktop instance uses a calendar glyph; code uses the vuesax funnel from the mobile button so both read as "filter". Count pill is derived. |
| ViewToggle | `Frame 1618874107` → `btn-list-view` / `btn-calendar-view` | Group outline `text.muted`, cells 40×40 r8, selected `brand.primary` + white icon, unselected `text.icon` (#8F9BB3). Keyboard model derived. |
| StatCard | `stats-row` / `stat-card-0..3` | 12/600 uppercase `text.muted` label, 28/700 value (`text-display`), p20, gap 12. Featured uses `gradient.feature`; its label is white (Figma's #A3AED0 on the gradient fails contrast). Icon tile and trend are derived from dashboard KPI cards. |
| SummaryCard, MetricCard, ProgressBar, ModuleCard, ActivityFeed | audience summaries, email performance, module picker, activity panel | Module card 196 square, r16, `border.subtle`, resting shadow. |
| Tabs `dot` | `subtabs` (All / Drafts / Scheduled / Sent) | Roboto 14, 8px dot, active red underline. Inactive labels use the `-text` status tokens instead of Figma's bright #E9BB2B / #05D38A for contrast. |
| RowActions | `more-horizontal` (54×22, r4, 14px icon), `context-menu`, Campaigns "View" (eye + 13/500 #409CFF), code link #3366E5 | Trigger is 24px (WCAG 2.2 target size) instead of 22. "View" uses `text.link` (#3366E5) because #409CFF fails 4.5:1 on white. |
| Table (email style) | Email marketing `table-content` | Two-line "Last updated" cell (date `text.secondary` over author `accent.navy-hover`), rows ≈ 61px, numeric columns right-aligned (Figma left-aligns them). |
