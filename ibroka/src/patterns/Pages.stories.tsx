import type { Meta, StoryObj } from '@storybook/react';
import { useMemo, useState, type ReactNode } from 'react';
import { AppShell } from '../components/AppShell';
import { PageHeader } from '../components/PageHeader';
import { SummaryCard } from '../components/SummaryCard';
import { QuickAction } from '../components/QuickAction';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Table, CellLink, type Column } from '../components/Table';
import { Pagination } from '../components/Pagination';
import { BulkActionsBar } from '../components/BulkActionsBar';
import { ActionMenu } from '../components/ActionMenu';
import { Avatar } from '../components/Avatar';
import { RecordStatus } from '../components/StatusPill';
import { Tabs } from '../components/Tabs';
import { QuickFilter, FilterDropdown } from '../components/FilterDropdown';
import { SegmentedControl } from '../components/SegmentedControl';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { FieldSizeContext } from '../components/Field';
import { FilterBar } from '../components/FilterBar';
import { DatePicker, type DateRange } from '../components/DatePicker';
import { AreaChart, BarChart, RadarChart } from '../components/Charts';
import { StageProgress } from '../components/StageProgress';
import { Alert } from '../components/Alert';
import { ToastProvider, useToast } from '../components/Toast';
import { SidePanel } from '../components/SidePanel';
import { MoneyDisplay } from '../insurance/Money';
import { ExpiryBadge } from '../insurance/ExpiryBadge';
import { PolicyCard } from '../insurance/PolicyCard';
import { PremiumBreakdown } from '../insurance/PremiumBreakdown';
import { InsurerChip } from '../insurance/InsurerChip';
import { DocumentList } from '../insurance/DocumentList';
import {
  CustomersIcon,
  DeleteIcon,
  EditIcon,
  ExpenseIcon,
  ExportIcon,
  GridViewIcon,
  HumanResourcesIcon,
  IncomeIcon,
  LeadsIcon,
  ListViewIcon,
  PlusIcon,
  PremiumIcon,
  ReportIcon,
  SearchIcon,
  UploadIcon,
  UserIcon,
  ViewIcon,
} from '../icons';
import { formatCount, formatDate, formatMoneyShort } from '../lib/money';
import { CASH_FLOW, CLAIMS_BY_MONTH, CLASS_OPTIONS, CLIENT_OPTIONS, INSURER_OPTIONS, NOTIFICATIONS, POLICIES, PREMIUM_BY_DAY, STATUS_OPTIONS, TODAY, USER, type PolicyRow } from '../stories/demo-data';
import { figma } from '../docs/links';

const meta = { title: 'Patterns/Pages', parameters: { layout: 'fullscreen' } } satisfies Meta;
export default meta;
type S = StoryObj;

