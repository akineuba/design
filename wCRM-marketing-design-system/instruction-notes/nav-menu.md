## When to use
The main navigation down the left of every desktop screen, under the `TopBar`. One section per module ("Marketing", "Business Development").

## Structure
| Part | Use it for |
|---|---|
| Section label | The module name, in capitals. |
| Item | A page. 20px icon + label. |
| Item with `children` | A page with sub-pages (Reports → Performance Report, Birthdays…). Opens with a chevron. |
| Settings (footer) | Settings pages. Opens with a chevron. Sub-items show a right chevron by default; set `showChevrons: false` to hide them (the Marketing menu does). |
| Log Out (footer) | Signs out. Pass `onLogout`. |

## How it behaves
- `activeId` marks the current page: light navy fill, red bar on the left, `aria-current="page"`.
- Groups (Reports, Settings) start closed. One opens on its own only when it contains the current page, so that page is never hidden; `defaultOpen` opens it anyway.
- Icons: use the thin (linear, 1.5) set so every row has the same line weight.
- Items with `href` are links; without it they are buttons that call `onNavigate`.
- Groups are buttons with `aria-expanded`; Tab and Enter work throughout.
