import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { CopyIcon, DownloadIcon, EyeIcon, PencilIcon, SendIcon, TrashIcon } from '../../icons';
import { Table, TableBody, TableCard, TableCell, TableHead, TableHeader, TableRow } from '../Table';
import { RowActionButtons, RowActionLink, RowActionsMenu, TableLink } from './RowActions';

const meta = {
  title: 'Components/RowActions',
  component: RowActionsMenu,
  tags: ['autodocs'],
  args: { recordName: 'Summer Sale' },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Table row actions. `RowActionsMenu`: Figma `more-horizontal` trigger (radius 4, 14px icon) opening `context-menu` (View #409CFF, Edit #DF9B17, Delete #EE1F2F, 13/500, 36px items). ' +
          '`RowActionLink`: Campaigns table "View" (eye + label, radius 4, 4px inset). `RowActionButtons`: inline icon buttons, optionally revealed on row hover or focus. ' +
          'Colours use the readable token for each intent (`text-link`, `accent-navy`, `status-warning-text`, `status-danger`).',
      },
    },
  },
} satisfies Meta<typeof RowActionsMenu>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Standard View / Edit / Delete set built from the handlers. */
export const Menu: Story = {
  args: { onView: () => {}, onEdit: () => {}, onDelete: () => {} },
  render: (args) => (
    <div className="flex h-modal-sm items-start justify-end">
      <RowActionsMenu {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole('button', { name: 'Actions for Summer Sale' }));
    const body = within(canvasElement.ownerDocument.body);
    await expect(await body.findByRole('menuitem', { name: 'Delete' })).toBeInTheDocument();
  },
};

/** Custom actions with a separated destructive item. */
export const CustomMenu: Story = {
  args: {
    actions: [
      { label: 'Preview', icon: <EyeIcon />, tone: 'info' },
      { label: 'Send test email', icon: <SendIcon /> },
      { label: 'Duplicate', icon: <CopyIcon /> },
      { label: 'Export report', icon: <DownloadIcon />, disabled: true },
      { label: 'Delete', icon: <TrashIcon />, tone: 'danger', separated: true },
    ],
  },
  render: (args) => (
    <div className="flex h-modal-sm items-start justify-end">
      <RowActionsMenu {...args} />
    </div>
  ),
};

/** All three patterns in rows. Hover the last row to reveal its inline buttons. */
export const Patterns: Story = {
  render: () => (
    <TableCard>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Pattern</TableHead><TableHead>Record</TableHead><TableHead align="right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell emphasis>Overflow menu</TableCell>
            <TableCell>Summer Sale</TableCell>
            <TableCell align="right"><RowActionsMenu recordName="Summer Sale" onView={() => {}} onEdit={() => {}} onDelete={() => {}} /></TableCell>
          </TableRow>
          <TableRow>
            <TableCell emphasis>Inline link</TableCell>
            <TableCell><TableLink numeric href="#">60210</TableLink></TableCell>
            <TableCell align="right"><RowActionLink>View<span className="sr-only"> campaign 60210</span></RowActionLink></TableCell>
          </TableRow>
          <TableRow>
            <TableCell emphasis>Inline buttons</TableCell>
            <TableCell>Meet the team</TableCell>
            <TableCell align="right">
              <RowActionButtons recordName="Meet the team" actions={[{ label: 'Edit', icon: <PencilIcon /> }, { label: 'Delete', icon: <TrashIcon />, danger: true }]} />
            </TableCell>
          </TableRow>
          <TableRow interactive>
            <TableCell emphasis>Inline buttons, hover reveal</TableCell>
            <TableCell>Product update</TableCell>
            <TableCell align="right">
              <RowActionButtons revealOnHover recordName="Product update" actions={[{ label: 'Edit', icon: <PencilIcon /> }, { label: 'Duplicate', icon: <CopyIcon /> }, { label: 'Delete', icon: <TrashIcon />, danger: true }]} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableCard>
  ),
};
