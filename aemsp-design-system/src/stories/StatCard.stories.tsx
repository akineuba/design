import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { StatCard } from '../components/layout';
import { NumberValue } from '../components/primitives';

const meta: Meta<typeof StatCard> = {
  title: 'Components/StatCard', component: StatCard, tags: ['autodocs'],
  args: { label: 'Organisations', value: '3,232', icon: 'hierarchy', tone: 'indigo' },
  parameters: { docs: { description: { component: 'Stat card from the dashboard. The value is neutral navy; the **tone colours only the icon tile**. Add a `trend` so the number has context. Values ≥ 10,000 are abbreviated with the exact value on hover.' } } },
  decorators: [(S) => <div style={{ maxWidth: 280 }}><S /></div>],
};
export default meta;
type S = StoryObj<typeof StatCard>;
export const Plain: S = {};
export const TrendUp: S = { args: { label: 'Amount used', value: <NumberValue value={256298} money />, icon: 'hand-money', tone: 'green', trend: { value: '12.4%', direction: 'up' } } };
export const TrendDown: S = { args: { label: 'Active OEMs', value: <NumberValue value={398222} />, icon: 'line-graph', tone: 'amber', trend: { value: '3.1%', direction: 'down' } } };
export const TrendUpIsBad: S = { args: { label: 'Overdue invoices', value: '18', icon: 'warning', tone: 'gray', trend: { value: '4', direction: 'up', good: false, period: 'since last week' } } };
export const WithHint: S = { args: { label: 'Roles', value: '34', icon: 'admin', tone: 'gray', hint: '6 custom roles' } };
export const Loading: S = { args: { loading: true } };
export const Row: S = {
  decorators: [(S) => <div style={{ maxWidth: 'none' }}><S /></div>],
  render: () => (
    <div className="ae-stat-row" style={{ minWidth: 900 }}>
      <StatCard label="Amount used" value={<NumberValue value={2562988} money />} icon="hand-money" tone="green" trend={{ value: '12.4%', direction: 'up' }} />
      <StatCard label="Organisations" value="3,232" icon="hierarchy" tone="indigo" trend={{ value: '48', direction: 'up', period: 'new this month' }} />
      <StatCard label="Total OEMs" value={<NumberValue value={398222} />} icon="line-graph" tone="amber" trend={{ value: '3.1%', direction: 'down' }} />
      <StatCard label="Roles" value="34" icon="admin" tone="gray" hint="6 custom roles" />
      <StatCard label="Users" value="1,204" icon="users-group" tone="purple" trend={{ value: '2.6%', direction: 'up' }} />
    </div>
  ),
};
