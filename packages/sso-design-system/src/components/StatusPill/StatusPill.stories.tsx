import type { Meta, StoryObj } from '@storybook/react';
import { StatusPill } from './StatusPill';
import { Chip, Tag } from '../Tag/Tag';

const meta: Meta<typeof StatusPill> = {
  title: 'Components/Status, Tags & Chips',
  component: StatusPill,
  tags: ['autodocs'],
  args: { tone: 'success', children: 'Active' },
};
export default meta;
type S = StoryObj<typeof StatusPill>;

export const Playground: S = {};

export const StatusSet: S = {
  name: 'Status set (shared with ERP)',
  render: () => (
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
      <StatusPill tone="success">Active</StatusPill>
      <StatusPill tone="success">Automatic</StatusPill>
      <StatusPill tone="warning">Pending</StatusPill>
      <StatusPill tone="error">Expired</StatusPill>
      <StatusPill tone="info">Trial</StatusPill>
      <StatusPill tone="neutral">Inactive</StatusPill>
      <StatusPill tone="success" dot>Connected</StatusPill>
      <StatusPill tone="error" dot>Failed</StatusPill>
    </div>
  ),
};

export const TagsAndChips: S = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <Tag>Primary</Tag>
        <Tag>3 / 3 used</Tag>
        <Tag tone="neutral">Default</Tag>
      </div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {['Accounting', 'Inventory', 'Procurement', 'HR', 'Configurable approvals'].map((f) => (
          <Chip key={f} kind="feature">{f}</Chip>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        <Chip kind="removable">Employee</Chip>
        <Chip kind="removable">Accountant</Chip>
        <Chip>Plain chip</Chip>
      </div>
    </div>
  ),
};
