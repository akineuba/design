import type { Meta, StoryObj } from '@storybook/react';
import { useMemo, useState } from 'react';
import { ArrowRight, Building2, ClipboardCheck, CreditCard, Download, Eye, Layers, Package, Pencil, Plus, Power, ShieldCheck, Trash2, UserX, Users } from 'lucide-react';
import { PortalShell } from './PortalShell';
import { PageHeader } from '../components/PageHeader/PageHeader';
import { Button } from '../components/Button/Button';
import { Card, SummaryCard } from '../components/Card/Card';
import { Grid } from '../components/AppShell/AppShell';
import { ActivityList, AppTile, PlanSummary, SetupChecklist } from '../components/Patterns/Patterns';
import { Alert } from '../components/Alert/Alert';
import { Tabs } from '../components/Tabs/Tabs';
import { DataTable, Pagination, TableCard, TableFooter, TableSearch, TableToolbar, ToolbarGroup, entriesSummary, type Column, type SortState } from '../components/Table/Table';
import { PersonCell } from '../components/Avatar/Avatar';
import { Chip, Tag } from '../components/Tag/Tag';
import { StatusPill } from '../components/StatusPill/StatusPill';
import { Checkbox, Input, Select } from '../components/Field/Field';
import { Accordion } from '../components/Accordion/Accordion';
import { SidePanel } from '../components/Overlay/Overlay';
import { Logo } from '../components/Logo/Logo';
import { activity, apps, billing, contextOptions, plans, setupSteps, tenants, users, type DemoTenant, type DemoUser } from '../demo/data';

const meta: Meta = { title: 'Pages', parameters: { layout: 'fullscreen' } };
export default meta;

const sortRows = <T,>(rows: T[], sort: SortState | null) =>
  !sort ? rows : [...rows].sort((a, b) => {
    const x = String((a as Record<string, unknown>)[sort.key] ?? ''), y = String((b as Record<string, unknown>)[sort.key] ?? '');
    return sort.direction === 'asc' ? x.localeCompare(y) : y.localeCompare(x);
  });

/* ------------------------------------------------------------------ */

export const SignIn: StoryObj = {
  name: 'Sign in',
  render: () => (
    <div className="sso-root sso-signin">
      <aside className="sso-signin__image" aria-hidden />
      <main className="sso-signin__form-wrap">
        <form className="sso-signin__form" onSubmit={(e) => e.preventDefault()}>
          <Logo variant="sso" height={56} className="sso-signin__logo" />
          <div className="sso-signin__head">
            <h1 className="sso-signin__title">Welcome back.</h1>
            <p className="sso-signin__subtitle">Manage tenants, users and access across wBiz.</p>
          </div>
          <Input label="Work email" type="email" placeholder="admin@company.com" required />
          <div className="sso-signin__password">
            <Input label="Password" type="password" placeholder="Enter your password" required />
            <a href="#" className="sso-signin__link">Forgot password?</a>
          </div>
          <Button type="submit" fullWidth>Sign in</Button>
          <p className="sso-signin__foot">Need admin access? <a href="#" className="sso-signin__link">Contact your platform administrator</a></p>
        </form>
      </main>
    </div>
  ),
};

/* ------------------------------------------------------------------ */

export const Dashboard: StoryObj = {
  render: () => (
    <PortalShell active="dashboard">
      <PageHeader
        title="Dashboard"
        subtitle="Welcome back, Platform Admin. Here is what needs your attention."
        actions={<Button leadingIcon={<ClipboardCheck />}>Finish setup</Button>}
      />
      <Grid min={220}>
        <SummaryCard label="Tenants" value={93} hint="91 active · 2 inactive" />
        <SummaryCard label="Products" value={11} hint="Global product catalogue" />
        <SummaryCard label="Commercial profiles" value={45} hint="Subscription service" />
        <SummaryCard label="Subscription plans" value={13} hint="Draft + published" />
        <SummaryCard label="Active users" value={5} hint="of 5 purchased seats" />
        <SummaryCard label="Employee records" value={120} hint="Self-service included" />
        <SummaryCard label="Open approvals" value={7} hint="3 require your attention" />
        <SummaryCard label="Plan renewal" value="9 Aug" hint="2027 · Annual billing" />
      </Grid>
      <div className="sso-two-col">
        <SetupChecklist description="Complete your organisation setup" steps={setupSteps} />
        <ActivityList title="Recent subscription activity" description="Changes across your account" items={activity} />
      </div>
      <Card title="Quick links">
        <div className="sso-quick-links">
          <Button leadingIcon={<Building2 />}>Tenants</Button>
          <Button leadingIcon={<Users />}>Users</Button>
          <Button leadingIcon={<ShieldCheck />}>Roles</Button>
          <Button leadingIcon={<Package />}>Products</Button>
          <Button leadingIcon={<CreditCard />}>Subscriptions</Button>
        </div>
      </Card>
      <Card title="Your applications" description="Open the modules included in this organisation’s plan.">
        <Grid min={170} gap={4}>
          {apps.map((a) => <AppTile key={a.name} name={a.name} icon={a.icon} />)}
        </Grid>
      </Card>
    </PortalShell>
  ),
};

