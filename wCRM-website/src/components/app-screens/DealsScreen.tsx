import { Button, FilterIcon, LucideChevronDownIcon, LucidePlusIcon, PhExportLightIcon, cn } from '@ds';
import { GridRow, Kebab, ScreenCard, SearchBox, headCell } from './parts';

const STATS = [
  { label: 'Total Deals', value: '₦450,099,000', sub: '29 counts', tone: 'featured' },
  { label: 'Open Deals', value: '₦228,369,000', sub: '14 counts', tone: 'text-text-avatar-gold' },
  { label: 'Closed Won Deals', value: '₦220,730,000', sub: '14 counts', tone: 'text-status-success-text' },
  { label: 'Closed Lost Deals', value: '₦1,000,000', sub: '1 count', tone: 'text-status-danger-strong' },
  { label: 'Profit', value: '₦45,204,902', sub: '6 deals | 31.63%', tone: 'text-status-success-strong' },
  { label: 'Expected Profit', value: '₦75,610,999', sub: '14 deals | 33.11%', tone: 'text-status-success-strong' },
];

const COLUMNS = '170px 120px 104px 113px 166px 190px 116px 128px 30px 1fr 22px';

// name, company, deal date, close date, stage, owner, amount, profit, collaborators
const DEALS: [string, string, string, string, string, string, string, string, number | null][] = [
  ['Penetration Tes...', 'tmb', '19 Aug 26', '28 Aug 26', 'Closed Lost', 'mantech@yopmail.co...', '₦1,000,000', '₦100,000', 2],
  ['Cursort impleme...', 'Cash Drive', '19 Aug 26', '28 Aug 26', 'Closed Won', 'mantech@yopmail.co...', '₦900,000', '₦200,000', null],
  ["Tobi's deal", 'Automotive', '17 Aug 26', '20 Nov 26', 'Contact establis', 'mogbeide@wragbysol...', '₦50,000,000', '₦10,000,000', 2],
  ['ZZ-UITEST-DEAL-...', 'Decagon', '14 Aug 26', '31 Dec 26', 'Meeting', 'mogbeide@wragbysol...', '₦250,000', '₦50,000', null],
  ['WbizV1 deal', 'Hallmark Ltd', '12 Aug 26', '19 Aug 26', 'Closed Won', 'suretester101@gmai...', '₦4,000,000', '₦1,000,000', 2],
  ['Test deal', 'Automotive', '11 Aug 26', '18 Aug 26', 'Contact establis', 'suretester101@gmai...', '₦19,000', '₦1,000', null],
  ['tmb deal', 'tmb', '21 Jul 26', '28 Jul 26', 'Closed Won', 'aeuba@wragbysoluti...', '₦3,000,000', '₦2,000,000', 3],
  ['WBiz customizat...', 'Cash Drive', '17 Jul 26', '17 Jul 26', 'Closed Won', 'oosanyinbi@wragbys...', '₦35,000,000', '₦7,000,000', 1],
  ['CRM Solution', 'Cash Drive', '16 Jul 26', '20 Aug 26', 'Meeting', 'Monwuka@wragbysolu...', '₦50,000,000', '₦25,000,000', null],
  ['World Cup 2026 ...', 'Decagon', '02 Jul 26', '11 Jul 26', 'Meeting', 'mogbeide@wragbysol...', '₦3,000,000', '₦300,000', null],
];

function StageSelect({ stage }: { stage: string }) {
  return (
    <span className="flex h-control-30 w-site-stage-select items-center justify-between overflow-hidden whitespace-nowrap rounded-xs border border-border-strong pl-2.75 pr-1.5 text-body text-text-primary">
      <span className="overflow-hidden">{stage}</span>
      <LucideChevronDownIcon className="size-4 shrink-0" />
    </span>
  );
}

/** Deals register, rebuilt from the Deal Management screenshot (Figma image 364, 775:4582). 1400 × 681. */
export function DealsScreen() {
  return (
    <>
      <div className="absolute flex gap-3.75" style={{ left: 24, top: 14, width: 1346 }}>
        {STATS.map((s) => {
          const featured = s.tone === 'featured';
          return (
            <div
              key={s.label}
              className={cn(
                'flex h-site-deal-stat flex-1 flex-col gap-1 rounded-callout p-4',
                featured ? 'bg-feature text-text-inverse shadow-lg' : 'border border-border-subtle bg-surface-default',
              )}
            >
              <span className={cn('text-caption font-medium', featured ? 'text-text-inverse' : 'text-text-secondary')}>{s.label}</span>
              <span className={cn('text-heading-1', featured ? 'text-text-inverse' : s.tone)}>{s.value}</span>
              <span className={cn('text-caption', featured ? 'text-text-inverse' : 'text-text-secondary')}>{s.sub}</span>
            </div>
          );
        })}
      </div>
      <ScreenCard
        style={{ left: 28, top: 124, width: 1342, height: 600 }}
        toolbar={
          <>
            <span className="flex items-center gap-4">
              <span className="text-label text-text-primary">
                Active Deals <span className="font-regular text-text-secondary">(10)</span>
              </span>
              <SearchBox />
            </span>
            <span className="flex items-center gap-2">
              <span className="flex h-control-30 w-site-year-select items-center justify-between rounded-sm border border-border-strong px-2.5 text-body text-text-primary">
                2026 <LucideChevronDownIcon className="size-4" />
              </span>
              <Button variant="toolbar" size="xs" leadingIcon={<FilterIcon />}>Filter</Button>
              <Button variant="toolbar" size="xs" leadingIcon={<PhExportLightIcon />}>Export</Button>
              <Button size="xs" leadingIcon={<LucidePlusIcon />}>Create Deal</Button>
            </span>
          </>
        }
      >
        <GridRow columns={COLUMNS} className="h-8 bg-surface-subtle">
          {['Deal name', 'Company', 'Deal date', 'Close date', 'Deal stage', 'Deal owner'].map((h) => (
            <span key={h} className={headCell}>{h}</span>
          ))}
          <span className={cn(headCell, 'text-right')}>Amount</span>
          <span className={cn(headCell, 'text-right')}>Profit</span>
          <span />
          <span className={headCell}>Collaborators</span>
          <span className={headCell}>...</span>
        </GridRow>
        {DEALS.map(([name, company, date, close, stage, owner, amount, profit, collaborators]) => (
          <GridRow key={name + date} columns={COLUMNS} className="h-control-48 whitespace-nowrap text-body text-text-primary">
            <span>{name}</span>
            <span>{company}</span>
            <span>{date}</span>
            <span>{close}</span>
            <StageSelect stage={stage} />
            <span>{owner}</span>
            <span className="text-right">{amount}</span>
            <span className="text-right text-status-success-strong">{profit}</span>
            <span />
            <span>
              {collaborators ? (
                <span className="flex size-4.5 items-center justify-center rounded-full bg-surface-sunken text-caption-sm font-semibold text-text-secondary">{collaborators}</span>
              ) : (
                <span className="text-text-secondary">—</span>
              )}
            </span>
            <Kebab />
          </GridRow>
        ))}
      </ScreenCard>
    </>
  );
}
