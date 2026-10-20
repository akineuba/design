import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within, screen } from '@storybook/test';
import { Select } from './Select';

const accounts = [
  { value: 'all', label: 'All' },
  { value: 'fb', label: 'Facebook Page' },
  { value: 'ig', label: 'Instagram Business' },
  { value: 'li', label: 'LinkedIn Company' },
  { value: 'x', label: 'X Account', disabled: true },
];
const periods = [
  { value: '24h', label: 'First 24 hours' },
  { value: '48h', label: 'First 48 hours' },
  { value: 'week', label: 'First week' },
  { value: 'month', label: 'First month' },
];

const meta = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  args: { options: periods, label: 'Reporting window', placeholder: 'Select an option' },
  decorators: [(S, ctx) => (ctx.parameters.wide ? <S /> : <div className="w-field-sm"><S /></div>)],
  parameters: { docs: { description: { component: 'Figma: `Selector Dropdown` (1147:17013, 1225:25729) and form selects in the Filters panels ("Select an option"). Keyboard: Space/Enter opens, arrows move, type-ahead, Esc closes.' } } },
} satisfies Meta<typeof Select>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Placeholder: Story = {};
export const WithValue: Story = { args: { defaultValue: '24h' } };
export const ToolbarPrefix: Story = { args: { options: accounts, prefix: 'Accounts:', defaultValue: 'all', label: 'Accounts', hideLabel: true, size: 'md' } };
export const Required: Story = { args: { required: true, helperText: 'Used for the performance chart.' } };
export const ErrorState: Story = { name: 'Error', args: { error: 'Choose a reporting window.', required: true } };
export const Disabled: Story = { args: { disabled: true, defaultValue: 'week', helperText: 'Locked while the campaign is running.' } };

export const Open: Story = {
  args: { defaultValue: '24h' },
  parameters: { docs: { story: { height: '260px' } } },
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole('combobox'));
    await expect(await screen.findByRole('listbox')).toBeInTheDocument();
  },
};
