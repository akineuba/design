import type { Meta, StoryObj } from '@storybook/react';
import { useMemo, useState } from 'react';
import { CalendarIcon, CopyIcon, DownloadIcon, ListIcon, PencilIcon, PlusIcon, SearchIcon, TrashIcon, UploadIcon, UsersIcon } from '../../icons';
import { Avatar } from '../Avatar';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import { Card, StatCard } from '../Card';
import { FilterButton } from '../FilterButton';
import { FilterCheckboxList, FilterPopover } from '../FilterPopover';
import { Input } from '../Input';
import { Pagination } from '../Pagination';
import { RowActionButtons, RowActionLink, RowActionsMenu, TableLink } from '../RowActions';
import { Select } from '../Select';
import { Tabs, TabsList, TabsTrigger } from '../Tabs';
import { ViewToggle } from '../ViewToggle';
import {
  Table, TableBody, TableCard, TableCell, TableCellStack, TableEmpty, TableExpandableRow, TableHead, TableHeader, TableRow, TableSkeleton, type SortDirection,
} from './Table';

const meta = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    backgrounds: { default: 'canvas' },
    docs: { description: { component: 'Figma: Contacts (817:8972), Companies, Social accounts (1224:25339), User management (1823:7411), Email marketing, Campaigns and Social posts lists. Compose `TableCard` → `Table` → rows; use `Pagination` in the footer and `RowActions` for row-level actions.' } },
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

const RowMenu = ({ name }: { name: string }) => <RowActionsMenu recordName={name} onView={() => {}} onEdit={() => {}} onDelete={() => {}} />;

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
            <FilterButton />
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

/* ------------------------------------------------------------ Email marketing */

const emails = [
  { id: 1, title: 'Summer Sale: Up to 50% off all plans', delivered: '12,450', open: '64.2%', click: '12.8%', updated: 'Jan 14, 2025', by: 'Sarah K.', send: 'Jan 13, 2025', source: 'Scheduled' },
  { id: 2, title: 'New Azure features are here! What’s changed', delivered: '9,890', open: '42.1%', click: '8.5%', updated: 'Jan 12, 2025', by: 'Alex T.', send: 'Jan 11, 2025', source: 'API' },
  { id: 3, title: 'Just launched: Microsoft Security Copilot', delivered: '15,340', open: '55.8%', click: '14.2%', updated: 'Jan 10, 2025', by: 'Mike R.', send: 'Jan 09, 2025', source: 'Manual' },
  { id: 4, title: 'The Future of Enterprise Security', delivered: '8,560', open: '38.9%', click: '7.1%', updated: 'Jan 08, 2025', by: 'Lisa M.', send: 'Jan 07, 2025', source: 'Scheduled' },
  { id: 5, title: 'Behind the scenes: Our design process', delivered: '11,200', open: '48.3%', click: '9.6%', updated: 'Jan 05, 2025', by: 'Sarah K.', send: 'Jan 04, 2025', source: 'API' },
  { id: 6, title: 'Join our upcoming webinar: Securing the cloud', delivered: '14,150', open: '52.0%', click: '11.4%', updated: 'Jan 03, 2025', by: 'Akinola E.', send: 'Jan 02, 2025', source: 'Manual' },
];

/**
 * Email marketing list: dot status tabs, numeric columns right-aligned, a two-line "Last updated" cell
 * (date over author, rows grow to ≈ 61px) and the "…" row menu.
 */
