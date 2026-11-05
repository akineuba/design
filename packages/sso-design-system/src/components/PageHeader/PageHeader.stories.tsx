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
    eyebrow: 'Access control',
    title: 'Users',
    subtitle: '4 of 5 purchased full-user seats assigned.',
    actions: <Button iconLeft={<Plus />}>Add user</Button>,
  },
};
export default meta;
export const Default: StoryObj<typeof PageHeader> = {};
export const WithBadge: StoryObj<typeof PageHeader> = {
  args: {
    eyebrow: 'Organisation',
    title: 'Entities',
    badge: <Tag>3 / 3 used</Tag>,
    subtitle: 'Create and manage legal entities under this tenant.',
    actions: (<><Button variant="outline" iconLeft={<Plus />}>Buy entity</Button><Button iconLeft={<Plus />}>Add entity</Button></>),
  },
};