/* ------------------------------------------------------------------ */

const tenantTone = { Active: 'success', Inactive: 'neutral' } as const;

export const TenantsPage: StoryObj = {
  name: 'Tenants',
  render: () => {
    const [q, setQ] = useState('');
    const [inactive, setInactive] = useState(false);
    const [sort, setSort] = useState<SortState | null>({ key: 'name', direction: 'asc' });
    const [page, setPage] = useState(1);
    const rows = useMemo(
      () => sortRows(tenants.filter((t) => (inactive || t.status === 'Active') && `${t.name} ${t.code}`.toLowerCase().includes(q.toLowerCase())), sort),
      [q, inactive, sort],
    );
    const columns: Column<DemoTenant>[] = [
      { key: 'name', header: 'Name', sortable: true, render: (t) => <a href="#" className="sso-cell-link">{t.name}</a> },
      { key: 'code', header: 'Code', sortable: true, render: (t) => <span className="sso-cell-code">{t.code}</span> },
      { key: 'status', header: 'Status', render: (t) => <StatusPill tone={tenantTone[t.status]}>{t.status}</StatusPill> },
      { key: 'defaultProduct', header: 'Default product', render: (t) => t.defaultProduct ?? '—' },
    ];
    return (
      <PortalShell active="tenants">
        <PageHeader title="Tenants" subtitle="Manage tenants, enable products, and set the default product per tenant." />
        <TableCard>
          <TableToolbar>
            <ToolbarGroup>
              <TableSearch aria-label="Search tenants" placeholder="Search by name or code" value={q} onChange={(e) => setQ(e.target.value)} />
              <Checkbox label="Include inactive" checked={inactive} onChange={() => setInactive(!inactive)} />
            </ToolbarGroup>
            <ToolbarGroup>
              <Button variant="secondary" leadingIcon={<Download />}>Export</Button>
              <Button leadingIcon={<Plus />}>Add tenant</Button>
            </ToolbarGroup>
          </TableToolbar>
          <DataTable
            caption="Tenants"
            columns={columns}
            rows={rows}
            getRowId={(t) => t.name}
            sort={sort}
            onSortChange={setSort}
            rowActions={(t) => [
              { id: 'entities', label: 'Entities', tone: 'link', icon: <Layers /> },
              { id: 'view', label: 'View', tone: 'view', icon: <Eye /> },
              { id: 'edit', label: 'Edit', tone: 'edit', icon: <Pencil /> },
              t.status === 'Active'
                ? { id: 'deactivate', label: 'Deactivate', tone: 'delete', icon: <Power /> }
                : { id: 'activate', label: 'Activate', tone: 'positive', icon: <Power /> },
            ]}
            empty={q ? 'No tenants match your search.' : 'No tenants yet.'}
          />
          <TableFooter summary={entriesSummary(page, 10, 93)}>
            <Pagination page={page} pageCount={10} onPageChange={setPage} />
          </TableFooter>
        </TableCard>
      </PortalShell>
    );
  },
};

/* ------------------------------------------------------------------ */

const userTone = { Active: 'success', Inactive: 'neutral', Invited: 'warning' } as const;

