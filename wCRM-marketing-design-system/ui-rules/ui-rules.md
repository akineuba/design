# UI Rules

Platform-wide rules for building wCRM Marketing screens. They come from how the Figma page
"marketing design updates" lays out every module (Audience, Contacts, Companies, Campaigns,
Social media, Emails, Settings) on desktop and Mobile V2.

## Page layout
- Desktop: sidebar on the left, app header on top, content on the `surface.canvas` background with 40px (`p-10`) padding.
- Every list page follows the same order: page title → summary or stat cards (optional) → table card (toolbar, table, pagination).
- Mobile (390px frame): app bar, then a 16px gutter. Tables become stacked record cards; secondary actions move to a bottom sheet.

## Creating and editing records
- **Create and edit open a right-hand Drawer** (462px), never a new page. The page stays visible behind the scrim.
- Short decisions (move to audience, delete, confirm) use a centred **Modal**. Destructive confirmations use `ConfirmDialog` with a red primary action.
- On mobile, create/edit become full-screen forms; pickers and confirmations become **bottom sheets**.

## Tables and lists
- The toolbar sits inside the table card: search on the left with the **Filter button** next to it; the primary "Create …" button on the right.
- Row actions: use the "…" **row actions menu** (View / Edit / Delete, Delete last and red). Campaigns use the inline blue **View** link instead.
- Status is always a **Badge**; never colour plain text.
- Paginate long lists with the footer **Pagination** ("Showing 1–10 of 49 entries").

## Filters
- Filters open in a popover anchored to the Filter button, with **Clear all** and **Apply**. The button shows the applied count.
- On mobile the filter button is icon-only and the filters open in a bottom sheet.

## Status colours
- Red (`brand.primary`) is for actions and the current selection, not for errors.
- Green = active / sent / connected, amber = scheduled / pending, blue = informational / scheduled post, grey = draft / inactive.

## Content
- Sentence case for titles and labels ("Create audience"), title case only for product names.
- Buttons start with a verb. Empty states say what is missing and offer the create action.
