import type { Meta, StoryObj } from '@storybook/react';
import { useMemo, useState, type ReactNode } from 'react';
import { Shell } from './shell';
import { Accordion, AccordionItem } from '../components/Accordion';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { FilterDropdown, FilterField } from '../components/FilterDropdown';
import { PageHeader } from '../components/PageHeader';
import { Select } from '../components/Select';
import { StageProgress } from '../components/StageProgress';
import { StatusPill } from '../components/StatusPill';
import { SummaryCard } from '../components/SummaryCard';
import {
  DataTable, Pagination, SearchField, TableCard, TableFooter, TableToolbar, TableToolbarGroup, type DataTableColumn, type DataTableSort,
} from '../components/Table';
import { Tabs } from '../components/Tabs';
import { ViewToggle } from '../components/ViewToggle';
import {
  BanknoteIcon, ChevronRightIcon, ClipboardCheckIcon, ClipboardListIcon, DocumentIcon, ExportIcon, EyeIcon, FileChartIcon, GiftIcon,
  GridIcon, LayersIcon, ListIcon, PlusIcon, ReceiptIcon, SettingIcon, ShieldIcon, TickCircleIcon, ClockIcon, TransferIcon,
  TrendDownIcon, TrendUpIcon, UserCheckIcon, UsersIcon, WalletIcon, BankIcon, ProfileIcon, HelpIcon,
} from '../icons';
import { BarChart, ChartLegend, LineChart, type ChartSeries } from './payroll-charts';
import { naira, payrollRuns, statusMeta, statusOrder, type PayrollRun, type RunStatus } from './payroll-data';
import { GeneratePanel, RunPanel, change, compact, net, opt } from './payroll-panels';

const PAGE_SIZE = 10;

/** Status tabs at the top of the runs table; Filters still narrow to one approval stage. */
type RunTab = 'all' | 'approval' | 'ready' | 'paid' | 'voided';
const tabOf = (s: RunStatus): RunTab => (s === 'accts' ? 'ready' : s === 'paid' ? 'paid' : s === 'voided' ? 'voided' : 'approval');
const runTabs: { value: RunTab; label: string }[] = [
  { value: 'all', label: 'All' }, { value: 'approval', label: 'In approval' }, { value: 'ready', label: 'Ready to pay' },
  { value: 'paid', label: 'Paid' }, { value: 'voided', label: 'Voided' },
];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// The sample data only records total deductions; split them into PAYE and pension for the chart.
const paye = (r: PayrollRun) => Math.round(r.deductions * 0.65);
const pension = (r: PayrollRun) => r.deductions - paye(r);

/** Each approval queue: runs whose last completed stage is `status` are waiting for the next one. */
const queues: { status: RunStatus; stage: string; who: string }[] = [
  { status: 'generated', stage: 'HR approval', who: 'HR Manager' },
  { status: 'hr', stage: 'Audit approval', who: 'Internal audit' },
  { status: 'audit', stage: 'MD approval', who: 'MD / CEO' },
  { status: 'md', stage: 'Accounts approval', who: 'Finance' },
  { status: 'accts', stage: 'Payment', who: 'Finance Manager' },
];

/** The whole run lifecycle, for the collapsed "How a payroll run moves" section. */
const lifecycle = [
  { id: 'setup', label: 'Set up', description: 'HR Admin' },
  { id: 'generate', label: 'Generate', description: 'Payroll Admin' },
  { id: 'hr', label: 'HR approval', description: 'HR Manager' },
  { id: 'audit', label: 'Audit approval', description: 'Internal audit' },
  { id: 'md', label: 'MD approval', description: 'MD / CEO' },
  { id: 'accts', label: 'Accounts approval', description: 'Finance' },
  { id: 'paid', label: 'Payment', description: 'Finance Manager' },
  { id: 'payslips', label: 'Payslips', description: 'HR Admin' },
];

