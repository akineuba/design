# NavMenu

The app's main menu: a **module rail** beside a **page panel**. Layout from the navigation reference images supplied by design (Nov 2026); compact metrics and colours from the Settings reference. Previously called `Sidebar`.

## Anatomy
About 264px wide in total, on `surface-sunken` (#F3F3F3), from the top:
- Small logo (24px, `Logo size="sm"`) and a 24px collapse button (`fg-strong` border).
- "Find in menu" search (32px, `surface`, `/` key hint).
- **Rail** (`nav-rail`, 60px): Home, a divider, the modules (`items`), then Settings and Help (`footerItems`) pinned to the bottom. Each button is 48px (`nav-rail-item`): an 18px icon over an 11px label. Modules can set a `shortLabel` for the rail (Accounts, HR, Help); longer labels are cut with "…".
- **Panel** (`nav-panel`, 184px): rounded `surface-nav` card (#FAFAFA, a step lighter than the rail) with a `line-subtle` border. The module title (Inter Semibold 15, `fg-ink`), then its pages as text only, without icons: 28px rows (`nav-row`) at a 34px pitch, Inter 13. Pages with sub-pages are Semibold `fg-strong` with a › and open in place with a "‹ Module" back link.
- **Home** panel: Recent (`recentIds`) and Pinned pages, each with its module path; a dashed "Pin the pages you use most" card while nothing is pinned.

## Colours
| Element | Inactive | Selected / current |
|---|---|---|
| Rail module | `fg-muted` icon and label | raised `surface` card, `shadow-xs`, `primary` icon and label |
| Page row | `fg` (groups: `fg-strong`, Semibold) | `primary` text on `primary-muted`, Medium |

## States
- Rail: only the viewed module is selected. Browsing another module never highlights the one holding the current page. In the collapsed rail, where nothing is viewed, the module holding the current page gets the selected style; so does a module that is itself the current page (Approvals). Modules without pages navigate directly.
- Panel: current page (`aria-current`); group holding the current page (`primary`); hover reveals a pin star floating over the row end (filled `warning` star, with room kept for it, when pinned).
- Search: results across every page with their module path, or "No pages match".
- Collapsed: rail only, with the logo mark; picking a module expands the menu at that module.

## Usage
Pass modules as `items`, Settings/Help as `footerItems`, the current page as `activeId`, and `recentIds`. Pinning is uncontrolled (`defaultPinnedIds`) or controlled (`pinnedIds` + `onPinnedChange`); persist pins per user. `defaultView` opens on `'home'` or a module id. Items with `href` render as links.
