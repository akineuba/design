// Story-only side-panel bodies, modelled on the accounting and HR panels in Figma.
import { useState } from 'react';
import { Accordion, AccordionItem } from '../components/Accordion';
import { Button } from '../components/Button';
import { Checkbox } from '../components/Checkbox';
import { Input } from '../components/Input';
import { Radio, RadioGroup } from '../components/Radio';
import { Select } from '../components/Select';
import { Switch } from '../components/Switch';
import { ChevronRightIcon, CloseCircleIcon, PenIcon, TickCircleIcon } from '../icons';
import { accountTypes, salutations } from './demo-data';

export type PanelMode = 'create' | 'edit' | 'view';

const grid3 = 'grid grid-cols-6 gap-4';

/** Cancel (outline) + primary action, as on every Figma panel. */
export const PanelFooter = ({ mode = 'create', onCancel, onSubmit, submitLabel }: { mode?: PanelMode; onCancel?: () => void; onSubmit?: () => void; submitLabel?: string }) => (
  <>
    <Button variant="outline" leadingIcon={<CloseCircleIcon />} onClick={onCancel}>Cancel</Button>
    {mode === 'view'
      ? <Button leadingIcon={<PenIcon />} onClick={onSubmit}>{submitLabel ?? 'Edit'}</Button>
      : <Button leadingIcon={<TickCircleIcon />} onClick={onSubmit}>{submitLabel ?? 'Save'}</Button>}
  </>
);

const NameRow = ({ view, values }: { view: boolean; values?: { salutation: string; first: string; last: string } }) => (
  <>
    <div className={grid3}>
      <div className="col-span-1 min-w-0">
        <Select label="Salutation:" placeholder="" options={salutations} defaultValue={values?.salutation} disabled={view} />
      </div>
      <div className="col-span-5 grid grid-cols-2 gap-4">
        <Input label="First Name:" required={!view} defaultValue={values?.first} readOnly={view} />
        <Input label="Last Name:" required={!view} defaultValue={values?.last} readOnly={view} />
      </div>
    </div>
    <Input label="Display Name:" defaultValue={values && `${values.first} ${values.last}`} readOnly={view} />
  </>
);

/** New / Edit / View Customer (accounting 209:4142, 252:4523, 252:4627). */
export function CustomerForm({ mode = 'create' }: { mode?: PanelMode }) {
  const view = mode === 'view';
  const values = mode === 'create' ? undefined : { salutation: 'Mr', first: 'David', last: 'Olabode' };
  const [type, setType] = useState(mode === 'create' ? '' : 'business');
  return (
    <Accordion variant="form" defaultValue={['primary']}>
      <AccordionItem value="primary" title="Primary contact">
        {view ? (
          <Input label="Customer Type:" defaultValue="Business" readOnly />
        ) : (
          <RadioGroup label="Customer Type:" required value={type} onChange={setType}>
            <Radio value="individual" label="Individual" />
            <Radio value="business" label="Business" />
          </RadioGroup>
        )}
        <NameRow view={view} values={values} />
      </AccordionItem>
      <AccordionItem value="company" title="Company details">
        <Input label="Company Name:" defaultValue={values && 'Quantum Solutions'} readOnly={view} />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Email:" type="email" defaultValue={values && 'dolabode@wbiz.com'} readOnly={view} />
          <Input label="Phone Number:" type="tel" defaultValue={values && '091 817 0197'} readOnly={view} />
        </div>
      </AccordionItem>
      <AccordionItem value="billing" title="Billing address details">
        <Input label="Street:" readOnly={view} />
        <div className="grid grid-cols-2 gap-4">
          <Input label="City:" readOnly={view} />
          <Select label="State:" placeholder="Select state" options={['Lagos', 'Abuja (FCT)', 'Rivers', 'Oyo'].map((s) => ({ value: s, label: s }))} disabled={view} />
        </div>
      </AccordionItem>
      <AccordionItem value="opening" title="Opening Balance">
        <Select label="Revenue Account" placeholder="Select account" options={[{ value: '4001', label: '4001 · Sales Revenue' }]} disabled={view} />
        <Input label="Opening Balance:" inputMode="decimal" placeholder="0.00" readOnly={view} />
      </AccordionItem>
    </Accordion>
  );
}