function Shell({ active, crumbs, children }: { active: string; crumbs: string[]; children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  return (
    <div data-theme={theme}>
      <ToastProvider>
        <AppShell
          sidebar={{ activeId: active, user: USER, onSignOut: () => {}, defaultExpanded: ['insurance'] }}
          topBar={{ breadcrumb: crumbs.map((label) => ({ label })), notifications: NOTIFICATIONS, theme, onThemeChange: setTheme, onMarkAllRead: () => {} }}
        >
          {children}
        </AppShell>
      </ToastProvider>
    </div>
  );
}

const rowActions = (r: PolicyRow) => (
  <ActionMenu
    aria-label={`Actions for ${r.policyNo}`}
    items={[
      { label: 'View', icon: <ViewIcon />, onSelect: () => {} },
      { label: 'Edit', icon: <EditIcon />, tone: 'edit', onSelect: () => {} },
      { label: 'Delete', icon: <DeleteIcon />, tone: 'danger', onSelect: () => {} },
      { label: 'Receive premium', icon: <IncomeIcon />, tone: 'positive', onSelect: () => {} },
    ]}
  />
);

const policyColumns: Column<PolicyRow>[] = [
  { id: 'client', header: 'Client', primary: true, cell: (r) => <Avatar name={r.client} label={r.client} /> },
  { id: 'policyNo', header: 'Policy No', cell: (r) => <CellLink>{r.policyNo}</CellLink> },
  { id: 'type', header: 'Type', cell: (r) => r.type },
  { id: 'premium', header: 'Gross premium', align: 'right', cell: (r) => <MoneyDisplay amount={r.premium} /> },
  { id: 'status', header: 'Status', cell: (r) => <RecordStatus status={r.status} /> },
  { id: 'expiry', header: 'Expiry', cell: (r) => <ExpiryBadge date={r.end} today={TODAY} /> },
];

/** Figma "page" 1: summary cards, quick actions, two cards, a recent-policies table. */
export const Dashboard: S = {
  parameters: { design: { type: 'figma', url: figma('3:2') } },
  render: () => (
    <Shell active="dashboard" crumbs={['Overview', 'Dashboard']}>
      <PageHeader title="Dashboard" description="Welcome back, Ada. Here’s your book of business for October 2026." />
      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-5">
        <SummaryCard label="Income — Oct" value={formatMoneyShort(2_562_988)} icon={<IncomeIcon />} color="green" trend={{ value: 12.4, label: 'vs Sep' }} />
        <SummaryCard label="Users" value={formatCount(3232)} icon={<UserIcon />} color="purple" />
        <SummaryCard label="Total premium" value={formatMoneyShort(398_222_000)} icon={<PremiumIcon />} color="blue" trend={{ value: 4.1, label: 'vs Sep' }} />
        <SummaryCard label="Leads" value="8" icon={<LeadsIcon />} color="teal" hint="3 new this week" />
        <SummaryCard label="Customers" value="34" icon={<CustomersIcon />} color="ink" hint="2 added this month" />
      </div>
      <section aria-labelledby="qa" className="flex flex-col gap-3">
        <h2 id="qa" className="text-20 font-semibold text-fg-strong">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-5 xl:grid-cols-4">
          <QuickAction icon={<PlusIcon />}>Add Transaction</QuickAction>
          <QuickAction tone="blue" icon={<HumanResourcesIcon />}>HR Management</QuickAction>
          <QuickAction tone="green" icon={<ExpenseIcon />}>Add Expense</QuickAction>
          <QuickAction tone="ink" icon={<ReportIcon />}>View Reports</QuickAction>
        </div>
      </section>
      <div className="grid gap-5 xl:grid-cols-2">
        <Card title="Premium this week" actions={<Button variant="outline" size="sm" leadingIcon={<ExportIcon />}>Export</Button>}>
          <AreaChart aria-label="Premium written per day this week" data={PREMIUM_BY_DAY} xKey="day" series={[{ key: 'premium', label: 'Premium' }]} format={formatMoneyShort} height={240} />
        </Card>
        <Card title="Cash flow" actions={<Button size="sm" leadingIcon={<PlusIcon />}>Add expense</Button>}>
          <BarChart aria-label="Income and expenses by month" data={CASH_FLOW} xKey="month" series={[{ key: 'income', label: 'Income' }, { key: 'expense', label: 'Expense', color: 3 }]} format={formatMoneyShort} height={240} />
        </Card>
      </div>
      <Card title="Policies expiring soon" radius="lg" flush actions={<Button variant="outline" size="sm">View all</Button>}>
        <div className="p-4.5">
          <Table caption="Policies expiring soon" columns={policyColumns} rows={POLICIES.filter((p) => ['Expiring', 'Expired', 'Lapsed'].includes(p.status))} rowKey={(r) => r.id} rowActions={rowActions} />
        </div>
      </Card>
    </Shell>
  ),
};

function PolicyList({ view: initialView = 'list', filterStyle }: { view?: 'list' | 'grid'; filterStyle: 'quick' | 'panel' }) {
  const [tab, setTab] = useState('all');
  const [view, setView] = useState(initialView);
  const [selected, setSelected] = useState<string[]>([]);
  const [status, setStatus] = useState('all');
  const [cls, setCls] = useState('all');
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [panel, setPanel] = useState(false);
  const toast = useToast();
  const rows = useMemo(
    () =>
      POLICIES.filter((p) => (status === 'all' || p.status === status) && (tab === 'all' || (tab === 'renewals' ? ['Expiring', 'Expired'].includes(p.status) : p.status === 'Pending approval')) && p.client.toLowerCase().includes(q.toLowerCase())),
    [status, tab, q],
  );
  return (
    <>
      <PageHeader title="Policies" description="Every policy you’ve placed, with its insurer and renewal date." />
      <Tabs aria-label="Policy views" value={tab} onChange={setTab} items={[{ id: 'all', label: 'All policies' }, { id: 'renewals', label: 'Renewals', count: 3 }, { id: 'approval', label: 'Awaiting approval', count: 1 }]} />
      <Card
        radius="lg"
        flush
        title="Policies"
        titleAddon={
          filterStyle === 'quick' ? (
            <div className="flex gap-2.5">
              <QuickFilter label="Status" options={STATUS_OPTIONS} value={status} onChange={setStatus} />
              <QuickFilter label="Class" options={[{ value: 'all', label: 'All' }, ...CLASS_OPTIONS]} value={cls} onChange={setCls} />
            </div>
          ) : (
            <div className="flex gap-2.5">
              <Input size="form" aria-label="Search policies" placeholder="Search client" leadingIcon={<SearchIcon />} value={q} onChange={(e) => setQ(e.target.value)} className="w-[220px]" />
              <FilterDropdown activeCount={status === 'all' ? 0 : 1} onApply={() => {}} onClear={() => setStatus('all')}>
                <FieldSizeContext.Provider value="filter">
                  <Select label="Status" options={STATUS_OPTIONS} value={status} onChange={setStatus} searchable={false} />
                  <Select label="Insurer" options={INSURER_OPTIONS} placeholder="Any" />
                </FieldSizeContext.Provider>
              </FilterDropdown>
            </div>
          )
        }
        actions={
          <>
            <Button leadingIcon={<PlusIcon />} onClick={() => setPanel(true)}>Add policy</Button>
            {filterStyle === 'quick' ? (
              <Button variant="secondary" leadingIcon={<ExportIcon />}>Export</Button>
            ) : (
              <SegmentedControl variant="icon" aria-label="View" value={view} onChange={(v) => setView(v as 'list' | 'grid')} options={[{ value: 'list', label: <ListViewIcon />, 'aria-label': 'List view' }, { value: 'grid', label: <GridViewIcon />, 'aria-label': 'Grid view' }]} />
            )}
          </>
        }
        footer={<Pagination page={page} pageSize={size} total={24} onPageChange={setPage} onPageSizeChange={setSize} className="-mx-4.5 -my-3" />}
      >
        <BulkActionsBar
          count={selected.length}
          noun={['policy', 'policies']}
          onClear={() => setSelected([])}
          actions={
            <>
              <Button size="sm" variant="outline" leadingIcon={<ExportIcon />}>Export</Button>
              <Button size="sm" variant="outline" onClick={() => toast({ title: `Renewal notices sent to ${selected.length} clients` })}>Send renewal notices</Button>
              <Button size="sm" variant="destructive-outline" leadingIcon={<DeleteIcon />}>Delete</Button>
            </>
          }
        />
        <div className="p-4.5">
          {view === 'list' ? (
            <Table caption="Policies" columns={policyColumns} rows={rows} rowKey={(r) => r.id} selectable selected={selected} onSelectedChange={setSelected} rowActions={rowActions} />
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {rows.map((p) => (
                <PolicyCard key={p.id} {...p} today={TODAY} onOpen={() => {}} actions={rowActions(p)} />
              ))}
            </div>
          )}
        </div>
      </Card>
      <SidePanel
        open={panel}
        onClose={() => setPanel(false)}
        title="New policy"
        size="lg"
        footer={
          <>
            <Button variant="outline" onClick={() => setPanel(false)}>Cancel</Button>
            <Button
              onClick={() => {
                setPanel(false);
                toast({ title: 'Policy saved as draft', action: { label: 'View', onClick: () => {} } });
              }}
            >
              Save draft
            </Button>
          </>
        }
      >
        <div className="grid grid-cols-2 gap-4">
          <Select label="Client" required options={CLIENT_OPTIONS} onAddNew={() => {}} addNewLabel="Add new client" className="col-span-2" />
          <Select label="Class of business" required options={CLASS_OPTIONS} />
          <Select label="Insurer" required options={INSURER_OPTIONS} onAddNew={() => {}} addNewLabel="Add new insurer" />
          <DatePicker label="Start date" onChange={() => {}} initialMonth={TODAY} />
          <DatePicker label="End date" onChange={() => {}} initialMonth={TODAY} />
        </div>
      </SidePanel>
    </>
  );
}

/** Figma "page" 2: tabs, quick filters next to the card title, Add + Export, selectable table, pagination. */
export const PolicyListQuickFilters: S = {
  name: 'Policy list (quick filters)',
  parameters: { design: { type: 'figma', url: figma('14:581') } },
  render: () => (
    <Shell active="policies" crumbs={['Insurance', 'Policies']}>
      <PolicyList filterStyle="quick" />
    </Shell>
  ),
};

/** Figma "page" 3: Filter button, Add, list/grid toggle. */
export const PolicyListFilterPanel: S = {
  name: 'Policy list (filter panel)',
  parameters: { design: { type: 'figma', url: figma('15:1380') } },
  render: () => (
    <Shell active="policies" crumbs={['Insurance', 'Policies']}>
      <PolicyList filterStyle="panel" />
    </Shell>
  ),
};

/** The grid view behind the toggle, which Figma doesn't draw. */
export const PolicyGrid: S = {
  name: 'Policy grid',
  parameters: { design: { type: 'figma', url: figma('15:1380') } },
  render: () => (
    <Shell active="policies" crumbs={['Insurance', 'Policies']}>
      <PolicyList filterStyle="panel" view="grid" />
    </Shell>
  ),
};

/** Figma "page" 4: summary cards, filter card, two chart cards. */
export const Report: S = {
  parameters: { design: { type: 'figma', url: figma('15:1891') } },
  render: () => {
    const [r, setR] = useState<DateRange>({ from: new Date(2026, 0, 1), to: TODAY });
    return (
      <Shell active="insurance-reports" crumbs={['Reports', 'Insurance Reports']}>
        <PageHeader title="Insurance report" description="Premium, commission and claims for the selected period." />
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-5">
          <SummaryCard label="Premium YTD" value={formatMoneyShort(398_222_000)} icon={<PremiumIcon />} color="blue" trend={{ value: 8.2, label: 'vs 2025' }} />
          <SummaryCard label="Commission" value={formatMoneyShort(49_777_750)} icon={<IncomeIcon />} color="green" trend={{ value: 6.5, label: 'vs 2025' }} />
          <SummaryCard label="In force" value="412" icon={<ReportIcon />} color="teal" />
          <SummaryCard label="Claims YTD" value="127" icon={<LeadsIcon />} color="red" trend={{ value: 11, label: 'vs 2025', goodWhen: 'down' }} />
          <SummaryCard label="Clients" value="34" icon={<CustomersIcon />} color="ink" />
        </div>
        <FilterBar onApply={() => {}} more={<Select label="Client" options={CLIENT_OPTIONS} placeholder="All clients" />}>
          <DatePicker mode="range" label="Period" value={r} onChange={setR} />
          <Select label="Insurer" options={INSURER_OPTIONS} placeholder="All insurers" />
          <Select label="Class" options={CLASS_OPTIONS} placeholder="All classes" />
        </FilterBar>
        <div className="grid gap-5 xl:grid-cols-2">
          <Card title="Claims by month" actions={<Button variant="outline" size="sm" leadingIcon={<ExportIcon />}>Export</Button>}>
            <RadarChart aria-label="Motor and fire claims by month, January to June" data={CLAIMS_BY_MONTH} xKey="month" series={[{ key: 'motor', label: 'Motor', color: 2 }, { key: 'fire', label: 'Fire', color: 1 }]} />
          </Card>
          <Card title="Premium this week" actions={<Button variant="outline" size="sm" leadingIcon={<ExportIcon />}>Export</Button>}>
            <AreaChart aria-label="Premium written per day this week" data={PREMIUM_BY_DAY} xKey="day" series={[{ key: 'premium', label: 'Premium' }]} format={formatMoneyShort} />
          </Card>
        </div>
      </Shell>
    );
  },
};

/** Record page for one policy: stage, alert, details, premium build-up, co-insurance and documents. */
export const PolicyDetail: S = {
  render: () => {
    const [tab, setTab] = useState('overview');
    const p = POLICIES[0];
    return (
      <Shell active="policies" crumbs={['Insurance', 'Policies', p.policyNo]}>
        <PageHeader
          back={{ label: 'Policies' }}
          title={p.policyNo}
          description={`${p.client} · ${p.type}`}
          actions={
            <>
              <Button variant="outline" leadingIcon={<EditIcon />}>Edit</Button>
              <Button>Renew policy</Button>
            </>
          }
        />
        <Alert tone="warning" title="Expires in 12 days" action={<a href="#" className="text-primary underline">Send renewal notice</a>}>
          Cover ends {formatDate(p.end, 'heading')}. The client hasn’t confirmed renewal.
        </Alert>
        <Card>
          <StageProgress
            aria-label="Policy progress"
            stages={[
              { id: 'd', label: 'Draft', state: 'done', meta: 'Ada Obi · 20 Oct 2025' },
              { id: 'q', label: 'Quoted', state: 'done', meta: 'Harbor General · 22 Oct 2025' },
              { id: 'a', label: 'Approved', state: 'done', meta: 'Kunle Ade · 25 Oct 2025' },
              { id: 'act', label: 'Active', state: 'current', meta: 'Since 30 Oct 2025' },
              { id: 'ren', label: 'Renewed', state: 'upcoming' },
            ]}
          />
        </Card>
        <Tabs aria-label="Policy sections" value={tab} onChange={setTab} items={[{ id: 'overview', label: 'Overview' }, { id: 'claims', label: 'Claims', count: 1 }, { id: 'documents', label: 'Documents', count: 3 }, { id: 'history', label: 'History' }]} />
        <div className="grid gap-5 xl:grid-cols-[1fr_400px]">
          <Card title="Policy details">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-5 text-13 md:grid-cols-3">
              {[
                ['Client', p.client],
                ['Class', p.type],
                ['Status', <RecordStatus key="s" status={p.status} />],
                ['Start date', formatDate(p.start)],
                ['End date', formatDate(p.end)],
                ['Payment', 'Annual'],
                ['Account officer', 'Ada Obi'],
                ['Insurer policy no', 'HGA/AR/26/00412'],
                ['Debit note', 'DN-3321'],
              ].map(([k, v]) => (
                <div key={String(k)} className="flex flex-col gap-1">
                  <dt className="text-fg-muted">{k}</dt>
                  <dd className="font-medium text-fg-strong">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 flex flex-col gap-2 border-t border-line-row pt-4">
              <p className="text-13 font-medium text-fg-strong">Insurers</p>
              <div className="flex flex-wrap gap-2">
                <InsurerChip name="Harbor General Assurance" share={60} lead />
                <InsurerChip name="Lagoon Mutual" share={40} />
              </div>
            </div>
          </Card>
          <div className="flex flex-col gap-5">
            <PremiumBreakdown sumInsured={73_800_000} rate={2.5} taxRate={7.5} commissionRate={12.5} />
            <Card title="Documents" actions={<Button size="sm" variant="outline" leadingIcon={<UploadIcon />}>Upload</Button>} flush>
              <div className="p-3">
                <DocumentList
                  className="border-0"
                  onView={() => {}}
                  onDownload={() => {}}
                  documents={[
                    { id: 'd1', name: 'Policy schedule.pdf', kind: 'Schedule', uploadedAt: '2025-10-30', sizeKb: 248 },
                    { id: 'd2', name: 'Debit note DN-3321.pdf', kind: 'Debit note', uploadedAt: '2025-10-30', sizeKb: 96 },
                    { id: 'd3', name: 'Certificate.pdf', kind: 'Certificate', uploadedAt: '2025-11-02', sizeKb: 120 },
                  ]}
                />
              </div>
            </Card>
          </div>
        </div>
      </Shell>
    );
  },
};
