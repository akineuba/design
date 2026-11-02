import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DatePicker, type DatePickerProps, type DateRange } from '../components/DatePicker';
import { TODAY } from './demo-data';
import { figma } from '../docs/links';

const Single_ = DatePicker as (p: DatePickerProps) => JSX.Element;
const meta = { title: 'Components/DatePicker', component: Single_, decorators: [(S) => <div className="h-[460px] w-[300px]"><S /></div>], parameters: { design: { type: 'figma', url: figma('3:490') } } } satisfies Meta<typeof Single_>;
export default meta;
type S = StoryObj<typeof meta>;
export const Single: S = {
  args: { label: 'Start date', onChange: () => {} },
  render: (a) => {
    const [d, setD] = useState<Date | undefined>(TODAY);
    return <DatePicker {...a} mode="single" value={d} onChange={setD} />;
  },
};
export const SingleOpen: S = { args: { label: 'Start date', value: TODAY, onChange: () => {}, defaultOpen: true } };
export const Range: S = {
  args: { label: 'Policy period', onChange: () => {} },
  render: (a) => {
    const [r, setR] = useState<DateRange>({ from: new Date(2026, 9, 6), to: new Date(2026, 9, 24) });
    return <DatePicker label={a.label} mode="range" value={r} onChange={setR} defaultOpen />;
  },
};
export const Empty: S = { args: { label: 'Date of loss', required: true, onChange: () => {}, hint: 'When the incident happened.' } };
export const WithError: S = { args: { label: 'End date', onChange: () => {}, value: new Date(2026, 0, 1), error: 'End date must be after the start date.' } };
