import type { ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useMemo, useState } from 'react';
import { Table, CellLink, CellWithNote, type Column } from '../components/Table';
import { Pagination } from '../components/Pagination';
import { BulkActionsBar } from '../components/BulkActionsBar';
import { ColumnCustomizer } from '../components/ColumnCustomizer';
import { ActionMenu } from '../components/ActionMenu';
import { Avatar } from '../components/Avatar';
import { RecordStatus } from '../components/StatusPill';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { EmptyState } from '../components/EmptyState';
import { MoneyDisplay } from '../insurance/Money';
import { ExpiryBadge } from '../insurance/ExpiryBadge';
import { DeleteIcon, EditIcon, ExportIcon, IncomeIcon, PlusIcon, SearchIcon, ViewIcon } from '../icons';
import { formatDate } from '../lib/money';
import { POLICIES, TODAY, type PolicyRow } from './demo-data';
import { figma } from '../docs/links';

const columns: Column<PolicyRow>[] = [
  { id: 'client', header: 'Client', primary: true, sortable: true, cell: (r) => <Avatar name={r.client} label={r.client} /> },
  { id: 'policyNo', header: 'Policy No', cell: (r) => <CellLink>{r.policyNo}</CellLink> },
  { id: 'type', header: 'Type', cell: (r) => r.type },
  { id: 'insurer', header: 'Insurer', cell: (r) => r.insurer },
  { id: 'end', header: 'Expiry', sortable: true, cell: (r) => formatDate(r.end) },
  { id: 'premium', header: 'Gross premium', align: 'right', sortable: true, cell: (r) => <MoneyDisplay amount={r.premium} /> },
  { id: 'status', header: 'Status', cell: (r) => <RecordStatus status={r.status} /> },
];
const actions = (r: PolicyRow) => (
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

const meta = {
  title: 'Components/Table',
  component: Table,
  parameters: { layout: 'padded', design: { type: 'figma', url: figma('14:1038') } },
  args: { columns: columns as Column<unknown>[], rows: POLICIES.slice(0, 6), rowKey: (r: unknown) => (r as PolicyRow).id, caption: 'Policies' },
} satisfies Meta<typeof Table>;
export default meta;
type S = StoryObj<typeof meta>;

export const Standard: S = {};
export const WithRowActions: S = { args: { rowActions: actions as (r: unknown) => ReactNode } };
export const Loading: S = { args: { loading: true } };
export const Empty: S = { args: { rows: [], empty: <EmptyState compact title="No policies yet" description="Policies you place appear here." action={<Button leadingIcon={<PlusIcon />}>Add policy</Button>} /> } };
export const NoResults: S = { args: { rows: [], empty: <EmptyState compact icon={<SearchIcon />} title="No policies match these filters" action={<Button variant="outline">Clear filters</Button>} /> } };
/** "Policies expiring soon" from the live dashboard, with days left in words and red for passed dates. */
export const ExpiringSoon: S = {
  args: {
    rows: POLICIES.filter((p) => ['Expiring', 'Expired', 'Lapsed'].includes(p.status)),
    columns: [
      { id: 'client', header: 'Client', primary: true, cell: (r: PolicyRow) => r.client },
      { id: 'policyNo', header: 'Policy No', cell: (r: PolicyRow) => <CellLink>{r.policyNo}</CellLink> },
      { id: 'type', header: 'Type', cell: (r: PolicyRow) => r.type },
      { id: 'premium', header: 'Gross premium', align: 'right', cell: (r: PolicyRow) => <MoneyDisplay amount={r.premium} /> },
      { id: 'expiry', header: 'Expiry', cell: (r: PolicyRow) => <ExpiryBadge date={r.end} today={TODAY} showDate /> },
      { id: 'owed', header: 'Outstanding', align: 'right', cell: (r: PolicyRow) => (r.status === 'Expired' ? <CellWithNote tone="danger" value={<MoneyDisplay amount={r.premium} />} note="Overdue by 23 days" /> : '—') },
    ] as Column<unknown>[],
  },
};

/** The full Figma list card: selection, bulk bar, column picker, actions and pagination working together. */
export const ListCard: S = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(['p1']);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [sort, setSort] = useState<{ id: string; dir: 'asc' | 'desc' }>({ id: 'client', dir: 'asc' });
    const [visible, setVisible] = useState(columns.map((c) => c.id));
    const rows = useMemo(() => {
      const k = sort.id as keyof PolicyRow;
      return [...POLICIES].sort((a, b) => (a[k] > b[k] ? 1 : -1) * (sort.dir === 'asc' ? 1 : -1));
    }, [sort]);
    return (
      <Card
        radius="lg"
        flush
        title="Policies"
        actions={
          <>
            <ColumnCustomizer columns={columns.map((c) => ({ id: c.id, label: String(c.header), locked: c.id === 'client' }))} visible={visible} onChange={setVisible} onReset={() => setVisible(columns.map((c) => c.id))} />
            <Button variant="secondary" leadingIcon={<ExportIcon />}>Export</Button>
            <Button leadingIcon={<PlusIcon />}>Add policy</Button>
          </>
        }
        footer={<Pagination page={page} pageSize={size} total={24} onPageChange={setPage} onPageSizeChange={setSize} className="-mx-4.5 -my-3" />}
        className="h-[720px]"
      >
        <BulkActionsBar
          count={selected.length}
          noun={['policy', 'policies']}
          onClear={() => setSelected([])}
          actions={
            <>
              <Button size="sm" variant="outline" leadingIcon={<ExportIcon />}>Export</Button>
              <Button size="sm" variant="outline">Send renewal notices</Button>
              <Button size="sm" variant="destructive-outline" leadingIcon={<DeleteIcon />}>Delete</Button>
            </>
          }
        />
        <div className="p-4.5">
          <Table
            caption="Policies"
            columns={columns.filter((c) => visible.includes(c.id))}
            rows={rows}
            rowKey={(r) => r.id}
            selectable
            selected={selected}
            onSelectedChange={setSelected}
            sort={sort}
            onSortChange={setSort}
            rowActions={actions}
            stickyFirstColumn
          />
        </div>
      </Card>
    );
  },
};
export const PaginationOnly: S = { render: () => { const [p, setP] = useState(1); return <div className="w-[760px] rounded-lg bg-surface shadow-card"><Pagination page={p} pageSize={10} total={240} onPageChange={setP} onPageSizeChange={() => {}} /></div>; } };
