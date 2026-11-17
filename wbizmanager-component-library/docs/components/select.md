# Select

Dropdown field ([dropdown-inner](https://www.figma.com/design/TJAupALP2AYuN7NXNlY33g/w-Biz?node-id=7092-1508), new features) with the open menu from the accounting customer picker.

## Anatomy
Label (Inter Medium 12, red `*` when required) 4px above a field that matches `Input`: 40px, `line` border, 8px radius, chevron in `icon-muted`. The menu opens below at least 240px wide, with a `line` border, 8px radius and `shadow-md`; options are Inter 14 in `fg-muted`. An optional `menuAction` row (e.g. "Add New") sits under a divider in `primary`.

## States
Placeholder, selected (primary text + check in the menu), open (primary border + focus ring, chevron flipped), disabled, error, disabled options.

## Keyboard
Follows the WAI-ARIA select-only combobox: ↓/↑ open and move, Home/End jump, Enter/Space choose, Escape closes, Tab leaves.

## Usage
Use for 4–15 fixed options. For long lists add search (planned); for two or three options consider `SegmentedControl`.
