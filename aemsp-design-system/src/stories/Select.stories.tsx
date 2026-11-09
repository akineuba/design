import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Select, FilterDropdown, SegmentedControl } from '../components/forms';
const opts = [{ value: 'oem', label: 'OEM' }, { value: 'dealer', label: 'Dealer' }, { value: 'fleet', label: 'Fleet' }, { value: 'partner', label: 'Partner' }];
const meta: Meta<typeof Select> = {
  title: 'Components/Select', component: Select, tags: ['autodocs'], args: { label: 'Organisation type', options: opts, placeholder: 'Select a type' },
  parameters: { surface: 'white' }, decorators: [(S) => <div style={{ maxWidth: 420, minHeight: 340 }}><S /></div>],
};
export default meta;
type S = StoryObj<typeof Select>;
export const Placeholder: S = {};
export const Selected: S = { args: { value: 'dealer' } };
export const Required: S = { args: { required: true } };
export const WithError: S = { args: { required: true, error: 'Choose an organisation type' } };
export const Disabled: S = { args: { disabled: true, value: 'oem' } };
export const Open: S = { args: { defaultOpen: true } };
export const OpenWithAddNew: S = { args: { defaultOpen: true, label: 'Assign to OEM', options: [{ value: '1', label: 'Northwind Motors', hint: 'UK & Ireland' }, { value: '2', label: 'Apex OEM Group', hint: 'EMEA' }, { value: '3', label: 'Crescent Trucks', hint: 'Americas' }], onAddNew: () => {}, addNewLabel: 'Create OEM' } };
export const NotSearchable: S = { args: { defaultOpen: true, searchable: false, label: 'Billing cycle', options: [{ value: 'm', label: 'Monthly' }, { value: 'y', label: 'Annually' }] } };
export const FilterSize: S = { args: { size: 'sm', label: undefined } };

export const FilterDropdowns: S = {
  name: 'Filter dropdown (Figma)',
  render: () => (
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
      <FilterDropdown options={opts} />
      <FilterDropdown label="Type" options={opts} value="oem" />
      <FilterDropdown label="Region" multi options={[{ value: 'uk', label: 'UK & Ireland' }, { value: 'emea', label: 'EMEA' }, { value: 'apac', label: 'APAC' }]} value={['uk', 'emea']} />
    </div>
  ),
};
export const SegmentedControls: S = {
  name: 'Segmented control',
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <SegmentedControl options={[{ value: 'list', label: 'List view', icon: 'list' }, { value: 'grid', label: 'Grid view', icon: 'grid' }]} />
      <SegmentedControl options={[{ value: 'w', label: 'Week' }, { value: 'm', label: 'Month' }, { value: 'q', label: 'Quarter' }]} value="m" />
    </div>
  ),
};
