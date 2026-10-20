# Sidebar

Main menu from new features ([sidebar-content](https://www.figma.com/design/TJAupALP2AYuN7NXNlY33g/w-Biz?node-id=7067-32543)), the current version of the navigation.

## Anatomy
200px wide on `surface-sunken`. Logo row with a collapse button, then "MAIN MENU" (Inter Bold 12, `fg-muted`, uppercase). Items 48px (20px icon, Inter Semibold 15 in `fg`, chevron for groups); sub-items 44px in `fg-muted`.

## States
Default, hover (derived), active page (`primary-tint`, primary text, `aria-current`), active group (tint + 3px primary indicator, expanded), expanded/collapsed groups, collapsed icon rail at 72px (derived).

## Usage
Pass the nav tree as `items` and the current page as `activeId`. Items with `href` render as links.
