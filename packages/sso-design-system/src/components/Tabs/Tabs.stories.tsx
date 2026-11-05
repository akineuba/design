import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Tabs } from './Tabs';

const meta: Meta<typeof Tabs> = { title: 'Components/Tabs', component: Tabs, tags: ['autodocs'] };
export default meta;
export const Default: StoryObj<typeof Tabs> = {
  render: () => {
    const [v, setV] = useState('users');
    return <Tabs aria-label="Access control" value={v} onChange={setV} items={[{ id: 'users', label: 'Users', count: 50 }, { id: 'roles', label: 'Roles', count: 6 }, { id: 'permissions', label: 'Permissions' }]} />;
  },
};
