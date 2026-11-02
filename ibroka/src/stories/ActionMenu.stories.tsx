import type { Meta, StoryObj } from '@storybook/react';
import { ActionMenu } from '../components/ActionMenu';
import { DeleteIcon, EditIcon, IncomeIcon, LinkIcon, ViewIcon } from '../icons';

const items = [
  { label: 'View', icon: <ViewIcon />, onSelect: () => {} },
  { label: 'Edit', icon: <EditIcon />, tone: 'edit' as const, onSelect: () => {} },
  { label: 'Delete', icon: <DeleteIcon />, tone: 'danger' as const, onSelect: () => {} },
  { label: 'Receive premium', icon: <IncomeIcon />, tone: 'positive' as const, onSelect: () => {} },
  { label: 'Open claims', icon: <LinkIcon />, tone: 'link' as const, onSelect: () => {} },
];
const meta = { title: 'Components/ActionMenu', component: ActionMenu, args: { items, 'aria-label': 'Actions for POL-2026-00975' }, decorators: [(S) => <div className="flex h-[280px] w-[300px] justify-end"><S /></div>] } satisfies Meta<typeof ActionMenu>;
export default meta;
type S = StoryObj<typeof meta>;
export const Closed: S = {};
export const Open: S = { args: { defaultOpen: true } };
export const WithDisabledItem: S = { args: { defaultOpen: true, items: [items[0], { ...items[1], disabled: true }, items[2]] } };
