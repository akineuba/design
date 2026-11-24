import type { CSSProperties } from 'react';
import { Button, LucideChevronDownIcon, LucidePlusIcon, cn } from '@ds';
import { CloseUp, QualPill, StagePill, type Stage } from './parts';

/*
 * Hero close-up: the Deals view with the open pipeline, drawn at hero size so it reads at a glance. KPIs and rows
 * follow the current Deals register (product screenshot, Nov 2026); figures are sample data. The stage values add up
 * to the Open pipeline total (₦225.4M).
 *
 * `compact` (phones): only the open pipeline total and its split by stage, so the hero stays short.
 */

const KPIS = [
  { label: 'Open pipeline', value: '₦225,419,000', sub: '20 open deals', featured: true },
  { label: 'Expected profit', value: '₦76,610,999', sub: '20 deals · 33.99%' },
  { label: 'Profit', value: '₦470,954,902', sub: '13 deals closed won' },
];

/* Open pipeline by stage; widths are each stage's share of ₦225.4M (illustration geometry). */
const BY_STAGE: { stage: Stage; value: string; share: string; tone: string }[] = [
  { stage: 'Discovery', value: '₦62.4M', share: '27.7%', tone: 'bg-chart-series-1' },
  { stage: 'Site Survey', value: '₦48.1M', share: '21.3%', tone: 'bg-chart-series-3' },
  { stage: 'Site Quotation', value: '₦71.9M', share: '31.9%', tone: 'bg-chart-series-4' },
  { stage: 'Proposal Sent', value: '₦43.0M', share: '19.1%', tone: 'bg-brand-primary' },
];

const DEALS: { name: string; company: string; stage: Stage; qual: 0 | 1 | 2 | 3 | 4; amount: string }[] = [
  { name: 'Harbourline Logistics', company: 'Harbourline Logistics Ltd', stage: 'Site Quotation', qual: 2, amount: '₦6,200,000' },
  { name: 'Cloud Backup Partnership', company: 'Bluewave Telecoms', stage: 'Proposal Sent', qual: 3, amount: '₦5,400,000' },
  { name: 'BlueWhale PIC', company: 'Harbourline Logistics Ltd', stage: 'Discovery', qual: 1, amount: '₦2,000,000' },
  { name: 'Manufacturing PIC', company: 'Harbourline Logistics Ltd', stage: 'Site Survey', qual: 1, amount: '₦1,000,000' },
];

export function HeroDeals({ compact = false }: { compact?: boolean }) {
  const kpis = compact ? KPIS.filter((k) => k.featured) : KPIS;
  return (
    <CloseUp
      label={compact ? 'wCRM Deals view: ₦225,419,000 open pipeline across 20 deals, split by stage' : 'wCRM Deals view: ₦225,419,000 open pipeline across 20 deals, split by stage, with the open deals listed'}
    >
      {/* Title bar */}
      <div className="flex items-center justify-between border-b border-border-default bg-surface-default px-5 py-3.5">
        <span className="flex items-center gap-3">
          <span className="text-heading-3 text-text-primary">Deals</span>
          <span className="flex items-center gap-1.5 rounded-md border border-border-strong px-2.5 py-1 text-caption text-text-secondary">
            Sales pipeline <LucideChevronDownIcon className="size-3.5" />
          </span>
        </span>
        {!compact && <Button size="xs" leadingIcon={<LucidePlusIcon />}>Create Deal</Button>}
      </div>

      <div className={cn('flex flex-col', compact ? 'gap-3 p-4' : 'gap-4 p-5')}>
        {/* KPIs */}
        <div className={compact ? 'grid' : 'grid grid-cols-2 gap-3 sm:grid-cols-3'}>
          {kpis.map((k) => (
            <div key={k.label} className={cn('flex flex-col gap-1 rounded-callout p-3.5', k.featured && 'col-span-2 sm:col-span-1', k.featured ? 'bg-feature text-text-inverse shadow-md' : 'border border-border-subtle bg-surface-default')}>
              <span className={cn('text-caption font-medium', k.featured ? 'text-text-inverse' : 'text-text-secondary')}>{k.label}</span>
              <span className={cn('text-heading-3', k.featured ? 'text-text-inverse' : 'text-status-success-strong')}>{k.value}</span>
              <span className={cn('text-caption-sm', k.featured ? 'text-text-inverse' : 'text-text-secondary')}>{k.sub}</span>
            </div>
          ))}
        </div>

        {/* Open pipeline by stage */}
        <div className="flex flex-col gap-3 rounded-callout border border-border-subtle bg-surface-default p-4">
          <span className="flex items-center justify-between">
            <span className="text-label text-text-primary">Open pipeline by stage</span>
            <span className="text-caption text-text-secondary">₦225.4M</span>
          </span>
          <span className="flex h-2.5 gap-0.5 overflow-hidden rounded-full">
            {BY_STAGE.map((s) => (
              <span key={s.stage} className={cn('h-full', s.tone)} style={{ width: s.share } as CSSProperties} />
            ))}
          </span>
          <span className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {BY_STAGE.map((s) => (
              <span key={s.stage} className="flex flex-col gap-0.5">
                <span className="flex items-center gap-1.5 text-caption-sm text-text-secondary">
                  <span className={cn('size-2 rounded-full', s.tone)} />
                  {s.stage}
                </span>
                <span className="text-label-sm text-text-primary">{s.value}</span>
              </span>
            ))}
          </span>
        </div>

        {/* Open deals */}
        {!compact && (
        <div className="overflow-hidden rounded-callout border border-border-subtle bg-surface-default">
          {/* Phones: name and amount on the first line, stage and qualification under them. */}
          <div className="grid grid-cols-12 items-center gap-x-3 bg-surface-subtle px-4 py-2 text-caption-sm font-medium uppercase text-text-secondary">
            <span className="col-span-8 sm:col-span-5">Deal</span>
            <span className="hidden sm:col-span-3 sm:block">Stage</span>
            <span className="hidden sm:col-span-2 sm:block">Qualification</span>
            <span className="col-span-4 text-right sm:col-span-2">Amount</span>
          </div>
          {DEALS.map((d) => (
            <div key={d.name} className="grid grid-cols-12 items-center gap-x-3 gap-y-2 border-t border-border-subtle px-4 py-2.5">
              <span className="col-span-8 flex min-w-0 flex-col sm:col-span-5">
                <span className="truncate text-label-sm text-text-primary">{d.name}</span>
                <span className="truncate text-caption-sm text-text-secondary">{d.company}</span>
              </span>
              <span className="col-span-4 text-right text-label-sm text-text-primary sm:order-last sm:col-span-2">{d.amount}</span>
              <span className="col-span-8 sm:col-span-3"><StagePill stage={d.stage} /></span>
              <span className="col-span-4 text-right sm:col-span-2 sm:text-left"><QualPill score={d.qual} /></span>
            </div>
          ))}
        </div>
        )}
      </div>
    </CloseUp>
  );
}
