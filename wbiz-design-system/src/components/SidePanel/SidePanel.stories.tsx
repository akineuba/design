import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SidePanel, SidePanelContent } from './SidePanel';
import { Button } from '../Button';
import { FIGMA } from '../../patterns/demo-data';
import {
  AccountFooter, AccountForm, CustomerForm, DepartmentForm, EmployeeForm, PanelFooter, TaxForm, VendorForm,
} from '../../patterns/panel-forms';
import { PlusIcon } from '../../icons';

const meta = {
  title: 'Components/SidePanel',
  component: SidePanelContent,
  args: { title: 'New Customer', size: 'md', children: <CustomerForm />, footer: <PanelFooter /> },
  argTypes: { size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] } },
  decorators: [(Story) => <div className="flex h-screen justify-end bg-overlay"><Story /></div>],
  parameters: {
    layout: 'fullscreen',
    design: { url: FIGMA + '209-4142' },
    docs: {
      description: {
        component:
          'Right-hand panel for creating, editing and viewing a record without leaving the list. Every "New…", "Edit…" and "View…" panel in the ' +
          'accounting, HR and project screens uses it. Sections are `Accordion variant="form"`; labels switch to the panel style automatically. ' +
          'Footer: Cancel (outline) then the primary action (Save, Publish, or Edit in view mode). `SidePanel` adds the overlay, focus trap and slide-in.',
      },
    },
  },
} satisfies Meta<typeof SidePanelContent>;
export default meta;
type Story = StoryObj<typeof meta>;

export const NewCustomer: Story = {};
export const EditCustomer: Story = { args: { title: 'Edit Customer', children: <CustomerForm mode="edit" /> }, parameters: { design: { url: FIGMA + '252-4523' } } };
export const ViewCustomer: Story = {
  args: { title: 'View Customer', children: <CustomerForm mode="view" />, footer: <PanelFooter mode="view" /> },
  parameters: { design: { url: FIGMA + '252-4627' } },
};
export const NewAccount: Story = { args: { title: 'New Account', size: 'sm', children: <AccountForm />, footer: <AccountFooter /> }, parameters: { design: { url: FIGMA + '1871-19941' } } };
export const EditAccount: Story = { args: { title: 'Edit Account', size: 'sm', children: <AccountForm mode="edit" />, footer: <PanelFooter /> }, parameters: { design: { url: FIGMA + '3056-24478' } } };
export const NewVendor: Story = { args: { title: 'New Vendor', size: 'lg', children: <VendorForm /> }, parameters: { design: { url: FIGMA + '254-5423' } } };
export const NewTax: Story = { args: { title: 'Create New Tax', size: 'sm', children: <TaxForm /> }, parameters: { design: { url: FIGMA + '2686-21975' } } };
export const NewEmployee: Story = { args: { title: 'New Employee', size: 'lg', children: <EmployeeForm /> }, parameters: { design: { url: FIGMA + '4306-39199' } } };
export const NewDepartment: Story = { args: { title: 'Create Department', size: 'lg', children: <DepartmentForm /> }, parameters: { design: { url: FIGMA + '4426-51666' } } };
export const WithCloseButtonAndDescription: Story = {
  args: { title: 'New Customer', description: 'Customers appear on invoices and receive payments.', onClose: () => {} },
};
export const Saving: Story = {
  args: { footer: <><Button variant="outline" disabled>Cancel</Button><Button loading>Saving</Button></> },
};

/** Opens over the page from an "Add New" button; Escape, the backdrop and Cancel close it. */
export const Interactive: Story = {
  decorators: [(Story) => <div className="h-screen p-8"><Story /></div>],
  render: () => {
    const [open, setOpen] = useState<null | 'customer' | 'account'>(null);
    const close = () => setOpen(null);
    return (
      <div className="flex gap-3">
        <Button leadingIcon={<PlusIcon />} onClick={() => setOpen('customer')}>New customer</Button>
        <Button variant="secondary" leadingIcon={<PlusIcon />} onClick={() => setOpen('account')}>New account</Button>
        <SidePanel open={open === 'customer'} onClose={close} title="New Customer" footer={<PanelFooter onCancel={close} onSubmit={close} />}>
          <CustomerForm />
        </SidePanel>
        <SidePanel open={open === 'account'} onClose={close} size="sm" title="New Account" footer={<AccountFooter onCancel={close} />}>
          <AccountForm />
        </SidePanel>
      </div>
    );
  },
};
