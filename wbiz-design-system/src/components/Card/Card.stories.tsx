import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Select } from '../Select';
import { Input } from '../Input';
import { Button } from '../Button';
import { FIGMA } from '../../patterns/demo-data';

const meta = {
  title: 'Components/Card',
  component: Card,
  decorators: [(Story) => <div className="w-full max-w-dialog"><Story /></div>],
  parameters: { layout: 'padded', design: { url: FIGMA + '7053-6444' } },
} satisfies Meta<typeof Card>;
export default meta;
type Story = StoryObj<typeof meta>;

export const SettingsSection: Story = {
  args: {
    title: 'Posting defaults',
    divided: true,
    children: (
      <>
        <Select label="Default revenue account" defaultValue="4001" options={[{ value: '4001', label: '4001 · Sales Revenue' }, { value: '4002', label: '4002 · Service Revenue' }]} />
        <Select label="When a journal is unbalanced" defaultValue="block" options={[{ value: 'warn', label: 'Allow with warning' }, { value: 'block', label: 'Block posting' }]} />
        <Input label="Lock period after (days, optional)" defaultValue="14" />
      </>
    ),
  },
};

export const WithDescriptionAndAction: Story = {
  args: {
    title: 'Branch-level account overrides',
    description: 'Leave an account blank to use the company default.',
    actions: <Button variant="secondary" size="sm">Reset all</Button>,
    children: <p className="font-sans text-sm text-fg-muted">Table goes here.</p>,
  },
};
