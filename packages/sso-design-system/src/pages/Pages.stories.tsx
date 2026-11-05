import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ArrowRight, Building2, CheckCircle2, ClipboardCheck, Download, KeyRound, Pencil, Plus, ShieldCheck, SlidersHorizontal, Trash2, UserX, Users } from 'lucide-react';
import { PortalShell } from './PortalShell';
import { PageHeader } from '../components/PageHeader/PageHeader';
import { Button } from '../components/Button/Button';
import { StatCard } from '../components/Card/Card';
import { Grid } from '../components/AppShell/AppShell';
import { ActivityList, AppTile, PlanSummary, SetupChecklist } from '../components/Patterns/Patterns';
import { Alert } from '../components/Alert/Alert';
import { Tabs } from '../components/Tabs/Tabs';
import { Pagination, Table, type Column } from '../components/Table/Table';
import { Avatar } from '../components/Avatar/Avatar';
import { Chip, Tag } from '../components/Tag/Tag';
import { StatusPill } from '../components/StatusPill/StatusPill';
import { ActionMenu } from '../components/ActionMenu/ActionMenu';
import { Checkbox, Input, SearchInput, Select } from '../components/Field/Field';
import { Accordion } from '../components/Accordion/Accordion';
import { SidePanel } from '../components/Overlay/Overlay';
import { Logo } from '../components/Logo/Logo';
import { activity, apps, billing, plans, setupSteps, tenants, users, type DemoTenant, type DemoUser } from '../demo/data';

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
      <PageHeader
        eyebrow="Good morning, Adaola"
        title="Here’s what needs your attention"
        subtitle="Wragby Group · Full ERP"
        actions={<Button iconLeft={<ClipboardCheck />}>Finish setup</Button>}
      />
      <Grid min={200}>
        <StatCard label="Active users" value={5} helper="of 5 purchased seats" icon={<Users />} />
        <StatCard label="Entities" value={3} helper="3 of 3 used" icon={<Building2 />} />
        <StatCard label="Open approvals" value={7} helper="3 need your attention" icon={<ShieldCheck />} />
        <StatCard label="Plan renewal" value="9 Aug" helper="2027 · Annual billing" />
      </Grid>
      <div className="sso-two-col">
        <SetupChecklist subtitle="Complete your tenant setup" steps={setupSteps} />
        <ActivityList title="Recent activity" subtitle="Changes across your account" items={activity} />
      </div>
      <section>
        <h2 className="sso-section-title">Your applications</h2>
        <p className="sso-section-subtitle">Open the apps included in this tenant’s plan. You’re signed in to all of them.</p>
        <Grid min={180}>
          {apps.map((a) => <AppTile key={a.name} name={a.name} icon={a.icon} />)}
        </Grid>
      </section>
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
          eyebrow="Access control"
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

const tenantTone = { Active: 'success', Expired: 'error', Trial: 'info' } as const;

export const TenantsPage: StoryObj = {
  name: 'Tenants',
  render: () => {
    const columns: Column<DemoTenant>[] = [
      { key: 'name', header: 'Tenant', sortable: true, render: (t) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span className="sso-cell-primary">{t.name}</span>{t.primary && <Tag>Primary</Tag>}</div>
      ) },
      { key: 'plan', header: 'Plan', render: (t) => t.plan },
      { key: 'code', header: 'Code', render: (t) => <span className="sso-cell-code">{t.code}</span> },
      { key: 'entities', header: 'Entities', align: 'center', render: (t) => <span className="sso-num">{t.entities}</span> },
      { key: 'status', header: 'Status', render: (t) => <StatusPill tone={tenantTone[t.status]}>{t.status}</StatusPill> },
      { key: 'a', header: <span className="sso-visually-hidden">Actions</span>, align: 'right', width: 64, render: (t) => (
        <ActionMenu label={`Actions for ${t.name}`} items={[{ label: 'View tenant', icon: <ArrowRight /> }, { label: 'Edit', icon: <Pencil /> }, { label: 'Delete', icon: <Trash2 />, tone: 'danger' }]} />
      ) },
    ];
    return (
      <PortalShell active="tenants">
        <PageHeader
          eyebrow="Organisation"
          title="Tenants"
          badge={<Tag>4 / 5 used</Tag>}
          subtitle="Each tenant is a customer account with its own entities, users and plan."
          actions={<><Button variant="outline" iconLeft={<Plus />}>Buy tenant</Button><Button iconLeft={<Plus />}>Add tenant</Button></>}
        />
        <Table
          caption="Tenants"
          columns={columns}
          rows={tenants}
          rowKey={(t) => t.id}
          toolbar={<>
            <SearchInput placeholder="Search tenants…" style={{ width: 260 }} />
            <span style={{ flex: 1 }} />
            <Button variant="ghost" iconLeft={<Download />}>Export</Button>
            <Button variant="ghost" iconLeft={<SlidersHorizontal />}>Columns</Button>
          </>}
          footer={<Pagination page={1} pageCount={1} total={4} pageSize={10} noun="tenants" onPageChange={() => {}} />}
        />
      </PortalShell>
    );
  },
};

/* ------------------------------------------------------------------ */

export const SubscriptionsPage: StoryObj = {
  name: 'Subscriptions',
  render: () => (
    <PortalShell active="subscriptions">
      <PageHeader
        eyebrow="Billing"
        title="Subscriptions"
        subtitle="Review plans, capacity, renewal and billing activity."
        actions={<><Button variant="secondary">Transaction history</Button><Button variant="danger">Cancel renewal</Button></>}
      />
      <Grid min={240}>
        <StatCard label="Tenants" value={3} helper="Managed from this account" actions={<Button iconLeft={<Plus />}>Add tenant</Button>} />
        <StatCard label="Full seats" value={5} helper="1 seat available" actions={<Button iconLeft={<Plus />}>Add users</Button>} />
        <StatCard label="Employee records" value={100} helper="Self-service included" actions={<><Button iconLeft={<Plus />}>Employees</Button><Button variant="outline" iconLeft={<Plus />}>Self-service</Button></>} />
      </Grid>
      <Alert tone="warning" title="Wragby Finance renews in 7 days" description="₦600,000 will be charged to debit card ·· 4242 on 9 August 2027." />
      <p className="sso-eyebrow" style={{ margin: 0 }}>Plans by tenant</p>
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
