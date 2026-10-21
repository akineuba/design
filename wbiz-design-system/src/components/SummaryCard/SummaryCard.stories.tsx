import type { Meta, StoryObj } from '@storybook/react';
import { SummaryCard } from './SummaryCard';
import { BanknoteIcon, TrendUpIcon, UsersIcon, WalletIcon, ClockIcon } from '../../icons';

const meta = {
  title: 'Components/SummaryCard',
  component: SummaryCard,
  args: { label: 'Net pay — October', value: '₦15.2M', icon: <BanknoteIcon />, color: 'green', trend: { value: -93.5, label: 'vs September' } },
  argTypes: { color: { control: 'inline-radio', options: ['green', 'blue', 'amber', 'teal', 'red'] } },
  decorators: [(Story, ctx) => <div className={ctx.name === 'Row' ? 'w-full' : 'w-full max-w-dialog'}><Story /></div>],
  parameters: {
    layout: 'padded',
    docs: { description: { component: 'Headline figure for the top of a page or dashboard: coloured icon tile on the left, bold value, then a trend against the previous period or a context line. Use `StatCard` for smaller figures inside panels.' } },
  },
} satisfies Meta<typeof SummaryCard>;
export default meta;
type Story = StoryObj<typeof meta>;

export const TrendDown: Story = {};
export const TrendUp: Story = { args: { label: 'Gross pay — October', value: '₦22.1M', icon: <TrendUpIcon />, color: 'blue', trend: { value: 12.4, label: 'vs September' } } };
/** Going up is bad here, so the rise shows in red. */
export const TrendUpIsBad: Story = { args: { label: 'Overdue bills', value: '₦4.8M', icon: <ClockIcon />, color: 'red', trend: { value: 18, label: 'vs last month', goodWhen: 'down' } } };
export const WithHint: Story = { args: { label: 'Employees — October', value: '8', icon: <UsersIcon />, color: 'amber', trend: undefined, hint: '1 run this month' } };

/** A row of four, as on the Payroll Runs page. */
export const Row: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      <SummaryCard label="Net pay — October" value="₦15.2M" icon={<BanknoteIcon />} color="green" trend={{ value: -93.5, label: 'vs September' }} />
      <SummaryCard label="Gross pay — October" value="₦22.1M" icon={<TrendUpIcon />} color="blue" trend={{ value: -93.4, label: 'vs September' }} />
      <SummaryCard label="Employees — October" value="8" icon={<UsersIcon />} color="amber" hint="1 run this month" />
      <SummaryCard label="YTD net pay — 2026" value="₦1B" icon={<WalletIcon />} color="teal" hint="28 runs total" />
    </div>
  ),
};
