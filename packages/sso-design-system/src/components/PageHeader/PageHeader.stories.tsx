import type { Meta, StoryObj } from '@storybook/react';
import { Plus } from 'lucide-react';
import { PageHeader } from './PageHeader';
import { Button } from '../Button/Button';
import { Tag } from '../Tag/Tag';

const meta: Meta<typeof PageHeader> = {
  title: 'Components/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
  args: {
    title: 'Tenants',
    subtitle: 'Manage tenants, enable products, and set the default product per tenant.',
    actions: <Button leadingIcon={<Plus />}>Add tenant</Button>,
  },
};
export default meta;
export const Default: StoryObj<typeof PageHeader> = {};
export const WithBadge: StoryObj<typeof PageHeader> = {
  args: {
    title: 'Entities',
    badge: <Tag>3 / 3 used</Tag>,
    subtitle: 'Create and manage legal entities under this tenant.',
    actions: (<><Button variant="outline" leadingIcon={<Plus />}>Buy entity</Button><Button leadingIcon={<Plus />}>Add entity</Button></>),
  },
};
export const WithBackLink: StoryObj<typeof PageHeader> = {
  args: { back: { label: 'Tenants', href: '#' }, title: 'AIM Group', subtitle: 'Code AIMGROUP · Default product PAYEET', actions: <Button variant="secondary">Edit tenant</Button> },
};
