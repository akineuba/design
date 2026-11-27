// Guide screenshots for Wragby Product Verse, built only from @wbiz/design-system components.
// Scratch harness (not part of the library): rendered at /shots.html#<screen> and captured with Playwright.
import { useState, type ReactNode } from 'react';
import { Shell } from '../sample-screens/shell';
import { FilledIn as InvoiceFilled } from '../sample-screens/NewInvoice.stories';
import { Alert } from '../components/Alert';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { PageHeader } from '../components/PageHeader';
import { Select } from '../components/Select';
import { SidePanel } from '../components/SidePanel';
import { StageProgress } from '../components/StageProgress';
import { StatusPill } from '../components/StatusPill';
import { SummaryCard } from '../components/SummaryCard';
import {
  DataTable, Pagination, SearchField, Table, TableBody, TableCard, TableCell, TableFooter, TableHead, TableHeaderCell, TableRow,
  TableToolbar, TableToolbarGroup, type DataTableColumn,
} from '../components/Table';
import { Tabs } from '../components/Tabs';
import {
  BankIcon, CalendarIcon, ClipboardCheckIcon, CoinIcon, DocumentIcon, ExportIcon, EyeIcon, PlusIcon, ReceiptIcon, SaveIcon,
  SendIcon, TrashIcon, WalletIcon, AwardIcon, ClockIcon, EditIcon,
} from '../icons';
import { BarChart, ChartLegend, type ChartSeries } from '../sample-screens/payroll-charts';

const opt = (...l: string[]) => l.map((v) => ({ value: v, label: v }));
const naira = (n: number) => '₦' + n.toLocaleString('en-NG');

/* ------------------------------------------------------------------ Dashboard (hero) */
const cashSeries: ChartSeries[] = [
  { key: 'income', name: 'Money in', tone: 'chart-1' },
  { key: 'expense', name: 'Money out', tone: 'chart-2' },
];
const cashData = [
  ['Jun', 31.2, 22.4], ['Jul', 34.8, 24.1], ['Aug', 29.6, 23.8], ['Sep', 38.1, 26.2], ['Oct', 41.5, 27.9], ['Nov', 48.2, 29.3],
].map(([label, a, b]) => ({ label: label as string, values: { income: (a as number) * 1e6, expense: (b as number) * 1e6 } }));

interface Approval { id: string; what: string; who: string; amount: number; status: { label: string; tone: 'warning' | 'info' } }
const approvals: Approval[] = [
  { id: 'PR-0418', what: 'Purchase requisition · Laptops (4)', who: 'Chidi Eze', amount: 3_480_000, status: { label: 'Awaiting you', tone: 'warning' } },
  { id: 'EXP-2207', what: 'Expense claim · Client visit, Abuja', who: 'Funke Ade', amount: 186_500, status: { label: 'Awaiting you', tone: 'warning' } },
  { id: 'INV-1093', what: 'Invoice · Zenith Logistics', who: 'Tunde Bello', amount: 2_150_000, status: { label: 'In review', tone: 'info' } },
  { id: 'LV-0310', what: 'Leave · 5 days annual leave', who: 'Ngozi Okafor', amount: 0, status: { label: 'In review', tone: 'info' } },
];

