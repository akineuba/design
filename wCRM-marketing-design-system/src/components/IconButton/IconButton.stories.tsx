import type { Meta, StoryObj } from '@storybook/react';
import { CloseIcon, FilterIcon, MoreIcon, PencilIcon } from '../../icons';
import { IconButton } from './IconButton';

const meta = {
  title: 'Components/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  args: { 'aria-label': 'Filter', icon: <FilterIcon /> },
  argTypes: { icon: { control: false } },
  parameters: { docs: { description: { component: 'Figma: toolbar `Filter button` (1931:24248, active 1931:24486), row actions `more-horizontal`, drawer close. Always pass `aria-label`.' } } },
} satisfies Meta<typeof IconButton>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Outline: Story = { args: { variant: 'outline' } };
export const Active: Story = { args: { variant: 'outline', active: true, 'aria-label': 'Filter (2 applied)' } };
export const Ghost: Story = { args: { variant: 'ghost', icon: <MoreIcon />, 'aria-label': 'Row actions' } };
export const Disabled: Story = { args: { variant: 'outline', disabled: true } };

export const Set: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <IconButton variant="outline" aria-label="Filter" icon={<FilterIcon />} />
      <IconButton variant="outline" active aria-label="Filter (2 applied)" icon={<FilterIcon />} />
      <IconButton aria-label="Edit" icon={<PencilIcon />} size="sm" />
      <IconButton aria-label="Row actions" icon={<MoreIcon />} size="sm" />
      <IconButton aria-label="Close" icon={<CloseIcon />} />
    </div>
  ),
};
