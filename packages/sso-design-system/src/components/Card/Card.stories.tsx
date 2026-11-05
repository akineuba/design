import type { Meta, StoryObj } from '@storybook/react';
import { Building2, Plus, Users, Wallet } from 'lucide-react';
import { Card, KeyValueList, SummaryCard } from './Card';
import { Button } from '../Button/Button';
import { StatusPill } from '../StatusPill/StatusPill';

const meta: Meta<typeof SummaryCard> = { title: 'Components/Card', component: SummaryCard, tags: ['autodocs'] };
export default meta;
type S = StoryObj<typeof SummaryCard>;

export const Summary: S = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
      <SummaryCard label="Tenants" value={93} hint="91 active · 2 inactive" />
      <SummaryCard label="Products" value={11} hint="Global product catalogue" />
      <SummaryCard label="Active users" value={5} hint="of 5 purchased seats" />
      <SummaryCard label="Plan renewal" value="9 Aug" hint="2027 · Annual billing" />
    </div>
  ),
};

export const SummaryWithIcon: S = {
  name: 'Summary with icon (optional, ERP style)',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
      <SummaryCard icon={<Building2 />} color="blue" label="Tenants" value={93} hint="91 active · 2 inactive" />
      <SummaryCard icon={<Users />} color="teal" label="Active users" value={5} hint="of 5 purchased seats" />
      <SummaryCard icon={<Wallet />} color="green" label="Wallet balance" value="₦240,000" hint="Last top-up 3 Nov" />
    </div>
  ),
};

export const SummaryWithActions: S = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
      <SummaryCard label="Organisations" value={3} hint="Managed from this account" actions={<Button leadingIcon={<Plus />}>Add organisation</Button>} />
      <SummaryCard label="Full seats" value={5} hint="1 seat available" actions={<Button leadingIcon={<Plus />}>Add users</Button>} />
      <SummaryCard label="Employee records" value={100} hint="Self-service included" actions={<><Button leadingIcon={<Plus />}>Employees</Button><Button variant="outline" leadingIcon={<Plus />}>Self-service</Button></>} />
    </div>
  ),
};

export const Cards: S = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
      <Card title="Organisation details" description="Legal name, tax and registered address." actions={<Button variant="secondary" size="sm">Edit</Button>} divided>
        <KeyValueList items={[{ label: 'Legal name', value: 'Wragby Group Ltd' }, { label: 'TIN', value: '12345678-0001' }]} />
      </Card>
      <Card variant="inset" title="Billing and renewal">
        <KeyValueList items={[
          { label: 'Started', value: '9 Aug 2026' },
          { label: 'Billing cycle', value: 'Annual' },
          { label: 'Renewal', value: <StatusPill tone="success">Automatic</StatusPill> },
        ]} />
      </Card>
    </div>
  ),
};
