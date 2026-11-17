# UserMenu

Account menu opened from the TopBar user button (`<TopBar userMenu={<UserMenu … />} />`). A redesign of the older account dropdown.

## Anatomy
288px (`user-menu`), white, `line-subtle` border, `xl` radius, `shadow-md`. Header: 36px neutral avatar, name (Semibold 14) and email (12, `fg-muted`). One `surface-muted` block holds the role and the session (shield in `success`, end time, time left, 2px `primary` bar). Items: 34px rows, 16px `icon-muted` glyphs, one line each, groups split by a hairline. Items that open outside the app show an external-link glyph. Log out sits alone at the bottom in `error` red (label and icon), with an `error-subtle` hover.

## Changes from the old dropdown
No coloured icon tiles and no subtitles; the role is plain text, not a pill; the avatar matches the top bar (neutral grey).

## Behaviour
Opens below the user button, right-aligned; focus moves to the first item. Arrows move, Home and End jump, Escape or an outside click closes and returns focus to the button. Choosing an item closes the menu.
