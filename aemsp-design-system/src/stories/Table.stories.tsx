import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Table, Column, Pagination, BulkActionBar, EmptyState, FilterBar, GridCard } from '../components/data';
import { AvatarLabel, Button, NegativeValue, StatusPill, Avatar, formatMoney } from '../components/primitives';
import { ActionMenu } from '../components/layout';
import { ORGS, ORG_STATUS, OrgRow } from '../data';

const cols: Column<OrgRow>[] = [
  { key: 'name', header: 'Organisation', sortable: true, render: (r) => <AvatarLabel name={r.name} sub={r.contact} /> },
  { key: 'type', header: 'Type', sortable: true },
  { key: 'licences', header: 'Licences', sortable: true, align: 'right', render: (r) => r.licences.toLocaleString('en-GB') },
  { key: 'overdue', header: 'Overdue', sortable: true, align: 'right', render: (r) => (r.overdue ? <NegativeValue label="Overdue invoices">{r.overdue}</NegativeValue> : '0') },
  { key: 'status', header: 'Status', render: (r) => <StatusPill status={ORG_STATUS[r.status]}>{r.status}</StatusPill> },
  { key: 'products', header: 'Products', truncate: true },
];
const rowMenu = () => <ActionMenu actions={[{ label: 'View details', icon: 'eye' }, { label: 'Edit', icon: 'edit' }, { label: 'Add subscription', icon: 'package' }, 'separator', { label: 'Suspend', icon: 'pause', danger: true }]} />;

const meta: Meta<typeof Table<OrgRow>> = {
  title: 'Components/Table', component: Table, tags: ['autodocs'],
  args: { columns: cols, rows: ORGS },
  parameters: { docs: { description: { component: 'The Figma list table: 11px caps headers, 13px cells, 35px initials avatars, solid status pills, kebab menu. Adds sortable columns, row hover/selected states, a bulk-action bar, loading skeletons and empty states.' } } },
};
export default meta;
type S = StoryObj<typeof Table<OrgRow>>;
export const Standard: S = { args: { pagination: { total: 24 } } };
export const WithRowActionsAndSelection: S = {
  args: { selectable: true, defaultSelected: ['o1'], rowActions: rowMenu, pagination: { total: 24 },
    bulkActions: () => <><Button size="sm" variant="ghost" icon="download">Export</Button><Button size="sm" variant="ghost" icon="send">Send reminder</Button><Button size="sm" variant="danger" icon="pause">Suspend</Button></> },
};
export const InCard: S = { name: 'In a card (dashboard)', args: { title: 'Recent organisations', rows: ORGS.slice(0, 4), rowActions: rowMenu, headerActions: <Button size="sm" variant="link-outline">View all</Button> } };
export const Loading: S = { args: { loading: true, selectable: true } };
export const Empty: S = { args: { rows: [], empty: <EmptyState icon="building" title="No organisations yet" text="Add your first OEM, dealer or fleet to start assigning subscriptions." actions={<Button icon="add">Add organisation</Button>} /> } };
export const NoResults: S = { args: { rows: [], empty: <EmptyState icon="search" title="No results for “Volvo”" text="Try a different name, or clear the filters." actions={<Button variant="outline">Clear filters</Button>} /> } };
export const PaginationOnly: S = { render: () => <div className="ae-table-wrap"><Pagination total={248} page={3} /></div> };
export const BulkBar: S = { name: 'Bulk action bar', render: () => <BulkActionBar count={3}><Button size="sm" variant="ghost" icon="download">Export</Button><Button size="sm" variant="danger" icon="trash">Delete</Button></BulkActionBar> };
export const GridView: S = {
  render: () => (
    <div className="ae-gridcards">
      {ORGS.slice(0, 6).map((o, i) => (
        <GridCard key={o.id} title={o.name} sub={`${o.type} · ${o.region}`} avatar={<Avatar name={o.name} tone="navy" />} selected={i === 1} onSelect={() => {}}
          status={<div><StatusPill status={ORG_STATUS[o.status]}>{o.status}</StatusPill></div>}
          actions={rowMenu()} meta={[['Licences', o.licences.toLocaleString('en-GB')], ['MRR', formatMoney(o.mrr, 'GBP', true)], ['Contact', o.contact], ['Overdue', o.overdue ? <NegativeValue>{o.overdue}</NegativeValue> : '0']]} />
      ))}
    </div>
  ),
};
