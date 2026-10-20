import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Tabs, TabPanel, type TabItem } from './Tabs';
import { FIGMA } from '../../patterns/demo-data';

const items: TabItem[] = [
  { value: 'requisitions', label: 'Consumption Requisitions' },
  { value: 'issuance', label: 'Stock Issuance History' },
  { value: 'items', label: 'Items' },
  { value: 'settings', label: 'Consumption Settings' },
];

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  args: { items, value: 'requisitions', onChange: () => {}, 'aria-label': 'Consumption' },
  parameters: {
    design: { url: FIGMA + '7053-5433' },
    docs: { description: { component: 'Section tabs from the Inventory consumption screens. Arrow keys, Home and End move focus and selection.' } },
  },
} satisfies Meta<typeof Tabs>;
export default meta;
type Story = StoryObj<typeof meta>;

export const FirstSelected: Story = {};
export const LastSelected: Story = { args: { value: 'settings' } };
export const WithDisabled: Story = { args: { items: [...items.slice(0, 3), { value: 'settings', label: 'Consumption Settings', disabled: true }] } };

export const Interactive: Story = {
  render: (args) => {
    const [value, setValue] = useState('requisitions');
    return (
      <div className="flex flex-col gap-4">
        <Tabs {...args} value={value} onChange={setValue} idPrefix="demo" />
        {items.map((t) => (
          <TabPanel key={t.value} value={t.value} activeValue={value} idPrefix="demo" className="font-data text-sm text-fg-muted">
            {t.label} content
          </TabPanel>
        ))}
      </div>
    );
  },
};
