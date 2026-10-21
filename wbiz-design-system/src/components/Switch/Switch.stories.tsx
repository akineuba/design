import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  args: { 'aria-label': 'Enable feature' },
  parameters: { docs: { description: { component: 'On/off switch from the accounting settings screens. Use for settings that apply immediately; use a checkbox inside forms that are saved later.' } } },
} satisfies Meta<typeof Switch>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Off: Story = {};
export const On: Story = { args: { defaultChecked: true } };
export const DisabledOff: Story = { args: { disabled: true } };
export const DisabledOn: Story = { args: { disabled: true, defaultChecked: true } };
export const WithLabel: Story = {
  args: { 'aria-label': undefined, label: 'Mark account as active', description: 'Inactive accounts are hidden from journals and reports.', defaultChecked: true },
};
/** Inside table rows (Chart of Accounts status column). */
export const Small: Story = { args: { size: 'sm', defaultChecked: true } };
