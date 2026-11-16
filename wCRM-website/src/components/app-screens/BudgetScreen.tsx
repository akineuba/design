import { Badge, Button, LucideChevronDownIcon, cn } from '@ds';
import { GridRow, Kebab, SearchBox, headCell } from './parts';

const STATS = [
  ['Total Target', '₦200,000,000'],
  ['Allocated', '₦153,000,000'],
  ['Unallocated', '₦47,000,000'],
  ['Achieved', '₦220,730,000'],
  ['Variance', '₦-67,730,000'],
];

const COLUMNS = '200px 130px 165px 155px 165px 163px 245px 1fr';

const ROWS: [string, string, string, string, string, string, 'success' | 'warning', string][] = [
  ['tmb', '₦3,000,000', '₦0', '₦3,000,000', '₦0', '100% Achieved', 'success', '1'],
  ['Test', '₦50,000,000', '₦0', '₦52,500,000', '₦2,500,000', '105% Achieved', 'success', '3'],
  ['Artificial Intellige...', '₦100,000,000', '₦89,700,000', '₦10,300,000', '₦-89,700,000', '10% Achieved', 'warning', '4'],
];

function SortGlyph() {
  return (
    <svg viewBox="0 0 12 12" className="size-3 text-text-muted" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m3.5 4.5 2.5-2.5 2.5 2.5M3.5 7.5 6 10l2.5-2.5" />
    </svg>
  );
}

function Head({ children, right }: { children: string; right?: boolean }) {
  return (
    <span className={cn(headCell, 'flex items-center gap-1.5', right && 'justify-end')}>
      {children}
      <SortGlyph />
    </span>
  );
}

/** Budget allocations, rebuilt from the Budget & Targets screenshot (Figma image 366, 775:4593). 1400 × 382. */
export function BudgetScreen() {
  return (
    <>
      <div className="absolute flex gap-3.75" style={{ left: 38, top: 14, width: 1322 }}>
        {STATS.map(([label, value]) => (
          <div key={label} className="flex h-site-budget-stat flex-1 flex-col justify-center gap-2.5 rounded-callout bg-surface-default px-4.5 shadow-sm">
            <span className="text-site-body-lg text-text-slate">{label}</span>
            <span className="text-site-body-lg font-bold text-text-navy-strong">{value}</span>
          </div>
        ))}
      </div>
      <div className="absolute overflow-hidden rounded-callout bg-surface-default shadow-sm" style={{ left: 38, top: 120, width: 1322, height: 280 }}>
        <div className="flex h-site-screen-toolbar items-center justify-between px-3.5">
          <span className="flex items-center gap-12">
            <span className="text-site-body-lg font-semibold text-text-primary">Current Allocations</span>
            <span className="flex items-center gap-1.5 text-caption font-semibold text-brand-primary">
              Practice Area Allocations <LucideChevronDownIcon className="size-4" />
            </span>
            <SearchBox />
          </span>
          <Button size="xs" className="text-label-sm">Allocate Amount</Button>
        </div>
        <GridRow columns={COLUMNS} className="h-9 bg-surface-subtle px-3.5">
          <Head>Practice area</Head>
          <Head right>Allocated</Head>
          <Head right>Unachieved</Head>
          <Head right>Achieved</Head>
          <Head right>Variance</Head>
          <span className={cn(headCell, 'flex items-center gap-1.5 pl-7.5')}>Status <SortGlyph /></span>
          <span className={cn(headCell, 'flex items-center gap-1.5')}>Revenue streams <SortGlyph /></span>
          <span className={cn(headCell, 'text-right')}>...</span>
        </GridRow>
        {ROWS.map(([area, allocated, unachieved, achieved, variance, status, tone, streams]) => (
          <GridRow key={area} columns={COLUMNS} className="h-control-lg border-b border-border-subtle px-3.5 text-body-sm text-text-primary">
            <span>{area}</span>
            <span className="text-right">{allocated}</span>
            <span className="text-right">{unachieved}</span>
            <span className="text-right">{achieved}</span>
            <span className="text-right">{variance}</span>
            <span className="pl-7.5"><Badge tone={tone} size="sm" dot={false}>{status}</Badge></span>
            <span>{streams}</span>
            <span className="flex justify-end"><Kebab /></span>
          </GridRow>
        ))}
        <div className="flex justify-end gap-3 px-7.5 pt-4">
          <span className="size-7 rounded-sm bg-brand-primary" />
          <span className="h-7 w-25 rounded-sm border border-border-strong" />
        </div>
      </div>
    </>
  );
}