function Dashboard() {
  const cols: DataTableColumn<Approval>[] = [
    { key: 'id', header: 'Ref' },
    { key: 'what', header: 'Request' },
    { key: 'who', header: 'Raised by' },
    { key: 'amount', header: 'Amount', align: 'right', render: (a) => (a.amount ? naira(a.amount) : '—') },
    { key: 'status', header: 'Status', render: (a) => <StatusPill tone={a.status.tone}>{a.status.label}</StatusPill> },
  ];
  return (
    <Shell activeId="home" breadcrumbs={[{ label: 'Dashboard' }]}>
      <PageHeader
        title="Good afternoon, Ada"
        description="How Wragby Business Solutions is doing this month."
        actions={<>
          <Button variant="secondary" leadingIcon={<CalendarIcon />}>This month</Button>
          <Button leadingIcon={<PlusIcon />}>New invoice</Button>
        </>}
      />
      <div className="grid grid-cols-4 gap-4">
        <SummaryCard label="Revenue" value="₦48.2m" icon={<ReceiptIcon />} color="green" trend={{ value: 16.1, label: 'vs last month' }} />
        <SummaryCard label="Unpaid invoices" value="₦9.6m" icon={<DocumentIcon />} color="amber" trend={{ value: -4.2, label: 'vs last month', goodWhen: 'down' }} />
        <SummaryCard label="Bills due this week" value="₦3.1m" icon={<WalletIcon />} color="red" hint="7 bills" />
        <SummaryCard label="Cash at bank" value="₦21.4m" icon={<BankIcon />} color="blue" trend={{ value: 8.3, label: 'vs last month' }} />
      </div>
      <div className="grid grid-cols-5 gap-4">
        <Card className="col-span-3" title="Money in and out" description="Last 6 months" actions={<ChartLegend series={cashSeries} />}>
          <BarChart title="Money in and out" series={cashSeries} data={cashData} format={(n) => '₦' + (n / 1e6).toFixed(0) + 'm'} />
        </Card>
        <Card className="col-span-2" title="Waiting for approval" description="4 requests need a decision" divided>
          <div className="flex flex-col">
            {approvals.map((a) => (
              <div key={a.id} className="flex items-center justify-between gap-3 border-b border-line-subtle py-3 last:border-b-0">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-fg-ink">{a.what}</p>
                  <p className="text-xs text-fg-muted">{a.id} · {a.who}</p>
                </div>
                <StatusPill tone={a.status.tone}>{a.status.label}</StatusPill>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <TableCard>
        <TableToolbar>
          <TableToolbarGroup><p className="text-md font-semibold text-fg-ink">Recent activity</p></TableToolbarGroup>
          <TableToolbarGroup><Button variant="secondary" leadingIcon={<ExportIcon />}>Export</Button></TableToolbarGroup>
        </TableToolbar>
        <DataTable caption="Recent activity" columns={cols} rows={approvals} getRowId={(a) => a.id} />
      </TableCard>
    </Shell>
  );
}

/* ------------------------------------------------------------------ Purchase requisition */
interface Req { id: string; dept: string; items: string; total: number; date: string; status: { label: string; tone: 'warning' | 'info' | 'success' | 'neutral' } }
const reqs: Req[] = [
  { id: 'PR-0421', dept: 'Operations', items: 'Office chairs (12)', total: 1_440_000, date: '26 Nov 2026', status: { label: 'Draft', tone: 'neutral' } },
  { id: 'PR-0420', dept: 'Finance', items: 'Printer toner (8)', total: 264_000, date: '25 Nov 2026', status: { label: 'Pending approval', tone: 'warning' } },
  { id: 'PR-0419', dept: 'Sales', items: 'Branded notebooks (200)', total: 520_000, date: '24 Nov 2026', status: { label: 'Approved', tone: 'success' } },
  { id: 'PR-0418', dept: 'IT', items: 'Laptops (4)', total: 3_480_000, date: '22 Nov 2026', status: { label: 'Pending approval', tone: 'warning' } },
  { id: 'PR-0417', dept: 'Human Resources', items: 'Training venue hire', total: 750_000, date: '20 Nov 2026', status: { label: 'Converted to PO', tone: 'info' } },
  { id: 'PR-0416', dept: 'Operations', items: 'Diesel (2,000 L)', total: 2_100_000, date: '18 Nov 2026', status: { label: 'Approved', tone: 'success' } },
];
const reqLines = [
  { item: 'Laptop, 14" (Core i7, 16 GB)', qty: 4, unit: 820_000 },
  { item: 'Laptop bag', qty: 4, unit: 35_000 },
];

function Requisition() {
  const cols: DataTableColumn<Req>[] = [
    { key: 'id', header: 'Requisition No.', emphasis: 'link' },
    { key: 'dept', header: 'Department' },
    { key: 'items', header: 'Items' },
    { key: 'total', header: 'Est. Total', align: 'right', render: (r) => naira(r.total) },
    { key: 'date', header: 'Date' },
    { key: 'status', header: 'Status', render: (r) => <StatusPill tone={r.status.tone}>{r.status.label}</StatusPill> },
  ];
  const total = reqLines.reduce((s, l) => s + l.qty * l.unit, 0);
  return (
    <Shell activeId="inventory/requisitions" breadcrumbs={[{ label: 'Procurement', href: '#' }, { label: 'Purchase Requisitions' }]}>
      <PageHeader title="Purchase Requisitions" description="Ask for the goods or services your team needs." />
      <TableCard>
        <TableToolbar>
          <TableToolbarGroup><SearchField aria-label="Search requisitions" placeholder="Search" /></TableToolbarGroup>
          <TableToolbarGroup><Button leadingIcon={<PlusIcon />}>New Requisition</Button></TableToolbarGroup>
        </TableToolbar>
        <DataTable caption="Requisitions" columns={cols} rows={reqs} getRowId={(r) => r.id} />
      </TableCard>
      <SidePanel
        open
        onClose={() => {}}
        title="New Purchase Requisition"
        description="Save it as a draft, or send it for approval."
        footer={<>
          <Button variant="outline" leadingIcon={<SaveIcon />}>Save as draft</Button>
          <Button leadingIcon={<SendIcon />}>Send for approval</Button>
        </>}
      >
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Requisition No.:" defaultValue="PR-0422" readOnly />
            <Input label="Request Date:" defaultValue="27 Nov 2026" trailingIcon={<CalendarIcon />} readOnly />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Select label="Department:" required defaultValue="IT" options={opt('IT', 'Finance', 'Operations', 'Sales', 'Human Resources')} />
            <Select label="Priority:" defaultValue="Normal" options={opt('Low', 'Normal', 'Urgent')} />
          </div>
          <Input label="Reason for request:" defaultValue="Replace four laptops that are out of warranty" />
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-fg-black">Items:</p>
            <Table>
              <TableHead>
                <TableRow><TableHeaderCell>Item</TableHeaderCell><TableHeaderCell align="right">Qty</TableHeaderCell><TableHeaderCell align="right">Est. Unit Cost</TableHeaderCell><TableHeaderCell align="right">Amount</TableHeaderCell><TableHeaderCell aria-label="Remove" /></TableRow>
              </TableHead>
              <TableBody>
                {reqLines.map((l) => (
                  <TableRow key={l.item}>
                    <TableCell emphasis="strong">{l.item}</TableCell>
                    <TableCell align="right">{l.qty}</TableCell>
                    <TableCell align="right">{naira(l.unit)}</TableCell>
                    <TableCell align="right">{naira(l.qty * l.unit)}</TableCell>
                    <TableCell align="right"><Button variant="tertiary" size="sm" iconOnly aria-label="Remove line"><TrashIcon /></Button></TableCell>
                  </TableRow>
                ))}
                <TableRow><TableCell emphasis="strong" colSpan={3}>Estimated total</TableCell><TableCell align="right" emphasis="strong">{naira(total)}</TableCell><TableCell /></TableRow>
              </TableBody>
            </Table>
            <div><Button variant="tertiary" size="sm" leadingIcon={<PlusIcon />}>Add item</Button></div>
          </div>
          <Select label="Approver:" defaultValue="Ada Obi (Head, Operations)" options={opt('Ada Obi (Head, Operations)', 'Kunle Ade (CFO)')} hint="Set in Approval Settings. The request goes here first." />
        </div>
      </SidePanel>
    </Shell>
  );
}

/* ------------------------------------------------------------------ My workspace (My Portal) */
interface MyReq { id: string; type: string; detail: string; submitted: string; status: { label: string; tone: 'warning' | 'success' | 'info' | 'neutral' } }
const myReqs: MyReq[] = [
  { id: 'LV-0311', type: 'Leave', detail: 'Annual leave · 22–26 Dec', submitted: '24 Nov 2026', status: { label: 'Pending', tone: 'warning' } },
  { id: 'EXP-2210', type: 'Expense', detail: 'Client lunch · ₦38,500', submitted: '21 Nov 2026', status: { label: 'Approved', tone: 'success' } },
  { id: 'EXP-2198', type: 'Expense', detail: 'Taxi, Lekki–VI · ₦48,000', submitted: '14 Nov 2026', status: { label: 'Paid', tone: 'info' } },
  { id: 'LN-0042', type: 'Loan', detail: 'Salary advance · ₦500,000', submitted: '02 Oct 2026', status: { label: 'Repaying', tone: 'neutral' } },
];

function MyWorkspace() {
  const [tab, setTab] = useState('overview');
  const cols: DataTableColumn<MyReq>[] = [
    { key: 'type', header: 'Type' },
    { key: 'detail', header: 'Details' },
    { key: 'submitted', header: 'Submitted' },
    { key: 'status', header: 'Status', render: (r) => <StatusPill tone={r.status.tone}>{r.status.label}</StatusPill> },
  ];
  return (
    <Shell activeId="human-resources" breadcrumbs={[{ label: 'My Portal', href: '#' }, { label: 'My workspace' }]}>
      <Tabs aria-label="My Portal" value={tab} onChange={setTab} items={[{ value: 'overview', label: 'Overview' }, { value: 'leave', label: 'Leave' }, { value: 'expenses', label: 'Expenses' }, { value: 'loans', label: 'Loans' }, { value: 'appraisal', label: 'Appraisal' }]} />
      <PageHeader
        title="My workspace"
        description="Your own leave, expenses, loans and appraisal."
        actions={<>
          <Button variant="secondary" leadingIcon={<ReceiptIcon />}>New expense claim</Button>
          <Button leadingIcon={<CalendarIcon />}>Request leave</Button>
        </>}
      />
      <Alert tone="info" title="Some requests need HR first">Leave types, loan types and appraisal cycles are set up by HR. If one you need is missing, ask your HR team.</Alert>
      <div className="grid grid-cols-4 gap-4">
        <SummaryCard label="Leave left" value="14 days" icon={<CalendarIcon />} color="green" hint="of 20 this year" />
        <SummaryCard label="Claims in progress" value="₦86,500" icon={<ReceiptIcon />} color="amber" hint="2 claims" />
        <SummaryCard label="Loan balance" value="₦420,000" icon={<CoinIcon />} color="blue" hint="Ends Mar 2027" />
        <SummaryCard label="Next appraisal" value="12 Dec" icon={<AwardIcon />} color="teal" hint="Q4 review" />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <TableCard className="col-span-2">
          <TableToolbar>
            <TableToolbarGroup><p className="text-md font-semibold text-fg-ink">My requests</p></TableToolbarGroup>
            <TableToolbarGroup><Button variant="tertiary" leadingIcon={<EyeIcon />}>View all</Button></TableToolbarGroup>
          </TableToolbar>
          <DataTable caption="My requests" columns={cols} rows={myReqs} getRowId={(r) => r.id} />
        </TableCard>
        <Card title="Q4 appraisal" description="Due 12 Dec 2026">
          <StageProgress
            orientation="vertical"
            label="Appraisal stages"
            currentId="manager"
            stages={[
              { id: 'goals', label: 'Goals agreed', description: '3 Oct', status: 'complete' },
              { id: 'self', label: 'Self review', description: 'Submitted 20 Nov', status: 'complete' },
              { id: 'manager', label: 'Manager review', description: 'With Ada Obi', status: 'current' },
              { id: 'hr', label: 'HR sign-off', status: 'upcoming' },
            ]}
          />
        </Card>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ Router */
const screens: Record<string, () => ReactNode> = {
  'wbiz-dashboard': () => <Dashboard />,
  'wbiz-requisition': () => <Requisition />,
  'wbiz-workspace': () => <MyWorkspace />,
  'wbiz-invoice': () => (InvoiceFilled.render as () => ReactNode)(),
};
export const screenNames = Object.keys(screens);
export function Screen({ name }: { name: string }) {
  const S = screens[name] ?? screens['wbiz-dashboard'];
  return <>{S()}</>;
}
// Silence unused-import lint for icons kept for quick edits.
void [ClipboardCheckIcon, ClockIcon, EditIcon, TableFooter, Pagination];
