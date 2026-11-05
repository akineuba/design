import type { Meta, StoryObj } from '@storybook/react';
import { useMemo, useState } from 'react';
import { Download, Pencil, SlidersHorizontal, Trash2, UserX } from 'lucide-react';
import { Pagination, Table, type Column } from './Table';
import { Avatar } from '../Avatar/Avatar';
import { Chip } from '../Tag/Tag';
import { StatusPill } from '../StatusPill/StatusPill';
import { ActionMenu } from '../ActionMenu/ActionMenu';
import { SearchInput, Select, Checkbox } from '../Field/Field';
import { Button } from '../Button/Button';
import { users, type DemoUser } from '../../demo/data';

const meta: Meta = { title: 'Components/Table', tags: ['autodocs'] };
export default meta;

const tone = { Active: 'success', Inactive: 'neutral', Invited: 'warning' } as const;

export const UsersTable: StoryObj = {
  render: () => {
    const [sort, setSort] = useState<{ key: string; direction: 'asc' | 'desc' }>({ key: 'name', direction: 'asc' });
    const [q, setQ] = useState('');
    const rows = useMemo(() => {
      const r = users.filter((u) => (u.name + u.email).toLowerCase().includes(q.toLowerCase()));
      const k = sort.key as keyof DemoUser;
      return [...r].sort((a, b) => String(a[k]).localeCompare(String(b[k])) * (sort.direction === 'asc' ? 1 : -1));
    }, [q, sort]);
    const columns: Column<DemoUser>[] = [
      { key: 'name', header: 'Name', sortable: true, render: (u) => (
        <div className="sso-cell-person"><Avatar name={u.name} tone="neutral" /><span className="sso-cell-primary">{u.name}</span></div>
      ) },
      { key: 'email', header: 'Email', sortable: true, render: (u) => <span className="sso-cell-secondary">{u.email}</span> },
      { key: 'roles', header: 'Roles', render: (u) => <div className="sso-cell-chips">{u.roles.map((r) => <Chip key={r} kind="removable">{r}</Chip>)}</div> },
      { key: 'entities', header: 'Entities', align: 'center', render: (u) => <span className="sso-num">{u.entities}</span> },
      { key: 'status', header: 'Status', sortable: true, render: (u) => <StatusPill tone={tone[u.status]}>{u.status}</StatusPill> },
      { key: 'actions', header: <span className="sso-visually-hidden">Actions</span>, align: 'right', width: 64, render: (u) => (
        <ActionMenu label={`Actions for ${u.name}`} items={[
          { label: 'Edit user', icon: <Pencil /> },
          { label: 'Deactivate', icon: <UserX /> },
          { label: 'Delete', icon: <Trash2 />, tone: 'danger' },
        ]} />
      ) },
    ];
    return (
      <Table
        caption="Users"
        columns={columns}
        rows={rows}
        rowKey={(u) => u.id}
        sort={sort}
        onSort={(key) => setSort((s) => ({ key, direction: s.key === key && s.direction === 'asc' ? 'desc' : 'asc' }))}
        toolbar={<>
          <SearchInput placeholder="Search by name or email…" value={q} onChange={(e) => setQ(e.target.value)} fieldClassName="sso-grow" style={{ width: 260 }} />
          <Select aria-label="Status" options={[{ value: '', label: 'All statuses' }, { value: 'active', label: 'Active' }]} />
          <Checkbox label="Include inactive" />
          <span style={{ flex: 1 }} />
          <Button variant="ghost" iconLeft={<Download />}>Export</Button>
          <Button variant="ghost" iconLeft={<SlidersHorizontal />}>Columns</Button>
        </>}
        footer={<Pagination page={1} pageCount={5} total={50} pageSize={10} noun="users" onPageChange={() => {}} />}
      />
    );
  },
};

export const Empty: StoryObj = {
  render: () => <Table columns={[{ key: 'n', header: 'Name', render: () => null }, { key: 's', header: 'Status', render: () => null }]} rows={[]} rowKey={() => ''} empty="No users match your search." />,
};
