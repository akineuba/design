import type { Meta, StoryObj } from '@storybook/react';
import { PremiumBreakdown } from '../insurance/PremiumBreakdown';

const meta = { title: 'Insurance/PremiumBreakdown', component: PremiumBreakdown, args: { sumInsured: 150_000_000, rate: 2.5 }, decorators: [(S) => <div className="w-[400px]"><S /></div>] } satisfies Meta<typeof PremiumBreakdown>;
export default meta;
type S = StoryObj<typeof meta>;
export const Basic: S = {};
export const WithAdjustmentsAndTax: S = { args: { adjustments: [{ label: 'No-claims discount (5%)', amount: -187_500 }, { label: 'Flood loading', amount: 75_000 }], taxRate: 7.5, commissionRate: 12.5 } };
