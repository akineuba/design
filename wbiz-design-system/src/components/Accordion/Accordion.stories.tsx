import type { Meta, StoryObj } from '@storybook/react';
import { Accordion, AccordionItem } from './Accordion';
import { Input } from '../Input';
import { Select } from '../Select';
import { StatusPill } from '../StatusPill';
import { FIGMA } from '../../patterns/demo-data';

const BasicInfo = () => (
  <>
    <Input label="Item Number" required placeholder="ITM-006" hint="Maximum 30 characters" />
    <Input label="Item Name" required placeholder="e.g. A4 Paper (80gsm)" hint="Maximum 100 characters" />
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <Select label="Type" required defaultValue="inventory" options={[{ value: 'inventory', label: 'Inventory Item' }, { value: 'service', label: 'Service' }]} />
      <Select label="Status" required defaultValue="active" options={[{ value: 'active', label: 'Active' }, { value: 'inactive', label: 'Inactive' }]} />
    </div>
  </>
);

const meta = {
  title: 'Components/Accordion',
  component: AccordionItem,
  args: { title: 'Basic Information', children: <BasicInfo /> },
  decorators: [(Story) => <div className="w-full max-w-dialog"><Story /></div>],
  parameters: {
    layout: 'padded',
    design: { url: FIGMA + '7092-1482' },
    docs: { description: { component: 'Collapsible form section from the item form. Use `Accordion` to group sections; `type="single"` keeps one open at a time.' } },
  },
} satisfies Meta<typeof AccordionItem>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = { args: { defaultOpen: true } };
export const Closed: Story = { args: { defaultOpen: false } };
export const WithMeta: Story = { args: { title: 'Costing', meta: <StatusPill tone="warning">Incomplete</StatusPill>, children: <Input label="Unit cost" placeholder="0.00" /> } };
export const Disabled: Story = { args: { title: 'Posting Groups (set after saving)', disabled: true } };

export const Group: Story = {
  render: () => (
    <Accordion type="single" defaultValue={['basic']}>
      <AccordionItem value="basic" title="Basic Information"><BasicInfo /></AccordionItem>
      <AccordionItem value="inventory" title="Inventory">
        <Select label="Base Unit of Measure" required options={[{ value: 'ream', label: 'Ream' }, { value: 'unit', label: 'Unit' }]} />
        <Select label="Primary Location" options={[{ value: 'ho', label: 'Head Office' }]} />
      </AccordionItem>
      <AccordionItem value="posting" title="Posting">
        <Select label="Inventory Posting Group" options={[{ value: 'consumables', label: 'Consumables' }]} />
      </AccordionItem>
    </Accordion>
  ),
};
