import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SegmentedControl } from '../components/SegmentedControl';
import { GridViewIcon, ListViewIcon } from '../icons';
import { figma } from '../docs/links';

const meta = { title: 'Components/SegmentedControl', component: SegmentedControl, parameters: { design: { type: 'figma', url: figma('15:1457') } } } satisfies Meta<typeof SegmentedControl>;
export default meta;
type S = StoryObj<typeof meta>;
/** Figma list/grid toggle. */
export const ListGridToggle: S = {
  args: { variant: 'icon', value: 'list', onChange: () => {}, 'aria-label': 'View', options: [{ value: 'list', label: <ListViewIcon />, 'aria-label': 'List view' }, { value: 'grid', label: <GridViewIcon />, 'aria-label': 'Grid view' }] },
  render: (a) => {
    const [v, setV] = useState('list');
    return <SegmentedControl {...a} value={v} onChange={setV} />;
  },
};
export const Text: S = {
  args: { value: 'month', onChange: () => {}, 'aria-label': 'Period', options: [{ value: 'week', label: 'Week' }, { value: 'month', label: 'Month' }, { value: 'year', label: 'Year' }, { value: 'custom', label: 'Custom', disabled: true }] },
  render: (a) => {
    const [v, setV] = useState('month');
    return <SegmentedControl {...a} value={v} onChange={setV} />;
  },
};
