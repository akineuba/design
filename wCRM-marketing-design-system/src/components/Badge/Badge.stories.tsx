import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: { children: 'Active', tone: 'success' },
  argTypes: { tone: { control: 'inline-radio', options: ['success', 'warning', 'danger', 'info', 'neutral', 'brand'] } },
  parameters: { docs: { description: { component: 'Figma: `status-badge` (1126:16406) and the Active/Inactive/Failed pills in Social media, User management and Email tables. Full radius, 6px dot, 12–13px semibold label.' } } },
} satisfies Meta<typeof Badge>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Tones: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge tone="success">Active</Badge>
      <Badge tone="info">Scheduled</Badge>
      <Badge tone="warning">Spam report</Badge>
      <Badge tone="danger">Failed</Badge>
      <Badge tone="neutral">Inactive</Badge>
      <Badge tone="brand">Marketing</Badge>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Badge size="sm" tone="success">Success</Badge>
      <Badge size="md" tone="success">Success</Badge>
    </div>
  ),
};

export const WithoutDot: Story = { args: { dot: false, tone: 'brand', children: 'Marketing' } };
