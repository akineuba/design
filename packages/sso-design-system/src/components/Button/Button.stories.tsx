import type { Meta, StoryObj } from '@storybook/react';
import { Download, Plus, Trash2, X } from 'lucide-react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: { children: 'Add tenant', variant: 'primary', size: 'md' },
};
export default meta;
type S = StoryObj<typeof Button>;

export const Playground: S = {};

export const Variants: S = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Button leadingIcon={<Plus />}>Add tenant</Button>
      <Button variant="secondary" leadingIcon={<Download />}>Export</Button>
      <Button variant="outline">Cancel</Button>
      <Button variant="tertiary">Clear filters</Button>
      <Button variant="destructive">Cancel renewal</Button>
    </div>
  ),
};

export const Sizes: S = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button iconOnly aria-label="Close" variant="secondary"><X /></Button>
    </div>
  ),
};

export const States: S = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Button loading>Saving</Button>
      <Button disabled>Disabled</Button>
      <Button variant="secondary" disabled>Disabled</Button>
      <Button variant="destructive" leadingIcon={<Trash2 />} disabled>Delete</Button>
    </div>
  ),
};
