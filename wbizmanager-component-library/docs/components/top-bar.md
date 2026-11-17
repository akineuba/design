# TopBar

Top bar from new features ([top-header](https://www.figma.com/design/TJAupALP2AYuN7NXNlY33g/w-Biz?node-id=7053-5510)), the current version.

## Anatomy
64px, white, line-subtle bottom border, 32px side padding. Breadcrumb in Roboto 13 (`fg-muted`; current page Semibold `primary`). Toolbar 20px apart: Tour (sparkle + Inter Medium 14), 38px theme toggle on `surface-control`, bell with a red count badge, user (36px avatar, Inter Bold 14 name, 11px role), app launcher.

## States
Notification badge hidden at 0 and capped at "99+"; theme toggle shows moon (light) or sun (dark). Each control renders only when its handler is passed.

## Usage
Keep breadcrumbs to three levels; only earlier levels are links.
