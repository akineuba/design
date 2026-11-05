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
| Navigation | ERP nav v2 style: soft #FAFAFA panel on a grey rail (224px), 40px items, 14px text, 18px grey outline icons; current page is a raised white pill with blue text; expandable groups with a guide line; amber count badges. Items: Dashboard, Tenants, Entities, Products, Users, Roles, Approval Admin, Subscriptions, SSO Config |
| Top bar | ERP metrics (64px, bell + red count badge, gradient avatar, name Bold 16 / role 12); Scope / Product / Entity selectors; Sign out in the profile menu |
| Page header | ERP anatomy: 28px title, 14px muted subtitle, actions right, optional back link. No eyebrow |
| Neutrals | Slate ramp (`#0F172A` → `#F8FAFC`), the main visual difference from the ERP's grey |
| Radius | 8px controls · 12px cards/tables · 16px accordions/dialogs |
| Components | Ported from the ERP design system with the same specs: Button (primary, secondary, outline, tertiary, destructive), Card, SummaryCard, Table kit with an Actions column (kebab ActionMenu, tone-coloured items) and footer ("Showing 1 to 10 of 93 entries", numbered pages, page jump), Input, Tabs, Modal, SidePanel, Alert, Accordion, Checkbox, Switch, StatusPill |
| Sources | Only the ERP design system, the Figma SSO portal (page "new" › portal) and the nav v2 reference. Live SSO screenshots are used for content only |

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
Card / SummaryCard / KeyValueList · PageHeader · Alert · Tabs · TableCard / TableToolbar / TableSearch / DataTable / TableFooter / Pagination · Accordion ·
SidePanel / Modal / ResultCard · ActionMenu · Sidebar · TopBar · AppShell / Stack / Grid ·
AppTile · SetupChecklist · ActivityList · PlanSummary (from the Figma portal)
