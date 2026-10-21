import type { Meta, StoryObj } from '@storybook/react';
import { FilterBar, FilterBarField } from './FilterBar';
import { Select } from '../Select';
import { FIGMA } from '../../patterns/demo-data';

const opt = (...l: string[]) => l.map((v) => ({ value: v, label: v }));

const DateField = () => (
  <FilterBarField>
    <Select label="Date" size="sm" placeholder="Date" options={opt('This month', 'Last month', 'This quarter', 'This year', 'Custom range')} />
  </FilterBarField>
);

const More = () => (
  <>
    <FilterBarField><Select label="Name:" size="sm" placeholder="Name" options={opt('Daniel Olabode', 'Damilola Audu')} /></FilterBarField>
    <FilterBarField><Select label="Account Name:" size="sm" placeholder="Acc. name" options={opt('Sales Revenue', 'Cash at Bank')} /></FilterBarField>
    <FilterBarField><Select label="Account Class:" size="sm" placeholder="Acc. Class" options={opt('Asset', 'Liability', 'Income')} /></FilterBarField>
    <FilterBarField><Select label="Dimension Type" size="sm" placeholder="Type" options={opt('Branch', 'State')} /></FilterBarField>
    <FilterBarField><Select label="Dimension Class" size="sm" placeholder="Class" options={opt('Lagos', 'Abuja')} /></FilterBarField>
  </>
);

const meta = {
  title: 'Components/FilterBar',
  component: FilterBar,
  args: { children: <DateField />, moreFilters: <More />, onApply: () => {}, onAdvanced: () => {} },
  decorators: [(Story) => <div className="w-full"><Story /></div>],
  parameters: {
    layout: 'padded',
    design: { url: FIGMA + '1752-21749' },
    docs: {
      description: {
        component:
          'Filter bar for reports (General ledger, Trial balance, statements). Default: the main field, "More Filters" and Apply. ' +
          'Expanded: "More Filters" turns tinted and a second row of fields appears, ending with "Advanced". ' +
          'For list pages with a toolbar, use `FilterDropdown` instead.',
      },
    },
  },
} satisfies Meta<typeof FilterBar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const MoreFiltersOpen: Story = { args: { defaultExpanded: true } };
export const Applying: Story = { args: { applying: true } };
export const WithoutMoreFilters: Story = { args: { moreFilters: undefined } };
