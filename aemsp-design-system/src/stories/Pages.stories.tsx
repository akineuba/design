import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AppShell, Card, StatCard, Tabs, Accordion, ActionMenu, PageHeader } from '../components/layout';
import { Table, Column, Pagination, EmptyState } from '../components/data';
import { Button, StatusPill, AvatarLabel, NumberValue, NegativeValue, formatMoney, Badge, Divider } from '../components/primitives';
import { FilterDropdown, Input, Select, DatePicker, RadioGroup, Switch, Checkbox, FileUpload, RichTextField, SegmentedControl } from '../components/forms';
import { Alert, Modal } from '../components/overlays';
import { BarChart, DonutChart, AreaChart, HorizontalBarChart } from '../components/charts';
import { ActivityFeed, UsageMeter, SubscriptionCard, RenewalBadge, EntityHeader, ApprovalItem, ApprovalTrail, Stepper, PermissionMatrix, RoleBadge, DescriptionList, LicenceKey } from '../components/domain';
import { ORGS, ORG_STATUS, OrgRow, SUBSCRIPTIONS, APPROVALS, PERMISSIONS, WEEK, MONTHS, BY_OEM_TYPE, PLATFORM, USAGE_BY_ORG, BUDGET_EVENTS } from '../data';
import { Icon } from '../components/Icon';

export default {
  title: 'Patterns/Pages',
  parameters: { layout: 'fullscreen', docs: { description: { component: 'Full AEMSP screens built only from the system’s components. The dashboard follows the Figma layout; the others are new page types the file didn’t cover: a multi-step form, a long input-field form, settings, an approvals split view, roles & permissions, and an organisation profile.' } } },
} satisfies Meta;
type S = StoryObj;

const rowMenu = () => <ActionMenu actions={[{ label: 'View details', icon: 'eye' }, { label: 'Edit', icon: 'edit' }, { label: 'Add subscription', icon: 'package' }, 'separator', { label: 'Suspend', icon: 'pause', danger: true }]} />;

