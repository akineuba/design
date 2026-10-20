import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { Select } from './Select';
import { FIGMA } from '../../patterns/demo-data';

const priorities = [
  { value: 'low', label: 'Low' },
  { value: 'normal', label: 'Normal' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent', disabled: true },
];
const customers = [
  { value: 'daniel', label: 'Daniel Olubode' },
  { value: 'wragby', label: 'Wragby Solutions' },
  { value: 'akintola', label: 'Akintola Emmanuel' },
  { value: 'beam', label: 'Beam Energy' },
];

const meta = {
  title: 'Components/Select',
  component: Select,
  args: { label: 'Priority', placeholder: 'Select priority', options: priorities },
  argTypes: { size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] } },
  decorators: [(Story) => <div className="w-field pb-12"><Story /></div>],
  parameters: {
    design: { url: FIGMA + '7092-1508' },
    docs: { description: { component: 'Dropdown field from New Consumption Requisition and the item form, with the open menu from the accounting customer picker. Keyboard: arrows, Home, End, Enter, Space, Escape.' } },
  },
} satisfies Meta<typeof Select>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Placeholder: Story = {};
export const Selected: Story = { args: { defaultValue: 'normal' } };
export const Required: Story = { args: { required: true, label: 'Delivery Location', placeholder: 'Select delivery location', options: [{ value: 'ho', label: 'Head Office' }, { value: 'mw', label: 'Maintenance Workshop' }] } };
export const WithError: Story = { args: { required: true, error: 'Choose a priority to continue.' } };
export const Disabled: Story = { args: { disabled: true, defaultValue: 'high' } };
export const WithHint: Story = { args: { hint: 'Urgent needs approval from a manager.' } };

/** Open menu with an "Add New" action, as in the accounting customer picker. */
export const OpenWithAddNew: Story = {
  args: { label: 'Customer', placeholder: 'Select customer', options: customers, menuAction: { label: 'Add New', onSelect: () => {} } },
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await userEvent.click(c.getByRole('combobox'));
    await expect(c.getByRole('listbox')).toBeVisible();
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Select {...args} size="sm" label="Small (34px)" />
      <Select {...args} size="md" label="Medium (40px)" />
      <Select {...args} size="lg" label="Large (46px)" />
    </div>
  ),
};
