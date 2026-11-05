import type { Meta, StoryObj } from '@storybook/react';
import { Bell, Download, Plus, Trash2 } from 'lucide-react';
import { Button, IconButton } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: { children: 'Add user', variant: 'primary', size: 'md' },
};
export default meta;
type S = StoryObj<typeof Button>;

export const Playground: S = {};

export const Variants: S = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Button iconLeft={<Plus />}>Add tenant</Button>
      <Button variant="secondary">Transaction history</Button>
      <Button variant="outline" iconLeft={<Plus />}>Buy entity</Button>
      <Button variant="ghost" iconLeft={<Download />}>Export</Button>
      <Button variant="danger">Cancel renewal</Button>
      <Button variant="link">Manage seats</Button>
    </div>
  ),
};

export const Sizes: S = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const States: S = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Button loading>Saving</Button>
      <Button disabled>Disabled</Button>
      <Button variant="outline" disabled>Disabled</Button>
      <Button variant="danger" iconLeft={<Trash2 />} disabled>Delete</Button>
    </div>
  ),
};

export const IconButtons: S = {
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      <IconButton label="Notifications" icon={<Bell />} />
      <IconButton label="Notifications (unread)" icon={<Bell />} dot />
      <IconButton label="Download" icon={<Download />} variant="outline" />
      <IconButton label="Delete" icon={<Trash2 />} variant="ghost" />
    </div>
  ),
};
