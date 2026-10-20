import type { Meta, StoryObj } from '@storybook/react';
import { useMemo, useState } from 'react';
import { DownloadIcon, EyeIcon, FilterIcon, MoreIcon, PencilIcon, PlusIcon, SearchIcon, TrashIcon, UploadIcon, UsersIcon } from '../../icons';
import { Avatar } from '../Avatar';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import { IconButton } from '../IconButton';
import { Input } from '../Input';
import { Menu, MenuContent, MenuItem, MenuTrigger } from '../Menu';
import { Pagination } from '../Pagination';
import { Select } from '../Select';
import {
  Table, TableBody, TableCard, TableCell, TableEmpty, TableExpandableRow, TableHead, TableHeader, TableRow, TableSkeleton, type SortDirection,
} from './Table';

const meta = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    backgrounds: { default: 'canvas' },
    docs: { description: { component: 'Figma: Contacts (817:8972), Companies, Social accounts (1224:25339) and User management (1823:7411) lists. Compose `TableCard` → `Table` → rows; use `Pagination` in the footer.' } },
  },
} satisfies Meta<typeof Table>;
export default meta;
type Story = StoryObj<typeof meta>;

const contacts = [
  { id: 1, name: 'Olumide Balogun', email: 'olumideb@wragbybiz.com', company: 'Technologia', phone: '+2349087634567', owner: 'Oluwalebi Olatoriyori' },
  { id: 2, name: 'Dean Liam', email: 'deen@yopmail.com', company: 'Carter', phone: '+2349012344571', owner: 'Oluwalebi Olatoriyori' },
  { id: 3, name: 'Christian Oluwatobi', email: 'christianoluwatobi@yopmail.com', company: 'Cash Drive', phone: '+2349876543087', owner: 'Taiwo Ajayi' },
  { id: 4, name: 'Lueman Walullah', email: 'lueman.walullah@gmail.com', company: 'Cash Drive', phone: '+2349000000000', owner: 'Murphy Ogbede' },
  { id: 5, name: 'Pam Mancha', email: 'emmanuell.mancha@gmail.com', company: 'Cash Drive', phone: '+2349000000006', owner: 'Murphy Ogbede' },
  { id: 6, name: 'Bunmi Ajayi', email: 'bunmi@cashdriv.com', company: 'Cash Drive', phone: '+2349802222206', owner: 'Bamisile Obanisola' },
  { id: 7, name: 'Ogodimma Ogo', email: 'ogbodemurphy@gmail.com', company: 'Decagon', phone: '+2349102006162', owner: 'Murphy Ogbede' },
  { id: 8, name: 'John Doe', email: 'john.doee@example.com', company: 'TechNova Ltd', phone: '08012345678', owner: 'Waliyullahi Lulrman' },
];

const RowMenu = ({ name }: { name: string }) => (
  <Menu modal={false}>
    <MenuTrigger asChild><IconButton size="sm" aria-label={`Actions for ${name}`} icon={<MoreIcon />} /></MenuTrigger>
    <MenuContent>
      <MenuItem tone="info" icon={<EyeIcon />}>View</MenuItem>
      <MenuItem tone="warning" icon={<PencilIcon />}>Edit</MenuItem>
      <MenuItem tone="danger" icon={<TrashIcon />}>Delete</MenuItem>
    </MenuContent>
  </Menu>
);

