import type { Meta, StoryObj } from '@storybook/react';
import { useMemo, useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { TopBar } from '../components/TopBar';
import { Tabs } from '../components/Tabs';
import { PageHeader } from '../components/PageHeader';
import { Button } from '../components/Button';
import { StatusPill } from '../components/StatusPill';
import { Select } from '../components/Select';
import { FilterDropdown, FilterField } from '../components/FilterDropdown';
import { DataTable, Pagination, SearchField, TableCard, TableFooter, TableToolbar, type DataTableColumn } from '../components/Table';
import { PlusIcon } from '../icons';
import { FIGMA, Logo, navItems, requisitions, type Requisition } from './demo-data';

const tabs = [
  { value: 'requisitions', label: 'Consumption Requisitions' },
  { value: 'issuance', label: 'Stock Issuance History' },
  { value: 'items', label: 'Items' },
  { value: 'settings', label: 'Consumption Settings' },
];

const columns: DataTableColumn<Requisition>[] = [
  { key: 'date', header: 'Date' },
  { key: 'id', header: 'Requisition ID', render: (r) => <a href="#" className="font-semibold text-primary hover:underline">{r.id}</a> },
  { key: 'requester', header: 'Requester' },
  { key: 'department', header: 'Department' },
  { key: 'location', header: 'Requesting Location' },
  { key: 'required', header: 'Required Date' },
  { key: 'qty', header: 'Qty Requested' },
  { key: 'status', header: 'Status', render: (r) => <StatusPill tone={r.status.tone}>{r.status.label}</StatusPill> },
];

function Screen() {
  const [tab, setTab] = useState('requisitions');
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [applied, setApplied] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  const rows = useMemo(
    () =>
      requisitions.filter(
        (r) =>
          (!query || `${r.id} ${r.requester} ${r.department}`.toLowerCase().includes(query.toLowerCase())) &&
          (!applied || r.status.tone === applied),
      ),
    [query, applied],
  );

  return (
    <div className="flex h-screen w-full overflow-hidden bg-surface-page">
      <Sidebar items={navItems} activeId="admin-inventory" logo={<Logo />} logoCollapsed={<Logo compact />} />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar
          breadcrumbs={[{ label: 'Inventory', href: '#' }, { label: 'Consumption Requisitions' }]}
          user={{ name: 'sure', role: 'Super User', initials: 'ST' }}
          notificationCount={8}
          onNotificationsClick={() => {}}
          onThemeToggle={() => {}}
          onTourClick={() => {}}
          onAppsClick={() => {}}
        />
        <main className="flex min-w-0 flex-1 flex-col gap-6 overflow-y-auto p-8">
          <Tabs items={tabs} value={tab} onChange={setTab} aria-label="Consumption" />
          <PageHeader
            title="Consumption Requisitions"
            description="Request, approve, reserve and issue consumable stock."
            actions={<Button leadingIcon={<PlusIcon />}>New Requisition</Button>}
          />
          <TableCard>
            <TableToolbar>
              <SearchField aria-label="Search requisitions" placeholder="Search requisitions..." value={query} onChange={(e) => setQuery(e.target.value)} />
              <FilterDropdown activeCount={applied ? 1 : 0} onApply={() => setApplied(status)} onReset={() => { setStatus(null); setApplied(null); }}>
                <FilterField label="Status:">
                  <Select
                    aria-label="Status"
                    size="sm"
                    placeholder="All statuses"
                    value={status}
                    onChange={setStatus}
                    options={[
                      { value: 'warning', label: 'Pending Approval' },
                      { value: 'info', label: 'Ready for Issue' },
                      { value: 'neutral', label: 'Partially Issued' },
                      { value: 'success', label: 'Completed' },
                    ]}
                  />
                </FilterField>
              </FilterDropdown>
            </TableToolbar>
            <DataTable columns={columns} rows={rows} getRowId={(r) => r.id} caption="Consumption requisitions" empty="No requisitions match your search." />
            <TableFooter summary={rows.length ? `Showing 1 to ${rows.length} of ${rows.length} entries` : 'Showing 0 entries'}>
              <Pagination page={page} pageCount={1} onPageChange={setPage} pageSize={size} onPageSizeChange={setSize} />
            </TableFooter>
          </TableCard>
        </main>
      </div>
    </div>
  );
}

const meta = {
  title: 'Patterns/Consumption Requisitions',
  component: Screen,
  parameters: {
    layout: 'fullscreen',
    design: { url: FIGMA + '7053-5433' },
    docs: { description: { component: 'The Consumption Requisitions screen from "new features", built only from library components. Search and the status filter work.' } },
  },
} satisfies Meta<typeof Screen>;
export default meta;

export const Screen1440: StoryObj<typeof meta> = { name: 'Screen' };
