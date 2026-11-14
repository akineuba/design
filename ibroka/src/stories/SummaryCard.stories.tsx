import type { Meta, StoryObj } from '@storybook/react';
import { SummaryCard } from '../components/SummaryCard';
import { CustomersIcon, IncomeIcon, LeadsIcon, PremiumIcon, UserIcon, ClaimIcon } from '../icons';
import { formatCount, formatMoneyShort } from '../lib/money';
import { figma } from '../docs/links';

const meta = { title: 'Components/SummaryCard', component: SummaryCard, args: { label: 'Income — Oct', value: formatMoneyShort(2_562_988), icon: <IncomeIcon />, color: 'green' }, parameters: { design: { type: 'figma', url: figma('3:674') } }, decorators: [(S) => <div className="w-[240px]"><S /></div>] } satisfies Meta<typeof SummaryCard>;
export default meta;
type S = StoryObj<typeof meta>;
export const Plain: S = {};
export const TrendUp: S = { args: { trend: { value: 12.4, label: 'vs Sep' } } };
export const TrendDown: S = { args: { trend: { value: -3.1, label: 'vs Sep' } } };
export const TrendUpIsBad: S = { args: { label: 'Open claims', value: '18', icon: <ClaimIcon />, color: 'red', trend: { value: 20, label: 'vs Sep', goodWhen: 'down' } } };
export const WithHint: S = { args: { label: 'Owed to us', value: formatMoneyShort(68_045_921), icon: <IncomeIcon />, color: 'amber', hint: '44 clients · 99% over 30 days' } };
/** The Figma row of five: income, users, total premium, leads, customers. */
export const Row: S = {
  decorators: [(S) => <div className="w-[1029px]"><S /></div>],
  render: () => (
    <div className="grid grid-cols-5 gap-5">
      <SummaryCard label="Income — Oct" value={formatMoneyShort(2_562_988)} icon={<IncomeIcon />} color="green" />
      <SummaryCard label="Users" value={formatCount(3232)} icon={<UserIcon />} color="purple" />
      <SummaryCard label="Total premium" value={formatMoneyShort(398_222_000)} icon={<PremiumIcon />} color="blue" />
      <SummaryCard label="Leads" value="8" icon={<LeadsIcon />} color="teal" />
      <SummaryCard label="Customers" value="34" icon={<CustomersIcon />} color="ink" />
    </div>
  ),
};
