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
    title: 'Approval & Reservation',
    divided: true,
    children: (
      <>
        <Select label="Insufficient-stock approval policy" defaultValue="warn" options={[{ value: 'warn', label: 'Allow with warning' }, { value: 'block', label: 'Block' }]} />
        <Select label="Reservation policy" defaultValue="auto" options={[{ value: 'auto', label: 'Automatic on final approval' }, { value: 'manual', label: 'Manual' }]} />
        <Input label="Reservation expiry period (days, optional)" defaultValue="14" />
      </>
    ),
  },
};

export const WithDescriptionAndAction: Story = {
  args: {
    title: 'Store-level Consumption Account Overrides',
    description: 'Leave an account blank to use the purpose and category mapping.',
    actions: <Button variant="secondary" size="sm">Reset all</Button>,
    children: <p className="font-sans text-sm text-fg-muted">Table goes here.</p>,
  },
};
