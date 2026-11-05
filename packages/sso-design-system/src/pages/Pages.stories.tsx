import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Activity, BellRing, Building2, CheckCircle2, ClipboardList, CreditCard, Download, Eye, FileText, Gauge, History, Inbox, KeyRound, Layers, Package, Pencil, Plus, Power, Radio, ScrollText, Search, ShieldCheck, Tag as TagIcon, Trash2, UserX, Users, Wallet, BadgeDollarSign } from 'lucide-react';
import { PortalShell } from './PortalShell';
import { PageHeader } from '../components/PageHeader/PageHeader';
import { Button } from '../components/Button/Button';
import { StatCard } from '../components/Card/Card';
import { Grid } from '../components/AppShell/AppShell';
import { LinkTile, PlanSummary, RowActions, SectionHeading } from '../components/Patterns/Patterns';
import { Alert } from '../components/Alert/Alert';
import { Tabs } from '../components/Tabs/Tabs';
import { Pagination, Table, type Column } from '../components/Table/Table';
import { Avatar } from '../components/Avatar/Avatar';
import { Chip, Tag } from '../components/Tag/Tag';
import { StatusPill } from '../components/StatusPill/StatusPill';
import { ActionMenu } from '../components/ActionMenu/ActionMenu';
import { Checkbox, Input, SearchInput, Select } from '../components/Field/Field';
import { Card } from '../components/Card/Card';
import { Accordion } from '../components/Accordion/Accordion';
import { SidePanel } from '../components/Overlay/Overlay';
import { Logo } from '../components/Logo/Logo';
import { billing, contextOptions, plans, tenants, users, type DemoTenant, type DemoUser } from '../demo/data';

const meta: Meta = { title: 'Pages', parameters: { layout: 'fullscreen' } };
export default meta;

/* ------------------------------------------------------------------ */

export const SignIn: StoryObj = {
  name: 'Sign in',
  render: () => (
    <div className="sso-root sso-signin">
      <aside className="sso-signin__brand">
        <div className="sso-signin__brand-inner">
          <p className="sso-signin__kicker">wBizManager SSO</p>
          <h2 className="sso-signin__headline">One sign-in for every wBiz app.</h2>
          <ul className="sso-signin__points">
            <li><CheckCircle2 aria-hidden /> Accounting, Inventory, Procurement, Projects and HR</li>
            <li><CheckCircle2 aria-hidden /> Manage tenants, entities, users and roles in one place</li>
            <li><CheckCircle2 aria-hidden /> Connect Microsoft Entra ID, Google Workspace or Okta</li>
          </ul>
        </div>
      </aside>
      <main className="sso-signin__form-wrap">
        <form className="sso-signin__form" onSubmit={(e) => e.preventDefault()}>
          <Logo variant="wordmark" height={44} />
          <div>
            <h1 className="sso-signin__title">Welcome back</h1>
            <p className="sso-signin__subtitle">Sign in to manage your wBizManager account.</p>
          </div>
          <Button variant="ghost" size="lg" fullWidth iconLeft={<KeyRound />}>Continue with SSO</Button>
          <div className="sso-signin__divider"><span>or sign in with email</span></div>
          <Input label="Email" type="email" placeholder="email@example.com" size="lg" required />
          <Input label="Password" type="password" placeholder="Enter your password" size="lg" required />
          <div className="sso-signin__row">
            <Checkbox label="Keep me signed in" />
            <Button variant="link">Forgot password?</Button>
          </div>
          <Button type="submit" size="lg" fullWidth>Sign in</Button>
          <p className="sso-signin__foot">Don’t have an account? <Button variant="link">Register</Button></p>
        </form>
      </main>
    </div>
  ),
};

/* ------------------------------------------------------------------ */

