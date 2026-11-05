import type { Meta, StoryObj } from '@storybook/react';
import { Building2, CreditCard, Layers, Package, Plus, Users } from 'lucide-react';
import { Card, CardHeader, IconTile, KeyValueList, StatCard } from './Card';
import { Button } from '../Button/Button';
import { StatusPill } from '../StatusPill/StatusPill';

const meta: Meta<typeof StatCard> = { title: 'Components/Card', component: StatCard, tags: ['autodocs'] };
export default meta;
type S = StoryObj<typeof StatCard>;

export const Stat: S = { args: { label: 'Active users', value: 5, helper: 'of 5 purchased seats' } };

export const StatWithIconTile: S = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
      <StatCard icon={<Building2 />} iconTone="blue" label="Tenants" description="Registered organisations" value={93} helper="91 active · 2 inactive" href="#" />
      <StatCard icon={<Package />} iconTone="teal" label="Products" description="Global product catalogue" value={11} href="#" />
      <StatCard icon={<CreditCard />} iconTone="green" label="Commercial profiles" description="Subscription service" value={45} href="#" />
      <StatCard icon={<Layers />} iconTone="amber" label="Subscription plans" description="Draft + published" value={13} href="#" />
    </div>
  ),
};

export const IconTiles: S = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      {(['blue', 'teal', 'green', 'amber', 'red', 'slate'] as const).map((t) => <IconTile key={t} tone={t} icon={<Layers />} />)}
      <IconTile tone="blue" size="sm" icon={<Layers />} />
      <IconTile tone="blue" size="lg" icon={<Layers />} />
    </div>
  ),
};

export const StatWithActions: S = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
      <StatCard label="Entities" value={3} helper="Managed under this tenant" actions={<Button iconLeft={<Plus />}>Add entity</Button>} />
      <StatCard label="Full seats" value={5} helper="1 seat available" actions={<Button iconLeft={<Plus />}>Add users</Button>} />
      <StatCard label="Employee records" value={100} helper="Self-service included" actions={<><Button iconLeft={<Plus />}>Employees</Button><Button variant="outline" iconLeft={<Plus />}>Self-service</Button></>} />
    </div>
  ),
};

export const Variants: S = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
      <Card>
        <CardHeader title="Raised card" subtitle="Default. White, border, soft shadow." />
        <p style={{ margin: 0 }}>Use for page-level content blocks.</p>
      </Card>
      <Card variant="inset">
        <p style={{ margin: '0 0 12px', fontWeight: 700, color: 'var(--sso-color-fg-ink)' }}>Billing and renewal</p>
        <KeyValueList items={[
          { label: 'Started', value: '9 Aug 2026' },
          { label: 'Billing cycle', value: 'Annual' },
          { label: 'Renewal', value: <StatusPill tone="success">Automatic</StatusPill> },
        ]} />
      </Card>
    </div>
  ),
};
