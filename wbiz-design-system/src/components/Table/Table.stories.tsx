import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DataTable, Table, TableBody, TableCard, TableCell, TableFooter, TableHead, TableHeaderCell, TableRow, Pagination } from './Table';
import { FIGMA, customers } from '../../patterns/demo-data';
import { AccountsTable, BillsTable, CustomersTable, EmployeesTable, TrialBalanceTable, customerColumns } from '../../patterns/table-kits';

const meta = {
  title: 'Components/Table',
  component: DataTable,
  decorators: [(Story) => <div className="w-full"><Story /></div>],
  parameters: {
    layout: 'padded',
    design: { url: FIGMA + '191-3274' },
    docs: {
      description: {
        component:
          'Tables follow the accounting screens. Header row and body rows are 44px; the first column is the record name in dark medium text, ' +
          'other cells are grey. The toolbar holds search and Filters on the left, Export, Bulk Upload, the Customize Columns button and Add New on the right. ' +
          'Use `DataTable` for lists (selection, sorting, row actions, tree rows, column visibility, loading and empty states) ' +
          'or compose the primitives (`Table`, `TableRow`, `TableCell`, `TableSectionRow`…) for reports and editable grids.',
      },
    },
  },
} satisfies Meta<typeof DataTable>;
export default meta;
type Story = StoryObj<typeof meta>;

// DataTable is generic, so stories render their own content and ignore args.
const story = (render: () => JSX.Element, url?: string): Story => ({
  args: { columns: [], rows: [], getRowId: () => '' },
  render,
  parameters: url ? { design: { url: FIGMA + url } } : undefined,
});

/** Sales › Customers. Two rows ticked, sortable Name / Company / Email, kebab actions, column picker (columns icon). */
export const Standard = story(() => <CustomersTable />, '191-3274');

/** People tables: blue initials avatar with the name, optional second line. */
export const WithAvatars = story(() => <EmployeesTable />);

/** Customers with avatars in the name column. */
export const CustomersWithAvatars = story(() => <CustomersTable avatars />);

/** Chart of Accounts: expandable tree, postable accounts as links, status switch. */
export const Hierarchical = story(() => <AccountsTable />, '1871-19163');

/** Bills: overdue dates and balances in red with a second line; status pills. */
export const WithStatusAndOverdue = story(() => <BillsTable />, '4183-23454');

/** Trial balance: grouped report rows with totals, Export and the primary Customize Columns button. */
export const GroupedReport = story(() => <TrialBalanceTable />, '845-8824');

export const Loading = story(() => <CustomersTable loading />);
export const Empty = story(() => <CustomersTable empty />);

/** 54px rows from the new features screens. Use for short lists with richer cells. */
export const ComfortableDensity = story(() => (
  <TableCard>
    <DataTable density="comfortable" caption="Customers" columns={customerColumns} rows={customers.slice(0, 4)} getRowId={(c) => c.id} />
  </TableCard>
));

/** Row states: default, hover (interactive rows), selected. */
export const RowStates = story(() => (
  <TableCard>
    <Table>
      <TableHead>
        <tr><TableHeaderCell>State</TableHeaderCell><TableHeaderCell>Name</TableHeaderCell><TableHeaderCell>Email</TableHeaderCell></tr>
      </TableHead>
      <TableBody>
        <TableRow><TableCell>Default</TableCell><TableCell emphasis="strong">Daniel Olabode</TableCell><TableCell>dolabode@wbiz.com</TableCell></TableRow>
        <TableRow interactive><TableCell>Interactive (hover me)</TableCell><TableCell emphasis="strong">Damilola Audu</TableCell><TableCell>daudu@wbiz.com</TableCell></TableRow>
        <TableRow selected><TableCell>Selected</TableCell><TableCell emphasis="strong">Deborah Akinola</TableCell><TableCell>dakinola@wbiz.com</TableCell></TableRow>
        <TableRow><TableCell>Link cell</TableCell><TableCell emphasis="link">102310</TableCell><TableCell emphasis="link">Office Equipment</TableCell></TableRow>
      </TableBody>
    </Table>
  </TableCard>
));

export const PaginationStates = story(function PaginationStates() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(6);
  return (
    <div className="flex flex-col gap-4">
      <TableCard><TableFooter summary="Showing 1 of 1 entries"><Pagination page={a} pageCount={1} onPageChange={setA} /></TableFooter></TableCard>
      <TableCard><TableFooter summary="Showing 51 to 60 of 120 entries"><Pagination page={b} pageCount={12} onPageChange={setB} /></TableFooter></TableCard>
      <TableCard><TableFooter summary="Without the page field"><Pagination page={b} pageCount={12} onPageChange={setB} showJump={false} /></TableFooter></TableCard>
    </div>
  );
});