/** Every payroll page, grouped by step. Replaces one card per page; what a user can open comes from permissions. */
const tools: { group: string; links: { label: string; icon: ReactNode; note?: string }[] }[] = [
  { group: 'Set up', links: [
    { label: 'Salary setup', icon: <WalletIcon /> }, { label: 'Salary additions', icon: <TrendUpIcon /> },
    { label: 'Salary deductions', icon: <TrendDownIcon /> }, { label: 'Flexible deductions', icon: <LayersIcon /> },
    { label: 'Recurring benefits', icon: <GiftIcon /> }, { label: 'Tax configuration', icon: <SettingIcon />, note: 'In force · 6 bands, top rate 24%' },
  ] },
  { group: 'Run', links: [
    { label: 'Payroll generation', icon: <ReceiptIcon /> }, { label: 'Inclusion & exclusion', icon: <UserCheckIcon /> },
    { label: 'Overtime', icon: <ClockIcon /> }, { label: 'One-time payments', icon: <BanknoteIcon /> },
    { label: 'Off-payroll groups', icon: <UsersIcon /> }, { label: 'Final settlement', icon: <TransferIcon /> },
  ] },
  { group: 'Approve', links: [
    { label: 'Pending approvals', icon: <ClipboardListIcon /> }, { label: 'Audit approvals', icon: <ShieldIcon /> },
    { label: 'MD approvals', icon: <ProfileIcon /> }, { label: 'Accounts approvals', icon: <ClipboardCheckIcon /> },
  ] },
  { group: 'Pay & report', links: [
    { label: 'Ready to pay', icon: <BankIcon /> }, { label: 'Paid payrolls', icon: <TickCircleIcon /> },
    { label: 'Payslips', icon: <DocumentIcon /> }, { label: 'My payslips', icon: <DocumentIcon /> },
    { label: 'Export & bank file', icon: <ExportIcon /> }, { label: 'Payroll reports', icon: <FileChartIcon /> },
  ] },
];

const paySeries: ChartSeries[] = [
  { key: 'gross', name: 'Gross pay', tone: 'chart-1' },
  { key: 'net', name: 'Net pay', tone: 'chart-2' },
];
const deductionSeries: ChartSeries[] = [
  { key: 'paye', name: 'PAYE', tone: 'chart-3' },
  { key: 'pension', name: 'Pension', tone: 'chart-2' },
];

/** Compact axis labels: ₦0, ₦10M, ₦2.5M. */
const axis = (n: number) => (n === 0 ? '₦0' : compact(n));

function RunCard({ run, onOpen }: { run: PayrollRun; onOpen: () => void }) {
  const meta = statusMeta[run.status];
  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex flex-col gap-3 rounded-xl border border-line-subtle bg-surface p-4 text-left transition-colors hover:border-line focus-visible:outline-hidden focus-visible:shadow-focus"
    >
      <span className="flex items-start justify-between gap-2">
        <span className="flex min-w-0 flex-col">
          <span className="truncate font-sans text-sm font-medium text-fg-ink">{run.period}</span>
          <span className="truncate font-sans text-xs text-fg-muted">{run.template}</span>
        </span>
        <StatusPill tone={meta.tone}>{meta.label}</StatusPill>
      </span>
      <span className="font-data text-lg font-semibold text-fg-ink">{naira(net(run))}</span>
      <span className="flex justify-between font-sans text-xs text-fg-muted">
        <span>{run.staff} employees</span>
        <span>Gross {compact(run.gross)}</span>
      </span>
    </button>
  );
}

