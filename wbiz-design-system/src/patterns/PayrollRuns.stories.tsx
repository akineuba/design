import type { Meta, StoryObj } from '@storybook/react';
import { useMemo, useState } from 'react';
import { Shell } from './shell';
import { Accordion, AccordionItem } from '../components/Accordion';
import { AvatarLabel } from '../components/Avatar';
import { Button } from '../components/Button';
import { Checkbox } from '../components/Checkbox';
import { ColumnCustomizer, type ColumnCustomizerValue } from '../components/ColumnCustomizer';
import { FilterDropdown, FilterField } from '../components/FilterDropdown';
import { Input } from '../components/Input';
import { Modal } from '../components/Modal';
import { PageHeader } from '../components/PageHeader';
import { Radio, RadioGroup } from '../components/Radio';
import { Select } from '../components/Select';
import { SidePanel } from '../components/SidePanel';
import { StageProgress } from '../components/StageProgress';
import { StatCard } from '../components/StatCard';
import { SummaryCard } from '../components/SummaryCard';
import { StatusPill } from '../components/StatusPill';
import {
  DataTable, Pagination, SearchField, Table, TableBody, TableCard, TableCell, TableFooter, TableHead, TableHeaderCell, TableRow,
  TableToolbar, TableToolbarGroup, type DataTableColumn, type DataTableSort,
} from '../components/Table';
import { Tabs } from '../components/Tabs';
import {
  BanknoteIcon, BlockIcon, ChevronRightIcon, CloseCircleIcon, ExportIcon, EyeIcon, PlusIcon,
  HelpIcon, TickCircleIcon, TransferIcon, TrendUpIcon, UsersIcon, WalletIcon,
} from '../icons';
import {
  naira, payrollEmployees, payrollRuns, payrollStages, statusMeta, statusOrder, type PayrollRun, type RunStatus,
} from './payroll-data';

const PAGE_SIZE = 10;
const opt = (...l: string[]) => l.map((v) => ({ value: v, label: v }));
const net = (r: PayrollRun) => r.gross - r.deductions;
/** Short form for stat cards ("₦ 76.37M"); the exact figure goes in the hint. */
const compact = (n: number) => {
  const short = (v: number, unit: string) => `₦${Number(v.toFixed(1)).toLocaleString('en-NG')}${unit}`;
  return n >= 1e9 ? short(n / 1e9, 'B') : n >= 1e6 ? short(n / 1e6, 'M') : n >= 1e3 ? short(n / 1e3, 'K') : naira(n);
};
const change = (cur: number, prev: number) => (prev ? ((cur - prev) / prev) * 100 : 0);

/** Current stage for StageProgress: the next stage still to happen. */
const stageView = (status: RunStatus) => {
  if (status === 'voided') return { currentId: undefined, stages: payrollStages.map((s) => ({ ...s, status: 'upcoming' as const })) };
  const i = statusOrder.indexOf(status);
  if (status === 'paid') return { currentId: undefined, stages: payrollStages.map((s) => ({ ...s, status: 'complete' as const })) };
  return { currentId: payrollStages[i + 1].id, stages: payrollStages };
};