export const Dashboard: StoryObj = {
  render: () => (
    <PortalShell active="dashboard">
      <PageHeader title="Dashboard" subtitle="Welcome back, Platform Admin. Here is a snapshot of the platform." />
      <section>
        <SectionHeading label="Platform" />
        <Grid min={220}>
          <StatCard icon={<Building2 />} iconTone="blue" label="Tenants" description="Registered organisations" value={93} helper="91 active · 2 inactive" href="#tenants" />
          <StatCard icon={<Package />} iconTone="teal" label="Products" description="Global product catalogue" value={11} href="#products" />
          <StatCard icon={<CreditCard />} iconTone="green" label="Commercial profiles" description="Subscription service" value={45} href="#subscriptions" />
          <StatCard icon={<Layers />} iconTone="amber" label="Subscription plans" description="Draft + published" value={13} href="#plans" />
        </Grid>
      </section>
      <Card padding="lg">
        <SectionHeading title="Quick links" />
        <Grid min={220} gap={3}>
          <LinkTile title="Tenants" icon={<Building2 />} tone="blue" />
          <LinkTile title="Users" icon={<Users />} tone="blue" />
          <LinkTile title="Roles" icon={<ShieldCheck />} tone="teal" />
          <LinkTile title="Products" icon={<Activity />} tone="amber" />
          <LinkTile title="Subscriptions" icon={<CreditCard />} tone="green" />
        </Grid>
      </Card>
    </PortalShell>
  ),
};

/* ------------------------------------------------------------------ */

const userTone = { Active: 'success', Inactive: 'neutral', Invited: 'warning' } as const;

export const UsersPage: StoryObj = {
  name: 'Users',
  render: () => {
    const [tab, setTab] = useState('users');
    const [panel, setPanel] = useState(false);
    const columns: Column<DemoUser>[] = [
      { key: 'name', header: 'Name', sortable: true, render: (u) => (
        <div className="sso-cell-person"><Avatar name={u.name} tone="neutral" /><div><div className="sso-cell-primary">{u.name}</div><div className="sso-cell-secondary">{u.email}</div></div></div>
      ) },
      { key: 'roles', header: 'Roles', render: (u) => <div className="sso-cell-chips">{u.roles.map((r) => <Chip key={r} kind="removable">{r}</Chip>)}</div> },
      { key: 'entities', header: 'Entities', align: 'center', render: (u) => <span className="sso-num">{u.entities}</span> },
      { key: 'status', header: 'Status', sortable: true, render: (u) => <StatusPill tone={userTone[u.status]}>{u.status}</StatusPill> },
      { key: 'a', header: <span className="sso-visually-hidden">Actions</span>, align: 'right', width: 64, render: (u) => (
        <ActionMenu label={`Actions for ${u.name}`} items={[{ label: 'Edit user', icon: <Pencil /> }, { label: 'Deactivate', icon: <UserX /> }, { label: 'Delete', icon: <Trash2 />, tone: 'danger' }]} />
      ) },
    ];
    return (
      <PortalShell active="users">
        <PageHeader
          title="Users"
          subtitle="4 of 5 purchased full-user seats assigned."
          actions={<Button iconLeft={<Plus />} onClick={() => setPanel(true)}>Add user</Button>}
        />
        <Alert tone="info" title="1 seat available" description="Add more seats from Subscriptions when you need them." action={<Button variant="link">Manage seats</Button>} />
        <Tabs aria-label="Users and roles" value={tab} onChange={setTab} items={[{ id: 'users', label: 'Users', count: 50 }, { id: 'invites', label: 'Pending invites', count: 1 }]} />
        <Table
          caption="Users"
          columns={columns}
          rows={users}
          rowKey={(u) => u.id}
          sort={{ key: 'name', direction: 'asc' }}
          onSort={() => {}}
          toolbar={<>
            <SearchInput placeholder="Search by name or email…" style={{ width: 240 }} />
            <Select aria-label="Status" options={[{ value: '', label: 'All statuses' }, { value: 'active', label: 'Active' }]} />
            <Select aria-label="Role" options={[{ value: '', label: 'All roles' }, { value: 'emp', label: 'Employee' }]} />
            <span style={{ flex: 1 }} />
            <Button variant="ghost" iconLeft={<Download />}>Export</Button>
          </>}
          footer={<Pagination page={1} pageCount={5} total={50} pageSize={10} noun="users" onPageChange={() => {}} />}
        />
        <SidePanel
          open={panel}
          onClose={() => setPanel(false)}
          title="Add user"
          description="They’ll get an email to set up their sign-in."
          footer={<><Button variant="ghost" onClick={() => setPanel(false)}>Cancel</Button><Button>Create user</Button></>}
        >
          <Input label="Email" required placeholder="user@company.com" />
          <div className="sso-form-row"><Input label="First name" required /><Input label="Last name" required /></div>
          <Select label="Role" required placeholder="Select a role" options={[{ value: 'admin', label: 'Tenant admin' }, { value: 'emp', label: 'Employee' }]} />
          <Select label="Entities" required placeholder="Select entities" options={[{ value: 'hq', label: 'Wragby Group (Head Office)' }]} />
        </SidePanel>
      </PortalShell>
    );
  },
};

