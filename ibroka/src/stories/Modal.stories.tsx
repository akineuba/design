import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal, ModalPanel } from '../components/Modal';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { CloseIcon, DeleteIcon, SuccessIcon } from '../icons';

const footer = (label = 'Save') => (
  <>
    <Button variant="outline" leadingIcon={<CloseIcon />}>Cancel</Button>
    <Button leadingIcon={<SuccessIcon />}>{label}</Button>
  </>
);
const meta = { title: 'Components/Modal', component: ModalPanel, args: { title: 'New insurer', footer: footer() } } satisfies Meta<typeof ModalPanel>;
export default meta;
type S = StoryObj<typeof meta>;
export const QuickAdd: S = {
  args: {
    description: 'Adds the insurer to every dropdown.',
    children: (
      <>
        <Input label="Insurer name" required />
        <Select label="Type" options={[{ value: 'general', label: 'General' }, { value: 'life', label: 'Life' }, { value: 'composite', label: 'Composite' }]} />
      </>
    ),
  },
};
export const Confirmation: S = {
  args: {
    tone: 'danger',
    title: 'Delete policy POL-2026-00975?',
    description: 'Its schedule, debit notes and claims are deleted with it. This can’t be undone.',
    footer: (
      <>
        <Button variant="outline">Keep policy</Button>
        <Button variant="destructive" leadingIcon={<DeleteIcon />}>Delete policy</Button>
      </>
    ),
  },
};
/** UI rule B10: ask before throwing away edits. */
export const UnsavedChanges: S = {
  args: {
    title: 'Discard changes?',
    description: 'You have edits to this client that haven’t been saved.',
    footer: (
      <>
        <Button variant="outline">Keep editing</Button>
        <Button variant="destructive">Discard</Button>
      </>
    ),
  },
};
export const Interactive: S = {
  render: (a) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open modal</Button>
        <Modal {...a} open={open} onClose={() => setOpen(false)} footer={<><Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={() => setOpen(false)}>Save</Button></>}>
          <Input label="Insurer name" required />
        </Modal>
      </>
    );
  },
};
