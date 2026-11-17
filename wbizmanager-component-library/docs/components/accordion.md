# Accordion

Collapsible form sections from the item form ([block-basic-info](https://www.figma.com/design/TJAupALP2AYuN7NXNlY33g/w-Biz?node-id=7092-1482)).

## Anatomy
White card, line-subtle border, 12px radius. 50px header (16/24 padding, Inter Semibold 15 in `fg-strong`, chevron in `icon-muted`) with a divider when open; 24px body padding with 20px between fields.

## States
Open, closed, disabled; `meta` slot for a status pill or count. `Accordion type="single"` keeps one open; `multiple` (default) allows many.

## Usage
Use for long forms split into named sections. Keep the first section open by default.
