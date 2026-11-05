# @wbiz/sso-design-system

Tokens, React components and reference pages for the **wBizManager SSO Portal**.
This library is separate from the wBiz ERP design system; the ERP library is not modified.

## Run

```bash
npm install
npm run storybook        # http://localhost:6006
npm run build-storybook  # static build in storybook-static/
npm run typecheck
```

## Use

```tsx
import '@wbiz/sso-design-system/src/styles.css';
import { AppShell, Sidebar, SSO_NAV_ITEMS, TopBar, PageHeader, Button } from '@wbiz/sso-design-system';
```

`AppShell` adds the `sso-root` scope class. Anything rendered outside it (sign-in page, portals)
needs a wrapper with `className="sso-root"`.

## Decisions

| | SSO portal |
|---|---|
| Typeface | Inter for everything (same as ERP) |
| Primary | `#0070FF`, the only blue (same as ERP) |
| Status set | Same as ERP: success `#00C167`, error `#FF2E3B`, warning `#D1C700`, info `#0070FF`, neutral `#667085` |
| Signed-in logo | wBizManager · SSO Portal lockup (`<Logo variant="sso" />`) |
| Sign-in logo | wBizManager wordmark (`<Logo variant="wordmark" />`) |
| Navigation | White 272px rail; Dashboard, Tenants, Entities, Products, Users, Roles, Approval Admin, Subscriptions, SSO Config; solid blue active pill with chevron |
| Neutrals | Slate ramp (`#0F172A` → `#F8FAFC`), the main visual difference from the ERP's grey |
| Radius | 8px controls · 12px cards/tables · 16px accordions/dialogs |
| Density | Comfortable: 48px nav items, 56px table rows, 40px controls |

The active nav colour is a single token, `--sso-nav-active-bg`, if it ever needs to differ from primary.

## Structure

```
src/
  tokens/        tokens.css (CSS variables, --sso-*) + tokens.ts (JS mirror)
  components/    one folder per component: .tsx, .css, .stories.tsx
  pages/         reference pages: Sign in, Dashboard, Tenants, Users, Subscriptions
  docs/          Introduction + Foundations stories
  demo/          sample data for stories
  styles.css     single stylesheet entry
```

## Components

Logo · Button / IconButton · StatusPill · Tag / Chip · Avatar · Input / SearchInput / Select / Checkbox / Switch ·
Card / StatCard / KeyValueList · PageHeader · Alert · Tabs · Table / Pagination · Accordion ·
SidePanel / Modal / ResultCard · ActionMenu · Sidebar · TopBar · AppShell / Stack / Grid ·
AppTile · SetupChecklist · ActivityList · PlanSummary · EmptyState
