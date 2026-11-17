import type { Meta, StoryObj } from '@storybook/react';
import { expect, screen, userEvent, within } from '@storybook/test';
import { DownloadIcon, EyeIcon, MoreIcon, PencilIcon, TrashIcon } from '../../icons';
import { IconButton } from '../IconButton';
import { Menu, MenuContent, MenuItem, MenuLabel, MenuSeparator, MenuTrigger } from './Menu';

const meta = {
  title: 'Components/Menu',
  component: Menu,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: 'Figma: `context-menu` (795:6000) opened from a row "…" button. Items are coloured by intent as in Figma: View (navy), Edit (warning), Delete (danger).' } } },
} satisfies Meta<typeof Menu>;
export default meta;
type Story = StoryObj<typeof meta>;

const Actions = ({ open }: { open?: boolean }) => (
  <Menu defaultOpen={open} modal={false}>
    <MenuTrigger asChild>
      <IconButton aria-label="Actions for Olumide Balogun" icon={<MoreIcon />} />
    </MenuTrigger>
    <MenuContent>
      <MenuItem tone="info" icon={<EyeIcon />}>View</MenuItem>
      <MenuItem tone="warning" icon={<PencilIcon />}>Edit</MenuItem>
      <MenuItem tone="danger" icon={<TrashIcon />}>Delete</MenuItem>
    </MenuContent>
  </Menu>
);

export const RowActions: Story = { render: () => <Actions /> };

export const Open: Story = {
  render: () => <div className="h-popover"><Actions open /></div>,
};

export const GroupedWithDisabled: Story = {
  render: () => (
    <div className="h-popover">
      <Menu defaultOpen modal={false}>
        <MenuTrigger asChild>
          <IconButton variant="outline" aria-label="Campaign actions" icon={<MoreIcon />} />
        </MenuTrigger>
        <MenuContent>
          <MenuLabel>Campaign</MenuLabel>
          <MenuItem icon={<EyeIcon />}>View report</MenuItem>
          <MenuItem icon={<DownloadIcon />} shortcut="⌘E">Export CSV</MenuItem>
          <MenuItem icon={<PencilIcon />} disabled>Edit (sending)</MenuItem>
          <MenuSeparator />
          <MenuItem tone="danger" icon={<TrashIcon />}>Delete campaign</MenuItem>
        </MenuContent>
      </Menu>
    </div>
  ),
};

export const KeyboardOpens: Story = {
  render: () => <Actions />,
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole('button', { name: /actions/i });
    trigger.focus();
    await userEvent.keyboard('{Enter}');
    await expect(await screen.findByRole('menuitem', { name: 'Delete' })).toBeInTheDocument();
    await userEvent.keyboard('{Escape}');
  },
};
