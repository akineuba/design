// Story-only building blocks shared by the Table stories and the page patterns.
import { useMemo, useState, type ReactNode } from 'react';
import type { ActionMenuItem } from '../components/ActionMenu';
import { AvatarLabel } from '../components/Avatar';
import { Button } from '../components/Button';
import { ColumnCustomizer, type ColumnCustomizerValue } from '../components/ColumnCustomizer';
import { FilterDropdown, FilterField } from '../components/FilterDropdown';
import { Select } from '../components/Select';
import { StatusPill } from '../components/StatusPill';
import { Switch } from '../components/Switch';
import {
  DataTable, Pagination, SearchField, Table, TableBody, TableCard, TableCell, TableFooter, TableHead, TableHeaderCell,
  TableRow, TableSectionRow, TableToolbar, TableToolbarGroup, type DataTableColumn, type DataTableSort,
} from '../components/Table';
import { BlockIcon, BulkUploadIcon, CloudDownloadIcon, EditIcon, EyeIcon, ExportIcon, MoneyReceiveIcon, PlusIcon, TransferIcon } from '../icons';
import { accounts, bills, customers, employees, trialBalance, type Account, type Bill, type Customer, type Employee } from './demo-data';

export const customerActions = (c: Customer, onView?: (c: Customer) => void, onEdit?: (c: Customer) => void): ActionMenuItem[] => [
  { id: 'view', label: 'View', tone: 'view', icon: <EyeIcon />, onSelect: () => onView?.(c) },
  { id: 'edit', label: 'Edit', tone: 'edit', icon: <EditIcon />, onSelect: () => onEdit?.(c) },
  { id: 'delete', label: 'Delete', tone: 'delete', icon: <BlockIcon /> },
  { id: 'transactions', label: 'Transactions', tone: 'link', icon: <TransferIcon /> },
  { id: 'receive', label: 'Receive Payment', tone: 'positive', icon: <MoneyReceiveIcon /> },
];

export const customerColumns: DataTableColumn<Customer>[] = [
  { key: 'name', header: 'Name', emphasis: 'strong', sortable: true },
  { key: 'company', header: 'Company', sortable: true },
  { key: 'email', header: 'Email', sortable: true },
  { key: 'phone', header: 'Phone Number' },
  { key: 'receivables', header: 'Receivables' },
];

const columnOptions = (cols: DataTableColumn<never>[] | DataTableColumn<Customer>[]) =>
  (cols as Array<{ key: string; header: ReactNode }>).map((c, i) => ({ key: c.key, label: String(c.header), locked: i === 0 }));

const sortBy = <T,>(rows: T[], sort: DataTableSort | null) =>
  !sort ? rows : [...rows].sort((a, b) => {
    const x = String((a as Record<string, unknown>)[sort.key]);
    const y = String((b as Record<string, unknown>)[sort.key]);
    return sort.direction === 'asc' ? x.localeCompare(y) : y.localeCompare(x);
  });

export interface CustomersTableProps {
  loading?: boolean;
  empty?: boolean;
  onAddNew?: () => void;
  onView?: (c: Customer) => void;
  onEdit?: (c: Customer) => void;
  /** People-style first column with initials avatars. */
  avatars?: boolean;
}

