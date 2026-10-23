import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';
import { CloseIcon, DownloadIcon, LucideArrowDownIcon, LucideArrowUpIcon, LucideMoreIcon, LucidePencilMdIcon, LucideSearchIcon, TrashIcon } from '../../icons';
import { IconButton } from './IconButton';

const FIGMA = 'https://www.figma.com/design/EIQlA9M6mP2KlskFFy2X2U/wCRM-updates?node-id=';
const design = (node: string) => ({ design: { type: 'figma', url: FIGMA + node } });

const meta = {
  title: 'Components/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  args: { 'aria-label': 'Edit Secondary email', icon: <LucidePencilMdIcon />, size: 'row', onClick: fn() },
  argTypes: { icon: { control: false } },
  parameters: {
    ...design('2495-4183'),
    docs: {
      description: {
        component:
          'Square icon-only buttons. Figma `Icon button` (2495:4183…4203): 30×30, r6, no fill or stroke, 16px glyph with 2px round strokes — ' +
          '#4B5563 for Edit / Move up / Move down, #A3AED0 for More, #CBD5E1 when disabled. Always pass `aria-label`.',
      },
    },
  },
} satisfies Meta<typeof IconButton>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Fields table row "Edit" (2495:4183). */
export const Edit: Story = { parameters: design('2495-4183') };
/** Fields table row "Move up" (2495:4186). */
export const MoveUp: Story = { args: { icon: <LucideArrowUpIcon />, 'aria-label': 'Move Secondary email up' }, parameters: design('2495-4186') };
/** Fields table row "Move down" (2495:4190). */
export const MoveDown: Story = { args: { icon: <LucideArrowDownIcon />, 'aria-label': 'Move Secondary email down' }, parameters: design('2495-4190') };
/** Fields table row "More" (2495:4194), #A3AED0. */
export const More: Story = { args: { icon: <LucideMoreIcon />, tone: 'muted', 'aria-label': 'More actions' }, parameters: design('2495-4194') };
/** First row: "Move up" disabled (2495:4199), #CBD5E1. */
export const MoveUpDisabled: Story = { args: { icon: <LucideArrowUpIcon />, disabled: true, 'aria-label': 'Move up' }, parameters: design('2495-4199') };
/** Last row: "Move down" disabled (2495:4203). */
export const MoveDownDisabled: Story = { args: { icon: <LucideArrowDownIcon />, disabled: true, 'aria-label': 'Move down' }, parameters: design('2495-4203') };
/** User management search-only button: 42×42, r8, 1px #E2E8F0, 20px glyph. */
export const SearchButton: Story = { args: { variant: 'outline', size: 'search', icon: <LucideSearchIcon />, 'aria-label': 'Search users' }, parameters: design('1823-7444') };
/** Toolbar tool (derived outline 40px). */
export const Outline: Story = { args: { variant: 'outline', size: 'md', icon: <DownloadIcon />, 'aria-label': 'Export' } };
/** Inline delete: red hover (derived). */
export const DangerGhost: Story = { args: { tone: 'danger', icon: <TrashIcon />, 'aria-label': 'Delete' } };

/** The fields-table action cell: Edit, Move up, Move down, More (gap 4). */
export const RowActions: Story = {
  render: () => (
    <div className="flex items-center gap-1">
      <IconButton size="row" aria-label="Edit" icon={<LucidePencilMdIcon />} />
      <IconButton size="row" aria-label="Move up" icon={<LucideArrowUpIcon />} />
      <IconButton size="row" aria-label="Move down" icon={<LucideArrowDownIcon />} />
      <IconButton size="row" tone="muted" aria-label="More" icon={<LucideMoreIcon />} />
    </div>
  ),
  parameters: design('2495-4207'),
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await userEvent.tab();
    await expect(c.getByRole('button', { name: 'Edit' })).toHaveFocus();
  },
};

/** Every size × state. */
export const Matrix: Story = {
  render: () => (
    <div className="grid grid-cols-4 items-center gap-x-6 gap-y-3">
      {['Size', 'Default', 'Muted', 'Disabled'].map((h) => (
        <span key={h} className="text-overline text-text-secondary">{h}</span>
      ))}
      {(['row', 'sm', 'md', 'search', 'lg'] as const).map((s) => (
        <div key={s} className="contents">
          <span className="text-label-sm text-text-primary">{s}</span>
          <IconButton size={s} variant={s === 'search' ? 'outline' : 'ghost'} aria-label="Edit" icon={<LucidePencilMdIcon />} />
          <IconButton size={s} tone="muted" aria-label="More" icon={<LucideMoreIcon />} />
          <IconButton size={s} disabled aria-label="Close" icon={<CloseIcon />} />
        </div>
      ))}
    </div>
  ),
};
