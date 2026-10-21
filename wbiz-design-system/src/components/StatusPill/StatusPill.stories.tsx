import type { Meta, StoryObj } from '@storybook/react';
import { StatusPill } from './StatusPill';
import { FIGMA } from '../../patterns/demo-data';

const meta = {
  title: 'Components/StatusPill',
  component: StatusPill,
  args: { tone: 'warning', children: 'Pending Approval' },
  argTypes: { tone: { control: 'inline-radio', options: ['warning', 'info', 'neutral', 'success', 'error'] } },
  parameters: {
    design: { url: FIGMA + '7053-5433' },
    docs: { description: { component: 'Status label for table rows and record headers: 22px tall, 10px side padding, 6px radius, Roboto Semibold 12 on a tinted fill. Pick the tone by meaning (waiting, in progress, inactive, done, failed), not by colour. The error tone is derived.' } },
  },
} satisfies Meta<typeof StatusPill>;
export default meta;
type Story = StoryObj<typeof meta>;

export const PendingApproval: Story = { args: { tone: 'warning', children: 'Pending Approval' } };
export const InProgress: Story = { args: { tone: 'info', children: 'Awaiting Payment' } };
export const Neutral: Story = { args: { tone: 'neutral', children: 'Partially Paid' } };
export const Completed: Story = { args: { tone: 'success', children: 'Paid' } };
export const Rejected: Story = { args: { tone: 'error', children: 'Rejected' } };

export const AllTones: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <StatusPill tone="warning">Pending Approval</StatusPill>
      <StatusPill tone="info">Awaiting Payment</StatusPill>
      <StatusPill tone="neutral">Partially Paid</StatusPill>
      <StatusPill tone="success">Paid</StatusPill>
      <StatusPill tone="error">Overdue</StatusPill>
    </div>
  ),
};