/* ------------------------------------------------------------------ */

const tenantTone = { Active: 'success', Inactive: 'neutral' } as const;

export const TenantsPage: StoryObj = {
  name: 'Tenants',
  render: () => {
    const columns: Column<DemoTenant>[] = [
      { key: 'name', header: 'Name', sortable: true, render: (t) => <a href="#" className="sso-cell-link">{t.name}</a> },
      { key: 'code', header: 'Code', render: (t) => <span className="sso-cell-code">{t.code}</span> },
      { key: 'status', header: 'Status', render: (t) => <StatusPill tone={tenantTone[t.status]}>{t.status}</StatusPill> },
      { key: 'product', header: 'Default product', render: (t) => t.defaultProduct ?? <span className="sso-cell-secondary">Not set</span> },
      { key: 'a', header: <span className="sso-visually-hidden">Actions</span>, align: 'right', render: (t) => (
        <RowActions actions={[{ label: 'Entities', icon: <Layers /> }, { label: 'View', icon: <Eye /> }, { label: 'Edit', icon: <Pencil /> }]}>
          <ActionMenu label={`More actions for ${t.name}`} items={[{ label: t.status === 'Active' ? 'Deactivate' : 'Activate', icon: <Power />, tone: t.status === 'Active' ? 'danger' : 'default' }]} />
        </RowActions>
      ) },
    ];
    return (
      <PortalShell active="tenants">
        <PageHeader
          title="Tenants"
          subtitle="Manage tenants, enable products, and set the default product per tenant."
          actions={<Button iconLeft={<Plus />}>Add tenant</Button>}
        />
        <Table
          caption="Tenants"
          columns={columns}
          rows={tenants}
          rowKey={(t) => t.id}
          sort={{ key: 'name', direction: 'asc' }}
          onSort={() => {}}
          toolbar={<>
            <SearchInput placeholder="Search by name or code…" style={{ width: 320 }} />
            <span style={{ flex: 1 }} />
            <Checkbox label="Include inactive" />
            <Button variant="ghost" iconLeft={<Download />}>Export</Button>
          </>}
          footer={<Pagination page={1} pageCount={10} total={93} pageSize={10} noun="tenants" onPageChange={() => {}} />}
        />
      </PortalShell>
    );
  },
};

/* ------------------------------------------------------------------ */