function RunPanel({ run, onClose, onAdvance, onSendBack }: { run: PayrollRun | null; onClose: () => void; onAdvance: (r: PayrollRun) => void; onSendBack: (r: PayrollRun) => void }) {
  if (!run) return <SidePanel open={false} onClose={onClose} title="" />;
  const meta = statusMeta[run.status];
  const view = stageView(run.status);
  const trail = payrollStages.map((s, i) => {
    const done = run.status !== 'voided' && i <= statusOrder.indexOf(run.status);
    return { ...s, description: done ? (i === 0 ? `Ada Obi · ${run.generated}` : `Approved · ${run.generated}`) : undefined };
  });
  return (
    <SidePanel
      open
      onClose={onClose}
      size="lg"
      title={`Payroll Run · ${run.period}`}
      description={`${run.template} · ${run.id} · generated ${run.generated}`}
      footer={
        meta.next ? (
          <>
            <Button variant="outline" leadingIcon={<CloseCircleIcon />} onClick={onClose}>Cancel</Button>
            {run.status !== 'generated' && <Button variant="secondary" onClick={() => onSendBack(run)}>Send back</Button>}
            <Button leadingIcon={<TickCircleIcon />} onClick={() => onAdvance(run)}>{meta.next}</Button>
          </>
        ) : (
          <Button variant="outline" leadingIcon={<CloseCircleIcon />} onClick={onClose}>Close</Button>
        )
      }
    >
      <div className="flex items-center justify-between gap-3">
        <StatusPill tone={meta.tone}>{meta.label}</StatusPill>
        <Button variant="secondary" size="sm" leadingIcon={<ExportIcon />}>Payslips</Button>
      </div>
      <StageProgress {...view} label="Approval progress" />
      <div className="grid grid-cols-2 gap-4">
        <StatCard label="Gross pay" value={naira(run.gross)} />
        <StatCard label="Deductions" value={naira(run.deductions)} tone="error" />
        <StatCard label="Net pay" value={naira(net(run))} tone="success" />
        <StatCard label="Employees" value={run.staff} tone="primary" />
      </div>
      <Accordion variant="form" defaultValue={['employees']}>
        <AccordionItem value="employees" title="Employees in this run">
          <Table>
            <TableHead>
              <tr><TableHeaderCell>Employee</TableHeaderCell><TableHeaderCell align="right">Gross</TableHeaderCell><TableHeaderCell align="right">Net</TableHeaderCell></tr>
            </TableHead>
            <TableBody>
              {payrollEmployees.map((e) => (
                <TableRow key={e.name}>
                  <TableCell><AvatarLabel name={e.name} description={e.title} /></TableCell>
                  <TableCell align="right">{naira(e.gross)}</TableCell>
                  <TableCell align="right" emphasis="strong">{naira(e.net)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </AccordionItem>
        <AccordionItem value="trail" title="Approval trail">
          <StageProgress orientation="vertical" stages={trail} currentId={view.currentId} label="Approval trail" />
        </AccordionItem>
      </Accordion>
    </SidePanel>
  );
}

function GeneratePanel({ open, onClose, onGenerate }: { open: boolean; onClose: () => void; onGenerate: (r: PayrollRun) => void }) {
  const [templates, setTemplates] = useState(opt('Support Staff', 'Executive Group', 'Mid-Level Staff', 'Junior Staff', 'Interns'));
  const [template, setTemplate] = useState<string | null>(null);
  const [month, setMonth] = useState<string | null>('October');
  const [scope, setScope] = useState('all');
  const [quickAdd, setQuickAdd] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const submit = () => {
    if (!template || !month) return;
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      onGenerate({ id: 'PR-2026-0129', period: `${month} 2026`, template, generated: '21 Oct 2026', generatedSort: 9999, staff: 24, gross: 6_120_000, deductions: 1_468_800, status: 'generated' });
      setTemplate(null);
    }, 700);
  };
  return (
    <>
      <SidePanel
        open={open}
        onClose={onClose}
        size="sm"
        closeOnBackdrop={false}
        title="Generate Payroll"
        description="Creates a run for the chosen period. It then goes through HR, Audit, MD and Accounts approval before payment."
        footer={
          <>
            <Button variant="outline" leadingIcon={<CloseCircleIcon />} onClick={onClose} disabled={busy}>Cancel</Button>
            <Button leadingIcon={<TickCircleIcon />} onClick={submit} loading={busy} disabled={!template || !month}>Generate</Button>
          </>
        }
      >
        <Accordion variant="form" defaultValue={['period', 'staff']}>
          <AccordionItem value="period" title="Pay period">
            <Select label="Payroll Template:" required placeholder="Select template" options={templates} value={template} onChange={setTemplate} menuAction={{ label: 'Add New', onSelect: (q) => setQuickAdd(q) }} />
            <div className="grid grid-cols-2 gap-4">
              <Select label="Month:" required options={opt('September', 'October', 'November', 'December')} value={month} onChange={setMonth} />
              <Select label="Year:" options={opt('2026', '2027')} defaultValue="2026" searchable={false} />
            </div>
            <Input label="Pay Date:" type="date" defaultValue="2026-12-28" />
          </AccordionItem>
          <AccordionItem value="staff" title="Staff and items">
            <RadioGroup label="Include:" value={scope} onChange={setScope}>
              <Radio value="all" label="All eligible staff" />
              <Radio value="selected" label="Selected staff" />
            </RadioGroup>
            {scope === 'selected' && <Select label="Staff:" placeholder="Search employees" options={payrollEmployees.map((e) => ({ value: e.name, label: e.name }))} />}
            <Checkbox label="Apply recurring benefits" defaultChecked />
            <Checkbox label="Apply flexible deductions" defaultChecked />
          </AccordionItem>
        </Accordion>
      </SidePanel>
      <Modal
        open={quickAdd !== null}
        onClose={() => setQuickAdd(null)}
        closeOnBackdrop={false}
        title="New Payroll Template"
        description="Name it now; set up salary items from Payroll › Salary Setup."
        footer={
          <>
            <Button variant="outline" leadingIcon={<CloseCircleIcon />} onClick={() => setQuickAdd(null)}>Cancel</Button>
            <Button
              leadingIcon={<TickCircleIcon />}
              disabled={!quickAdd?.trim()}
              onClick={() => { const v = quickAdd!.trim(); setTemplates([...templates, { value: v, label: v }]); setTemplate(v); setQuickAdd(null); }}
            >
              Save
            </Button>
          </>
        }
      >
        <Input label="Template Name" required autoFocus value={quickAdd ?? ''} onChange={(e) => setQuickAdd(e.target.value)} />
      </Modal>
    </>
  );
}

function PayrollRunsPage() {
  const [tab, setTab] = useState('runs');
  const [runs, setRuns] = useState(payrollRuns);
  const [query, setQuery] = useState('');
  const [statusDraft, setStatusDraft] = useState<string | null>(null);
  const [templateDraft, setTemplateDraft] = useState<string | null>(null);
  const [filters, setFilters] = useState<{ status: string | null; template: string | null }>({ status: null, template: null });
  const [sort, setSort] = useState<DataTableSort | null>({ key: 'generated', direction: 'desc' });
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<string[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);
  const [highlight, setHighlight] = useState<string | undefined>();
  const [generating, setGenerating] = useState(false);
  const [voiding, setVoiding] = useState<PayrollRun | null>(null);
  const [view, setView] = useState<ColumnCustomizerValue>({ columns: ['period', 'generated', 'staff', 'gross', 'net', 'status'], options: [] });

  const update = (id: string, status: RunStatus) => setRuns((rs) => rs.map((r) => (r.id === id ? { ...r, status } : r)));
  const advance = (r: PayrollRun) => { update(r.id, statusOrder[statusOrder.indexOf(r.status) + 1]); setHighlight(r.id); };
  const sendBack = (r: PayrollRun) => { update(r.id, 'generated'); setHighlight(r.id); };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = runs.filter((r) =>
      (!q || `${r.period} ${r.template} ${r.id}`.toLowerCase().includes(q)) &&
      (!filters.status || r.status === filters.status) &&
      (!filters.template || r.template === filters.template));
    if (!sort) return list;
    const val = (r: PayrollRun) => (sort.key === 'net' ? net(r) : sort.key === 'gross' ? r.gross : sort.key === 'staff' ? r.staff : r.generatedSort);
    return [...list].sort((a, b) => (sort.direction === 'asc' ? val(a) - val(b) : val(b) - val(a)));
  }, [runs, query, filters, sort]);
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const rows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const live = runs.filter((r) => r.status !== 'voided');
  const last = [...live].sort((a, b) => b.generatedSort - a.generatedSort)[0];
  const openRun = runs.find((r) => r.id === openId) ?? null;
  const totalNet = live.reduce((s, r) => s + net(r), 0);
  const sum = (list: PayrollRun[], f: (r: PayrollRun) => number) => list.reduce((s, r) => s + f(r), 0);
  const month = last ? last.period.split(' ')[0] : '';
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const prevMonth = monthNames[(monthNames.indexOf(month) + 11) % 12];
  const cur = live.filter((r) => last && r.period === last.period);
  const prev = live.filter((r) => r.period === `${prevMonth} 2026`);
  const activeCount = [filters.status, filters.template].filter(Boolean).length;

  const columns: DataTableColumn<PayrollRun>[] = [
    {
      key: 'period',
      header: 'Period / Template',
      render: (r) => (
        <span className="flex flex-col">
          <span className="font-medium text-fg-ink">{r.period}</span>
          <span className="text-xs text-fg-muted">{r.template}</span>
        </span>
      ),
    },
    { key: 'generated', header: 'Generated', sortable: true },
    { key: 'staff', header: 'Staff', align: 'right', sortable: true },
    { key: 'gross', header: 'Gross Pay', align: 'right', sortable: true, render: (r) => naira(r.gross) },
    { key: 'net', header: 'Net Pay', align: 'right', sortable: true, emphasis: 'strong', render: (r) => naira(net(r)) },
    { key: 'status', header: 'Status', render: (r) => <StatusPill tone={statusMeta[r.status].tone}>{statusMeta[r.status].label}</StatusPill> },
  ];

  return (
    <Shell activeId="human-resources/payroll-management/payroll-runs" breadcrumbs={[{ label: 'Human Resources', href: '#' }, { label: 'Payroll Management', href: '#' }, { label: 'Payroll Runs' }]}>
      <Tabs aria-label="Payroll" value={tab} onChange={setTab} items={[{ value: 'runs', label: 'Payroll Runs' }, { value: 'history', label: 'History' }, { value: 'summary', label: 'Summary' }]} />
      <PageHeader
        title="Payroll Runs"
        description="Generate payroll, take it through approval and mark it paid."
        actions={<div className="w-filter-control"><Select aria-label="Year" size="sm" options={opt('2026', '2025')} defaultValue="2026" searchable={false} /></div>}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard label={`Net pay — ${month}`} value={compact(sum(cur, net))} icon={<BanknoteIcon />} color="green" trend={{ value: change(sum(cur, net), sum(prev, net)), label: `vs ${prevMonth}` }} />
        <SummaryCard label={`Gross pay — ${month}`} value={compact(sum(cur, (r) => r.gross))} icon={<TrendUpIcon />} color="blue" trend={{ value: change(sum(cur, (r) => r.gross), sum(prev, (r) => r.gross)), label: `vs ${prevMonth}` }} />
        <SummaryCard label={`Employees — ${month}`} value={sum(cur, (r) => r.staff)} icon={<UsersIcon />} color="amber" hint={`${cur.length} run${cur.length === 1 ? '' : 's'} this month`} />
        <SummaryCard label="YTD net pay — 2026" value={compact(totalNet)} icon={<WalletIcon />} color="teal" hint={`${live.length} runs total`} />
      </div>

      {last && (
        <section aria-label="Last generated run" className="flex flex-wrap items-center gap-x-8 gap-y-3 rounded-lg border border-line-subtle bg-surface px-6 py-4">
          <div className="flex flex-col">
            <span className="font-sans text-xs text-fg-muted">Last generated</span>
            <span className="flex items-center gap-3 font-sans text-md font-semibold text-fg-ink">
              {last.period} <StatusPill tone={statusMeta[last.status].tone}>{statusMeta[last.status].label}</StatusPill>
            </span>
          </div>
          <div className="flex flex-col"><span className="font-sans text-xs text-fg-muted">Net pay</span><span className="font-sans text-sm font-medium text-fg-ink">{naira(net(last))}</span></div>
          <div className="flex flex-col"><span className="font-sans text-xs text-fg-muted">Employees</span><span className="font-sans text-sm font-medium text-fg-ink">{last.staff}</span></div>
          <div className="flex flex-col"><span className="font-sans text-xs text-fg-muted">Generated</span><span className="font-sans text-sm font-medium text-fg-ink">{last.generated}</span></div>
          <div className="flex flex-col"><span className="font-sans text-xs text-fg-muted">Template</span><span className="font-sans text-sm font-medium text-fg-ink">{last.template}</span></div>
          <Button className="ml-auto" variant="secondary" size="sm" trailingIcon={<ChevronRightIcon />} onClick={() => setOpenId(last.id)}>View details</Button>
        </section>
      )}

      <TableCard>
        <TableToolbar>
          <TableToolbarGroup>
            <SearchField aria-label="Search payroll runs" placeholder="Search period" value={query} onChange={(e) => { setQuery(e.target.value); setPage(1); }} />
            <FilterDropdown
              activeCount={activeCount}
              onApply={() => { setFilters({ status: statusDraft, template: templateDraft }); setPage(1); }}
              onReset={() => { setStatusDraft(null); setTemplateDraft(null); setFilters({ status: null, template: null }); setPage(1); }}
            >
              <FilterField label="Status:">
                <Select aria-label="Status" size="sm" placeholder="All statuses" value={statusDraft} onChange={setStatusDraft} options={(Object.keys(statusMeta) as RunStatus[]).map((k) => ({ value: k, label: statusMeta[k].label }))} />
              </FilterField>
              <FilterField label="Template:">
                <Select aria-label="Template" size="sm" placeholder="All templates" value={templateDraft} onChange={setTemplateDraft} options={opt(...new Set(payrollRuns.map((r) => r.template)))} />
              </FilterField>
            </FilterDropdown>
          </TableToolbarGroup>
          <TableToolbarGroup>
            <Button variant="secondary" leadingIcon={<ExportIcon />}>{selected.length ? `Export (${selected.length})` : 'Export'}</Button>
            <ColumnCustomizer
              columns={columns.map((c, i) => ({ key: c.key, label: String(c.header), locked: i === 0 }))}
              value={view}
              onChange={setView}
            />
            <Button leadingIcon={<PlusIcon />} onClick={() => setGenerating(true)}>Generate Payroll</Button>
          </TableToolbarGroup>
        </TableToolbar>
          <DataTable
            caption="Payroll runs"
            columns={columns}
            visibleColumns={view.columns}
            rows={rows}
            getRowId={(r) => r.id}
            selectable
            selectedIds={selected}
            onSelectedIdsChange={setSelected}
            sort={sort}
            onSortChange={(s) => { setSort(s); setPage(1); }}
            onRowClick={(r) => setOpenId(r.id)}
            activeRowId={highlight}
            rowActions={(r) => [
              { id: 'view', label: 'View', tone: 'view', icon: <EyeIcon />, onSelect: () => setOpenId(r.id) },
              ...(statusMeta[r.status].next ? [{ id: 'advance', label: statusMeta[r.status].next!, tone: 'positive' as const, icon: <TickCircleIcon />, onSelect: () => advance(r) }] : []),
              { id: 'payslips', label: 'Payslips', tone: 'link', icon: <TransferIcon /> },
              ...(r.status !== 'paid' && r.status !== 'voided' ? [{ id: 'void', label: 'Void', tone: 'delete' as const, icon: <BlockIcon />, onSelect: () => setVoiding(r) }] : []),
            ]}
            empty={query || activeCount ? 'No payroll runs match your search or filters.' : 'No payroll runs yet. Generate the first one.'}
          />
          <TableFooter summary={filtered.length ? `Showing ${(page - 1) * PAGE_SIZE + 1} to ${Math.min(page * PAGE_SIZE, filtered.length)} of ${filtered.length} entries` : 'Showing 0 entries'}>
            <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />
          </TableFooter>
      </TableCard>

      <Accordion>
        <AccordionItem title="What happens during payroll generation?" meta={<span className="size-icon text-icon-muted" aria-hidden><HelpIcon /></span>}>
          <p className="font-sans text-sm text-fg-muted">
            Generating a payroll calculates gross pay, salary additions, deductions and tax for every included employee, using the chosen template.
            The run then moves through each approval in order; only the person at the current stage can approve it or send it back. Once Accounts approve, it can be marked paid and payslips are released.
          </p>
          <StageProgress stages={payrollStages} currentId="hr" label="Approval stages" />
        </AccordionItem>
      </Accordion>

      <GeneratePanel
        open={generating}
        onClose={() => setGenerating(false)}
        onGenerate={(r) => { setRuns((rs) => [r, ...rs]); setGenerating(false); setSort({ key: 'generated', direction: 'desc' }); setPage(1); setHighlight(r.id); }}
      />
      <RunPanel run={openRun} onClose={() => setOpenId(null)} onAdvance={advance} onSendBack={sendBack} />
      <Modal
        open={voiding !== null}
        onClose={() => setVoiding(null)}
        closeOnBackdrop={false}
        title={`Void ${voiding?.period ?? ''} payroll?`}
        description="The run is cancelled and can't be approved or paid. Generate a new run to replace it. This can't be undone."
        footer={
          <>
            <Button variant="outline" leadingIcon={<CloseCircleIcon />} onClick={() => setVoiding(null)}>Cancel</Button>
            <Button variant="destructive" leadingIcon={<BlockIcon />} onClick={() => { if (voiding) update(voiding.id, 'voided'); setVoiding(null); }}>Void payroll</Button>
          </>
        }
      />
    </Shell>
  );
}

const meta = {
  title: 'Patterns/Payroll Runs',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Redesign of the Payroll Generation screen using only library components and the UI rules. ' +
          'Generate Payroll opens a right-hand panel (rule 2) whose template dropdown is searchable with a quick-add modal (rule 1); ' +
          'rows open the run in a side panel with its approval stages (rules 33–36); Void is confirmed in a centred modal (rule 5); ' +
          'status filters live in the Filters dropdown next to search (rule 19).',
      },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Page: Story = { render: () => <PayrollRunsPage /> };