/** Customers list (Sales > Customers, 191:3274): selection, sort, filters, column picker, row actions. */
export function CustomersTable({ loading, empty, onAddNew, onView, onEdit, avatars = false }: CustomersTableProps) {
  const [query, setQuery] = useState('');
  const [type, setType] = useState<string | null>(null);
  const [applied, setApplied] = useState<string | null>(null);
  const [sort, setSort] = useState<DataTableSort | null>(null);
  const [selected, setSelected] = useState<string[]>([customers[0].id, customers[1].id]);
  const [page, setPage] = useState(1);
  const [view, setView] = useState<ColumnCustomizerValue>({ columns: customerColumns.map((c) => c.key), options: [] });

  const columns = useMemo<DataTableColumn<Customer>[]>(
    () => avatars
      ? [{ ...customerColumns[0], render: (c) => <AvatarLabel name={c.name} />, emphasis: 'none' }, ...customerColumns.slice(1)]
      : customerColumns,
    [avatars],
  );
  const rows = useMemo(
    () => empty ? [] : sortBy(customers.filter((c) =>
      (!query || `${c.name} ${c.company} ${c.email}`.toLowerCase().includes(query.toLowerCase())) && (!applied || c.type === applied)), sort),
    [query, applied, sort, empty],
  );

  return (
    <TableCard>
      <TableToolbar>
        <TableToolbarGroup>
          <SearchField aria-label="Search customers" placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} />
          <FilterDropdown activeCount={applied ? 1 : 0} onApply={() => setApplied(type)} onReset={() => { setType(null); setApplied(null); }}>
            <FilterField label="Customer Type:">
              <Select aria-label="Customer type" size="sm" placeholder="All types" value={type} onChange={setType} options={[{ value: 'Individual', label: 'Individual' }, { value: 'Business', label: 'Business' }]} />
            </FilterField>
          </FilterDropdown>
        </TableToolbarGroup>
        <TableToolbarGroup>
          <Button variant="secondary" leadingIcon={<ExportIcon />}>Export</Button>
          <Button variant="secondary" leadingIcon={<BulkUploadIcon />}>Bulk Upload</Button>
          <ColumnCustomizer columns={columnOptions(customerColumns)} value={view} onChange={setView} />
          <Button leadingIcon={<PlusIcon />} onClick={onAddNew}>Add New</Button>
        </TableToolbarGroup>
      </TableToolbar>
      <DataTable
        caption="Customers"
        columns={columns}
        visibleColumns={view.columns}
        rows={rows}
        getRowId={(c) => c.id}
        loading={loading}
        selectable
        selectedIds={selected}
        onSelectedIdsChange={setSelected}
        sort={sort}
        onSortChange={setSort}
        rowActions={(c) => customerActions(c, onView, onEdit)}
        empty={query || applied ? 'No customers match your search.' : 'No customers yet. Add one to start invoicing.'}
      />
      <TableFooter summary={`Showing ${rows.length ? 1 : 0} to ${rows.length} of ${rows.length} entries`}>
        <Pagination page={page} pageCount={1} onPageChange={setPage} />
      </TableFooter>
    </TableCard>
  );
}

/** Employees directory: blue initials avatars, a second line and a status pill. */
export function EmployeesTable() {
  const [page, setPage] = useState(3);
  const columns: DataTableColumn<Employee>[] = [
    { key: 'name', header: 'Employee', render: (e) => <AvatarLabel name={e.name} description={e.email} /> },
    { key: 'id', header: 'Staff ID' },
    { key: 'department', header: 'Department' },
    { key: 'title', header: 'Job Title' },
    { key: 'startDate', header: 'Start Date' },
    { key: 'status', header: 'Status', render: (e) => <StatusPill tone={e.status.tone}>{e.status.label}</StatusPill> },
  ];
  return (
    <TableCard>
      <TableToolbar>
        <TableToolbarGroup>
          <SearchField aria-label="Search employees" placeholder="Search" />
          <FilterDropdown onApply={() => {}}>
            <FilterField label="Department:">
              <Select aria-label="Department" size="sm" placeholder="All departments" options={['Finance', 'Operations', 'Human Resources', 'Sales'].map((d) => ({ value: d, label: d }))} />
            </FilterField>
          </FilterDropdown>
        </TableToolbarGroup>
        <TableToolbarGroup>
          <Button variant="secondary" leadingIcon={<ExportIcon />}>Export</Button>
          <Button leadingIcon={<PlusIcon />}>Add New</Button>
        </TableToolbarGroup>
      </TableToolbar>
      <DataTable
        caption="Employees"
        columns={columns}
        rows={employees}
        getRowId={(e) => e.id}
        rowActions={() => [
          { id: 'view', label: 'View', tone: 'view', icon: <EyeIcon /> },
          { id: 'edit', label: 'Edit', tone: 'edit', icon: <EditIcon /> },
          { id: 'deactivate', label: 'Deactivate', tone: 'delete', icon: <BlockIcon /> },
        ]}
      />
      <TableFooter summary="Showing 21 to 25 of 48 entries">
        <Pagination page={page} pageCount={10} onPageChange={setPage} />
      </TableFooter>
    </TableCard>
  );
}

