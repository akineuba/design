import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Checkbox } from './Checkbox';
import { FIGMA } from '../../patterns/demo-data';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  args: { label: 'Include Inactive Accounts' },
  parameters: {
    design: { url: FIGMA + '896-17613' },
    docs: { description: { component: '20px checkbox from the accounting tables and the column picker. Unticked, ticked, indeterminate ("select all" when only some rows are ticked) and disabled.' } },
  },
} satisfies Meta<typeof Checkbox>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Unchecked: Story = {};
export const Checked: Story = { args: { defaultChecked: true } };
export const Indeterminate: Story = { args: { indeterminate: true, label: 'Select all rows' } };
export const Disabled: Story = { args: { disabled: true } };
export const DisabledChecked: Story = { args: { disabled: true, defaultChecked: true, label: 'Account name (always shown)' } };
export const WithoutLabel: Story = { args: { label: undefined, 'aria-label': 'Select row' } };

export const States: Story = {
  render: () => {
    const [v, setV] = useState(false);
    return (
      <div className="flex flex-col gap-5">
        <Checkbox label="Unchecked" />
        <Checkbox label="Checked" defaultChecked />
        <Checkbox label="Indeterminate" indeterminate />
        <Checkbox label="Disabled" disabled />
        <Checkbox label="Disabled and checked" disabled defaultChecked />
        <Checkbox label={`Interactive: ${v ? 'on' : 'off'}`} checked={v} onChange={(e) => setV(e.target.checked)} />
      </div>
    );
  },
};