/** New Vendor (accounting 254:5423): same as a customer without type or opening balance. */
export function VendorForm({ mode = 'create' }: { mode?: PanelMode }) {
  const view = mode === 'view';
  return (
    <Accordion variant="form" defaultValue={['primary']}>
      <AccordionItem value="primary" title="Primary contact">
        <NameRow view={view} values={mode === 'create' ? undefined : { salutation: 'Mrs', first: 'Ngozi', last: 'Okeke' }} />
      </AccordionItem>
      <AccordionItem value="company" title="Company details">
        <Input label="Company Name:" readOnly={view} />
        <Input label="Tax ID (TIN):" readOnly={view} />
      </AccordionItem>
      <AccordionItem value="billing" title="Billing address details">
        <Input label="Street:" readOnly={view} />
        <Input label="City:" readOnly={view} />
      </AccordionItem>
    </Accordion>
  );
}

/** New / Edit Account (Chart of Accounts, 1871:19941): two sections, Publish action. */
export function AccountForm({ mode = 'create' }: { mode?: PanelMode }) {
  const [contra, setContra] = useState(false);
  const filled = mode !== 'create';
  return (
    <Accordion variant="form" defaultValue={['details', 'dimension']}>
      <AccordionItem value="details" title="Account details">
        <Select label="Account Type:" options={accountTypes} defaultValue={filled ? 'asset' : undefined} placeholder="" />
        <Select label="Parent:" options={[{ value: '102300', label: '102300 · Cash and Cash Receivables' }]} defaultValue={filled ? '102300' : undefined} placeholder="" />
        <Input label="Code:" defaultValue={filled ? '102310' : undefined} />
        <Input label="Name:" defaultValue={filled ? 'Office Equipment' : undefined} />
        {/* Figma draws a lone radio here; a single on/off choice is a checkbox. */}
        <Checkbox label="Mark as Contra" checked={contra} onChange={(e) => setContra(e.target.checked)} />
      </AccordionItem>
      <AccordionItem value="dimension" title="Dimension Tab:">
        <Select label="Posting Rule:" options={[{ value: 'required', label: 'Code mandatory' }, { value: 'optional', label: 'Optional' }]} placeholder="" />
      </AccordionItem>
    </Accordion>
  );
}

export const AccountFooter = ({ onCancel }: { onCancel?: () => void }) => (
  <>
    <Button variant="outline" leadingIcon={<CloseCircleIcon />} onClick={onCancel}>Cancel</Button>
    <Button trailingIcon={<ChevronRightIcon />}>Publish</Button>
  </>
);

/** Create Tax (Settings › Tax, 2686:21975): flat form, no sections. */
export function TaxForm() {
  return (
    <>
      <Input label="Tax Name:" required placeholder="e.g. VAT" />
      <div className="grid grid-cols-2 gap-4">
        <Input label="Rate (%):" required inputMode="decimal" placeholder="7.5" />
        <Select label="Tax Type:" options={[{ value: 'sales', label: 'Sales tax' }, { value: 'wht', label: 'Withholding tax' }]} placeholder="Select type" />
      </div>
      <Select label="Tax Payable Account:" options={[{ value: '201200', label: '201200 · VAT Payable' }]} placeholder="Select account" />
      <Switch label="Active" description="Inactive taxes are hidden on new invoices and bills." defaultChecked />
    </>
  );
}

/** New Employee (hr, 4306:39199). */
export function EmployeeForm({ mode = 'create' }: { mode?: PanelMode }) {
  const view = mode === 'view';
  return (
    <Accordion variant="form" defaultValue={['personal']}>
      <AccordionItem value="personal" title="Personal information">
        <NameRow view={view} values={mode === 'create' ? undefined : { salutation: 'Ms', first: 'Amaka', last: 'Nwosu' }} />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Email:" type="email" required={!view} readOnly={view} />
          <Input label="Phone Number:" type="tel" readOnly={view} />
        </div>
      </AccordionItem>
      <AccordionItem value="employment" title="Employment details">
        <div className="grid grid-cols-2 gap-4">
          <Select label="Department:" options={['Finance', 'Operations', 'Human Resources', 'Sales'].map((d) => ({ value: d, label: d }))} placeholder="Select department" disabled={view} />
          <Select label="Job Title:" options={['Accountant', 'HR Officer', 'Buyer'].map((d) => ({ value: d, label: d }))} placeholder="Select title" disabled={view} />
        </div>
        <Input label="Start Date:" type="date" readOnly={view} />
      </AccordionItem>
    </Accordion>
  );
}

/** Create Department (hr, 4426:51666): short flat form. */
export function DepartmentForm() {
  return (
    <>
      <Input label="Department Name:" required />
      <Input label="Department Code:" />
      <Select label="Head of Department:" options={['Sure Tester', 'Daniel Olabode', 'Amaka Nwosu'].map((d) => ({ value: d, label: d }))} placeholder="Select employee" />
    </>
  );
}