/** Chart of Accounts (1871:19163): expandable tree, links on postable accounts, status switch. */
export function AccountsTable({ onAddNew }: { onAddNew?: () => void }) {
  const [active, setActive] = useState<Record<string, boolean>>({});
  const columns: DataTableColumn<Account>[] = [
    { key: 'code', header: 'Code', render: (a) => (a.children ? <span className="font-medium text-fg-ink">{a.code}</span> : <a href="#" className="text-primary hover:underline">{a.code}</a>) },
    { key: 'name', header: 'Name', render: (a) => (a.children ? <span className="font-medium text-fg-ink">{a.name}</span> : <a href="#" className="text-primary hover:underline">{a.name}</a>) },
    { key: 'balance', header: 'Balance', render: (a) => <span className={a.children ? undefined : 'text-primary'}>{a.balance}</span> },
    { key: 'statement', header: 'Balance/Income' },
    { key: 'parent', header: 'Parent', render: (a) => <span className="font-medium text-fg-ink">{a.parent}</span> },
    {
      key: 'status',
      header: 'Status',
      render: (a) => a.children ? null : (
        <Switch size="sm" aria-label={`${a.name} active`} checked={active[a.code] ?? !!a.active} onCheckedChange={(v) => setActive({ ...active, [a.code]: v })} />
      ),
    },
  ];
  return (
    <TableCard>
      <TableToolbar>
        <TableToolbarGroup>
          <FilterDropdown onApply={() => {}}>
            <FilterField label="Account Type:">
              <Select aria-label="Account type" size="sm" placeholder="All types" options={['Asset', 'Liability', 'Equity', 'Income', 'Expense'].map((d) => ({ value: d, label: d }))} />
            </FilterField>
          </FilterDropdown>
          <Button variant="secondary" leadingIcon={<CloudDownloadIcon />}>Import</Button>
          <Button variant="secondary" leadingIcon={<ExportIcon />}>Export</Button>
        </TableToolbarGroup>
        <Button leadingIcon={<PlusIcon />} onClick={onAddNew}>Add New</Button>
      </TableToolbar>
      <DataTable
        caption="Chart of accounts"
        columns={columns}
        rows={accounts}
        getRowId={(a) => a.code}
        getRowChildren={(a) => a.children}
        actionsHeader="Action"
        rowActions={(a) => (a.code === '100000' ? [] : [
          { id: 'edit', label: 'Edit', tone: 'edit', icon: <EditIcon /> },
          { id: 'history', label: 'History', tone: 'link', icon: <TransferIcon /> },
        ])}
      />
      <TableFooter summary="Showing 1 of 1 entries">
        <Pagination page={1} pageCount={1} onPageChange={() => {}} />
      </TableFooter>
    </TableCard>
  );
}

