import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FilterDropdown, QuickFilter } from '../components/FilterDropdown';
import { Select } from '../components/Select';
import { DatePicker, type DateRange } from '../components/DatePicker';
import { FieldSizeContext } from '../components/Field';
import { CLASS_OPTIONS, INSURER_OPTIONS, STATUS_OPTIONS, TODAY } from './demo-data';
import { figma } from '../docs/links';

const meta = { title: 'Components/FilterDropdown', component: FilterDropdown, decorators: [(S) => <div className="h-[460px] w-[640px]"><S /></div>], parameters: { design: { type: 'figma', url: figma('15:1457') } } } satisfies Meta<typeof FilterDropdown>;
export default meta;
type S = StoryObj<typeof meta>;

function Panel({ defaultOpen }: { defaultOpen?: boolean }) {
  const [draft, setDraft] = useState<{ insurer?: string; cls?: string; period: DateRange }>({ period: {} });
  const [applied, setApplied] = useState(0);
  return (
    <FilterDropdown
      defaultOpen={defaultOpen}
      activeCount={applied}
      onApply={() => setApplied([draft.insurer, draft.cls, draft.period.from].filter(Boolean).length)}
      onClear={() => {
        setDraft({ period: {} });
        setApplied(0);
      }}
    >
      <FieldSizeContext.Provider value="filter">
        <Select label="Insurer" options={INSURER_OPTIONS} value={draft.insurer} onChange={(v) => setDraft({ ...draft, insurer: v })} placeholder="Any" />
        <Select label="Class" options={CLASS_OPTIONS} value={draft.cls} onChange={(v) => setDraft({ ...draft, cls: v })} placeholder="Any" />
        <DatePicker mode="range" label="Expiry between" value={draft.period} onChange={(r) => setDraft({ ...draft, period: r })} initialMonth={TODAY} />
      </FieldSizeContext.Provider>
    </FilterDropdown>
  );
}
export const Closed: S = { args: { children: null, onApply: () => {}, onClear: () => {} }, render: () => <Panel /> };
export const Open: S = { args: { children: null, onApply: () => {}, onClear: () => {} }, render: () => <Panel defaultOpen /> };
export const WithActiveFilters: S = { args: { activeCount: 2, children: <p className="text-13">Fields</p>, onApply: () => {}, onClear: () => {} } };
/** Figma "Filter: All" dropdown next to a card title. Applies at once. */
export const QuickFilters: S = {
  args: { children: null, onApply: () => {}, onClear: () => {} },
  parameters: { design: { type: 'figma', url: figma('15:1343') } },
  render: () => {
    const [s, setS] = useState('all');
    const [c, setC] = useState('all');
    return (
      <div className="flex gap-2.5">
        <QuickFilter label="Status" options={STATUS_OPTIONS} value={s} onChange={setS} />
        <QuickFilter label="Class" options={[{ value: 'all', label: 'All' }, ...CLASS_OPTIONS]} value={c} onChange={setC} />
      </div>
    );
  },
};
