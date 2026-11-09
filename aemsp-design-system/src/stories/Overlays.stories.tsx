import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from '../components/overlays';
import { Input, Select, Switch } from '../components/forms';
import { Button } from '../components/primitives';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal', component: Modal, tags: ['autodocs'],
  args: { inline: true, title: 'Create Role', subtitle: 'Define a system role', primary: { label: 'Create Role' } },
  parameters: { docs: { description: { component: 'Modals use the reference colours: **dark navy header** with white LINE Seed title and muted blue subtitle, white body, 10px-radius inputs, and a footer with a white **Cancel** and a blue **confirm** button of equal width.' } } },
};
export default meta;
type S = StoryObj<typeof Modal>;
export const CreateRole: S = { args: { children: <><Input label="Role Name" placeholder="e.g. Finance Analyst" /><Input label="Description" placeholder="Describe what this role can do…" multiline rows={3} /></> } };
export const QuickAdd: S = { args: { title: 'Add organisation', subtitle: 'Create an OEM, dealer, fleet or partner', primary: { label: 'Add organisation' }, children: <><Input label="Organisation name" required placeholder="e.g. Northwind Motors" /><div className="ae-form-grid"><Select label="Type" required options={[{ value: 'oem', label: 'OEM' }, { value: 'dealer', label: 'Dealer' }]} placeholder="Select type" /><Select label="Region" options={[{ value: 'uk', label: 'UK & Ireland' }, { value: 'emea', label: 'EMEA' }]} placeholder="Select region" /></div><Input label="Billing email" icon="mail" placeholder="finance@company.com" /><Switch label="Send welcome email to the primary contact" defaultChecked /></> } };
export const Confirmation: S = { args: { size: 'sm', icon: 'trash', iconTone: 'danger', title: 'Delete role?', subtitle: 'Finance Analyst · 12 users', primary: { label: 'Delete role', variant: 'danger' }, children: <p style={{ margin: 0 }}>The 12 users with this role will move to <b>Viewer</b>. This can’t be undone.</p> } };
export const UnsavedChanges: S = { args: { size: 'sm', icon: 'warning', iconTone: 'warning', title: 'Discard changes?', subtitle: 'You have unsaved edits', primary: { label: 'Discard', variant: 'danger' }, secondary: { label: 'Keep editing' }, children: <p style={{ margin: 0 }}>Your changes to <b>Northwind Motors</b> haven’t been saved.</p> } };
export const Saving: S = { args: { primary: { label: 'Creating…', loading: true }, children: <Input label="Role Name" defaultValue="Finance Analyst" /> } };
function Demo() {
  const [open, setOpen] = useState(false);
  return <><Button icon="add" onClick={() => setOpen(true)}>Create role</Button><Modal open={open} onClose={() => setOpen(false)} title="Create Role" subtitle="Define a system role" primary={{ label: 'Create Role', onClick: () => setOpen(false) }}><Input label="Role Name" placeholder="e.g. Finance Analyst" /><Input label="Description" placeholder="Describe what this role can do…" multiline rows={3} /></Modal></>;
}
export const Interactive: S = { render: () => <Demo /> };
