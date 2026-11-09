import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { UsageMeter, SubscriptionCard, LicenceKey, RenewalBadge, RoleBadge, PermissionMatrix, EntityHeader, ApprovalItem, ApprovalTrail, Stepper, MemberRow } from '../components/domain';
import { Button, StatusPill } from '../components/primitives';
import { SUBSCRIPTIONS, APPROVALS, PERMISSIONS } from '../data';

export default { title: 'AEMSP/Overview', parameters: { docs: { description: { component: 'Components specific to AEMSP: subscriptions, licences, seats, renewals, approvals and access control.' } } } } satisfies Meta;
type S = StoryObj;
const col: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: 16 };

export const UsageMeters: S = { render: () => <div style={{ ...col, maxWidth: 460 }}><UsageMeter label="Fleet Diagnostics Pro" used={420} limit={1000} /><UsageMeter label="Telematics Suite" used={188} limit={200} /><UsageMeter label="Service Manuals Plus" used={410} limit={400} /><UsageMeter label="Compact" used={60} limit={100} compact /></div> };
export const SubscriptionCards: S = { render: () => <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>{SUBSCRIPTIONS.map((s, i) => <SubscriptionCard key={s.product} sub={s} selected={i === 0} />)}</div> };
export const LicenceKeys: S = { render: () => <div style={col}><LicenceKey value="FDP-8X2Q-77LM-K4PA-2026" /><LicenceKey value="TLS-1029-ZZ8A-PL0Q-2026" masked={false} /></div> };
export const RenewalBadges: S = { render: () => <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', paddingTop: 30 }}><RenewalBadge days={112} date="24 Feb 2027" /><RenewalBadge days={45} autoRenew /><RenewalBadge days={12} date="15 Nov 2026" /><RenewalBadge days={0} /><RenewalBadge days={-6} /></div> };
export const RoleBadges: S = { render: () => <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}><RoleBadge role="owner">Super Admin</RoleBadge><RoleBadge role="admin" /><RoleBadge role="manager">Partner Manager</RoleBadge><RoleBadge role="finance">Finance Analyst</RoleBadge><RoleBadge role="viewer" /><RoleBadge role="custom">OEM Auditor</RoleBadge></div> };
export const PermissionMatrixStory: S = { name: 'Permission matrix', render: () => <div className="ae-card" style={{ padding: 18 }}><PermissionMatrix rows={PERMISSIONS} /></div> };
export const PermissionMatrixReadOnly: S = { name: 'Permission matrix (read-only)', render: () => <div className="ae-card" style={{ padding: 18 }}><PermissionMatrix rows={PERMISSIONS.slice(0, 4)} readOnly /></div> };
export const OrganisationHeader: S = {
  render: () => <EntityHeader name="Northwind Motors" initials="NM" type="OEM" status={<StatusPill status="success" variant="soft">Active</StatusPill>}
    meta={[['map-pin', 'Coventry, UK'], ['globe', 'northwind.co.uk'], ['user', 'Ada Lovelace'], ['calendar', 'Customer since Mar 2022']]}
    facts={[['Active subscriptions', '4'], ['Licences', '1,240'], ['Seat usage', '84%'], ['MRR', '£48,200.00'], ['Next renewal', '15 Nov 2026']]}
    actions={<><Button variant="outline" icon="edit">Edit</Button><Button icon="add">Add subscription</Button></>} />,
};
function Queue() { const [sel, setSel] = useState('a1'); return <div style={{ ...col, maxWidth: 720 }}>{APPROVALS.slice(0, 3).map((a) => <ApprovalItem key={a.id} req={a} selected={sel === a.id} onSelect={() => setSel(a.id)} />)}<ApprovalItem req={{ ...APPROVALS[3], status: 'approved' }} /><ApprovalItem req={{ ...APPROVALS[4], status: 'rejected' }} /></div>; }
export const ApprovalItems: S = { render: () => <Queue /> };
export const ApprovalTrails: S = { render: () => <div style={{ maxWidth: 480 }}><ApprovalTrail steps={[{ state: 'submitted', title: 'Submitted by Ada Lovelace', who: 'Northwind Motors', when: '3 Nov, 09:12' }, { state: 'approved', title: 'Partner manager approved', who: 'Grace Obi', when: '3 Nov, 10:04', note: 'Usage justifies the increase. Bill from 1 Dec.' }, { state: 'current', title: 'Waiting for finance approval', who: 'Finance team' }, { state: 'pending', title: 'Licences issued' }]} /></div> };
export const SentBack: S = { name: 'Approval trail: rejected', render: () => <div style={{ maxWidth: 480 }}><ApprovalTrail steps={[{ state: 'submitted', title: 'Submitted by Priya Raman', when: '1 Nov' }, { state: 'rejected', title: 'Rejected by Finance', who: 'Lars Nilsen', when: '2 Nov', note: 'Outstanding invoices must be paid before cancelling.' }]} /></div> };
export const Steppers: S = { render: () => <div style={{ ...col, gap: 40 }}><Stepper current={1} steps={[{ label: 'Organisation', hint: 'Who is it for' }, { label: 'Plan & seats', hint: 'What they get' }, { label: 'Billing', hint: 'How they pay' }, { label: 'Review' }]} /><Stepper current={2} errorAt={1} steps={[{ label: 'Organisation' }, { label: 'Plan & seats' }, { label: 'Billing' }, { label: 'Review' }]} /><div style={{ maxWidth: 260 }}><Stepper vertical current={1} steps={[{ label: 'Organisation', hint: 'Northwind Motors' }, { label: 'Plan & seats', hint: 'Choose product' }, { label: 'Billing' }, { label: 'Review' }]} /></div></div> };
export const Members: S = { render: () => <div className="ae-card" style={{ padding: '6px 18px', maxWidth: 640 }}><MemberRow name="Ada Lovelace" email="ada@northwind.co.uk" role="owner" status="active" /><MemberRow name="Tunde Bakare" email="tunde@apex.com" role="finance" status="active" /><MemberRow name="Mei Chen" email="mei@kestrel.au" role="viewer" status="invited" /><MemberRow name="Lars Nilsen" email="lars@volta.no" role="manager" status="suspended" /></div> };
import { ActivityFeed } from '../components/domain';
import { BUDGET_EVENTS } from '../data';
export const BudgetActivityFeed: S = { name: 'Activity feed (budgets & overages)', render: () => <div className="ae-card" style={{ padding: 18, maxWidth: 560 }}><ActivityFeed events={[...BUDGET_EVENTS, { id: 'e4', kind: 'overage', title: 'Prepaid overage', date: '28 Oct 2026', org: 'Food Concepts Plc.', body: 'Prepaid credit used up; usage is now billed as overage.' }]} /></div> };
