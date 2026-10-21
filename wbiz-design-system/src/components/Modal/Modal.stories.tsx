import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal, ModalPanel } from './Modal';
import { Button } from '../Button';
import { Select } from '../Select';
import { Input } from '../Input';
import { AddCircleIcon, MinusCircleIcon, TickCircleIcon } from '../../icons';
import { FIGMA } from '../../patterns/demo-data';

const TaxRows = ({ rows = 1 }: { rows?: number }) => (
  <div className="flex flex-col gap-3 rounded-xl border border-line px-2.5 py-4">
    {Array.from({ length: rows }, (_, i) => (
      <div key={i} className="flex items-end gap-3">
        <div className="grid min-w-0 flex-1 grid-cols-3 gap-3">
        <div className="col-span-2 min-w-0">
          <Select label={i === 0 ? 'Tax type' : undefined} aria-label={i === 0 ? undefined : 'Tax type'} options={[{ value: 'wht', label: 'Withholding Tax (5%)' }, { value: 'vat', label: 'VAT (7.5%)' }]} />
        </div>
        <div className="min-w-0">
          <Input label={i === 0 ? 'Amount deducted' : undefined} aria-label={i === 0 ? undefined : 'Amount deducted'} placeholder="0.00" />
        </div>
        </div>
        <button type="button" aria-label="Remove deduction" className="inline-flex size-control-md shrink-0 items-center justify-center rounded-lg text-error hover:bg-error-subtle focus-visible:outline-none focus-visible:shadow-focus"><span className="size-icon"><MinusCircleIcon /></span></button>
      </div>
    ))}
    <button type="button" className="inline-flex items-center gap-2.5 self-start rounded-sm font-sans text-xs font-medium text-primary hover:underline focus-visible:outline-none focus-visible:shadow-focus">
      <span className="size-icon"><AddCircleIcon /></span>New deduction
    </button>
  </div>
);

const Footer = ({ onCancel }: { onCancel?: () => void }) => (
  <>
    <Button variant="secondary" size="lg" onClick={onCancel}>Cancel</Button>
    <Button size="lg" leadingIcon={<TickCircleIcon />}>Save</Button>
  </>
);

const meta = {
  title: 'Components/Modal',
  component: ModalPanel,
  args: { title: 'Tax Deduction', children: <TaxRows />, footer: <Footer /> },
  parameters: {
    design: { url: FIGMA + '3564-23503' },
    docs: { description: { component: '`Modal` opens a native `<dialog>`: focus is trapped, Escape and backdrop clicks close it, and focus returns to the trigger. `ModalPanel` is the same layout without the overlay. In Figma, Cancel is a grey filled button; here it uses the secondary button so it doesn\'t look disabled.' } },
  },
} satisfies Meta<typeof ModalPanel>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Panel: Story = {};
export const PanelTwoRows: Story = { args: { children: <TaxRows rows={2} /> } };
export const WithDescription: Story = { args: { description: 'Deductions are posted to the tax payable accounts set in Settings.', onClose: () => {} } };

export const Confirmation: Story = {
  args: {
    title: 'Clear all lines?',
    description: 'This removes all 3 lines from the journal. You can add them again later.',
    children: undefined,
    footer: (<><Button variant="secondary">Keep lines</Button><Button variant="destructive">Clear all lines</Button></>),
  },
};

export const Interactive: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Add tax deduction</Button>
        <Modal {...args} open={open} onClose={() => setOpen(false)} footer={<Footer onCancel={() => setOpen(false)} />} />
      </>
    );
  },
};
