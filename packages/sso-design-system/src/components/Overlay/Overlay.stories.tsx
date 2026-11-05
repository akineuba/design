import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal, ResultCard, SidePanel } from './Overlay';
import { Button } from '../Button/Button';
import { Input, Select } from '../Field/Field';

const meta: Meta = { title: 'Components/Overlays', tags: ['autodocs'] };
export default meta;

export const AddUserPanel: StoryObj = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open panel</Button>
        <SidePanel
          open={open}
          onClose={() => setOpen(false)}
          title="Add user"
          description="Create a user and give them access to one or more entities."
          footer={<><Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button><Button>Create user</Button></>}
        >
          <Input label="Email" required placeholder="user@company.com" />
          <div className="sso-form-row">
            <Input label="First name" required />
            <Input label="Last name" required />
          </div>
          <Input label="Password" type="password" placeholder="Leave blank to auto-generate" hint="We'll email a sign-in link if left blank." />
          <Select label="Role" required placeholder="Select a role" options={[{ value: 'admin', label: 'Tenant admin' }, { value: 'emp', label: 'Employee' }]} />
          <Select label="Entities" required placeholder="Select entities" options={[{ value: 'hq', label: 'Wragby Group (Head Office)' }]} />
        </SidePanel>
      </>
    );
  },
};

export const ConfirmModal: StoryObj = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <>
        <Button variant="danger" onClick={() => setOpen(true)}>Cancel renewal</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          size="sm"
          title="Cancel renewal?"
          description="Full ERP stays active until 8 August 2027. After that, users lose access to all apps in this plan."
          footer={<><Button variant="ghost" onClick={() => setOpen(false)}>Keep plan</Button><Button variant="danger">Cancel renewal</Button></>}
        />
      </>
    );
  },
};

export const ResultCards: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <ResultCard tone="success" title="Plan upgraded" description="Wragby Finance is now on Full ERP. New apps are available to assigned users." actions={<Button>Back to subscriptions</Button>} />
      <ResultCard tone="error" title="Payment failed" description="Your card was declined. No changes were made to your plan." actions={<><Button variant="ghost">Cancel</Button><Button>Try again</Button></>} />
    </div>
  ),
};
