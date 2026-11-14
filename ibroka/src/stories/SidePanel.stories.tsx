import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SidePanel, SidePanelContent } from '../components/SidePanel';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { DatePicker } from '../components/DatePicker';
import { Accordion } from '../components/Accordion';
import { RecordStatus } from '../components/StatusPill';
import { MoneyInput } from '../insurance/Money';
import { PremiumBreakdown } from '../insurance/PremiumBreakdown';
import { CloseIcon, EditIcon, SuccessIcon } from '../icons';
import { CLASS_OPTIONS, CLIENT_OPTIONS, INSURER_OPTIONS, TODAY } from './demo-data';

const footer = (
  <>
    <Button variant="outline" leadingIcon={<CloseIcon />}>Cancel</Button>
    <Button leadingIcon={<SuccessIcon />}>Save client</Button>
  </>
);
const meta = { title: 'Components/SidePanel', component: SidePanelContent, args: { title: 'New client', footer }, parameters: { layout: 'fullscreen' }, decorators: [(S) => <div className="flex h-[760px] justify-end bg-surface-page"><S /></div>] } satisfies Meta<typeof SidePanelContent>;
export default meta;
type S = StoryObj<typeof meta>;

export const NewClient: S = {
  args: {
    description: 'Individual or company you place cover for.',
    children: (
      <>
        <div className="grid grid-cols-2 gap-4">
          <Input label="First name" required />
          <Input label="Last name" required />
        </div>
        <Input label="Email" type="email" required />
        <Input label="Phone" type="tel" placeholder="+234" />
        <Select label="Account officer" options={[{ value: 'a', label: 'Ada Obi' }, { value: 'b', label: 'Kunle Ade' }]} onAddNew={() => {}} />
      </>
    ),
  },
};

function PolicyForm() {
  const [sum, setSum] = useState<number | null>(150_000_000);
  return (
    <>
      <Accordion title="Policy details" defaultOpen>
        <div className="grid grid-cols-2 gap-4">
          <Select label="Client" options={CLIENT_OPTIONS} value="c1" onAddNew={() => {}} className="col-span-2" />
          <Select label="Class of business" options={CLASS_OPTIONS} value="fire" />
          <Select label="Insurer" options={INSURER_OPTIONS} value="i1" onAddNew={() => {}} />
          <DatePicker label="Start date" value={new Date(2026, 9, 30)} onChange={() => {}} initialMonth={TODAY} />
          <DatePicker label="End date" value={new Date(2027, 9, 29)} onChange={() => {}} />
        </div>
      </Accordion>
      <Accordion title="Premium" defaultOpen meta="₦4,312,500.00">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <MoneyInput label="Sum insured" required value={sum} onChange={setSum} />
            <Input label="Rate" trailing="%" defaultValue="2.5" inputMode="decimal" />
          </div>
          <PremiumBreakdown sumInsured={sum ?? 0} rate={2.5} adjustments={[{ label: 'No-claims discount', amount: -187_500 }]} taxRate={7.5} commissionRate={12.5} />
        </div>
      </Accordion>
      <Accordion title="Co-insurance" meta="Optional">
        <p className="text-13 text-fg-muted">Add insurers sharing the risk.</p>
      </Accordion>
    </>
  );
}
/** Two-column form in the lg panel, split into sections (UI rule 29). */
export const NewPolicy: S = { args: { title: 'New policy', size: 'lg', footer: (<><Button variant="outline" leadingIcon={<CloseIcon />}>Cancel</Button><Button variant="outline">Save draft</Button><Button leadingIcon={<SuccessIcon />}>Submit for approval</Button></>), children: <PolicyForm /> } };

/** View mode: read-only fields with Edit (UI rule 3). */
export const ViewClient: S = {
  args: {
    title: 'Kestrel Oil & Gas Ltd',
    description: 'Corporate client since March 2021',
    headerAddon: <RecordStatus status="Active" />,
    footer: <Button leadingIcon={<EditIcon />}>Edit</Button>,
    children: (
      <dl className="grid grid-cols-2 gap-x-6 gap-y-4 text-13">
        {[
          ['Email', 'accounts@kestrel.example'],
          ['Phone', '+234 803 000 0000'],
          ['RC number', 'RC 1234567'],
          ['Account officer', 'Ada Obi'],
          ['Active policies', '4'],
          ['Outstanding premium', '₦1,845,000.00'],
        ].map(([k, v]) => (
          <div key={k} className="flex flex-col gap-1">
            <dt className="text-fg-muted">{k}</dt>
            <dd className="font-medium text-fg-strong">{v}</dd>
          </div>
        ))}
      </dl>
    ),
  },
};
export const Saving: S = { args: { ...NewClient.args, footer: (<><Button variant="outline" disabled>Cancel</Button><Button loading>Saving</Button></>) } };
export const Interactive: S = {
  render: (a) => {
    const [open, setOpen] = useState(false);
    return (
      <div className="p-6">
        <Button onClick={() => setOpen(true)}>New client</Button>
        <SidePanel {...a} open={open} onClose={() => setOpen(false)} footer={<><Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={() => setOpen(false)}>Save client</Button></>}>
          {NewClient.args!.children}
        </SidePanel>
      </div>
    );
  },
};
