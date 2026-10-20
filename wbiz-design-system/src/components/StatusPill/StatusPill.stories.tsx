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
    docs: { description: { component: 'Status labels from the Consumption Requisitions table: 22px tall, 10px side padding, 6px radius, Roboto Semibold 12 on a tinted fill. The error tone is derived.' } },
  },
} satisfies Meta<typeof StatusPill>;
export default meta;
type Story = StoryObj<typeof meta>;

export const PendingApproval: Story = { args: { tone: 'warning', children: 'Pending Approval' } };
export const ReadyForIssue: Story = { args: { tone: 'info', children: 'Ready for Issue' } };
export const PartiallyIssued: Story = { args: { tone: 'neutral', children: 'Partially Issued' } };
export const Completed: Story = { args: { tone: 'success', children: 'Completed' } };
export const Rejected: Story = { args: { tone: 'error', children: 'Rejected' } };

export const AllTones: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <StatusPill tone="warning">Pending Approval</StatusPill>
      <StatusPill tone="info">Ready for Issue</StatusPill>
      <StatusPill tone="neutral">Partially Issued</StatusPill>
      <StatusPill tone="success">Completed</StatusPill>
      <StatusPill tone="error">Rejected</StatusPill>
    </div>
  ),
};
