import type { Meta, StoryObj } from '@storybook/react';
import { CloseIcon, DownloadIcon, MoreIcon, PencilIcon, TrashIcon } from '../../icons';
import { IconButton } from './IconButton';

const meta = {
  title: 'Components/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  args: { 'aria-label': 'Export', icon: <DownloadIcon /> },
  argTypes: { icon: { control: false } },
  parameters: { docs: { description: { component: 'Square icon-only buttons: toolbar tools, inline row actions, drawer close. Always pass `aria-label`. For the filter trigger use `FilterButton`; for row menus use `RowActionsMenu`.' } } },
} satisfies Meta<typeof IconButton>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Outline: Story = { args: { variant: 'outline' } };
export const Active: Story = { args: { variant: 'outline', active: true, 'aria-label': 'Export (selected)' } };
export const DangerGhost: Story = { args: { variant: 'ghost', tone: 'danger', icon: <TrashIcon />, 'aria-label': 'Delete' } };
export const Ghost: Story = { args: { variant: 'ghost', icon: <MoreIcon />, 'aria-label': 'Row actions' } };
export const Disabled: Story = { args: { variant: 'outline', disabled: true } };

export const Set: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <IconButton variant="outline" aria-label="Export" icon={<DownloadIcon />} />
      <IconButton aria-label="Delete" tone="danger" icon={<TrashIcon />} size="sm" />
      <IconButton aria-label="Edit" icon={<PencilIcon />} size="sm" />
      <IconButton aria-label="Row actions" icon={<MoreIcon />} size="sm" />
      <IconButton aria-label="Close" icon={<CloseIcon />} />
    </div>
  ),
};
