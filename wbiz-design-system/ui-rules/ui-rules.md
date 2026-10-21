# wBizManager UI Rules

Rules every new or redesigned screen must follow. **Part A** is agreed: either stated by the design
team or used the same way across the Figma screens. **Part B** (at the bottom) lists proposed
improvements that still need to be vetted.

---

## Part A: Agreed rules

### Adding and editing data
1. **Every dropdown is searchable, and lets the user add a new value without leaving the screen.** Dropdowns that list records (customers, vendors, accounts, items, departments, tax codes…) end with **"Add New"**. It opens a centred quick-add modal; on save the new value is added and selected, and the user carries on. *(Select)*
2. **Adding new data uses a modal, never a whole page.** Records are created, edited and viewed in a **right-hand side panel** over the list; small values are quick-added in a **centred modal**. *(SidePanel, Modal)*
3. **View and edit happen in the same panel.** View mode shows read-only fields with an **Edit** button that switches the panel to edit mode in place.
4. **After saving, return the user to where they were.** Close the panel or modal, refresh the list and highlight the new or changed row.
5. **Destructive actions are confirmed** in a centred modal that names the action ("Delete customer?") and says whether it can be undone.

### Modals and panels: where they appear
6. **Side panels slide in from the right**, full height, over a dimmed page. Widths: 435px (single-column forms), 541px (contacts), 562px (two-column forms).
7. **Modals are centred** horizontally and vertically, 515px wide, over a dimmed page.
8. **Nothing slides in from the left** (that's the menu) or drops from the top.
9. **One layer at a time, plus quick-add.** A quick-add modal may sit above an open side panel; don't stack further.
10. **Escape, Cancel and the backdrop close** a panel or modal and return focus to what opened it (see B10 for unsaved changes).

### Buttons and actions
11. **One primary button per area** (page header, toolbar, panel, modal).
12. **Footers are right-aligned: Cancel (outline, close-circle icon) then the primary action** (tick-circle icon for Save / Apply).
13. **Add New is the last button on the right** of a table toolbar.
14. **Row actions live in the ⋮ menu** at the end of the row, in this order: View, Edit, Delete, then related actions. Colours by meaning: View grey, Edit amber, Delete red, navigation blue, money-in green.

### Page structure
15. **Every page has the same frame:** sidebar (left) → top bar → section tabs (if the module has sibling pages) → page title → filter bar (reports only) → content card.
16. **Top bar:** breadcrumb on the left (current page in blue); Tour, theme toggle, notifications, user (blue initials avatar, name, role) and app launcher on the right, in that order.
17. **Section tabs switch between sibling pages of one module** (Invoice / Receive payment / Customers) and match the sidebar's current page.
18. **One menu for the whole platform**, three levels deep at most (module › page › sub-page). New screens join an existing module.

### Filters and search
19. **List pages: Search, then Filters, on the left of the table toolbar.** Filters open in a dropdown panel and apply on "Apply filters"; an active-filter count shows on the button.
20. **Report pages: a filter bar under the page title**, with the main filter (Date), "More Filters" and Apply. More Filters reveals a second row; Advanced sits at its far right.
21. **Nothing reloads until Apply.** Search, filters, sort and page size combine, and any change returns to page 1.

### Tables
22. **Accounting tables are the standard:** 44px rows, grey header, the first column is the record name in dark medium text, other cells grey.
23. **Drill-down values are blue links** (account codes, document numbers). **Overdue values are red** with a second line ("Overdue by 5 days").
24. **Tables with more than about 6 columns, and every report, have the column picker** (Customize Columns). The record-name column can't be hidden.
25. **People are shown with blue initials avatars** next to their name.
26. **Pagination sits bottom right:** "Showing x to y of z entries", page buttons, and a "Page" field to jump.
27. **Every table has loading, empty (nothing yet) and no-results states.**

### Forms
28. **Labels sit above fields and end with a colon** ("First Name:"). Required fields have a red asterisk.
29. **Long forms are split into collapsible sections**; the first is open.
30. **Fields are 40px in forms, panels and modals; 34px in filter bars and filter panels.**
31. **Validate on blur and on save**; errors say how to fix the problem.

### Status and stages
32. **Status pills are chosen by meaning, not colour:** waiting = yellow, in progress = blue, partial/inactive = grey, done = green, failed/late = red. The same status uses the same pill everywhere.
33. **Stages move forward only through the current stage's action** (Submit, Approve, Post). Users can't jump to a stage.
34. **Rejecting sends a record back** to an earlier stage, marked in red with the reason, until it is resubmitted.
35. **Completed stages record who acted and when.** Fields lock once a record leaves Draft.
36. **The status pill in tables always matches the record's current stage.**

### Building rules (for developers and AI tools)
37. **Use design tokens only**: no raw hex values or pixel sizes in components (see `CLAUDE.md`).
38. **Reuse library components** before building anything new; check Storybook and Figma first. **Icons come from the library's Lucide set only**; never mix icon sets.
39. **Name things for what they are, not for one feature** (`SidePanel`, not `RequisitionDrawer`).

### Summary figures
40. **Headline figures sit in a row of summary cards under the page title**: icon tile on the left, label saying what and when ("Net pay — October"), a bold shortened value (`₦15.2M`), and a trend against the previous period or a context line. Up to four per row. *(SummaryCard)*

---

## Part B: Proposed improvements (to vet)

These are suggestions from building the library. They are **not rules yet**. Accept, change or delete each one.

- **B1. Line-item documents vs rule 2.** New Invoice, New Bill and New Journal are full pages in Figma, which conflicts with rule 2. Options: keep them as the one exception (documents with line items), or move them to an extra-wide side panel.
- **B2. Contrast.** White text on the brand blue is 4.41:1 (AA needs 4.5:1); a slightly darker blue (around #0066E8) would pass. Every status pill is below 4.5:1; Pending Approval (yellow) is 1.57:1. Darker pill text colours are needed.
- **B3. One date format.** Screens mix "18th July 2025", "20 Aug 2026" and "From 1st Aug 2025". Proposal: `18 Jul 2025` in tables, `18 July 2025` in headings.
- **B4. Save confirmation.** Show a short toast ("Customer saved") after saving, deleting or switching a setting. There is no toast design yet.
- **B5. Bulk actions bar.** Tables have row checkboxes but no design for what appears when rows are ticked. Proposal: a bar above the table showing "3 selected" with Export, Delete and module actions.
- **B6. One font.** Inter and Roboto are mixed (Roboto in tables, tabs and form labels). Proposal: Inter everywhere.
- **B7. One field height.** Accounting uses 40px, new features 37px. Proposal: 40px everywhere (the code already does this).
- **B8. Stage progress design.** The `StageProgress` component is built from existing tokens because Figma has none. Design should review it.
- **B9. Sticky header and first column** on wide, horizontally scrolling tables, so names stay visible.
- **B10. Unsaved-changes guard.** Panels with edits ask "Discard changes?" before closing (not drawn in Figma).
- **B11. Remember table settings per user.** Visible columns, sort, page size and List / Card view persist between visits.
- **B12. Empty states with a next step.** Each empty table explains what belongs there and shows the Add New action.
- **B13. Modal Cancel style.** The Tax Deduction modal's grey filled Cancel looks disabled; use the outline Cancel from the side panels everywhere (the code already does).
- **B14. Lone radio buttons.** "Mark as Contra" is a single radio that can't be turned off; use a checkbox (the code already does).
- **B15. Block impossible totals.** The old Payroll Generation screen shows runs with negative net pay (₦-17,500) and ₦0 gross. Proposal: generation refuses runs whose net pay would be negative and lists the employees causing it.
- **B16. Status filter tabs vs rule 17.** The old payroll screen used tabs (All, Generated, HR Approved…) to filter by status. The redesign moves them into Filters (rule 19); a "quick status" chip row above the table could be added if users miss one-click filtering.
