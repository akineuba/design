import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from '../components/Accordion';
import { Input } from '../components/Input';

const meta = { title: 'Components/Accordion', component: Accordion, args: { title: 'Vehicle details', children: <div className="grid grid-cols-2 gap-4"><Input label="Registration number" /><Input label="Chassis number" /></div> }, decorators: [(S) => <div className="w-[520px]"><S /></div>] } satisfies Meta<typeof Accordion>;
export default meta;
type S = StoryObj<typeof meta>;
export const Open: S = { args: { defaultOpen: true } };
export const Closed: S = {};
export const WithMeta: S = { args: { meta: '2 fields missing' } };
export const Disabled: S = { args: { disabled: true, meta: 'Available after approval' } };
export const Group: S = {
  render: (a) => (
    <div className="flex flex-col gap-2.5">
      <Accordion {...a} title="Insured details" defaultOpen />
      <Accordion {...a} title="Vehicle details" />
      <Accordion {...a} title="Premium" meta="₦162,500.00" />
    </div>
  ),
};
export const Plain: S = { args: { variant: 'plain', defaultOpen: true, title: 'What does "lapsed" mean?', children: <p className="text-13 text-fg-muted">The renewal premium wasn’t paid within the grace period, so cover stopped.</p> } };
