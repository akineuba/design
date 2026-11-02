import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FilterBar } from '../components/FilterBar';
import { Select } from '../components/Select';
import { DatePicker, type DateRange } from '../components/DatePicker';
import { CLASS_OPTIONS, CLIENT_OPTIONS, INSURER_OPTIONS, TODAY } from './demo-data';
import { figma } from '../docs/links';

const meta = { title: 'Components/FilterBar', component: FilterBar, parameters: { layout: 'padded', design: { type: 'figma', url: figma('15:1978') } } } satisfies Meta<typeof FilterBar>;
export default meta;
type S = StoryObj<typeof meta>;
function Demo({ applying, withMore = true }: { applying?: boolean; withMore?: boolean }) {
  const [r, setR] = useState<DateRange>({ from: new Date(2026, 9, 1), to: TODAY });
  return (
    <div className="h-[420px]">
      <FilterBar
        title="Production report"
        applying={applying}
        onApply={() => {}}
        more={withMore ? (<><Select label="Client" options={CLIENT_OPTIONS} placeholder="All clients" /><Select label="Class" options={CLASS_OPTIONS} placeholder="All classes" /></>) : undefined}
        advanced={<a href="#" className="text-13 font-semibold text-primary underline">Advanced</a>}
      >
        <DatePicker mode="range" label="Period" value={r} onChange={setR} />
        <Select label="Insurer" options={INSURER_OPTIONS} placeholder="All insurers" />
        <Select label="Status" options={[{ value: 'active', label: 'Active' }, { value: 'expired', label: 'Expired' }]} placeholder="Any status" />
      </FilterBar>
    </div>
  );
}
export const Default: S = { args: { children: null, onApply: () => {} }, render: () => <Demo /> };
export const Applying: S = { args: { children: null, onApply: () => {} }, render: () => <Demo applying /> };
export const WithoutMoreFilters: S = { args: { children: null, onApply: () => {} }, render: () => <Demo withMore={false} /> };
