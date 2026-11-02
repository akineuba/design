import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Tabs } from '../components/Tabs';
import { figma } from '../docs/links';

const items = [
  { id: 'policies', label: 'Policies' },
  { id: 'claims', label: 'Claims', count: 3 },
  { id: 'documents', label: 'Documents' },
  { id: 'audit', label: 'Audit trail', disabled: true },
];
const meta = { title: 'Components/Tabs', component: Tabs, args: { items, value: 'policies', onChange: () => {}, 'aria-label': 'Client sections' }, parameters: { design: { type: 'figma', url: figma('15:1356') } } } satisfies Meta<typeof Tabs>;
export default meta;
type S = StoryObj<typeof meta>;
export const Interactive: S = {
  render: (a) => {
    const [v, setV] = useState('policies');
    return <div className="w-[560px]"><Tabs {...a} value={v} onChange={setV} /></div>;
  },
};
export const SecondSelected: S = { args: { value: 'claims' } };