export const SubscriptionsPage: StoryObj = {
  name: 'Subscriptions',
  render: () => {
    const platformTools = [
      { title: 'Commercial tenants', description: 'Subscription-side tenant profiles.', icon: <Building2 />, tone: 'blue' },
      { title: 'Products & features', description: 'Product catalogue and feature keys.', icon: <Package />, tone: 'blue' },
      { title: 'New plan', description: 'Draft a plan with pricing and limits.', icon: <Plus />, tone: 'blue' },
      { title: 'Plans', description: 'List, edit drafts, publish.', icon: <Layers />, tone: 'amber' },
      { title: 'Customer search', description: 'Find subscriptions by tenant, email, or status.', icon: <Search />, tone: 'blue' },
      { title: 'Wallet review', description: 'Manual top-up approval queue.', icon: <Wallet />, tone: 'green' },
      { title: 'Payment channels', description: 'Enable Paystack, Manual, and Wallet per purpose.', icon: <CreditCard />, tone: 'blue' },
      { title: 'Billing tools', description: 'Invoices, payments, and proration preview.', icon: <BadgeDollarSign />, tone: 'green' },
      { title: 'Lifecycle', description: 'Subscribe, trial, status changes.', icon: <ShieldCheck />, tone: 'green' },
      { title: 'Approvals', description: 'Approval queue.', icon: <ClipboardList />, tone: 'blue' },
      { title: 'Audit logs', description: 'Per-tenant commercial audit.', icon: <ScrollText />, tone: 'slate' },
      { title: 'Auth integration', description: 'Inbound Auth sync event log (ops).', icon: <Radio />, tone: 'slate' },
      { title: 'Outbox', description: 'Pending integration events.', icon: <Inbox />, tone: 'slate' },
    ] as const;
    const customerTools = [
      { title: 'Overview', description: 'Status, billing, orgs, seats, invoice usage.', icon: <CreditCard />, tone: 'blue' },
      { title: 'Invoice quotas', description: 'Per-organisation monthly invoice allowance.', icon: <FileText />, tone: 'blue' },
      { title: 'Entitlements', description: 'Plan features and overrides.', icon: <Layers />, tone: 'blue' },
      { title: 'Feature catalogue', description: 'Resolved feature list for the product.', icon: <TagIcon />, tone: 'green' },
      { title: 'Usage & limits', description: 'Seats, entities, thresholds.', icon: <Gauge />, tone: 'amber' },
      { title: 'Billing', description: 'History, contacts, invoices, payments.', icon: <History />, tone: 'green' },
      { title: 'Wallet', description: 'Balance, top-up, transaction history.', icon: <Wallet />, tone: 'amber' },
      { title: 'Notifications', description: 'Preferences, recipients, log.', icon: <BellRing />, tone: 'blue' },
    ] as const;
    return (
      <PortalShell active="subscriptions">
        <PageHeader title="Subscriptions" subtitle="Manage commercial plans, renewals, usage, billing, and notifications. Platform tools are for administrators only." />
        <section>
          <SectionHeading title="Platform administration" description="Catalogue, plans, lifecycle, approvals, and cross-tenant tools." />
          <Grid min={280} gap={3}>
            {platformTools.map((t) => <LinkTile key={t.title} {...t} />)}
          </Grid>
        </section>
        <section>
          <SectionHeading title="View one customer subscription" description="Choose a tenant and product, then open any customer subscription page." />
          <Card padding="lg">
            <div className="sso-form-row">
              <Select label="Tenant" options={contextOptions.scope} defaultValue="WRAGBY" />
              <Select label="Product" options={contextOptions.product} defaultValue="ERP" />
            </div>
          </Card>
        </section>
        <Alert tone="info" title="Wragby Group · wBiz ERP selected" description="Open the overview for status, usage, and plan details." action={<Button size="sm">Open subscription overview</Button>} />
        <Grid min={280} gap={3}>
          {customerTools.map((t) => <LinkTile key={t.title} {...t} />)}
        </Grid>
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
        title="Wragby Group · Subscription overview"
        subtitle="Status, plans, capacity, renewal and billing for this tenant."
        actions={<><Button variant="secondary">Transaction history</Button><Button variant="danger">Cancel renewal</Button></>}
      />
      <Grid min={240}>
        <StatCard label="Entities" value={3} helper="Managed under this tenant" actions={<Button iconLeft={<Plus />}>Add entity</Button>} />
        <StatCard label="Full seats" value={5} helper="1 seat available" actions={<Button iconLeft={<Plus />}>Add users</Button>} />
        <StatCard label="Employee records" value={100} helper="Self-service included" actions={<><Button iconLeft={<Plus />}>Employees</Button><Button variant="outline" iconLeft={<Plus />}>Self-service</Button></>} />
      </Grid>
      <Alert tone="warning" title="Wragby Finance renews in 7 days" description="₦600,000 will be charged to debit card ·· 4242 on 9 August 2027." />
      <SectionHeading title="Plans by entity" />
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
