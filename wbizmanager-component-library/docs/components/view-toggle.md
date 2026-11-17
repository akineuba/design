# ViewToggle

Swap buttons for switching the same records between views (list, calendar, grid). Ported from the wCRM design system's `ViewToggle` ([wCRM updates](https://www.figma.com/design/EIQlA9M6mP2KlskFFy2X2U/wCRM-updates?node-id=1036-6314), Social posts view switch `btn-list-view` / `btn-calendar-view`) and restyled with wBiz tokens.

## Anatomy
One group with a 1px `line` outline, `rounded-lg`, on `surface`. Icon-only cells, 40 × 40 (`control-md`), 16px icons (`icon-sm`). The selected cell sits on the outline (`-m-px`) so its fill reaches the edge.

## States
| Cell | Style |
|---|---|
| Selected | `primary` fill, `fg-inverse` icon |
| Unselected | transparent, `icon-muted` icon; hover `surface-muted` with `fg-strong` icon |
| Focus | `shadow-focus` |

## Behaviour
Radio group (`role="radiogroup"` / `role="radio"`, `aria-checked`): one Tab stop on the selected cell; arrow keys move and select; Home and End jump. Each option's `label` is its accessible name and tooltip.

## Usage
```tsx
<ViewToggle
  aria-label="Customers view"
  options={[
    { value: 'list', label: 'List view', icon: <ListIcon /> },
    { value: 'calendar', label: 'Calendar view', icon: <CalendarIcon /> },
  ]}
  value={view}
  onValueChange={setView}
/>
```
Use `SegmentedControl` instead when options need visible text.
