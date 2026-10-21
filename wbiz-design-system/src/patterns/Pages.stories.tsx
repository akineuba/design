import type { Meta, StoryObj } from '@storybook/react';
import { useState, type ReactNode } from 'react';
import { Sidebar } from '../components/Sidebar';
import { TopBar, type TopBarProps } from '../components/TopBar';
import { Tabs } from '../components/Tabs';
import { PageHeader } from '../components/PageHeader';
import { Logo } from '../components/Logo';
import { SidePanel } from '../components/SidePanel';
import { FilterBar, FilterBarField } from '../components/FilterBar';
import { Select } from '../components/Select';
import { FIGMA, appNavigation, currentUser } from './demo-data';
import { AccountsTable, CustomersTable, EmployeesTable, TrialBalanceTable } from './table-kits';
import { AccountFooter, AccountForm, CustomerForm, PanelFooter } from './panel-forms';

/** App frame: sidebar, top bar and a scrolling main area. Every page below uses it. */
function Shell({ activeId, breadcrumbs, children }: { activeId: string; breadcrumbs: TopBarProps['breadcrumbs']; children: ReactNode }) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-surface-page">
      <Sidebar items={appNavigation} activeId={activeId} logo={<Logo />} logoCollapsed={<Logo variant="mark" />} />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar
          breadcrumbs={breadcrumbs}
          user={currentUser}
          notificationCount={8}
          onNotificationsClick={() => {}}
          onThemeToggle={() => {}}
          onTourClick={() => {}}
          onAppsClick={() => {}}
        />
        <main className="flex min-w-0 flex-1 flex-col gap-6 overflow-y-auto p-8">{children}</main>
      </div>
    </div>
  );
}

function CustomersPage() {
  const [tab, setTab] = useState('customers');
  const [panel, setPanel] = useState<null | 'new' | 'view' | 'edit'>(null);
  const close = () => setPanel(null);
  return (
    <Shell activeId="sales/customers" breadcrumbs={[{ label: 'Sales', href: '#' }, { label: 'Customers' }]}>
      <Tabs aria-label="Sales" value={tab} onChange={setTab} items={[{ value: 'invoice', label: 'Invoice' }, { value: 'payment', label: 'Receive payment' }, { value: 'customers', label: 'Customers' }]} />
      <PageHeader title="Customers" />
      <CustomersTable onAddNew={() => setPanel('new')} onView={() => setPanel('view')} onEdit={() => setPanel('edit')} />
      <SidePanel
        open={panel !== null}
        onClose={close}
        title={panel === 'view' ? 'View Customer' : panel === 'edit' ? 'Edit Customer' : 'New Customer'}
        footer={<PanelFooter mode={panel === 'view' ? 'view' : 'create'} onCancel={close} onSubmit={() => (panel === 'view' ? setPanel('edit') : close())} />}
      >
        {panel && <CustomerForm mode={panel === 'new' ? 'create' : panel} />}
      </SidePanel>
    </Shell>
  );
}

function ChartOfAccountsPage() {
  const [tab, setTab] = useState('coa');
  const [open, setOpen] = useState(false);
  return (
    <Shell activeId="accounting/chart-of-accounts" breadcrumbs={[{ label: 'Accounting', href: '#' }, { label: 'Chart of Accounts' }]}>
      <Tabs aria-label="Accounting" value={tab} onChange={setTab} items={[{ value: 'coa', label: 'Chart of accounts' }, { value: 'journal', label: 'Journal' }, { value: 'payment', label: 'Receive payment' }, { value: 'budget', label: 'Budget' }]} />
      <PageHeader title="Chart of Accounts" />
      <AccountsTable onAddNew={() => setOpen(true)} />
      <SidePanel open={open} onClose={() => setOpen(false)} size="sm" title="New Account" footer={<AccountFooter onCancel={() => setOpen(false)} />}>
        <AccountForm />
      </SidePanel>
    </Shell>
  );
}

const opt = (...l: string[]) => l.map((v) => ({ value: v, label: v }));

function TrialBalancePage() {
  const [tab, setTab] = useState('tb');
  return (
    <Shell activeId="reports/trial-balance" breadcrumbs={[{ label: 'Reports', href: '#' }, { label: 'Trial Balance' }]}>
      <Tabs aria-label="Reports" value={tab} onChange={setTab} items={[{ value: 'gl', label: 'General ledger' }, { value: 'tb', label: 'Trial balance' }, { value: 'is', label: 'Income statement' }, { value: 'bs', label: 'Balance sheet' }]} />
      <PageHeader title="Trial Balance" />
      <FilterBar
        onApply={() => {}}
        onAdvanced={() => {}}
        moreFilters={<>
          <FilterBarField><Select label="Account Class:" size="sm" placeholder="Acc. Class" options={opt('Asset', 'Liability', 'Income')} /></FilterBarField>
          <FilterBarField><Select label="Dimension Type" size="sm" placeholder="Type" options={opt('Branch', 'State')} /></FilterBarField>
        </>}
      >
        <FilterBarField><Select label="Date:" size="sm" placeholder="Date" options={opt('This month', 'Last month', 'This year')} /></FilterBarField>
      </FilterBar>
      <div className="flex flex-col items-center gap-0.5 text-center">
        <p className="font-sans text-md font-medium text-fg-ink">Wragby Business Solutions</p>
        <p className="font-sans text-xl font-semibold text-fg-ink">Trial Balance</p>
        <p className="font-sans text-xs text-fg-strong">From 1st Aug 2025 to 8th Aug 2025</p>
      </div>
      <TrialBalanceTable />
    </Shell>
  );
}

function EmployeesPage() {
  return (
    <Shell activeId="human-resources/employee-records" breadcrumbs={[{ label: 'Human Resources', href: '#' }, { label: 'Employee Records' }]}>
      <PageHeader title="Employee Records" description="Everyone on the payroll, past and present." />
      <EmployeesTable />
    </Shell>
  );
}

const meta = {
  title: 'Patterns/Pages',
  parameters: {
    layout: 'fullscreen',
    docs: { description: { component: 'Full screens composed only from library components, as starting points for new and redesigned pages. Each story is interactive: open side panels from Add New and the row menu, filter, sort and pick columns.' } },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

/** List page: tabs, title, table toolbar, side panels for New / View / Edit. */
export const ListPage: Story = { render: () => <CustomersPage />, parameters: { design: { url: FIGMA + '191-3274' } } };
/** Hierarchical list: Chart of Accounts tree with a New Account panel. */
export const HierarchicalList: Story = { render: () => <ChartOfAccountsPage />, parameters: { design: { url: FIGMA + '1871-19163' } } };
/** Report page: filter bar with More Filters, report heading, grouped table with Customize Columns. */
export const ReportPage: Story = { render: () => <TrialBalancePage />, parameters: { design: { url: FIGMA + '845-8824' } } };
/** People directory: initials avatars in the first column. */
export const PeopleDirectory: Story = { render: () => <EmployeesPage /> };