export const EmailMarketing: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return (
      <div className="flex flex-col gap-4">
        <TableCard footer={<Pagination page={page} pageSize={6} totalItems={24} onPageChange={setPage} />}>
          <Tabs variant="dot" defaultValue="all" className="gap-0">
            <TabsList aria-label="Email status" className="px-5 pt-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="drafts">Drafts</TabsTrigger>
              <TabsTrigger value="scheduled" tone="warning">Scheduled</TabsTrigger>
              <TabsTrigger value="sent" tone="success">Sent</TabsTrigger>
            </TabsList>
          </Tabs>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email title</TableHead>
                <TableHead align="right">Delivered</TableHead>
                <TableHead align="right">Open rate</TableHead>
                <TableHead align="right">Click rate</TableHead>
                <TableHead>Last updated</TableHead>
                <TableHead>Publish/send date</TableHead>
                <TableHead>Publish source</TableHead>
                <TableHead align="right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {emails.map((e) => (
                <TableRow key={e.id} interactive>
                  <TableCell emphasis className="max-w-field-sm truncate">{e.title}</TableCell>
                  <TableCell align="right" className="tabular-nums">{e.delivered}</TableCell>
                  <TableCell align="right" className="font-medium tabular-nums">{e.open}</TableCell>
                  <TableCell align="right" className="font-medium tabular-nums">{e.click}</TableCell>
                  <TableCell className="whitespace-nowrap"><TableCellStack primary={e.updated} secondary={e.by} /></TableCell>
                  <TableCell className="whitespace-nowrap">{e.send}</TableCell>
                  <TableCell>{e.source}</TableCell>
                  <TableCell align="right"><RowMenu name={e.title} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableCard>
      </div>
    );
  },
};

/* ------------------------------------------------------------------ Campaigns */

const campaigns = [
  { code: '60210', name: 'Q1 Lagos product launch', type: 'Email', audience: 'Lagos prospects', status: 'Active', start: 'Jan 06, 2025' },
  { code: '60211', name: 'Valentine’s promo', type: 'Social', audience: 'All subscribers', status: 'Scheduled', start: 'Feb 10, 2025' },
  { code: '60198', name: 'Webinar follow-up', type: 'Email', audience: 'Webinar attendees', status: 'Completed', start: 'Dec 12, 2024' },
  { code: '60187', name: 'Holiday retargeting', type: 'Ads', audience: 'Cart abandoners', status: 'Paused', start: 'Dec 01, 2024' },
];
const statusTone = { Active: 'success', Scheduled: 'info', Completed: 'neutral', Paused: 'warning' } as const;

