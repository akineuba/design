# iBroka UI Rules

Rules every new or redesigned iBroka screen follows. **Part A** is agreed. It is the wBiz rule set,
which iBroka shares, adjusted where the iBroka design differs (marked *iBroka*). **Part B** lists
changes and open questions found while building the library from the iBroka v2 Figma file. Accept,
change or delete each one.

---

## Part A: Agreed rules

### Adding and editing data
1. **Every dropdown is searchable, and lets the user add a new value without leaving the screen.** Dropdowns that list records (clients, insurers, classes of business, account officers…) end with **"Add New"**. It opens a centred quick-add modal; on save the new value is added and selected, and the user carries on. *(Select)*
2. **Adding new data uses a panel or modal, never a whole page.** Records are created, edited and viewed in a **right-hand side panel** over the list; small values are quick-added in a **centred modal**. *(SidePanel, Modal)*
3. **View and edit happen in the same panel.** View mode shows read-only fields with an **Edit** button that switches the panel to edit mode in place.
4. **After saving, return the user to where they were.** Close the panel or modal, refresh the list, highlight the new or changed row and confirm with a toast. *(Table `highlightKey`, Toast)*
5. **Destructive actions are confirmed** in a centred modal that names the action ("Delete policy POL-2026-00975?") and says whether it can be undone. *(Modal, tone danger)*

