# Checkbox, Radio, Avatar, ActionMenu, Logo

## Checkbox
20px, 6px radius, `line` border; ticked = primary fill + white tick; indeterminate = `primary-subtle` + primary dash; disabled = muted. Figma: 896:17613 and the accounting selection column.

## Radio / RadioGroup
16px ring in black, primary dot when selected; label Inter Medium 14. Figma: Customer Type (209:4142).

## Avatar / AvatarLabel
Initials on a gradient circle. `blue` (`bg-avatar`, from the reference the design team supplied) for people in tables; `neutral` (`bg-avatar-neutral`, top bar 7075:190).
Sizes `sm` 28px (tables) and `md` 36px.

## ActionMenu
Kebab trigger (32px) and menu ([actions, Customers](https://www.figma.com/design/TJAupALP2AYuN7NXNlY33g/w-Biz?node-id=191-3853)): white, line-subtle border, 4px radius,
Roboto 14 items with 16px icons. Tones: `view` #667085, `edit` #D4A003, `delete` #E81E25, `link` #0070FF, `positive` #00C167 (`action-*` tokens).
Positioned against the viewport so table scroll containers don't clip it. WAI-ARIA menu button keyboard support.

## Logo
`full` and `mark` PNGs from the supplied brand asset (`src/assets/`). Replace with SVG when design provides one.