function PayrollDashboardPage() {
  const [runs, setRuns] = useState(payrollRuns);
  const [chart, setChart] = useState('pay');
  const [layout, setLayout] = useState<'table' | 'cards'>('table');
  const [query, setQuery] = useState('');
  const [statusDraft, setStatusDraft] = useState<string | null>(null);
  const [status, setStatus] = useState<RunStatus | null>(null);
  const [tab, setTab] = useState<RunTab>('all');
  const [sort, setSort] = useState<DataTableSort | null>({ key: 'generated', direction: 'desc' });
  const [page, setPage] = useState(1);
  const [openId, setOpenId] = useState<string | null>(null);
  const [highlight, setHighlight] = useState<string | undefined>();
  const [generating, setGenerating] = useState(false);

  const live = runs.filter((r) => r.status !== 'voided');
  const sum = (list: PayrollRun[], f: (r: PayrollRun) => number) => list.reduce((s, r) => s + f(r), 0);
  const last = [...live].sort((a, b) => b.generatedSort - a.generatedSort)[0];
  const month = last ? last.period.split(' ')[0] : '';
  const prevMonth = MONTHS[(MONTHS.indexOf(month) + 11) % 12];
  const cur = live.filter((r) => last && r.period === last.period);
  const prev = live.filter((r) => r.period === `${prevMonth} 2026`);

  // Monthly totals for the charts, January to the latest month with a run.
  const lastMonth = Math.max(...live.map((r) => MONTHS.indexOf(r.period.split(' ')[0])));
  const monthly = MONTHS.slice(0, lastMonth + 1).map((m) => {
    const inMonth = live.filter((r) => r.period === `${m} 2026`);
    return {
      label: m.slice(0, 3),
      values: { gross: sum(inMonth, (r) => r.gross), net: sum(inMonth, net), paye: sum(inMonth, paye), pension: sum(inMonth, pension) },
    };
  });

  const update = (id: string, s: RunStatus) => setRuns((rs) => rs.map((r) => (r.id === id ? { ...r, status: s } : r)));
  const advance = (r: PayrollRun) => { update(r.id, statusOrder[statusOrder.indexOf(r.status) + 1]); setHighlight(r.id); };
  const sendBack = (r: PayrollRun) => { update(r.id, 'generated'); setHighlight(r.id); };
  const showQueue = (s: RunStatus) => { setTab(tabOf(s)); setStatus(s); setStatusDraft(s); setPage(1); document.getElementById('payroll-runs')?.scrollIntoView({ behavior: 'smooth' }); };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = runs.filter((r) => (!q || `${r.period} ${r.template} ${statusMeta[r.status].label}`.toLowerCase().includes(q)) && (tab === 'all' || tabOf(r.status) === tab) && (!status || r.status === status));
    if (!sort) return list;
    const val = (r: PayrollRun) => (sort.key === 'net' ? net(r) : sort.key === 'gross' ? r.gross : sort.key === 'staff' ? r.staff : r.generatedSort);
    return [...list].sort((a, b) => (sort.direction === 'asc' ? val(a) - val(b) : val(b) - val(a)));
  }, [runs, query, tab, status, sort]);
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const rows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const openRun = runs.find((r) => r.id === openId) ?? null;

  const columns: DataTableColumn<PayrollRun>[] = [
    {
      key: 'period',
      header: 'Period',
      render: (r) => (
        <span className="flex flex-col">
          <span className="font-medium text-fg-ink">{r.period}</span>
          <span className="text-xs text-fg-muted">{r.template}</span>
        </span>
      ),
    },
    { key: 'generated', header: 'Created', sortable: true },
    { key: 'staff', header: 'Employees', align: 'right', sortable: true },
    { key: 'gross', header: 'Gross pay', align: 'right', sortable: true, render: (r) => naira(r.gross) },
    { key: 'net', header: 'Net pay', align: 'right', sortable: true, emphasis: 'strong', render: (r) => naira(net(r)) },
    { key: 'status', header: 'Status', render: (r) => <StatusPill tone={statusMeta[r.status].tone}>{statusMeta[r.status].label}</StatusPill> },
  ];

  return (
    <Shell activeId="human-resources/payroll-management/dashboard" breadcrumbs={[{ label: 'Human Resources', href: '#' }, { label: 'Payroll Management', href: '#' }, { label: 'Dashboard' }]}>
      <PageHeader
        title="Payroll"
        description="Pay trends, runs waiting for approval and every payroll run this year."
        actions={
          <>
            <div className="w-filter-control"><Select aria-label="Year" size="sm" options={opt('2026', '2025')} defaultValue="2026" searchable={false} /></div>
            <Button leadingIcon={<PlusIcon />} onClick={() => setGenerating(true)}>Generate run</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard label={`Net pay — ${month}`} value={compact(sum(cur, net))} icon={<BanknoteIcon />} color="green" trend={{ value: change(sum(cur, net), sum(prev, net)), label: `vs ${prevMonth}` }} />
        <SummaryCard label={`Gross pay — ${month}`} value={compact(sum(cur, (r) => r.gross))} icon={<TrendUpIcon />} color="blue" trend={{ value: change(sum(cur, (r) => r.gross), sum(prev, (r) => r.gross)), label: `vs ${prevMonth}` }} />
        <SummaryCard label={`Employees — ${month}`} value={sum(cur, (r) => r.staff)} icon={<UsersIcon />} color="amber" hint={`${cur.length} run${cur.length === 1 ? '' : 's'} this month`} />
        <SummaryCard label="Net pay — 2026 to date" value={compact(sum(live, net))} icon={<WalletIcon />} color="teal" hint={`${live.length} runs`} />
      </div>

      <div className="grid grid-cols-1 items-start gap-4 xl:grid-cols-3">
        <Card
          className="xl:col-span-2"
          title={chart === 'pay' ? 'Pay by month' : 'Deductions by month'}
          description={
            chart === 'pay'
              ? `Gross ${compact(sum(live, (r) => r.gross))} · net ${compact(sum(live, net))} so far in 2026`
              : `PAYE ${compact(sum(live, paye))} · pension ${compact(sum(live, pension))} so far in 2026`
          }
          actions={
            <div className="w-col-md">
              <Select
                aria-label="Chart"
                size="sm"
                searchable={false}
                value={chart}
                onChange={(v) => setChart(v ?? 'pay')}
                options={[{ value: 'pay', label: 'Pay' }, { value: 'deductions', label: 'Deductions' }]}
              />
            </div>
          }
        >
          <ChartLegend series={chart === 'pay' ? paySeries : deductionSeries} />
          {chart === 'pay'
            ? <LineChart title="Gross and net pay by month, 2026" series={paySeries} data={monthly} format={axis} />
            : <BarChart title="PAYE and pension by month, 2026" series={deductionSeries} data={monthly} format={axis} />}
        </Card>

        <Card title="Waiting for approval" description="Runs at each stage. Select one to see them.">
            <ul className="-mx-2 -mt-2 flex flex-col">
              {queues.map((q) => {
                const count = live.filter((r) => r.status === q.status).length;
                return (
                  <li key={q.status}>
                    <button
                      type="button"
                      disabled={!count}
                      onClick={() => showQueue(q.status)}
                      className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left font-sans transition-colors hover:bg-surface-muted disabled:cursor-default disabled:hover:bg-transparent focus-visible:outline-hidden focus-visible:shadow-focus"
                    >
                      <span className="flex min-w-0 flex-1 flex-col">
                        <span className="text-sm font-medium text-fg-strong">{q.stage}</span>
                        <span className="text-xs text-fg-muted">{q.who}</span>
                      </span>
                      <span className={count ? 'font-data text-md font-semibold text-fg-ink' : 'font-data text-md text-fg-placeholder'}>{count}</span>
                      <span className="size-icon-xs text-icon-muted" aria-hidden><ChevronRightIcon /></span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </Card>
      </div>

      <section id="payroll-runs" aria-labelledby="payroll-runs-title" className="flex flex-col gap-3">
        <div className="flex items-baseline gap-2">
          <h2 id="payroll-runs-title" className="font-sans text-lg font-semibold text-fg-strong">Payroll runs</h2>
          <span className="font-sans text-sm text-fg-muted">{runs.length} in 2026</span>
        </div>
        <TableCard>
          <Tabs
            aria-label="Run status"
            idPrefix="run-status"
            className="border-b border-line-subtle px-2"
            value={tab}
            onChange={(v) => { setTab(v as RunTab); setStatus(null); setStatusDraft(null); setPage(1); }}
            items={runTabs.map((t) => ({ ...t, count: t.value === 'all' ? runs.length : runs.filter((r) => tabOf(r.status) === t.value).length }))}
          />
          <TableToolbar>
            <TableToolbarGroup>
              <SearchField aria-label="Search payroll runs" placeholder="Search runs" value={query} onChange={(e) => { setQuery(e.target.value); setPage(1); }} />
              <FilterDropdown
                activeCount={status ? 1 : 0}
                onApply={() => { const s = statusDraft as RunStatus | null; setStatus(s); if (s) setTab(tabOf(s)); setPage(1); }}
                onReset={() => { setStatusDraft(null); setStatus(null); setPage(1); }}
              >
                <FilterField label="Stage:">
                  <Select aria-label="Stage" size="sm" placeholder="All stages" value={statusDraft} onChange={setStatusDraft} options={(Object.keys(statusMeta) as RunStatus[]).map((k) => ({ value: k, label: statusMeta[k].label }))} />
                </FilterField>
              </FilterDropdown>
            </TableToolbarGroup>
            <TableToolbarGroup>
              <ViewToggle
                aria-label="Show runs as"
                value={layout}
                onValueChange={setLayout}
                options={[{ value: 'table', label: 'Table', icon: <ListIcon /> }, { value: 'cards', label: 'Cards', icon: <GridIcon /> }]}
              />
            </TableToolbarGroup>
          </TableToolbar>
          {layout === 'table' ? (
            <DataTable
              caption="Payroll runs"
              columns={columns}
              rows={rows}
              getRowId={(r) => r.id}
              sort={sort}
              onSortChange={(s) => { setSort(s); setPage(1); }}
              onRowClick={(r) => setOpenId(r.id)}
              activeRowId={highlight}
              rowActions={(r) => [
                { id: 'view', label: 'View', tone: 'view', icon: <EyeIcon />, onSelect: () => setOpenId(r.id) },
                ...(statusMeta[r.status].next ? [{ id: 'advance', label: statusMeta[r.status].next!, tone: 'positive' as const, icon: <TickCircleIcon />, onSelect: () => advance(r) }] : []),
                { id: 'payslips', label: 'Payslips', tone: 'link', icon: <DocumentIcon /> },
              ]}
              empty={query || status || tab !== 'all' ? 'No payroll runs match your search or filters.' : 'No payroll runs yet. Generate the first one.'}
            />
          ) : rows.length ? (
            <div className="grid grid-cols-1 gap-3 p-4 md:grid-cols-2 xl:grid-cols-3">
              {rows.map((r) => <RunCard key={r.id} run={r} onOpen={() => setOpenId(r.id)} />)}
            </div>
          ) : (
            <p className="p-8 text-center font-sans text-sm text-fg-muted">No payroll runs match your search or filters.</p>
          )}
          <TableFooter summary={filtered.length ? `Showing ${(page - 1) * PAGE_SIZE + 1} to ${Math.min(page * PAGE_SIZE, filtered.length)} of ${filtered.length} entries` : 'Showing 0 entries'}>
            <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />
          </TableFooter>
        </TableCard>
      </section>

      <Card title="Payroll tools" description="Every payroll page, grouped by step.">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {tools.map((g) => (
            <nav key={g.group} aria-label={g.group} className="flex flex-col gap-1">
              <h3 className="mb-1 font-sans text-xs font-semibold uppercase text-fg-muted">{g.group}</h3>
              {g.links.map((l) => (
                <a
                  key={l.label}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="-mx-2 flex items-center gap-2.5 rounded-lg px-2 py-1.5 font-sans text-sm text-fg transition-colors hover:bg-surface-muted hover:text-primary focus-visible:outline-hidden focus-visible:shadow-focus"
                >
                  <span className="size-icon-sm shrink-0 self-start pt-0.5 text-icon-muted" aria-hidden>{l.icon}</span>
                  <span className="flex flex-col">
                    {l.label}
                    {l.note && <span className="text-xs text-fg-muted">{l.note}</span>}
                  </span>
                </a>
              ))}
            </nav>
          ))}
        </div>
      </Card>

      <Accordion>
        <AccordionItem title="How a payroll run moves" meta={<span className="size-icon text-icon-muted" aria-hidden><HelpIcon /></span>}>
          <StageProgress stages={lifecycle} label="Payroll run lifecycle" />
        </AccordionItem>
      </Accordion>

      <GeneratePanel
        open={generating}
        onClose={() => setGenerating(false)}
        onGenerate={(r) => { setRuns((rs) => [r, ...rs]); setGenerating(false); setSort({ key: 'generated', direction: 'desc' }); setPage(1); setHighlight(r.id); }}
      />
      <RunPanel run={openRun} onClose={() => setOpenId(null)} onAdvance={advance} onSendBack={sendBack} />
    </Shell>
  );
}

const meta = {
  title: 'Sample Screens/Payroll Dashboard',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Cleaner rebuild of the Payroll Management dashboard from library components. Four summary cards (rule 40); one chart card ' +
          'switching between pay and deductions instead of three charts and a second row of year-to-date cards; an actionable approval ' +
          'queue in place of the status donut; the runs table with search, filters, a ViewToggle and row menus (rules 14, 19, 26); every ' +
          'payroll page as one grouped list of links instead of 22 cards; the 13-step workflow folded into a collapsed stage diagram.',
      },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Page: Story = { render: () => <PayrollDashboardPage /> };