export const UsersPage: StoryObj = {
  name: 'Users',
  render: () => {
    const [tab, setTab] = useState('users');
    const [panel, setPanel] = useState(false);
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState<SortState | null>({ key: 'name', direction: 'asc' });
    const columns: Column<DemoUser>[] = [
      { key: 'name', header: 'Name', sortable: true, render: (u) => <PersonCell name={u.name} description={u.email} /> },
      { key: 'roles', header: 'Roles', render: (u) => <div className="sso-cell-chips">{u.roles.map((r) => <Chip key={r} kind="removable">{r}</Chip>)}</div> },
      { key: 'entities', header: 'Organisations', align: 'center', render: (u) => <span className="sso-num">{u.entities}</span> },
      { key: 'status', header: 'Status', sortable: true, render: (u) => <StatusPill tone={userTone[u.status]}>{u.status}</StatusPill> },
    ];
    return (
      <PortalShell active="users">
        <PageHeader title="Users and organisation access" subtitle="4 of 5 purchased full-user seats assigned." />
        <Alert tone="info" title="1 seat available" actions={<Button size="sm" variant="outline">Manage seats</Button>}>
          Add more seats from Subscriptions when you need them.
        </Alert>
        <Tabs aria-label="Access control" value={tab} onChange={setTab} items={[{ id: 'users', label: 'Users' }, { id: 'roles', label: 'Roles' }, { id: 'permissions', label: 'Permissions' }]} />
        <TableCard>
          <TableToolbar>
            <ToolbarGroup>
              <TableSearch aria-label="Search users" placeholder="Search by name or email" />
              <Select aria-label="Status" size="md" options={[{ value: '', label: 'All statuses' }, { value: 'active', label: 'Active' }, { value: 'inactive', label: 'Inactive' }]} fieldClassName="sso-toolbar-select" />
              <Select aria-label="Role" size="md" options={[{ value: '', label: 'All roles' }, { value: 'emp', label: 'Employee' }]} fieldClassName="sso-toolbar-select" />
            </ToolbarGroup>
            <ToolbarGroup>
              <Button variant="secondary" leadingIcon={<Download />}>Export</Button>
              <Button leadingIcon={<Plus />} onClick={() => setPanel(true)}>Add user</Button>
            </ToolbarGroup>
          </TableToolbar>
          <DataTable
            caption="Users"
            columns={columns}
            rows={sortRows(users, sort)}
            getRowId={(u) => u.name}
            density="comfortable"
            sort={sort}
            onSortChange={setSort}
            rowActions={() => [
              { id: 'view', label: 'View', tone: 'view', icon: <Eye /> },
              { id: 'edit', label: 'Edit', tone: 'edit', icon: <Pencil /> },
              { id: 'deactivate', label: 'Deactivate', tone: 'delete', icon: <UserX /> },
            ]}
          />
          <TableFooter summary={entriesSummary(page, 10, 50)}>
            <Pagination page={page} pageCount={5} onPageChange={setPage} />
          </TableFooter>
        </TableCard>
        <SidePanel
          open={panel}
          onClose={() => setPanel(false)}
          title="Add user"
          description="Create a tenant user and optionally assign roles for this product."
          footer={<><Button variant="outline" onClick={() => setPanel(false)}>Cancel</Button><Button>Create user</Button></>}
        >
          <Input label="Email" required placeholder="user@company.com" />
          <div className="sso-form-row"><Input label="First name" /><Input label="Last name" /></div>
          <Input label="Middle name" />
          <Input label="Password" type="password" placeholder="Leave blank to auto-generate" />
          <Select label="User roles" required placeholder="Select roles" options={[{ value: 'admin', label: 'Tenant admin' }, { value: 'emp', label: 'Employee' }]} />
          <Select label="Organisations" required placeholder="Select organisations" options={[{ value: 'hq', label: 'Wragby Group (Head Office)' }]} />
        </SidePanel>
      </PortalShell>
    );
  },
};

/* ------------------------------------------------------------------ */

interface Tool { name: string; description: string }
const toolColumns: Column<Tool>[] = [
  { key: 'name', header: 'Tool', render: (t) => <a href="#" className="sso-cell-link">{t.name}</a> },
  { key: 'description', header: 'Description' },
];
const toolActions = () => [{ id: 'open', label: 'Open', tone: 'link' as const, icon: <ArrowRight /> }];

