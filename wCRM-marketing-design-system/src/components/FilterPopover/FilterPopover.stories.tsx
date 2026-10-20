import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FilterIcon } from '../../icons';
import { Button } from '../Button';
import { IconButton } from '../IconButton';
import { Select } from '../Select';
import { FilterCheckboxList, FilterPopover } from './FilterPopover';

const accounts = [
  { value: 'hq', label: 'Wragby_hq' },
  { value: 'ws', label: '@wragbysolutions' },
  { value: 'wbs', label: 'Wragby Business Solutions' },
  { value: 'yt', label: 'Wragby Solutions' },
  { value: 'x', label: '@wragby_x' },
];

const meta = {
  title: 'Components/FilterPopover',
  component: FilterPopover,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: { description: { component: 'Toolbar filter dropdowns. Figma: `filter-popup` (1233:5729, checkbox list + Clear All / Apply), `dropdown-panel` (1228:25996, searchable list) and `filters` (1036:6256, stacked selects). The trigger shows the active state while filters are applied.' } },
  },
  args: { trigger: <button type="button">Filters</button>, children: null },
} satisfies Meta<typeof FilterPopover>;
export default meta;
type Story = StoryObj<typeof meta>;

function CheckboxFilter({ open, searchable }: { open?: boolean; searchable?: boolean }) {
  const [draft, setDraft] = useState(['hq', 'ws']);
  const [applied, setApplied] = useState(['hq', 'ws']);
  return (
    <div className="flex h-modal-sm justify-end">
      <FilterPopover
        trigger={<IconButton variant="outline" active={applied.length > 0} aria-label={`Filter accounts (${applied.length} applied)`} icon={<FilterIcon />} />}
        onClear={() => setDraft([])}
        onApply={() => setApplied(draft)}
        {...(open ? { open: true } : {})}
      >
        <FilterCheckboxList label="Accounts" options={accounts} value={draft} onChange={setDraft} searchable={searchable} searchPlaceholder="Search accounts..." />
      </FilterPopover>
    </div>
  );
}

export const CheckboxList: Story = { render: () => <CheckboxFilter open /> };
export const Searchable: Story = { render: () => <CheckboxFilter open searchable /> };
export const Closed: Story = { render: () => <CheckboxFilter /> };

export const StackedSelects: Story = {
  render: () => (
    <div className="flex h-modal-md justify-end">
      <FilterPopover
        size="md"
        open
        trigger={<Button variant="outline" leadingIcon={<FilterIcon />}>Filter</Button>}
      >
        <Select label="Account" options={accounts} />
        <Select label="Date" defaultValue="today" options={[{ value: 'today', label: 'Today' }, { value: '7d', label: 'Last 7 days' }, { value: '30d', label: 'Last 30 days' }]} />
        <Select label="Status" options={[{ value: 'published', label: 'Published' }, { value: 'scheduled', label: 'Scheduled' }, { value: 'failed', label: 'Failed' }]} />
      </FilterPopover>
    </div>
  ),
};
