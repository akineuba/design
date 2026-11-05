import type { Meta, StoryObj } from '@storybook/react';
import { useMemo, useState } from 'react';
import { Download, Eye, Layers, Pencil, Plus, Power } from 'lucide-react';
import { DataTable, Pagination, TableCard, TableFooter, TableSearch, TableToolbar, ToolbarGroup, entriesSummary, type Column, type SortState } from './Table';
import { StatusPill } from '../StatusPill/StatusPill';
import { Button } from '../Button/Button';
import { Checkbox } from '../Field/Field';
import { ActionMenu } from '../ActionMenu/ActionMenu';
import { tenants, type DemoTenant } from '../../demo/data';

const meta: Meta = { title: 'Components/Table', tags: ['autodocs'] };
export default meta;

const columns: Column<DemoTenant>[] = [
  { key: 'name', header: 'Name', sortable: true, render: (t) => <a href="#" className="sso-cell-link">{t.name}</a> },
  { key: 'code', header: 'Code', sortable: true, render: (t) => <span className="sso-cell-code">{t.code}</span> },
  { key: 'status', header: 'Status', render: (t) => <StatusPill tone={t.status === 'Active' ? 'success' : 'neutral'}>{t.status}</StatusPill> },
  { key: 'defaultProduct', header: 'Default product', render: (t) => t.defaultProduct ?? '—' },
];

const actions = (t: DemoTenant) => [
  { id: 'entities', label: 'Entities', tone: 'link' as const, icon: <Layers /> },
  { id: 'view', label: 'View', tone: 'view' as const, icon: <Eye /> },
  { id: 'edit', label: 'Edit', tone: 'edit' as const, icon: <Pencil /> },
  { id: 'deactivate', label: t.status === 'Active' ? 'Deactivate' : 'Activate', tone: (t.status === 'Active' ? 'delete' : 'positive') as 'delete' | 'positive', icon: <Power /> },
];

export const FullTable: StoryObj = {
  name: 'Table: toolbar, actions, footer',
  render: () => {
    const [sort, setSort] = useState<SortState | null>({ key: 'name', direction: 'asc' });
    const [page, setPage] = useState(3);
    const [selected, setSelected] = useState<string[]>([]);
    const rows = useMemo(() => !sort ? tenants : [...tenants].sort((a, b) => {
      const x = String(a[sort.key as keyof DemoTenant] ?? ''), y = String(b[sort.key as keyof DemoTenant] ?? '');
      return sort.direction === 'asc' ? x.localeCompare(y) : y.localeCompare(x);
    }), [sort]);
    return (
      <TableCard>
        <TableToolbar>
          <ToolbarGroup>
            <TableSearch aria-label="Search tenants" placeholder="Search by name or code" />
            <Checkbox label="Include inactive" />
          </ToolbarGroup>
          <ToolbarGroup>
            <Button variant="secondary" leadingIcon={<Download />}>Export</Button>
            <Button leadingIcon={<Plus />}>Add tenant</Button>
          </ToolbarGroup>
        </TableToolbar>
        <DataTable caption="Tenants" columns={columns} rows={rows} getRowId={(t) => t.name} sort={sort} onSortChange={setSort} rowActions={actions} selectable selectedIds={selected} onSelectedIdsChange={setSelected} />
        <TableFooter summary={entriesSummary(page, 10, 93)}>
          <Pagination page={page} pageCount={10} onPageChange={setPage} />
        </TableFooter>
      </TableCard>
    );
  },
};

export const SingleAction: StoryObj = {
  name: 'Single row action (inline, no kebab)',
  render: () => (
    <TableCard>
      <DataTable
        caption="Tools"
        columns={[{ key: 'name', header: 'Tool', emphasis: 'strong' }, { key: 'description', header: 'Description' }]}
        rows={[{ name: 'Plans', description: 'List, edit drafts, publish.' }, { name: 'Billing tools', description: 'Invoices, payments, and proration preview.' }]}
        getRowId={(r) => r.name}
        rowActions={() => [{ label: 'Open', tone: 'link', icon: <Eye /> }]}
      />
    </TableCard>
  ),
};

export const Loading: StoryObj = {
  render: () => <TableCard><DataTable columns={columns} rows={[]} getRowId={(t) => t.name} rowActions={actions} loading /></TableCard>,
};

export const Empty: StoryObj = {
  render: () => <TableCard><DataTable columns={columns} rows={[]} getRowId={(t) => t.name} rowActions={actions} empty="No tenants match your search." /></TableCard>,
};

export const RowActionMenu: StoryObj = {
  name: 'Action menu (row actions)',
  render: () => (
    <div style={{ height: 240 }}>
      <ActionMenu label="Actions for AIM Group" items={[
        { label: 'View', tone: 'view', icon: <Eye /> },
        { label: 'Edit', tone: 'edit', icon: <Pencil /> },
        { label: 'Entities', tone: 'link', icon: <Layers /> },
        { label: 'Activate', tone: 'positive', icon: <Power /> },
        { label: 'Deactivate', tone: 'delete', icon: <Power /> },
      ]} />
    </div>
  ),
};
