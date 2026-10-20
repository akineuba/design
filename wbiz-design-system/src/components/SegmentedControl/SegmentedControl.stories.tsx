import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SegmentedControl } from './SegmentedControl';
import { GridIcon, ListIcon } from '../../icons';
import { FIGMA } from '../../patterns/demo-data';

const meta = {
  title: 'Components/SegmentedControl',
  component: SegmentedControl,
  args: {
    options: [{ value: 'inventory', label: 'Inventory' }, { value: 'free', label: 'Free Text' }],
    value: 'inventory',
    onChange: () => {},
    'aria-label': 'Line type',
  },
  argTypes: { appearance: { control: 'inline-radio', options: ['pill', 'boxed'] } },
  parameters: { docs: { description: { component: 'Two styles from the new features screens: `pill` for the Inventory / Free Text switch on requisition lines, `boxed` for the List / Card view toggle.' } } },
} satisfies Meta<typeof SegmentedControl>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Pill: Story = { parameters: { design: { url: FIGMA + '7053-5632' } } };
export const PillSecondSelected: Story = { args: { value: 'free' } };

export const BoxedViewToggle: Story = {
  args: {
    appearance: 'boxed',
    'aria-label': 'View',
    value: 'list',
    options: [{ value: 'list', label: 'List', icon: <ListIcon /> }, { value: 'card', label: 'Card', icon: <GridIcon /> }],
  },
  parameters: { design: { url: FIGMA + '7053-5973' } },
};

export const WithDisabledOption: Story = {
  args: { options: [{ value: 'inventory', label: 'Inventory' }, { value: 'free', label: 'Free Text', disabled: true }] },
};

export const Interactive: Story = {
  render: (args) => {
    const [v, setV] = useState('inventory');
    const [view, setView] = useState('list');
    return (
      <div className="flex flex-col items-start gap-4">
        <SegmentedControl {...args} value={v} onChange={setV} />
        <div className="flex items-center gap-2 font-data text-13 text-fg-muted">
          View:
          <SegmentedControl appearance="boxed" aria-label="View" value={view} onChange={setView} options={[{ value: 'list', label: 'List', icon: <ListIcon /> }, { value: 'card', label: 'Card', icon: <GridIcon /> }]} />
        </div>
      </div>
    );
  },
};
