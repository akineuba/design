import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Tabs, TabPanel, type TabItem } from './Tabs';
import { FIGMA } from '../../patterns/demo-data';

const items: TabItem[] = [
  { value: 'coa', label: 'Chart of accounts' },
  { value: 'journal', label: 'Journal' },
  { value: 'payment', label: 'Receive payment' },
  { value: 'budget', label: 'Budget' },
];

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  args: { items, value: 'coa', onChange: () => {}, 'aria-label': 'Accounting' },
  parameters: {
    design: { url: FIGMA + '1871-19163' },
    docs: { description: { component: 'Section tabs that switch between sibling pages of a module (here Accounting). Arrow keys, Home and End move focus and selection.' } },
  },
} satisfies Meta<typeof Tabs>;
export default meta;
type Story = StoryObj<typeof meta>;

export const FirstSelected: Story = {};
export const LastSelected: Story = { args: { value: 'budget' } };
export const WithDisabled: Story = { args: { items: [...items.slice(0, 3), { value: 'budget', label: 'Budget', disabled: true }] } };

export const Interactive: Story = {
  render: (args) => {
    const [value, setValue] = useState('coa');
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
