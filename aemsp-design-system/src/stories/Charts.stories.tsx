import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BarChart, AreaChart, DonutChart, PieChart, HorizontalBarChart, LineChart, Sparkline } from '../components/charts';
import { Card } from '../components/layout';
import { Button } from '../components/primitives';
import { WEEK, MONTHS, BY_OEM_TYPE } from '../data';

export default { title: 'Components/Charts', tags: ['autodocs'], parameters: { docs: { description: { component: 'Charts use the chart palette tokens in order, a light grid, 12px axis labels and a shared tooltip. Bars have no grey “track” behind them. Prefer a donut + legend for part-to-whole; the labelled pie from the Figma is kept for when it suits.' } } } } satisfies Meta;
type S = StoryObj;
const wrap = (title: string, el: React.ReactNode) => <Card title={title} actions={<Button size="sm" variant="outline" icon="add">Button</Button>} style={{ maxWidth: 720 }}>{el}</Card>;
export const Bars: S = { render: () => wrap('Licence activations', <BarChart data={WEEK} xKey="d" series={[{ key: 'v', label: 'Activations' }]} />) };
export const BarsTwoSeries: S = { render: () => wrap('Activations vs renewals', <BarChart data={WEEK} xKey="d" series={[{ key: 'v', label: 'Activations' }, { key: 'r', label: 'Renewals' }]} />) };
export const Stacked: S = { render: () => wrap('Seats by week', <BarChart stacked data={WEEK} xKey="d" series={[{ key: 'v', label: 'Assigned' }, { key: 'r', label: 'Unassigned' }]} />) };
export const Area: S = { render: () => wrap('Monthly recurring revenue', <AreaChart unit="£" data={MONTHS} xKey="m" series={[{ key: 'mrr', label: 'MRR' }]} />) };
export const Line: S = { render: () => wrap('MRR vs churn', <LineChart unit="£" data={MONTHS} xKey="m" series={[{ key: 'mrr', label: 'MRR' }, { key: 'churn', label: 'Churn' }]} />) };
export const Donut: S = { render: () => wrap('Licences by organisation type', <DonutChart data={BY_OEM_TYPE} centerLabel="Licences" />) };
export const Pie: S = { name: 'Pie (Figma)', render: () => wrap('Text', <PieChart title="Referrer of a website" data={[{ label: 'Search', value: 35 }, { label: 'Direct', value: 24 }, { label: 'Email', value: 18 }, { label: 'Union Ads', value: 14 }, { label: 'Partners', value: 9 }]} />) };
export const HorizontalBars: S = { render: () => wrap('Top OEMs by seats', <HorizontalBarChart data={[{ n: 'Northwind Motors', v: 1240 }, { n: 'Apex OEM Group', v: 980 }, { n: 'Crescent Trucks', v: 610 }, { n: 'Kestrel Autos', v: 214 }, { n: 'Harbor Fleet', v: 156 }]} labelKey="n" valueKey="v" />) };
export const Sparklines: S = { render: () => <div style={{ width: 200 }}><Sparkline data={[4, 6, 5, 8, 7, 9, 12, 11, 14]} /></div> };
