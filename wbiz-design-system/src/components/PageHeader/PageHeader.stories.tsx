import type { Meta, StoryObj } from '@storybook/react';
import { PageHeader } from './PageHeader';
import { Button } from '../Button';
import { PlusIcon, TickCircleIcon } from '../../icons';
import { FIGMA } from '../../patterns/demo-data';

const meta = {
  title: 'Components/PageHeader',
  component: PageHeader,
  args: { title: 'Consumption Requisitions', description: 'Request, approve, reserve and issue consumable stock.' },
  decorators: [(Story) => <div className="w-full"><Story /></div>],
  parameters: { layout: 'padded', design: { url: FIGMA + '7053-5433' } },
} satisfies Meta<typeof PageHeader>;
export default meta;
type Story = StoryObj<typeof meta>;

export const WithAction: Story = { args: { actions: <Button leadingIcon={<PlusIcon />}>New Requisition</Button> } };
export const WithBackLink: Story = {
  args: { title: 'New Consumption Requisition', description: 'Create a request for consumable inventory.', back: { label: 'Consumption Requisitions', href: '#' } },
};
export const SettingsPage: Story = {
  args: { title: 'Consumption Requisition Settings', description: 'Configure consumable approval, reservation and posting behavior.', actions: <Button size="lg" leadingIcon={<TickCircleIcon />}>Save Settings</Button> },
};
export const TitleOnly: Story = { args: { description: undefined } };
