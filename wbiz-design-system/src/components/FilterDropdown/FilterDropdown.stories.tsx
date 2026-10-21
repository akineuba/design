import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FilterDropdown, FilterField } from './FilterDropdown';
import { Select } from '../Select';
import { Input } from '../Input';
import { FIGMA } from '../../patterns/demo-data';

const Fields = () => (
  <>
    <FilterField label="Dimension:">
      <Select aria-label="Dimension" size="sm" placeholder="All dimensions" options={[{ value: 'branch', label: 'Branch' }, { value: 'state', label: 'State' }]} />
    </FilterField>
    <FilterField label="Status:">
      <Select aria-label="Status" size="sm" placeholder="All statuses" options={[{ value: 'pending', label: 'Pending Approval' }, { value: 'awaiting', label: 'Awaiting Payment' }, { value: 'paid', label: 'Paid' }]} />
    </FilterField>
    <FilterField label="Date:">
      <Input aria-label="Date" size="sm" type="date" />
    </FilterField>
  </>
);

const meta = {
  title: 'Components/FilterDropdown',
  component: FilterDropdown,
  args: { children: <Fields />, onApply: () => {}, onReset: () => {} },
  decorators: [(Story) => <div className="flex min-h-dialog w-full items-start justify-start p-4"><Story /></div>],
  parameters: {
    layout: 'fullscreen',
    design: { url: FIGMA + '191-3274' },
    docs: { description: { component: '"Filters" button from the accounting table toolbars (three-line icon, no border) plus the filter panel. Sits next to the search field. The trigger turns blue and shows a count when filters are applied. Escape or an outside click closes it. For report pages use `FilterBar`.' } },
  },
} satisfies Meta<typeof FilterDropdown>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = {};
export const Open: Story = { args: { open: true } };
export const WithActiveFilters: Story = { args: { activeCount: 2 } };

export const Interactive: Story = {
  render: (args) => {
    const [count, setCount] = useState(0);
    return <FilterDropdown {...args} activeCount={count} onApply={() => setCount(2)} onReset={() => setCount(0)} />;
  },
};
