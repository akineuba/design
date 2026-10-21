import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { useState } from 'react';
import { Select } from './Select';
import { Modal } from '../Modal';
import { Input } from '../Input';
import { Button } from '../Button';
import { CloseCircleIcon, TickCircleIcon } from '../../icons';
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
    docs: { description: { component: 'Dropdown field for picking one value from a known list. Every dropdown is searchable (the menu opens with a search box; typing on the closed field starts a search) and record lists end with "Add New", which opens a centred quick-add modal so the user never leaves the screen. Keyboard: arrows, Home, End, Enter, Escape.' } },
  },
} satisfies Meta<typeof Select>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Placeholder: Story = {};
export const Selected: Story = { args: { defaultValue: 'normal' } };
export const Required: Story = { args: { required: true, label: 'Account Type', placeholder: 'Select account type', options: [{ value: 'asset', label: 'Asset' }, { value: 'liability', label: 'Liability' }] } };
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

/** Search narrows the list; type "Zen" to see the no-match state with a prefilled Add New. */
export const Searching: Story = {
  args: { label: 'Customer', placeholder: 'Select customer', options: customers, menuAction: { label: 'Add New', onSelect: () => {} } },
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await userEvent.click(c.getByRole('combobox'));
    await userEvent.type(c.getByRole('searchbox'), 'wr');
  },
};

/** Short fixed list where search adds nothing. */
export const NotSearchable: Story = { args: { label: 'Salutation', placeholder: '', searchable: false, options: [{ value: 'mr', label: 'Mr' }, { value: 'mrs', label: 'Mrs' }, { value: 'ms', label: 'Ms' }] } };

/**
 * Add a missing value without leaving the screen: "Add New" opens a centred quick-add modal, the
 * search text prefills the name, and on Save the new customer is added and selected.
 */
export const AddNewWithoutLeaving: Story = {
  render: () => {
    const [options, setOptions] = useState(customers);
    const [value, setValue] = useState<string | null>(null);
    const [draft, setDraft] = useState<string | null>(null);
    const save = () => {
      if (!draft?.trim()) return;
      const v = draft.trim().toLowerCase().replace(/\s+/g, '-');
      setOptions([...options, { value: v, label: draft.trim() }]);
      setValue(v);
      setDraft(null);
    };
    return (
      <>
        <Select
          label="Customer"
          placeholder="Select customer"
          options={options}
          value={value}
          onChange={setValue}
          menuAction={{ label: 'Add New', onSelect: (q) => setDraft(q) }}
        />
        <Modal
          open={draft !== null}
          onClose={() => setDraft(null)}
          closeOnBackdrop={false}
          title="New Customer"
          description="Only the essentials. Add the rest from Sales › Customers later."
          footer={
            <>
              <Button variant="outline" leadingIcon={<CloseCircleIcon />} onClick={() => setDraft(null)}>Cancel</Button>
              <Button leadingIcon={<TickCircleIcon />} onClick={save} disabled={!draft?.trim()}>Save</Button>
            </>
          }
        >
          <Input label="Display Name" required autoFocus value={draft ?? ''} onChange={(e) => setDraft(e.target.value)} />
          <Input label="Email" type="email" />
        </Modal>
      </>
    );
  },
};
