# SidePanel

Right-hand panel for create, edit and view flows. Figma: [New Customer](https://www.figma.com/design/TJAupALP2AYuN7NXNlY33g/w-Biz?node-id=209-4142) (541px),
[New Account](https://www.figma.com/design/TJAupALP2AYuN7NXNlY33g/w-Biz?node-id=1871-19941) (435px),
[New Vendor](https://www.figma.com/design/TJAupALP2AYuN7NXNlY33g/w-Biz?node-id=254-5423) (562px), New Employee (hr, 4306:39199).

## Anatomy
Native `<dialog>` at the right edge, full height, slide-in (respects reduced motion), derived `overlay` backdrop.
`SidePanelContent`: 30px padding; title Inter Semibold 24 black; body scrolls with 20px between sections; footer right-aligned, 20px gap.
Sections are `Accordion variant="form"` (#D1D5DB border, 10px radius, Roboto Medium 15 header, 10px side padding).
Inside a panel, `Input` and `Select` labels switch to the accounting style (Roboto 14 black) through `FieldLabelContext`.

## Sizes
`sm` 435 · `md` 541 · `lg` 562 (`size-panel-*` tokens).

## Differences from Figma
The footer stays pinned at the bottom of the panel so Save is always visible on long forms; in Figma it follows the last section.
