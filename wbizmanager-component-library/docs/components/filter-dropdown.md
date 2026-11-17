# FilterDropdown

Table toolbar filter ([filter-trigger](https://www.figma.com/design/TJAupALP2AYuN7NXNlY33g/w-Biz?node-id=7053-5549) and [filter panel](https://www.figma.com/design/TJAupALP2AYuN7NXNlY33g/w-Biz?node-id=7099-7787)).

## Anatomy
32px "Filters" trigger (line-subtle border, Roboto Medium 14). The panel opens under it on `surface-page` with a `line-subtle` border, 8px radius and 16/20 padding, with fields 20px apart in a wrapping row. `FilterField` gives each control a Roboto 14 label in `fg-muted`.

## States
Closed; open (trigger tinted primary); active (trigger primary with a count badge when `activeCount > 0`). Escape and outside clicks close it.

## Usage
Pass `onApply` and `onReset` to show the action row. Keep the controls in the panel `size="sm"` (34px).
