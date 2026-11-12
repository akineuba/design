## When to use
The main navigation down the left of every desktop screen, under the `Navbar`. One section per module ("Marketing", "Business Development").

## Structure
| Part | Use it for |
|---|---|
| Section label | The module name, in capitals. |
| Item | A page. 20px icon + label. |
| Item with `children` | A page with sub-pages (Reports → Performance Report, Birthdays…). Opens with a chevron. |
| Settings (footer) | Settings pages. Opens with a chevron; each sub-item has a right chevron because it leads to its own settings area. |
| Log Out (footer) | Signs out. Pass `onLogout`. |

## How it behaves
- `activeId` marks the current page: light navy fill, red bar on the left, `aria-current="page"`.
- A group (Reports, Settings) starts open when it contains the active page.
- Items with `href` are links; without it they are buttons that call `onNavigate`.
- Groups are buttons with `aria-expanded`; Tab and Enter work throughout.
