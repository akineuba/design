import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { MoneyDisplay, MoneyInput } from '../insurance/Money';

const meta = { title: 'Insurance/Money', component: MoneyDisplay, args: { amount: 3_000_000 } } satisfies Meta<typeof MoneyDisplay>;
export default meta;
type S = StoryObj<typeof meta>;
export const Full: S = {};
export const Short: S = { args: { amount: 68_045_921, format: 'short' } };
export const Negative: S = { args: { amount: -17_500 } };
export const Signed: S = { render: () => <div className="flex gap-6 text-15"><MoneyDisplay amount={250_000} signed /><MoneyDisplay amount={-250_000} signed /></div> };
export const ForeignCurrency: S = { args: { amount: 12_500, currency: 'USD' } };
export const Input: S = {
  render: () => {
    const [v, setV] = useState<number | null>(150_000_000);
    return (
      <div className="flex w-[300px] flex-col gap-4">
        <MoneyInput label="Sum insured" required value={v} onChange={setV} hint="Replacement value of the property." />
        <MoneyInput label="Claim amount" value={null} onChange={() => {}} error="Enter the amount claimed." />
        <MoneyInput label="Excess (USD)" currency="USD" value={500} onChange={() => {}} />
      </div>
    );
  },
};