/** Bills (4183:23454): overdue dates in red with a second line, status pills. */
export function BillsTable() {
  const [selected, setSelected] = useState<string[]>([]);
  const columns: DataTableColumn<Bill>[] = [
    { key: 'date', header: 'Date' },
    { key: 'createdBy', header: 'Created By' },
    { key: 'id', header: 'Bills Number', emphasis: 'strong' },
    { key: 'vendor', header: 'Vendor Name' },
    {
      key: 'due',
      header: 'Due Date',
      render: (b) => b.overdueDays ? (
        <span className="flex flex-col text-error">
          {b.due}
          <span className="text-xs">Overdue by {b.overdueDays} days</span>
        </span>
      ) : b.due,
    },
    { key: 'amount', header: 'Amount' },
    { key: 'balance', header: 'Balance Due', render: (b) => <span className={b.overdueDays ? 'text-error' : undefined}>{b.balance}</span> },
    { key: 'status', header: 'Status', render: (b) => <StatusPill tone={b.status.tone}>{b.status.label}</StatusPill> },
  ];
  return (
    <TableCard>
      <TableToolbar>
        <TableToolbarGroup>
          <SearchField aria-label="Search bills" placeholder="Search Vendor" />
          <FilterDropdown onApply={() => {}}>
            <FilterField label="Status:">
              <Select aria-label="Status" size="sm" placeholder="All statuses" options={['Paid', 'Awaiting Payment', 'Overdue'].map((d) => ({ value: d, label: d }))} />
            </FilterField>
          </FilterDropdown>
        </TableToolbarGroup>
        <TableToolbarGroup>
          <Button variant="secondary" leadingIcon={<ExportIcon />}>Export</Button>
          <ColumnCustomizer columns={columns.map((c, i) => ({ key: c.key, label: String(c.header), locked: i === 2 }))} value={{ columns: columns.map((c) => c.key), options: [] }} onChange={() => {}} />
          <Button leadingIcon={<PlusIcon />}>Add New</Button>
        </TableToolbarGroup>
      </TableToolbar>
      <DataTable caption="Bills" columns={columns} rows={bills} getRowId={(b) => b.id} selectable selectedIds={selected} onSelectedIdsChange={setSelected} />
      <TableFooter summary={`Showing 1 to ${bills.length} of ${bills.length} entries`}>
        <Pagination page={1} pageCount={1} onPageChange={() => {}} />
      </TableFooter>
    </TableCard>
  );
}

/** Trial balance (845:8824): grouped report rows with totals, Export and the primary Customize Columns button. */
export function TrialBalanceTable() {
  const cols = [
    { key: 'name', label: 'Account name', locked: true },
    { key: 'code', label: 'Account Code' },
    { key: 'opening', label: 'Opening Bal.' },
    { key: 'debit', label: 'Debit' },
    { key: 'credit', label: 'Credit' },
    { key: 'balance', label: 'Balance' },
    { key: 'closing', label: 'Closing Bal.' },
  ] as const;
  const [view, setView] = useState<ColumnCustomizerValue>({ columns: cols.map((c) => c.key), options: [] });
  const [open, setOpen] = useState<string[]>(trialBalance.map((g) => g.group));
  const shown = cols.filter((c) => view.columns.includes(c.key));
  return (
    <TableCard>
      <TableToolbar>
        <TableToolbarGroup className="ml-auto">
          <Button variant="secondary" leadingIcon={<ExportIcon />}>Export</Button>
          <ColumnCustomizer
            columns={[...cols]}
            options={[
              { key: 'inactive', label: 'Include Inactive Accounts' },
              { key: 'zero', label: 'Hide Zero-Balance Accounts' },
              { key: 'subtotals', label: 'Show Subtotals' },
            ]}
            value={view}
            onChange={setView}
          />
        </TableToolbarGroup>
      </TableToolbar>
      <Table>
        <caption className="sr-only">Trial balance</caption>
        <TableHead>
          <tr>{shown.map((c) => <TableHeaderCell key={c.key}>{c.label}</TableHeaderCell>)}</tr>
        </TableHead>
        <TableBody>
          {trialBalance.map((g) => {
            const isOpen = open.includes(g.group);
            return [
              <TableSectionRow
                key={g.group}
                label={g.group}
                colSpan={shown.length}
                expanded={isOpen}
                onToggle={() => setOpen(isOpen ? open.filter((x) => x !== g.group) : [...open, g.group])}
              />,
              ...(isOpen ? g.lines : []).map((l) => (
                <TableRow key={g.group + l.code}>
                  {shown.map((c, i) => <TableCell key={c.key}>{i === 0 ? <span className="pl-8">{l[c.key]}</span> : l[c.key]}</TableCell>)}
                </TableRow>
              )),
              <TableRow key={g.group + '-total'}>
                {shown.map((c, i) => <TableCell key={c.key} emphasis="strong">{i === 0 ? <span className="pl-8">{g.total[c.key]}</span> : g.total[c.key]}</TableCell>)}
              </TableRow>,
            ];
          })}
        </TableBody>
      </Table>
    </TableCard>
  );
}