### Modals and panels: where they appear
6. **Side panels slide in from the right**, full height, over a dimmed page. Widths: 435px (single-column forms), 541px (clients, contacts), 562px (two-column forms, policies).
7. **Modals are centred**, 515px wide (820px for document previews), over a dimmed page.
8. **Nothing slides in from the left** (that's the menu) or drops from the top.
9. **One layer at a time, plus quick-add.** A quick-add modal may sit above an open side panel; don't stack further.
10. **Escape, Cancel and the backdrop close** a panel or modal and return focus to what opened it. If there are unsaved edits, ask "Discard changes?" first.

### Buttons and actions
11. **One primary (teal) button per area** (page header, card header, panel, modal). Secondary actions are outline or dark (Export).
12. **Footers are right-aligned: Cancel (outline) then the primary action.**
13. **Add New is the primary button on the right** of a card or table header. *iBroka:* Figma puts Export (dark) after Add; keep that order.
14. **Row actions live in the ⋯ menu** at the end of the row, in this order: View, Edit, Delete, then related actions (Receive premium, Renew, Open claims). Colours by meaning: View default, Edit amber, Delete red, navigation blue, money-in green.

### Page structure
15. **Every page has the same frame:** sidebar (left) → top bar → page title and subtext → section tabs (if any) → summary cards (if any) → filter card (reports) → content cards. Body has 80px side padding and 20px between blocks. *(AppShell)*
16. *iBroka:* **Top bar:** breadcrumb on the left, current page in teal; notifications and theme toggle (round 45px buttons) on the right. The signed-in user sits at the bottom of the sidebar, not in the top bar.
17. **Section tabs switch between sibling pages or views** of one module or record, and match the sidebar's current page.
18. **One menu for the whole platform**, three levels deep at most (module › page › sub-page). New screens join an existing module. The menu is searchable.

### Filters and search
19. **List pages: Search, then Filter, beside the card title.** The Filter button opens a panel that applies on "Apply filters" and shows an active-filter count. Up to two **quick filters** ("Status: All ▾") may sit beside the title instead when they change the list at once.
20. **Report pages: a filter card under the summary cards**, with the main filter (Period) first, "More filters" and Apply.
21. **Nothing reloads until Apply** (except quick filters). Search, filters, sort and page size combine, and any change returns to page 1.

### Tables
22. **Tables:** 38px grey header (SemiBold 13, muted), 40px rows, 13px text, the first column is the record name in Medium.
23. **Drill-down values are teal links** (policy numbers, clients). **Money is right-aligned with tabular figures; negatives are red.** Overdue values are red with a second line ("Overdue by 5 days").
24. **Tables with more than about 6 columns, and every report, have the column picker.** The record-name column can't be hidden.
25. *iBroka:* **People are shown with indigo initials avatars** next to their name.
26. **Pagination sits at the bottom:** "Showing 1-10 of 24 entries" left; page buttons and page size right.
27. **Every table has loading, empty (nothing yet, with the Add action) and no-results states.**
28. **When rows are ticked, a bulk-actions bar** replaces the toolbar strip: "3 policies selected", Export, module actions, Delete last.
29. **Wide tables keep the first column visible** while scrolling sideways.

### Forms
30. **Labels sit above fields and end with a colon** ("Sum insured:"). Required fields have a red asterisk.
31. **Long forms are split into collapsible sections**; the first is open.
32. **Fields are 40px in forms, panels and modals; 34px in filter cards and filter panels.**
33. **Validate on blur and on save**; errors say how to fix the problem. On save, list errors in an Alert at the top of the form.
34. **Money fields show the currency, format on blur and right-align.** *(MoneyInput)*

### Status and stages
35. **Status pills are chosen by meaning, not colour:** waiting or due soon = amber (Pending approval, Expiring), in progress = blue (Reported, Quoted), done or in force = green (Active, Paid, Settled), failed or ended badly = red (Expired, Lapsed, Repudiated, Overdue), draft or inactive = grey. The same status uses the same pill everywhere. *(RecordStatus)*
36. **Stages move forward only through the current stage's action** (Submit, Approve, Bind). Users can't jump to a stage.
37. **Rejecting sends a record back** to an earlier stage, marked in red with the reason, until it is resubmitted.
38. **Completed stages record who acted and when.** Fields lock once a policy leaves Draft.
39. **Expiry is shown in words with urgency colour** ("12 days left", "Expired 28 days ago"), never as a bare negative number. *(ExpiryBadge)*

### Summary figures and charts
40. **Headline figures sit in a row of summary cards under the page title**: icon on the left, uppercase label saying what and when ("Income — Oct 2026"), a bold shortened value (`₦2.6M`), and a trend or context line. Up to five per row. *(SummaryCard)*
41. **Charts use the categorical order in tokens, never generated colours.** Two or more series get a legend; every chart has a table view. One y-axis per chart. *(Charts)*

### Feedback
42. **Saving, deleting or switching a setting shows a short toast** ("Client saved") at the bottom right. Deletions offer Undo. Errors stay until dismissed. *(Toast)*

### Building rules (for developers and AI tools)
43. **Use design tokens only**: no raw hex values or pixel sizes in components (see `CLAUDE.md`).
44. **Reuse library components** before building anything new; check Storybook and Figma first.
45. *iBroka:* **Icons come from `src/icons` only: Phosphor, filled weight.** Line glyphs with no filled form (plus, close, check) use bold. Never mix sets.
46. **Name things for what they are, not for one feature** (`SidePanel`, not `PolicyDrawer`).
47. **Dates:** `18 Oct 2026` in tables, `18 October 2026` in headings and sentences. *(formatDate)*

---

## Part B: Changes made while building, and open questions

These come from comparing the iBroka v2 Figma file with the rules above. **Changed** items are already in
the library; **Question** items need a decision.

- **B1. Teal fails contrast as a fill (changed).** White on brand teal `#36A59E` is 2.99:1 (AA needs 4.5:1). Buttons, links, active text, checkboxes and pagination use a darker teal `#247A75` (5.1:1). The brand teal stays on the logo dot, active-nav bar, tab underline and focus ring. Design: please confirm or pick a different dark step.
- **B2. Grey text fails contrast (changed).** `#828282` (3.84:1) and the tab grey `#A3AED0` (2.21:1) are now `#666B73` (5.36:1).
- **B3. One selection colour (changed).** Figma checks boxes in blue on one screen and red on another, and colours the current page number red on one and blue on another. All selection is now teal.
- **B4. Leftover v1 colours (question).** The filter-panel list frame (15:1380) still has the old blue Add button, red active tab, red checkbox and red list toggle. The library ignores them; please update that frame in Figma so it matches the others.
- **B5. Button styles (changed).** Figma shows six button styles across the dashboard cards (teal, dark, red, grey, red outline, grey outline). The library keeps six variants with defined jobs: primary (teal), secondary (dark, e.g. Export), outline, tertiary, destructive (red) and destructive-outline. The grey filled button is folded into outline, because grey fill reads as disabled (wBiz B13). One primary per area (rule 11).
- **B6. Two filter patterns (changed).** Figma has inline "Filter: All" dropdowns on one list and a single Filter button on another. Both are kept with separate jobs: up to two quick filters that apply at once, or a Filter panel with Apply (rule 19).
- **B7. Quick actions (question).** Kept as filled tiles in four colours (shades darkened so white text passes AA). The fourth tile is now "Delete Button" in red; a destructive action shouldn't be a dashboard shortcut, so the pattern uses **View Reports** (dark). Confirm the four actions.
- **B8. Status pill text (changed).** Pill backgrounds match Figma; label colours are darker so they pass AA. The dot keeps the bright Figma colour.
- **B9. Avatar colour (changed).** Figma's 49%-opacity indigo gives white initials 2.2:1. Avatars use solid `#5C6BB5` (4.97:1).
- **B10. One font (changed).** Instrument Sans everywhere. Figma also uses Inter (filter dropdowns) and Roboto (tabs).
- **B11. One icon set (changed).** Figma mixes Solar, Phosphor, Bootstrap, Lucide, Entypo, WPF, Font Awesome, Iconify and others. The library uses Phosphor's filled weight for everything (rule 45).
- **B12. Summary card values (changed).** "256,2988" is malformed and has no currency or period. Cards now show "Income — Oct 2026 · ₦2.6M" with an optional trend.
- **B13. Radius scale (changed).** Figma uses 5, 6, 8, 10, 20, 30, 50, 67.5, 90 and 100px. The library uses 5 (checkbox), 8 (fields, menus), 10 (buttons, list cards), 20 (dashboard cards) and full.
- **B14. Expiry as words (changed).** The live dashboard shows "-28" in Days Left. ExpiryBadge shows "Expired 28 days ago" in red (rule 39).
- **B15. Logo (question).** Figma only holds a 109×40 bitmap. The `Logo` component is a vector rebuild in Instrument Sans Bold with the teal dot; please supply the master SVG so it can be swapped in.
- **B16. Chart colours (changed).** The Figma chart colours (`#FFA239`, `#394CA3`, `#299BFF`) are re-stepped into a five-colour order that passes the colour-blindness and lightness checks in light and dark. Amber is 2.77:1 on white, so every chart has a legend, tooltip and table view.
- **B17. Radar chart (question).** The radar in Figma is hard to read for exact values. It's in the library, but a bar chart is recommended unless the shape is the point.
- **B18. Dark theme (question).** The theme toggle is drawn but no dark screens exist. Dark values in `tokens.json` are derived; design should review them (switch "Theme" in the Storybook toolbar).
- **B19. Sidebar (changed).** The Figma nav's user name is blue; it's now dark text, with a sign-out button added. The duplicate "Transactions" under Accounting in the full nav is removed. Collapsed mode (76px, "i" mark) is added from the collapsed-logo frame.
- **B20. Labels with colons (question).** Rule 30 (from wBiz) puts a colon after labels; the iBroka registration page in Figma doesn't. The library follows the rule; say if iBroka should drop the colon.
- **B21. Registration and pricing page (question).** Page 2 of the Figma file (broker registration with plan cards) isn't built as a pattern. Say if it should be, and whether plan cards belong in the library.
- **B22. Menu search shortcut (question).** The live app shows "⌘K" in the menu search. A command palette isn't built; worth adding if people use it.
