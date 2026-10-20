import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { useState } from 'react';
import { FilterCheckboxList, FilterPopover } from '../FilterPopover';
import { FilterButton } from './FilterButton';

const meta = {
  title: 'Components/FilterButton',
  component: FilterButton,
  tags: ['autodocs'],
  args: { label: 'Filter' },
  argTypes: { display: { control: 'inline-radio', options: ['labelled', 'icon', 'responsive'] } },
  parameters: {
    docs: {
      description: {
        component:
          'Figma: desktop `filter-button` (1230:26010) — 40px, transparent fill, 1px `border-default`, radius 8, 10/16 padding, 8px gap, 20px muted icon, 14/500 secondary label. ' +
          'Mobile `Filter button` (1931:24248) — 40 × 40 white square with the 18px vuesax funnel; active (1931:24486) uses `brand-primary-subtle` fill and a `brand-primary` border.',
      },
    },
  },
} satisfies Meta<typeof FilterButton>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Labelled: Story = {};
export const LabelledActive: Story = { args: { count: 2 } };
export const IconOnly: Story = { args: { display: 'icon' } };
export const IconOnlyActive: Story = {
  args: { display: 'icon', count: 3 },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('button', { name: 'Filter, 3 applied' })).toBeInTheDocument();
  },
};
export const Disabled: Story = { args: { disabled: true } };

/** Labelled from 640px up, icon-only below. Resize the canvas to see it collapse. */
export const Responsive: Story = { args: { display: 'responsive', count: 1 } };

export const States: Story = {
  render: () => (
    <div className="grid grid-cols-3 items-center gap-x-6 gap-y-4">
      {['Default', 'Applied (2)', 'Disabled'].map((h) => (
        <span key={h} className="text-overline text-text-secondary">{h}</span>
      ))}
      <FilterButton />
      <FilterButton count={2} />
      <FilterButton disabled />
      <FilterButton display="icon" />
      <FilterButton display="icon" count={2} />
      <FilterButton display="icon" disabled />
    </div>
  ),
};

const accounts = [
  { value: 'hq', label: 'Wragby_hq' },
  { value: 'ws', label: '@wragbysolutions' },
  { value: 'wbs', label: 'Wragby Business Solutions' },
];

/** The button is the trigger for `FilterPopover`; the count reflects applied (not draft) filters. */
export const WithPopover: Story = {
  render: () => {
    const [draft, setDraft] = useState<string[]>(['hq']);
    const [applied, setApplied] = useState<string[]>(['hq']);
    return (
      <div className="flex h-modal-sm items-start gap-3">
        <FilterPopover align="start" trigger={<FilterButton count={applied.length} />} onClear={() => setDraft([])} onApply={() => setApplied(draft)}>
          <FilterCheckboxList label="Accounts" options={accounts} value={draft} onChange={setDraft} />
        </FilterPopover>
        <FilterPopover align="start" trigger={<FilterButton display="icon" count={applied.length} />} onClear={() => setDraft([])} onApply={() => setApplied(draft)}>
          <FilterCheckboxList label="Accounts" options={accounts} value={draft} onChange={setDraft} />
        </FilterPopover>
      </div>
    );
  },
};
