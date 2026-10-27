import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { useState } from 'react';
import { ColumnCustomizer, ColumnCustomizerPanel, type ColumnCustomizerValue } from './ColumnCustomizer';
import { FIGMA } from '../../patterns/demo-data';

const columns = [
  { key: 'name', label: 'Account name', locked: true },
  { key: 'code', label: 'Account Code' },
  { key: 'opening', label: 'Opening Balance' },
  { key: 'debit', label: 'Debit' },
  { key: 'credit', label: 'Credit' },
  { key: 'balance', label: 'Balance' },
  { key: 'closing', label: 'Closing Balance' },
];
const options = [
  { key: 'inactive', label: 'Include Inactive Accounts' },
  { key: 'zero', label: 'Hide Zero-Balance Accounts' },
  { key: 'subtotals', label: 'Show Subtotals' },
];
const initial: ColumnCustomizerValue = { columns: columns.map((c) => c.key), options: ['subtotals'] };

const meta = {
  title: 'Components/ColumnCustomizer',
  component: ColumnCustomizer,
  args: { columns, options, value: initial, onChange: () => {} },
  decorators: [(Story) => <div className="flex min-h-screen w-full justify-end p-4"><Story /></div>],
  parameters: {
    layout: 'fullscreen',
    design: { url: FIGMA + '896-17474' },
    docs: {
      description: {
        component:
          '"Customize Columns" button and its popup. Tick the columns to show and any extra options, then Apply; Cancel, Escape or an outside click discards changes. ' +
          'Locked columns (the record name) stay visible, and the last visible column cannot be unticked. ' +
          'The trigger is always a primary, icon-only button (columns icon); "Customize Columns" is its accessible name and tooltip.',
      },
    },
  },
} satisfies Meta<typeof ColumnCustomizer>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Button: Story = {};
export const Open: Story = {
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await userEvent.click(c.getByRole('button', { name: /customize columns/i }));
    await expect(c.getByRole('dialog')).toBeVisible();
  },
};

/** Popup content on its own (Figma: Edit Column). */
export const Panel: Story = {
  decorators: [(Story) => <div className="p-4"><Story /></div>],
  render: () => <ColumnCustomizerPanel columns={columns} options={options} value={initial} onApply={() => {}} onCancel={() => {}} />,
};

export const ColumnsOnly: Story = {
  decorators: [(Story) => <div className="p-4"><Story /></div>],
  render: () => <ColumnCustomizerPanel columns={columns.slice(0, 5)} value={{ columns: ['name', 'code', 'debit'], options: [] }} onApply={() => {}} onCancel={() => {}} />,
};

export const Interactive: Story = {
  render: (args) => {
    const [value, setValue] = useState(initial);
    return (
      <div className="flex flex-col items-end gap-3">
        <ColumnCustomizer {...args} value={value} onChange={setValue} />
        <p className="font-sans text-xs text-fg-muted">Visible: {value.columns.join(', ')} · Options: {value.options.join(', ') || 'none'}</p>
      </div>
    );
  },
};
