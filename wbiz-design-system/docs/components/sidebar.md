# Sidebar

Main menu as a **module rail** beside a **page panel**, from the navigation reference images supplied by design (Nov 2026). It replaces the single-column menu from new features ([sidebar-content](https://www.figma.com/design/TJAupALP2AYuN7NXNlY33g/w-Biz?node-id=7067-32543)).

## Anatomy
About 312px wide in total, on `surface-sunken`, from the top:
- Logo and a collapse button (32px, `fg-strong` border).
- "Find in menu" search (34px, `surface`, `/` key hint).
- **Rail** (`nav-rail`, 84px): Home, a divider, the modules (`items`), then Settings and Help (`footerItems`) pinned to the bottom. Each button is 56px (`nav-rail-item`): 20px icon over a 12px label. Modules can set a `shortLabel` for the rail (Accounts, HR, Help).
- **Panel** (`nav-panel`, 200px): rounded `surface-nav` card (grey #EEEEEE in light mode) with a `line-subtle` border. The module title (Inter Bold 16), then its pages as text only, without icons (40px rows, Inter 14 `fg-strong`). Pages with sub-pages are Semibold with a › and open in place with a "‹ Module" back link.
- **Home** panel: Recent (`recentIds`) and Pinned pages, each with its module path; a dashed "Pin the pages you use most" card while nothing is pinned.

## States
- Rail: the selected module is styled like the primary button (`primary` fill, `fg-inverse` icon and label, `primary-hover` on hover). Only one module is selected: the one being viewed. Browsing another module never highlights the one holding the current page. In the collapsed rail, where nothing is viewed, the module holding the current page gets the selected style; so does a module that is itself the current page (Approvals). Modules without pages navigate directly.
- Panel: current page (`primary-tint`, primary text, `aria-current`); group holding the current page (primary); hover reveals a pin star floating over the row end (filled `warning` star, with room kept for it, when pinned).
- Search: results across every page with their module path, or "No pages match".
- Collapsed: rail only, with the logo mark; picking a module expands the menu at that module.

## Usage
Pass modules as `items`, Settings/Help as `footerItems`, the current page as `activeId`, and `recentIds`. Pinning is uncontrolled (`defaultPinnedIds`) or controlled (`pinnedIds` + `onPinnedChange`); persist pins per user. `defaultView` opens on `'home'` or a module id. Items with `href` render as links.
