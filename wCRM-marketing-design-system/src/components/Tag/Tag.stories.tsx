import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Tag } from './Tag';

const meta = {
  title: 'Components/Tag',
  component: Tag,
  tags: ['autodocs'],
  args: { children: 'Enterprise Account' },
  parameters: { docs: { description: { component: 'Figma: `filter-tag-chip` "Active Filters" panel (1039:3995). Selected chips use navy text.' } } },
} satisfies Meta<typeof Tag>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Selected: Story = { args: { selected: true, children: 'Microsoft Security' } };

export const Removable: Story = {
  render: () => {
    const [tags, setTags] = useState(['Enterprise Account', 'Jan 2024', 'Active', 'LinkedIn', 'Bamidele Olatunde']);
    return (
      <div className="flex w-modal-sm flex-wrap gap-2">
        {tags.map((t) => (
          <Tag key={t} onRemove={() => setTags((x) => x.filter((y) => y !== t))}>{t}</Tag>
        ))}
        {tags.length === 0 && <p className="text-body-sm text-text-secondary">No active filters.</p>}
      </div>
    );
  },
};
