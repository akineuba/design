import type { Meta, StoryObj } from '@storybook/react';
import { Mail } from 'lucide-react';
import { Checkbox, Input, SearchInput, Select, Switch } from './Field';

const meta: Meta<typeof Input> = {
  title: 'Components/Form controls',
  component: Input,
  tags: ['autodocs'],
  args: { label: 'Email', placeholder: 'user@company.com', required: true },
};
export default meta;
type S = StoryObj<typeof Input>;

export const Playground: S = {};

export const All: S = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 320px))', gap: 20 }}>
      <Input label="Email" required placeholder="user@company.com" leadingIcon={<Mail />} />
      <Input label="Tenant code" hint="Uppercase letters, numbers and underscores." defaultValue="WRAGBY_MAIN" />
      <Input label="Password" type="password" error="Password must be at least 8 characters." defaultValue="abc" />
      <Input label="Disabled" disabled defaultValue="Read only" />
      <Select label="Status" options={[{ value: 'all', label: 'All statuses' }, { value: 'active', label: 'Active' }, { value: 'inactive', label: 'Inactive' }]} />
      <SearchInput placeholder="Search by name or email…" />
      <Checkbox label="Include inactive" />
      <Switch label="Enforce SSO for all users" defaultChecked />
      <Checkbox label="Indeterminate" indeterminate />
    </div>
  ),
};