/* ===================== 1. Dashboard (platform overview data) ===================== */
function Dashboard() {
  const [spin, setSpin] = useState(false);
  return (
    <AppShell active="dashboard" breadcrumb={['Overview', 'Dashboard']} title="Dashboard">
      <PageHeader title="Good morning, Akin" subtext="Platform overview" />
      <div className="ae-stat-row" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
        <StatCard label="Amount used" value={<NumberValue value={PLATFORM.amountUsed} money currency="USD" />} icon="hand-money" tone="green" hint="Across all organizations" />
        <StatCard label="Organizations" value={PLATFORM.organizations.toLocaleString('en-GB')} icon="hierarchy" tone="indigo" hint="On the platform" />
        <StatCard label="Total OEMs" value={PLATFORM.oems} icon="line-graph" tone="amber" hint="Linked cloud connections" />
        <StatCard label="Roles" value={PLATFORM.roles} icon="admin" tone="purple" hint="Access & permission roles" />
      </div>
      <div className="ae-grid-2-1" style={{ alignItems: 'start' }}>
        <Card title="Usage by organization" subtitle="Amount used across top organizations">
          <HorizontalBarChart unit="$" data={USAGE_BY_ORG} labelKey="org" valueKey="amount" />
        </Card>
        <Card title={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>Recent activity <span className="ae-event__dot" style={{ background: 'var(--blue-500)' }} aria-label="New events" /></span>}
          subtitle="Budget and overage notifications"
          actions={<button type="button" className="ae-icon-btn" aria-label="Refresh activity" onClick={() => { setSpin(true); setTimeout(() => setSpin(false), 800); }} style={{ border: '1px solid var(--border-default)' }}><Icon name="refresh" size={17} className={spin ? 'ae-spin' : undefined} /></button>}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <ActivityFeed events={BUDGET_EVENTS} totals={{ all: 20, unread: 20, budgets: 20 }} maxHeight={460} />
            <Alert tone="info" title="Compliance notice (Epic 8)">
              Budget overrun warnings (80% and 100%) and prepaid overages are in-app events only and don’t trigger email notifications. Select an event to open the customer’s Azure usage.
            </Alert>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
export const DashboardPage: S = { name: 'Dashboard', render: () => <Dashboard /> };

/* ===================== 2. Multi-step form: New subscription ===================== */
function NewSubscription() {
  const [step, setStep] = useState(1);
  const steps = [{ label: 'Organisation', hint: 'Who it’s for' }, { label: 'Plan & seats', hint: 'What they get' }, { label: 'Billing', hint: 'How they pay' }, { label: 'Review', hint: 'Check and submit' }];
  return (
    <AppShell active="clients" breadcrumb={['Partner Centre', 'Clients', 'New subscription']} title="New subscription"
      footer={<div className="ae-sticky-actions"><Button variant="ghost">Save as draft</Button><div style={{ display: 'flex', gap: 10 }}><Button variant="outline" icon="chevron-left" disabled={step === 0} onClick={() => setStep(Math.max(0, step - 1))}>Back</Button><Button iconEnd={step < 3 ? 'chevron-right' : undefined} icon={step === 3 ? 'send' : undefined} onClick={() => setStep(Math.min(3, step + 1))}>{step === 3 ? 'Submit for approval' : 'Continue'}</Button></div></div>}>
      <PageHeader back="Back to Clients" title="New subscription" subtext="Set up a licence subscription for an organisation. It goes to approval before licences are issued." />
      <Card><Stepper steps={steps} current={step} /></Card>
      <div className="ae-wizard" style={{ gridTemplateColumns: 'minmax(0,1fr) 300px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {step === 0 && (
            <Card title="Organisation">
              <div className="ae-form-grid">
                <div className="ae-span-2"><Select label="Organisation" required options={ORGS.map((o) => ({ value: o.id, label: o.name, hint: `${o.type} · ${o.region}` }))} value="o1" onAddNew={() => {}} addNewLabel="Add organisation" /></div>
                <Select label="Primary contact" required options={[{ value: 'ada', label: 'Ada Lovelace' }, { value: 'grace', label: 'Grace Obi' }]} value="ada" />
                <Input label="Contact email" icon="mail" defaultValue="ada@northwind.co.uk" />
              </div>
            </Card>
          )}
          {step === 1 && (<>
            <Card title="Product">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <Select label="Product" required options={[{ value: 'fdp', label: 'Fleet Diagnostics Pro', hint: 'AEMSP Core' }, { value: 'ts', label: 'Telematics Suite', hint: 'Orbit Data' }, { value: 'sm', label: 'Service Manuals Plus', hint: 'AEMSP Core' }]} value="fdp" />
                <RadioGroup name="plan" label="Plan" cards value="business" options={[{ value: 'standard', label: 'Standard', description: '£12.00 / seat / month · email support' }, { value: 'business', label: 'Business', description: '£18.00 / seat / month · priority support, SSO' }, { value: 'enterprise', label: 'Enterprise', description: 'Custom pricing · dedicated manager' }]} />
              </div>
            </Card>
            <Card title="Seats & term">
              <div className="ae-form-grid">
                <Input label="Number of seats" type="number" required defaultValue="120" hint="Minimum 10 seats for Business." />
                <Select label="Billing cycle" required searchable={false} options={[{ value: 'm', label: 'Monthly' }, { value: 'y', label: 'Annually (save 15%)' }]} value="y" />
                <DatePicker label="Start date" required value={new Date(2026, 11, 1)} />
                <Select label="Term length" searchable={false} options={[{ value: '12', label: '12 months' }, { value: '24', label: '24 months' }, { value: '36', label: '36 months' }]} value="12" />
                <div className="ae-span-2"><Switch label="Auto-renew at the end of the term" description="We’ll remind the billing contact 30 days before." defaultChecked /></div>
                <div className="ae-span-2"><Checkbox label="Include onboarding package (£1,500 one-off)" /></div>
              </div>
            </Card>
          </>)}
          {step === 2 && (
            <Card title="Billing">
              <div className="ae-form-grid">
                <Input label="Billing email" icon="mail" required defaultValue="finance@northwind.co.uk" />
                <Input label="PO number" optional placeholder="e.g. PO-20391" />
                <Select label="Payment method" required searchable={false} options={[{ value: 'inv', label: 'Invoice (30 days)' }, { value: 'dd', label: 'Direct debit' }, { value: 'card', label: 'Card' }]} value="inv" />
                <Select label="Currency" searchable={false} options={[{ value: 'gbp', label: 'GBP (£)' }, { value: 'eur', label: 'EUR (€)' }, { value: 'usd', label: 'USD ($)' }]} value="gbp" />
                <Input label="Discount" suffix={<span>%</span>} defaultValue="5" hint="Discounts over 10% need finance approval." />
                <Input label="VAT number" defaultValue="GB 123 4567 89" success="Verified" />
              </div>
            </Card>
          )}
          {step === 3 && (<>
            <Alert tone="info" title="This request goes to approval">Partner manager first, then finance. Licences are issued once both approve.</Alert>
            <Card title="Review" divided>
              <DescriptionList items={[['Organisation', 'Northwind Motors'], ['Contact', 'Ada Lovelace'], ['Product', 'Fleet Diagnostics Pro · Business'], ['Seats', '120'], ['Term', '12 months from 01 Dec 2026, auto-renew'], ['Billing', 'Invoice · finance@northwind.co.uk']]} />
            </Card>
            <Card title="Note for approvers"><RichTextField placeholder="Add context for the approvers (optional)…" /></Card>
          </>)}
        </div>
        <aside className="ae-summary">
          <Card title="Summary">
            <div className="ae-summary__row"><span>Business plan</span><b>£18.00 × 120</b></div>
            <div className="ae-summary__row"><span>Monthly</span><b>£2,160.00</b></div>
            <div className="ae-summary__row"><span>Annual discount (15%)</span><b style={{ color: 'var(--tone-success-ink)' }}>−£3,888.00</b></div>
            <div className="ae-summary__row"><span>Partner discount (5%)</span><b style={{ color: 'var(--tone-success-ink)' }}>−£1,101.60</b></div>
            <div className="ae-summary__row ae-summary__total"><span>Total / year</span><b>£20,930.40</b></div>
            <p className="ae-muted" style={{ fontSize: 12, margin: '8px 0 0' }}>Excludes VAT. Billed annually in advance.</p>
          </Card>
        </aside>
      </div>
    </AppShell>
  );
}
export const NewSubscriptionWizard: S = { name: 'Multi-step form (new subscription)', render: () => <NewSubscription /> };

/* ===================== 3. Long form: Edit organisation ===================== */
function EditOrganisation() {
  return (
    <AppShell active="organisations" breadcrumb={['Organisations', 'Northwind Motors', 'Edit']} title="Edit organisation"
      footer={<div className="ae-sticky-actions"><span className="ae-muted" style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}><Icon name="info" size={15} />You have unsaved changes</span><div style={{ display: 'flex', gap: 10 }}><Button variant="outline">Cancel</Button><Button icon="save">Save changes</Button></div></div>}>
      <PageHeader back="Back to Northwind Motors" title="Edit organisation" subtext="Update company, address, billing and contact details." />
      <Alert tone="error" title="Fix 2 fields to save">
        <ul><li>Billing email is not a valid address</li><li>Postcode is required</li></ul>
      </Alert>
      <Card title="Company details" subtitle="How this organisation appears across AEMSP.">
        <div className="ae-form-grid">
          <Input label="Organisation name" required defaultValue="Northwind Motors" />
          <Input label="Trading name" optional defaultValue="Northwind" />
          <Select label="Type" required options={[{ value: 'oem', label: 'OEM' }, { value: 'dealer', label: 'Dealer' }, { value: 'fleet', label: 'Fleet' }, { value: 'partner', label: 'Partner' }]} value="oem" />
          <Select label="Parent organisation" optional options={[{ value: 'none', label: 'None' }, { value: 'apex', label: 'Apex OEM Group' }]} placeholder="None" />
          <Input label="Company registration no." defaultValue="09876543" success="Found on Companies House" />
          <Input label="VAT number" defaultValue="GB 123 4567 89" />
          <Input label="Website" icon="globe" defaultValue="northwind.co.uk" />
          <Input label="Organisation ID" readOnly defaultValue="ORG-00412" />
          <div className="ae-span-2"><Input label="Description" multiline maxLength={280} defaultValue="UK commercial vehicle OEM. Uses Fleet Diagnostics Pro across 14 service centres." /></div>
        </div>
      </Card>
      <Card title="Address">
        <div className="ae-form-grid">
          <div className="ae-span-2"><Input label="Address line 1" required defaultValue="12 Foundry Way" /></div>
          <div className="ae-span-2"><Input label="Address line 2" optional /></div>
          <Input label="Town / city" required defaultValue="Coventry" />
          <Input label="Postcode" required error="Enter a postcode" />
          <Select label="Country" required options={[{ value: 'uk', label: 'United Kingdom' }, { value: 'ie', label: 'Ireland' }]} value="uk" />
          <Select label="Region" options={[{ value: 'uk', label: 'UK & Ireland' }, { value: 'emea', label: 'EMEA' }]} value="uk" />
        </div>
      </Card>
      <Card title="Billing">
        <div className="ae-form-grid">
          <Input label="Billing email" icon="mail" required defaultValue="finance@northwind" error="Enter a full email address, like name@company.com" />
          <Input label="Billing phone" icon="phone" defaultValue="+44 24 7600 1200" />
          <Select label="Payment terms" searchable={false} options={[{ value: '30', label: '30 days' }, { value: '45', label: '45 days' }, { value: '60', label: '60 days' }]} value="30" />
          <Input label="Credit limit" prefix="£" defaultValue="150,000.00" />
          <div className="ae-span-2"><RadioGroup name="inv" label="Invoice delivery" value="email" options={[{ value: 'email', label: 'Email (PDF)' }, { value: 'portal', label: 'Customer portal' }, { value: 'both', label: 'Both' }]} /></div>
        </div>
      </Card>
      <Card title="Contacts" actions={<Button size="sm" variant="outline" icon="user-plus">Add contact</Button>}>
        <div className="ae-acc-group">
          <Accordion title="Ada Lovelace" meta="Primary · Owner" defaultOpen>
            <div className="ae-form-grid"><Input label="Full name" defaultValue="Ada Lovelace" /><Input label="Job title" defaultValue="Head of Fleet Technology" /><Input label="Email" icon="mail" defaultValue="ada@northwind.co.uk" /><Input label="Phone" icon="phone" defaultValue="+44 7700 900123" /></div>
          </Accordion>
          <Accordion title="Tom Okafor" meta="Finance contact"><p style={{ margin: 0 }}>tom@northwind.co.uk</p></Accordion>
        </div>
      </Card>
      <Card title="Documents"><FileUpload files={[{ name: 'Northwind_MSA_2026.pdf', size: '2.4 MB', progress: 100 }]} /></Card>
    </AppShell>
  );
}
export const EditOrganisationForm: S = { name: 'Long form (edit organisation)', render: () => <EditOrganisation /> };

/* ===================== 4. Settings ===================== */
function Settings() {
  const [tab, setTab] = useState('general');
  const nav: [string, string, Parameters<typeof Icon>[0]['name']][] = [['general', 'General', 'settings'], ['notifications', 'Notifications', 'bell'], ['billing', 'Billing', 'credit-card'], ['security', 'Security', 'lock'], ['integrations', 'Integrations', 'layers'], ['api', 'API keys', 'key']];
  const Row = ({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) => (
    <div className="ae-setting-row"><div><div className="ae-setting-row__title">{title}</div><div className="ae-setting-row__desc">{desc}</div></div><div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>{children}</div></div>
  );
  return (
    <AppShell active="settings-general" breadcrumb={['Settings', 'General']} title="Settings">
      <PageHeader title="Settings" subtext="Workspace preferences for your AEMSP account." />
      <div className="ae-settings">
        <nav className="ae-subnav" aria-label="Settings sections">
          {nav.map(([id, l, i]) => <button key={id} type="button" className={`ae-subnav__item${tab === id ? ' ae-subnav__item--active' : ''}`} onClick={() => setTab(id)}><Icon name={i} size={17} />{l}</button>)}
        </nav>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Card title="Workspace">
            <Row title="Workspace name" desc="Shown in emails and on invoices."><Input defaultValue="AEMSP – Northern Europe" /></Row>
            <Row title="Default currency" desc="Used for new subscriptions and reports."><Select searchable={false} options={[{ value: 'gbp', label: 'GBP (£)' }, { value: 'eur', label: 'EUR (€)' }]} value="gbp" /></Row>
            <Row title="Date & number format" desc="Applies to all users in this workspace."><div className="ae-form-grid"><Select searchable={false} options={[{ value: 'dmy', label: 'DD/MM/YYYY' }, { value: 'mdy', label: 'MM/DD/YYYY' }]} value="dmy" /><Select searchable={false} options={[{ value: 'uk', label: '1,234.56' }, { value: 'eu', label: '1.234,56' }]} value="uk" /></div></Row>
            <Row title="Fiscal year starts" desc="Reports group revenue by fiscal quarter."><DatePicker value={new Date(2026, 3, 1)} /></Row>
          </Card>
          <Card title="Approvals">
            <Row title="Require approval for" desc="Requests matching these rules go to Approval Management.">
              <Checkbox label="New subscriptions" defaultChecked /><Checkbox label="Seat increases over 50 seats" defaultChecked /><Checkbox label="Plan downgrades and cancellations" defaultChecked /><Checkbox label="Discounts over 10%" />
            </Row>
            <Row title="Approval chain" desc="Who signs off, in order.">
              <RadioGroup name="chain" direction="column" value="two" options={[{ value: 'one', label: 'Partner manager only' }, { value: 'two', label: 'Partner manager, then finance', description: 'Recommended for amounts over £5,000' }, { value: 'custom', label: 'Custom chain' }]} />
            </Row>
            <Row title="Auto-approve renewals" desc="Renewals on the same plan and seat count skip approval."><Switch label="Enabled" defaultChecked /></Row>
          </Card>
          <Card title="Notifications">
            <Row title="Renewal reminders" desc="Email the billing contact before a subscription renews."><Switch label="30 days before" defaultChecked /><Switch label="14 days before" defaultChecked /><Switch label="3 days before" /></Row>
            <Row title="Seat alerts" desc="Notify partner managers when seat usage passes a threshold."><Input label="Alert at" suffix={<span>% used</span>} defaultValue="85" size="sm" /></Row>
          </Card>
          <Card title="Danger zone">
            <Row title="Archive workspace" desc="Hides the workspace and stops all renewals. Owners can restore it within 30 days."><div><Button variant="danger-outline" icon="pause">Archive workspace</Button></div></Row>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
export const SettingsPage: S = { name: 'Settings', render: () => <Settings /> };

/* ===================== 5. Approvals: split view ===================== */
function Approvals() {
  const [sel, setSel] = useState('a1');
  const [reject, setReject] = useState(false);
  const cur = APPROVALS.find((a) => a.id === sel)!;
  return (
    <AppShell active="approvals" breadcrumb={['Partner Centre', 'Approval Management']} title="Approval Management">
      <PageHeader title="Approval Management" subtext="Review subscription requests before licences are issued." />
      <Tabs items={[{ id: 'p', label: 'Waiting for you', count: 6 }, { id: 'a', label: 'Approved', count: 128 }, { id: 'r', label: 'Rejected', count: 9 }, { id: 'all', label: 'All requests' }]} />
      <div className="ae-toolbar">
        <div className="ae-toolbar__group">
          <FilterDropdown label="Type" options={[{ value: 's', label: 'Seat increase' }, { value: 'n', label: 'New subscription' }, { value: 'u', label: 'Plan upgrade' }]} />
          <FilterDropdown label="Organisation" options={ORGS.map((o) => ({ value: o.id, label: o.name }))} />
          <FilterDropdown label="Priority" options={[{ value: 'h', label: 'High' }, { value: 'n', label: 'Normal' }]} />
        </div>
        <div className="ae-toolbar__group"><Button variant="outline" icon="download">Export</Button></div>
      </div>
      <div className="ae-split">
        <div className="ae-split__list">{APPROVALS.map((a) => <ApprovalItem key={a.id} req={a} selected={a.id === sel} onSelect={() => setSel(a.id)} showActions={false} />)}</div>
        <Card title={cur.title} subtitle={`${cur.org} · ${cur.type}`} actions={<StatusPill status="warning" variant="soft">Pending</StatusPill>}
          footer={<><Button variant="danger-outline" icon="close" onClick={() => setReject(true)}>Reject</Button><Button variant="outline" icon="message">Ask a question</Button><Button icon="check">Approve request</Button></>}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            <div className="ae-entity__facts" style={{ borderTop: 0, paddingTop: 0 }}>
              {[['Amount', cur.amount ? formatMoney(cur.amount) : '—'], ['Requested by', cur.requester], ['Submitted', cur.submitted], ['Current seats', '1,000']].map(([k, v]) => <div key={k} className="ae-kv"><span className="ae-kv__k">{k}</span><span className="ae-kv__v" style={{ fontSize: 15 }}>{v}</span></div>)}
            </div>
            <UsageMeter label="Seat usage after approval" used={962} limit={1120} />
            <Divider label="Request details" />
            <DescriptionList items={[['Product', 'Fleet Diagnostics Pro · Enterprise'], ['Change', '1,000 → 1,120 seats'], ['Effective', '01 Dec 2026'], ['Billing impact', '+£2,208.00 / month'], ['Reason', 'Opening 2 new service centres in Leeds and Bristol.']]} />
            <Divider label="Approval trail" />
            <ApprovalTrail steps={[{ state: 'submitted', title: `Submitted by ${cur.requester}`, who: cur.org, when: cur.submitted }, { state: 'current', title: 'Waiting for partner manager', who: 'You' }, { state: 'pending', title: 'Finance approval' }, { state: 'pending', title: 'Licences issued' }]} />
          </div>
        </Card>
      </div>
      <Modal open={reject} onClose={() => setReject(false)} size="sm" icon="x-circle" iconTone="danger" title="Reject request?" subtitle={cur.title} primary={{ label: 'Reject request', variant: 'danger', onClick: () => setReject(false) }}>
        <Select label="Reason" required options={[{ value: 'budget', label: 'Over budget' }, { value: 'invoices', label: 'Outstanding invoices' }, { value: 'info', label: 'Needs more information' }]} placeholder="Choose a reason" />
        <Input label="Message to requester" multiline rows={3} placeholder="Explain what needs to change…" />
      </Modal>
    </AppShell>
  );
}
export const ApprovalsSplit: S = { name: 'Approvals (split view)', render: () => <Approvals /> };

/* ===================== 6. Roles & permissions ===================== */
function Roles() {
  const [role, setRole] = useState('fin');
  const [create, setCreate] = useState(false);
  const roles: [string, string, Parameters<typeof RoleBadge>[0]['role'], number][] = [['owner', 'Super Admin', 'owner', 2], ['admin', 'Admin', 'admin', 6], ['pm', 'Partner Manager', 'manager', 18], ['fin', 'Finance Analyst', 'finance', 12], ['view', 'Viewer', 'viewer', 940], ['aud', 'OEM Auditor', 'custom', 4]];
  return (
    <AppShell active="roles" breadcrumb={['Users & Access', 'Roles & Permissions']} title="Roles & Permissions">
      <PageHeader title="Roles & Permissions" subtext="Control what each role can see and do." actions={<Button icon="add" onClick={() => setCreate(true)}>Create role</Button>} />
      <div className="ae-split" style={{ gridTemplateColumns: 'minmax(0, 300px) minmax(0, 1fr)' }}>
        <Card title="Roles" flush>
          <div style={{ display: 'flex', flexDirection: 'column', padding: '0 8px 8px' }}>
            {roles.map(([id, name, kind, n]) => (
              <button key={id} type="button" className={`ae-subnav__item${role === id ? ' ae-subnav__item--active' : ''}`} style={{ justifyContent: 'space-between' }} onClick={() => setRole(id)}>
                <span style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-start' }}><RoleBadge role={kind}>{name}</RoleBadge></span>
                <span className="ae-muted" style={{ fontSize: 12 }}>{n} users</span>
              </button>
            ))}
          </div>
        </Card>
        <Card title="Finance Analyst" subtitle="Views billing, exports invoices and approves discounts." actions={<><ActionMenu trigger="button" label="More" actions={[{ label: 'Duplicate role', icon: 'copy' }, { label: 'Rename', icon: 'edit' }, 'separator', { label: 'Delete role', icon: 'trash', danger: true }]} /><Button icon="save">Save changes</Button></>}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <Alert tone="info">Giving any permission also gives <b>View</b> for that module.</Alert>
            <PermissionMatrix rows={PERMISSIONS} />
          </div>
        </Card>
      </div>
      <Modal open={create} onClose={() => setCreate(false)} title="Create Role" subtitle="Define a system role" primary={{ label: 'Create Role', onClick: () => setCreate(false) }}>
        <Input label="Role Name" placeholder="e.g. Finance Analyst" />
        <Input label="Description" placeholder="Describe what this role can do…" multiline rows={3} />
        <Select label="Start from" searchable={false} options={[{ value: 'blank', label: 'Blank role' }, { value: 'viewer', label: 'Copy of Viewer' }, { value: 'pm', label: 'Copy of Partner Manager' }]} value="blank" />
      </Modal>
    </AppShell>
  );
}
export const RolesPermissions: S = { name: 'Roles & permissions', render: () => <Roles /> };
export const CreateRoleOpen: S = { name: 'Roles & permissions: create role modal', render: () => { const C = () => { const [o] = useState(true); return <><Roles /><Modal open={o} title="Create Role" subtitle="Define a system role" primary={{ label: 'Create Role' }}><Input label="Role Name" placeholder="e.g. Finance Analyst" /><Input label="Description" placeholder="Describe what this role can do…" multiline rows={3} /></Modal></>; }; return <C />; } };

/* ===================== 7. Organisation profile ===================== */
function OrgProfile() {
  const [tab, setTab] = useState('subs');
  return (
    <AppShell active="organisations" breadcrumb={['Organisations', 'Northwind Motors']} title="Northwind Motors">
      <EntityHeader name="Northwind Motors" initials="NM" type="OEM" status={<StatusPill status="success" variant="soft">Active</StatusPill>}
        meta={[['map-pin', 'Coventry, UK'], ['globe', 'northwind.co.uk'], ['user', 'Ada Lovelace'], ['calendar', 'Customer since Mar 2022']]}
        facts={[['Active subscriptions', '4'], ['Licences', '1,240'], ['Seat usage', '84%'], ['MRR', '£48,200.00'], ['Next renewal', '15 Nov 2026']]}
        actions={<><Button variant="outline" icon="edit">Edit</Button><Button icon="add">Add subscription</Button><ActionMenu actions={[{ label: 'Export data', icon: 'download' }, { label: 'View audit log', icon: 'activity' }, 'separator', { label: 'Suspend organisation', icon: 'pause', danger: true }]} /></>} />
      <Tabs value={tab} onChange={setTab} items={[{ id: 'subs', label: 'Subscriptions', count: 4 }, { id: 'lic', label: 'Licences' }, { id: 'users', label: 'Users', count: 38 }, { id: 'inv', label: 'Invoices' }, { id: 'docs', label: 'Documents' }]} />
      {tab === 'subs' && <div className="ae-gridcards" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>{SUBSCRIPTIONS.map((s) => <SubscriptionCard key={s.product} sub={s} />)}</div>}
      {tab === 'lic' && (
        <Table selectable rowActions={() => <ActionMenu actions={[{ label: 'Reassign', icon: 'user' }, { label: 'Copy key', icon: 'copy' }, 'separator', { label: 'Revoke licence', icon: 'key', danger: true }]} />} pagination={{ total: 1240 }}
          bulkActions={() => <><Button size="sm" variant="ghost" icon="user">Reassign</Button><Button size="sm" variant="danger" icon="key">Revoke</Button></>}
          rows={[{ id: 'l1', key: 'FDP-8X2Q-77LM-K4PA', user: 'Ada Lovelace', product: 'Fleet Diagnostics Pro', last: '2 hours ago', st: 'Active' }, { id: 'l2', key: 'FDP-1B9W-0QPL-ZZ31', user: 'Tom Okafor', product: 'Fleet Diagnostics Pro', last: 'Yesterday', st: 'Active' }, { id: 'l3', key: 'TLS-1029-ZZ8A-PL0Q', user: '—', product: 'Telematics Suite', last: 'Never', st: 'Unassigned' }, { id: 'l4', key: 'SMP-77AA-X0X0-1QQ2', user: 'Jo Patel', product: 'Service Manuals Plus', last: '41 days ago', st: 'Revoked' }]}
          columns={[{ key: 'key', header: 'Licence key', render: (r: any) => <code style={{ fontSize: 12 }}>{r.key}</code> }, { key: 'user', header: 'Assigned to', render: (r: any) => (r.user === '—' ? <span className="ae-muted">Unassigned</span> : <AvatarLabel name={r.user} />) }, { key: 'product', header: 'Product' }, { key: 'last', header: 'Last active' }, { key: 'st', header: 'Status', render: (r: any) => <StatusPill status={r.st === 'Active' ? 'success' : r.st === 'Revoked' ? 'error' : 'neutral'}>{r.st}</StatusPill> }]} />
      )}
      {tab !== 'subs' && tab !== 'lic' && <Card><EmptyState icon="file" title="Nothing to show yet" text="This tab follows the same table pattern as Licences." /></Card>}
    </AppShell>
  );
}
export const OrganisationProfile: S = { name: 'Organisation profile', render: () => <OrgProfile /> };

/* ===================== 8. Collapsed sidebar shell ===================== */
export const CollapsedShell: S = {
  name: 'Shell with collapsed sidebar',
  render: () => (
    <AppShell active="clients" breadcrumb={['Partner Centre', 'Clients']} title="Clients" sidebarCollapsed>
      <PageHeader title="Clients" subtext="Organisations with at least one active subscription." actions={<Button icon="add">Add client</Button>} />
      <Table selectable rowActions={rowMenu} pagination={{ total: 24 }} rows={ORGS}
        columns={[{ key: 'name', header: 'Organisation', sortable: true, render: (r) => <AvatarLabel name={r.name} sub={r.contact} /> }, { key: 'type', header: 'Type' }, { key: 'licences', header: 'Licences', align: 'right', sortable: true, render: (r) => r.licences.toLocaleString('en-GB') }, { key: 'status', header: 'Status', render: (r) => <StatusPill status={ORG_STATUS[r.status]}>{r.status}</StatusPill> }, { key: 'products', header: 'Products', truncate: true }]} />
    </AppShell>
  ),
};
