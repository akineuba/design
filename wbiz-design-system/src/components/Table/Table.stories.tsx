import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DataTable, Pagination, SearchField, TableCard, TableFooter, TableToolbar, type DataTableColumn } from './Table';
import { StatusPill } from '../StatusPill';
import { FilterDropdown, FilterField } from '../FilterDropdown';
import { Select } from '../Select';
import { FIGMA, requisitions, type Requisition } from '../../patterns/demo-data';

const columns: DataTableColumn<Requisition>[] = [
  { key: 'date', header: 'Date' },
  { key: 'id', header: 'Requisition ID', render: (r) => <a href="#" className="font-semibold text-primary hover:underline">{r.id}</a> },
  { key: 'requester', header: 'Requester' },
  { key: 'department', header: 'Department' },
  { key: 'location', header: 'Requesting Location' },
  { key: 'required', header: 'Required Date' },
  { key: 'qty', header: 'Qty Requested', align: 'right' },
  { key: 'status', header: 'Status', render: (r) => <StatusPill tone={r.status.tone}>{r.status.label}</StatusPill> },
];

const meta = {
  title: 'Components/Table',
  component: DataTable,
  parameters: {
    layout: 'padded',
    design: { url: FIGMA + '7053-5545' },
    docs: { description: { component: 'Table card from Consumption Requisitions. Use `DataTable` for column-driven lists, or compose `Table`, `TableHead`, `TableRow`, `TableHeaderCell` and `TableCell` for editable grids such as requisition line items.' } },
  },
} satisfies Meta<typeof DataTable>;
export default meta;
type Story = StoryObj<typeof meta>;

const Card = ({ loading = false, rows = requisitions, selected }: { loading?: boolean; rows?: Requisition[]; selected?: string }) => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [sel, setSel] = useState(selected);
  return (
    <TableCard>
      <TableToolbar>
        <SearchField aria-label="Search requisitions" placeholder="Search requisitions..." />
        <FilterDropdown onApply={() => {}} onReset={() => {}}>
          <FilterField label="Status:"><Select aria-label="Status" size="sm" placeholder="All statuses" options={[{ value: 'pending', label: 'Pending Approval' }, { value: 'ready', label: 'Ready for Issue' }]} /></FilterField>
        </FilterDropdown>
      </TableToolbar>
      <DataTable
        columns={columns}
        rows={rows}
        getRowId={(r) => r.id}
        loading={loading}
        caption="Consumption requisitions"
        onRowClick={(r) => setSel(r.id)}
        selectedRowId={sel}
        empty="No requisitions match your search."
      />
      <TableFooter summary={rows.length ? `Showing 1 to ${rows.length} of ${rows.length} entries` : 'Showing 0 entries'}>
        <Pagination page={page} pageCount={1} onPageChange={setPage} pageSize={size} onPageSizeChange={setSize} />
      </TableFooter>
    </TableCard>
  );
};

export const Default: Story = { render: () => <Card /> } as unknown as Story;
export const SelectedRow: Story = { render: () => <Card selected="CR-000247" /> } as unknown as Story;
export const Loading: Story = { render: () => <Card loading /> } as unknown as Story;
export const Empty: Story = { render: () => <Card rows={[]} /> } as unknown as Story;

export const PaginationStates: Story = {
  render: () => {
    const [page, setPage] = useState(5);
    return (
      <div className="flex flex-col gap-4">
        <Pagination page={1} pageCount={1} onPageChange={() => {}} pageSize={10} onPageSizeChange={() => {}} />
        <Pagination page={2} pageCount={4} onPageChange={() => {}} />
        <Pagination page={page} pageCount={12} onPageChange={setPage} pageSize={20} onPageSizeChange={() => {}} />
      </div>
    );
  },
} as unknown as Story;