function ContactsTable({ mode = 'data' }: { mode?: 'data' | 'loading' | 'empty' }) {
  const [query, setQuery] = useState(mode === 'empty' ? 'zzz' : '');
  const [sort, setSort] = useState<SortDirection>('asc');
  const [selected, setSelected] = useState<number[]>([2]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = contacts.filter((c) => [c.name, c.email, c.company].some((v) => v.toLowerCase().includes(q)));
    return sort ? [...filtered].sort((a, b) => (sort === 'asc' ? 1 : -1) * a.name.localeCompare(b.name)) : filtered;
  }, [query, sort]);

  const allChecked = rows.length > 0 && rows.every((r) => selected.includes(r.id));
  const someChecked = rows.some((r) => selected.includes(r.id));

  return (
    <TableCard
      aria-busy={mode === 'loading' || undefined}
      toolbar={
        <>
          <div className="flex flex-wrap items-center gap-3">
            <span className="border-b-2 border-brand-primary pb-1.5 text-label-sm text-brand-primary">Active contacts ({contacts.length})</span>
            <Input label="Search contacts" hideLabel size="md" placeholder="Search..." leadingIcon={<SearchIcon />} value={query} onChange={(e) => setQuery(e.target.value)} wrapperClassName="w-field-sm" />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {selected.length > 0 ? (
              <>
                <span className="text-body-sm text-text-secondary">{selected.length} selected</span>
                <Button variant="danger" leadingIcon={<TrashIcon />}>Delete</Button>
              </>
            ) : (
              <>
                <Button variant="outline" leadingIcon={<UploadIcon />}>Upload</Button>
                <Button variant="outline" leadingIcon={<DownloadIcon />}>Export</Button>
              </>
            )}
            <Button leadingIcon={<PlusIcon />}>Create contact</Button>
          </div>
        </>
      }
      footer={<Pagination page={page} pageSize={pageSize} totalItems={mode === 'data' ? 49 : 0} onPageChange={setPage} onPageSizeChange={setPageSize} />}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12 pr-0">
              <Checkbox
                aria-label="Select all contacts"
                checked={allChecked ? true : someChecked ? 'indeterminate' : false}
                onCheckedChange={(c) => setSelected(c === true ? rows.map((r) => r.id) : [])}
              />
            </TableHead>
            <TableHead sort={sort} onSort={() => setSort(sort === 'asc' ? 'desc' : 'asc')}>Name</TableHead>
            <TableHead>Email address</TableHead>
            <TableHead>Company name</TableHead>
            <TableHead>Phone number</TableHead>
            <TableHead>Contact owner</TableHead>
            <TableHead align="right"><span className="sr-only">Actions</span></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mode === 'loading' && <TableSkeleton columns={7} rows={6} />}
          {mode !== 'loading' && rows.length === 0 && (
            <TableEmpty
              colSpan={7}
              icon={<UsersIcon />}
              title="No contacts found"
              description={`Nothing matches “${query}”. Try another name, email or company.`}
              action={<Button variant="outline" onClick={() => setQuery('')}>Clear search</Button>}
            />
          )}
          {mode !== 'loading' &&
            rows.map((c) => {
              const isSel = selected.includes(c.id);
              return (
                <TableRow key={c.id} selected={isSel} interactive>
                  <TableCell className="w-12 pr-0">
                    <Checkbox aria-label={`Select ${c.name}`} checked={isSel} onCheckedChange={(v) => setSelected((s) => (v === true ? [...s, c.id] : s.filter((x) => x !== c.id)))} />
                  </TableCell>
                  <TableCell emphasis>
                    <span className="flex items-center gap-2.5"><Avatar name={c.name} />{c.name}</span>
                  </TableCell>
                  <TableCell>{c.email}</TableCell>
                  <TableCell>{c.company}</TableCell>
                  <TableCell className="tabular-nums">{c.phone}</TableCell>
                  <TableCell><span className="flex items-center gap-2"><Avatar name={c.owner} />{c.owner}</span></TableCell>
                  <TableCell align="right"><RowMenu name={c.name} /></TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableCard>
  );
}

export const Contacts: Story = { render: () => <ContactsTable /> };
export const Loading: Story = { render: () => <ContactsTable mode="loading" /> };
export const NoResults: Story = { render: () => <ContactsTable mode="empty" /> };

const accounts = [
  { platform: 'Facebook Page', name: 'Wragby_hq', by: 'Sarah Chen', status: 'Active', sync: '2024-09-30 14:22', vis: 'all' },
  { platform: 'Instagram Business', name: '@wragbysolutions', by: 'Jimmy Dane', status: 'Active', sync: '2024-09-30 14:15', vis: 'app' },
  { platform: 'LinkedIn Company', name: 'Wragby Business Solutions', by: 'Sarah Chen', status: 'Active', sync: '2024-09-30 13:50', vis: 'all' },
  { platform: 'X Account', name: '@wragbysolutions', by: 'Jimmy Dane', status: 'Inactive', sync: '2024-09-28 09:12', vis: 'all' },
  { platform: 'YouTube Channel', name: 'Wragby Solutions', by: 'Alex Wong', status: 'Failed', sync: '2024-09-30 11:45', vis: 'platform' },
];
const visOptions = [{ value: 'all', label: 'All posts' }, { value: 'app', label: 'App posts' }, { value: 'platform', label: 'Platform posts' }];

export const SocialAccounts: Story = {
  render: () => (
    <TableCard
      toolbar={
        <>
          <div className="flex flex-wrap items-center gap-3">
            <Input label="Search accounts" hideLabel size="md" placeholder="Search..." leadingIcon={<SearchIcon />} wrapperClassName="w-field-sm" />
            <Select label="Platforms" hideLabel prefix="Platforms:" size="md" defaultValue="all" options={[{ value: 'all', label: 'All' }, { value: 'fb', label: 'Facebook' }]} />
            <IconButton variant="outline" aria-label="Filter" icon={<FilterIcon />} />
          </div>
          <Button leadingIcon={<PlusIcon />}>Connect account</Button>
        </>
      }
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Platform</TableHead><TableHead>Account name</TableHead><TableHead>Connected by</TableHead><TableHead>Status</TableHead><TableHead>Last sync</TableHead><TableHead>Post visibility</TableHead><TableHead align="right"><span className="sr-only">Actions</span></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accounts.map((a) => (
            <TableRow key={a.platform}>
              <TableCell className="text-text-strong">{a.platform}</TableCell>
              <TableCell className="font-semibold text-text-strong">{a.name}</TableCell>
              <TableCell><span className="flex items-center gap-2"><Avatar name={a.by} />{a.by}</span></TableCell>
              <TableCell><Badge tone={a.status === 'Active' ? 'success' : a.status === 'Failed' ? 'danger' : 'neutral'}>{a.status}</Badge></TableCell>
              <TableCell className="font-mono text-caption">{a.sync}</TableCell>
              <TableCell><Select label={`Post visibility for ${a.name}`} hideLabel size="md" defaultValue={a.vis} options={visOptions} className="w-popover" /></TableCell>
              <TableCell align="right"><RowMenu name={a.name} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableCard>
  ),
};

export const ExpandableRows: Story = {
  render: () => (
    <TableCard>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead><TableHead>Industry</TableHead><TableHead align="right">Contacts</TableHead><TableHead><span className="sr-only">Expand</span></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[{ n: 'Acme Corp', i: 'Technology', open: true }, { n: 'Cash Drive', i: 'Fintech', open: false }].map((co) => (
            <TableExpandableRow
              key={co.n}
              colSpan={4}
              defaultExpanded={co.open}
              toggleLabel={`Show contacts for ${co.n}`}
              cells={<><TableCell emphasis>{co.n}</TableCell><TableCell>{co.i}</TableCell><TableCell align="right" className="tabular-nums">2</TableCell></>}
            >
              <table className="w-full text-left">
                <thead>
                  <tr><th className="py-2 text-overline text-text-muted">Contact</th><th className="py-2 text-overline text-text-muted">Email</th><th /></tr>
                </thead>
                <tbody className="divide-y divide-border-default">
                  {[['Alice Johnson', 'alice.j@acmecorp.com'], ['Bob Smith', 'bob.s@acmecorp.com']].map(([n, e]) => (
                    <tr key={n}>
                      <td className="py-2.5 text-body-sm text-text-primary">{n}</td>
                      <td className="py-2.5 text-body-sm text-text-secondary">{e}</td>
                      <td className="py-2.5 text-right"><Button variant="ghost" size="sm">Move</Button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TableExpandableRow>
          ))}
        </TableBody>
      </Table>
    </TableCard>
  ),
};
