import type { Meta, StoryObj } from '@storybook/react';
import { AreaChart, BarChart, RadarChart } from '../components/Charts';
import { Card } from '../components/Card';
import { formatMoneyShort } from '../lib/money';
import { CASH_FLOW, CLAIMS_BY_MONTH, HEADCOUNT, PREMIUM_BY_DAY } from './demo-data';
import { figma } from '../docs/links';

const meta = { title: 'Components/Charts', component: AreaChart, parameters: { layout: 'padded', design: { type: 'figma', url: figma('15:1891') } }, decorators: [(S) => <div className="w-[600px]"><S /></div>] } satisfies Meta<typeof AreaChart>;
export default meta;
type S = StoryObj<typeof meta>;
/** Figma area chart: one series over the week. No legend box: the card title names it. */
export const Area: S = { args: { 'aria-label': 'Premium written per day this week', data: PREMIUM_BY_DAY, xKey: 'day', series: [{ key: 'premium', label: 'Premium' }], format: formatMoneyShort }, render: (a) => <Card title="Premium this week"><AreaChart {...a} /></Card> };
export const AreaTwoSeries: S = { args: { 'aria-label': 'Premium and commission per day', data: PREMIUM_BY_DAY, xKey: 'day', series: [{ key: 'premium', label: 'Premium' }, { key: 'commission', label: 'Commission', color: 1 }], format: formatMoneyShort }, render: (a) => <Card title="Premium and commission"><AreaChart {...a} /></Card> };
/** Cash flow: income vs expense by month (replaces the live app's thin daily spikes). */
export const Bars: S = { args: { 'aria-label': 'Income and expenses by month', data: CASH_FLOW, xKey: 'month', series: [{ key: 'income', label: 'Income' }, { key: 'expense', label: 'Expense', color: 3 }], format: formatMoneyShort }, render: (a) => <Card title="Cash flow"><BarChart {...a} /></Card> };
export const HorizontalBars: S = { args: { 'aria-label': 'Staff by department', data: HEADCOUNT, xKey: 'name', series: [{ key: 'staff', label: 'Staff' }] }, render: (a) => <Card title="Headcount by department"><BarChart {...a} layout="horizontal" /></Card> };
/** Figma radar. Use only when the shape is the point; the table view carries exact values. */
export const Radar: S = { args: { 'aria-label': 'Claims by class, January to June', data: CLAIMS_BY_MONTH, xKey: 'month', series: [{ key: 'motor', label: 'Motor', color: 2 }, { key: 'fire', label: 'Fire', color: 1 }] }, render: (a) => <Card title="Claims by month"><RadarChart {...a} /></Card> };
