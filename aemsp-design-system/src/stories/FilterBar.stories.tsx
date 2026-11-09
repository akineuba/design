import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FilterBar, Toolbar } from '../components/data';
import { FilterDropdown, SegmentedControl } from '../components/forms';
import { Button } from '../components/primitives';
const filters = [
  { id: 'type', label: 'Type', options: [{ value: 'oem', label: 'OEM' }, { value: 'dealer', label: 'Dealer' }, { value: 'fleet', label: 'Fleet' }] },
  { id: 'status', label: 'Status', options: [{ value: 'active', label: 'Active' }, { value: 'overdue', label: 'Overdue' }, { value: 'pending', label: 'Pending' }] },
  { id: 'region', label: 'Region', multi: true, options: [{ value: 'uk', label: 'UK & Ireland' }, { value: 'emea', label: 'EMEA' }, { value: 'apac', label: 'APAC' }] },
];
const meta: Meta<typeof FilterBar> = { title: 'Components/FilterBar', component: FilterBar, tags: ['autodocs'], args: { filters }, decorators: [(S) => <div style={{ minHeight: 320 }}><S /></div>] };
export default meta;
type S = StoryObj<typeof FilterBar>;
export const Default: S = { args: { actions: <><Button icon="add">Add organisation</Button><Button variant="outline" icon="export">Export</Button></> } };
export const WithActiveFilters: S = { args: { defaultValues: { type: 'oem', region: ['uk', 'emea'] } } };
export const Applying: S = { name: 'Apply mode (charts)', args: { search: false, applyMode: true } };
export const FigmaToolbar: S = {
  name: 'Toolbar (Figma list)',
  render: () => <Toolbar left={<><FilterDropdown options={filters[0].options} /><FilterDropdown options={filters[1].options} /></>} right={<><Button icon="add">Button</Button><SegmentedControl options={[{ value: 'list', label: 'List', icon: 'list' }, { value: 'grid', label: 'Grid', icon: 'grid' }]} /></>} />,
};