/** Campaigns list: campaign code as a `TableLink`, status badges, and an inline "View" `RowActionLink` instead of a menu. */
export const Campaigns: Story = {
  render: () => (
    <TableCard
      toolbar={
        <>
          <Input label="Search campaigns" hideLabel size="md" placeholder="Search..." leadingIcon={<SearchIcon />} wrapperClassName="w-field-sm" />
          <div className="flex items-center gap-3">
            <FilterButton count={1} />
            <Button leadingIcon={<PlusIcon />}>New campaign</Button>
          </div>
        </>
      }
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Code</TableHead><TableHead>Campaign</TableHead><TableHead>Type</TableHead><TableHead>Audience</TableHead><TableHead>Status</TableHead><TableHead>Start date</TableHead><TableHead align="right"><span className="sr-only">Actions</span></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {campaigns.map((c) => (
            <TableRow key={c.code}>
              <TableCell><TableLink numeric href="#">{c.code}</TableLink></TableCell>
              <TableCell emphasis>{c.name}</TableCell>
              <TableCell>{c.type}</TableCell>
              <TableCell>{c.audience}</TableCell>
              <TableCell><Badge tone={statusTone[c.status as keyof typeof statusTone]}>{c.status}</Badge></TableCell>
              <TableCell className="whitespace-nowrap">{c.start}</TableCell>
              <TableCell align="right"><RowActionLink>View<span className="sr-only"> {c.name}</span></RowActionLink></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableCard>
  ),
};

/* --------------------------------------------------------------- Social posts */

const posts = [
  { id: 1, title: 'Meet the team behind wCRM', channels: 'Instagram, LinkedIn', status: 'Published', date: 'Jan 14, 2025 · 10:00', by: 'Sarah Chen' },
  { id: 2, title: '5 tips for cleaner contact data', channels: 'LinkedIn', status: 'Scheduled', date: 'Jan 18, 2025 · 09:30', by: 'Jimmy Dane' },
  { id: 3, title: 'Product update: bulk import', channels: 'X, Facebook', status: 'Draft', date: '—', by: 'Alex Wong' },
  { id: 4, title: 'Customer story: Cash Drive', channels: 'Facebook', status: 'Failed', date: 'Jan 12, 2025 · 15:00', by: 'Sarah Chen' },
];
const postTone = { Published: 'success', Scheduled: 'warning', Draft: 'neutral', Failed: 'danger' } as const;
const channelOptions = [{ value: 'ig', label: 'Instagram' }, { value: 'li', label: 'LinkedIn' }, { value: 'fb', label: 'Facebook' }, { value: 'x', label: 'X' }];

/**
 * Social posts screen: stats row (first card featured), toolbar with `FilterButton`, "New Post" and the list/calendar
 * `ViewToggle` swap buttons, dot status tabs, then the table with hover-revealed inline actions.
 */
export const SocialPosts: Story = {
  render: () => {
    const [view, setView] = useState('list');
    const [draft, setDraft] = useState<string[]>([]);
    const [applied, setApplied] = useState<string[]>([]);
    return (
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard featured label="Total posts" value="127" />
          <StatCard label="Scheduled" value="24" />
          <StatCard label="Published" value="89" />
          <StatCard label="Drafts" value="8" />
        </div>
        <TableCard
          toolbar={
            <>
              <Tabs variant="dot" defaultValue="all" className="gap-0">
                <TabsList aria-label="Post status" className="border-b-0">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="drafts">Drafts</TabsTrigger>
                  <TabsTrigger value="scheduled" tone="warning">Scheduled</TabsTrigger>
                  <TabsTrigger value="sent" tone="success">Sent</TabsTrigger>
                </TabsList>
              </Tabs>
              <div className="flex flex-wrap items-center gap-5">
                <FilterPopover trigger={<FilterButton display="responsive" count={applied.length} />} onClear={() => setDraft([])} onApply={() => setApplied(draft)}>
                  <FilterCheckboxList label="Channels" options={channelOptions} value={draft} onChange={setDraft} />
                </FilterPopover>
                <Button leadingIcon={<PlusIcon />}>New post</Button>
                <ViewToggle
                  aria-label="Posts view"
                  value={view}
                  onValueChange={setView}
                  options={[{ value: 'list', label: 'List view', icon: <ListIcon /> }, { value: 'calendar', label: 'Calendar view', icon: <CalendarIcon /> }]}
                />
              </div>
            </>
          }
        >
          {view === 'list' ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Post</TableHead><TableHead>Channels</TableHead><TableHead>Status</TableHead><TableHead>Publish date</TableHead><TableHead>Author</TableHead><TableHead align="right"><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.map((p) => (
                  <TableRow key={p.id} interactive>
                    <TableCell emphasis>{p.title}</TableCell>
                    <TableCell>{p.channels}</TableCell>
                    <TableCell><Badge tone={postTone[p.status as keyof typeof postTone]}>{p.status}</Badge></TableCell>
                    <TableCell className="whitespace-nowrap tabular-nums">{p.date}</TableCell>
                    <TableCell><span className="flex items-center gap-2"><Avatar name={p.by} />{p.by}</span></TableCell>
                    <TableCell align="right">
                      <RowActionButtons
                        revealOnHover
                        recordName={p.title}
                        actions={[
                          { label: 'Edit', icon: <PencilIcon /> },
                          { label: 'Duplicate', icon: <CopyIcon /> },
                          { label: 'Delete', icon: <TrashIcon />, danger: true },
                        ]}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="px-5 py-12 text-center text-body-sm text-text-secondary">Calendar view</p>
          )}
        </TableCard>
      </div>
    );
  },
};

/* -------------------------------------------------------------------- Compact */

/** `density="compact"`: 44px rows for dense reports and side panels. */
export const Compact: Story = {
  render: () => (
    <Card padding="none" className="overflow-hidden">
      <Table density="compact">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead><TableHead>Company</TableHead><TableHead>Owner</TableHead><TableHead align="right"><span className="sr-only">Actions</span></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contacts.slice(0, 5).map((c) => (
            <TableRow key={c.id}>
              <TableCell emphasis>{c.name}</TableCell>
              <TableCell>{c.company}</TableCell>
              <TableCell>{c.owner}</TableCell>
              <TableCell align="right"><RowMenu name={c.name} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  ),
};
