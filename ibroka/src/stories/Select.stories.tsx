import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Select, type SelectOption } from '../components/Select';
import { Modal } from '../components/Modal';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { CLIENT_OPTIONS, INSURER_OPTIONS } from './demo-data';

const meta = {
  title: 'Components/Select',
  component: Select,
  args: { label: 'Insurer', options: INSURER_OPTIONS, placeholder: 'Select insurer' },
  decorators: [(S) => <div className="h-[360px] w-[320px]"><S /></div>],
} satisfies Meta<typeof Select>;
export default meta;
type S = StoryObj<typeof meta>;
export const Placeholder: S = {};
export const Selected: S = { args: { value: 'i2' } };
export const Required: S = { args: { required: true } };
export const WithError: S = { args: { required: true, error: 'Choose the insurer that underwrites this policy.' } };
export const Disabled: S = { args: { disabled: true, value: 'i1' } };
export const Open: S = { args: { defaultOpen: true, value: 'i2' } };
export const OpenWithAddNew: S = { args: { label: 'Client', placeholder: 'Select client', options: CLIENT_OPTIONS, defaultOpen: true, onAddNew: () => {}, addNewLabel: 'Add new client' } };
export const NotSearchable: S = { args: { searchable: false, defaultOpen: true, label: 'Payment frequency', options: [{ value: 'annual', label: 'Annual' }, { value: 'quarterly', label: 'Quarterly' }, { value: 'monthly', label: 'Monthly' }] } };
export const FilterSize: S = { args: { size: 'filter' } };
/** UI rule 1: add a value without leaving the form. The new client is added and selected on save. */
export const AddNewWithoutLeaving: S = {
  render: (a) => {
    const [opts, setOpts] = useState<SelectOption[]>(CLIENT_OPTIONS);
    const [value, setValue] = useState<string>();
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    return (
      <>
        <Select {...a} label="Client" placeholder="Select client" options={opts} value={value} onChange={setValue} addNewLabel="Add new client" onAddNew={(q) => { setName(q); setOpen(true); }} />
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="New client"
          description="Add the essentials now; complete KYC later from Clients."
          footer={
            <>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button
                disabled={!name.trim()}
                onClick={() => {
                  const v = `new-${opts.length}`;
                  setOpts([...opts, { value: v, label: name.trim() }]);
                  setValue(v);
                  setOpen(false);
                }}
              >
                Save client
              </Button>
            </>
          }
        >
          <Input label="Client name" required value={name} onChange={(e) => setName(e.target.value)} />
          <Input label="Email" type="email" />
        </Modal>
      </>
    );
  },
};
