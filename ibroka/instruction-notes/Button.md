**Use** for actions. One **primary** (teal) per area: the thing most people do next (Add policy, Save, Submit for approval).

- **secondary** (dark): the Figma Export button. A strong second action that isn't the main one.
- **outline**: Cancel, Filter, Columns, and other supporting actions.
- **tertiary**: low-emphasis actions in toolbars and menus (Clear all, More filters).
- **destructive** (red fill): only inside a confirmation modal, for the final Delete.
- **destructive-outline**: a delete or cancel action on a page or bulk bar, before confirmation.

Labels are verbs that say what happens: "Save client", not "OK". Use `loading` while saving (the button keeps its label and blocks double clicks). Icon-only buttons need `aria-label`. Sizes: 40px default, 34px in filter cards and bulk bars.
