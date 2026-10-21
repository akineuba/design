import type { Meta, StoryObj } from '@storybook/react';
import { PageHeader } from './PageHeader';
import { Button } from '../Button';
import { PlusIcon, TickCircleIcon } from '../../icons';
import { FIGMA } from '../../patterns/demo-data';

const meta = {
  title: 'Components/PageHeader',
  component: PageHeader,
  args: { title: 'Customers', description: 'People and businesses you sell to.' },
  decorators: [(Story) => <div className="w-full"><Story /></div>],
  parameters: { layout: 'padded', design: { url: FIGMA + '7053-5433' } },
} satisfies Meta<typeof PageHeader>;
export default meta;
type Story = StoryObj<typeof meta>;

export const WithAction: Story = { args: { actions: <Button leadingIcon={<PlusIcon />}>Add New</Button> } };
export const WithBackLink: Story = {
  args: { title: 'New Invoice', description: 'Bill a customer for goods or services.', back: { label: 'Invoices', href: '#' } },
};
export const SettingsPage: Story = {
  args: { title: 'Inventory Settings', description: 'Configure approval, reservation and posting behaviour.', actions: <Button size="lg" leadingIcon={<TickCircleIcon />}>Save Settings</Button> },
};
export const TitleOnly: Story = { args: { description: undefined } };