export const SubscriptionsPage: StoryObj = {
  name: 'Subscriptions',
  render: () => {
    const platformTools: Tool[] = [
      { name: 'Commercial tenants', description: 'Subscription-side tenant profiles.' },
      { name: 'Products & features', description: 'Product catalogue and feature keys.' },
      { name: 'New plan', description: 'Draft a plan with pricing and limits.' },
      { name: 'Plans', description: 'List, edit drafts, publish.' },
      { name: 'Customer search', description: 'Find subscriptions by tenant, email, or status.' },
      { name: 'Wallet review', description: 'Manual top-up approval queue.' },
      { name: 'Payment channels', description: 'Enable Paystack, Manual, and Wallet per purpose.' },
      { name: 'Billing tools', description: 'Invoices, payments, and proration preview.' },
      { name: 'Lifecycle', description: 'Subscribe, trial, status changes.' },
      { name: 'Approvals', description: 'Approval queue.' },
      { name: 'Audit logs', description: 'Per-tenant commercial audit.' },
      { name: 'Auth integration', description: 'Inbound Auth sync event log (ops).' },
      { name: 'Outbox', description: 'Pending integration events.' },
    ];
    const customerTools: Tool[] = [
      { name: 'Overview', description: 'Status, billing, organisations, seats, invoice usage.' },
      { name: 'Invoice quotas', description: 'Per-organisation monthly invoice allowance.' },
      { name: 'Entitlements', description: 'Plan features and overrides.' },
      { name: 'Feature catalogue', description: 'Resolved feature list for the product.' },
      { name: 'Usage & limits', description: 'Seats, entities, thresholds.' },
      { name: 'Billing', description: 'History, contacts, invoices, payments.' },
      { name: 'Wallet', description: 'Balance, top-up, transaction history.' },
      { name: 'Notifications', description: 'Preferences, recipients, log.' },
    ];
    return (
      <PortalShell active="subscriptions">
        <PageHeader title="Subscriptions" subtitle="Manage commercial plans, renewals, usage, billing, and notifications. Platform tools are for administrators only." />
        <Card title="Platform administration" description="Catalogue, plans, lifecycle, approvals, and cross-tenant tools.">
          <div className="sso-card-table">
            <DataTable caption="Platform administration tools" columns={toolColumns} rows={platformTools} getRowId={(t) => t.name} rowActions={toolActions} />
          </div>
        </Card>
        <Card
          title="View one customer subscription"
          description="Choose who you are viewing, then open any customer subscription page below."
          actions={<Button>Open subscription overview</Button>}
        >
          <div className="sso-form-row">
            <Select label="Tenant" options={contextOptions.scope} defaultValue="WRAGBY" />
            <Select label="Product" options={contextOptions.product} defaultValue="ERP" />
          </div>
          <div className="sso-card-table">
            <DataTable caption="Customer subscription pages" columns={toolColumns} rows={customerTools} getRowId={(t) => t.name} rowActions={toolActions} />
          </div>
        </Card>
      </PortalShell>
    );
  },
};

/* ------------------------------------------------------------------ */

export const SubscriptionOverviewPage: StoryObj = {
  name: 'Subscription overview',
  render: () => (
    <PortalShell active="subscriptions">
      <PageHeader
        back={{ label: 'Subscriptions' }}
        title="Subscription management"
        subtitle="Review your plan, capacity, renewal and billing activity."
        actions={<><Button variant="secondary">Transaction history</Button><Button variant="destructive">Cancel renewal</Button></>}
      />
      <Grid min={240}>
        <SummaryCard label="Organisations" value={3} hint="Managed from this account" actions={<Button leadingIcon={<Plus />}>Add organisation</Button>} />
        <SummaryCard label="Full seats" value={5} hint="1 seat available" actions={<Button leadingIcon={<Plus />}>Add users</Button>} />
        <SummaryCard label="Employee records" value={100} hint="Self-service included" actions={<><Button leadingIcon={<Plus />}>Employees</Button><Button variant="outline" leadingIcon={<Plus />}>Self-service</Button></>} />
      </Grid>
      <Alert tone="warning" title="Wragby Finance renews in 7 days">₦600,000 will be charged to the debit card ending 4242 on 9 August 2027.</Alert>
      <p className="sso-section-label" style={{ margin: 0 }}>Organisations</p>
      {plans.map((p, i) => (
        <Accordion key={p.org} title={p.org} meta={p.primary && <Tag>Primary</Tag>} aside={i > 0 ? `${p.planName} · ${p.price}/yr` : undefined} defaultOpen={i === 0}>
          <PlanSummary
            status={{ label: 'Active', tone: 'success' }}
            planName={p.planName}
            planDescription={p.planDescription}
            price={p.price}
            renews="9 August 2027"
            features={p.features}
            billing={[...billing, { label: 'Renewal', value: <StatusPill tone="success">Automatic</StatusPill> }]}
            action={<Button variant="outline" size="sm">Change plan</Button>}
          />
        </Accordion>
      ))}
    </PortalShell>
  ),
};
