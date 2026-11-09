import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input, SearchInput } from '../components/forms';
const meta: Meta<typeof Input> = {
  title: 'Components/Input', component: Input, tags: ['autodocs'], args: { label: 'Role Name', placeholder: 'e.g. Finance Analyst' },
  argTypes: { icon: { control: 'text' } }, parameters: { surface: 'white' }, decorators: [(S) => <div style={{ maxWidth: 520 }}><S /></div>],
};
export default meta;
type S = StoryObj<typeof Input>;
export const Default: S = {};
export const Filled: S = { args: { defaultValue: 'Finance Analyst' } };
export const Required: S = { args: { required: true } };
export const Optional: S = { args: { label: 'PO number', optional: true, placeholder: 'e.g. PO-20391' } };
export const WithHint: S = { args: { label: 'Billing email', placeholder: 'finance@company.com', icon: 'mail', hint: 'Invoices and renewal reminders go here.' } };
export const Error: S = { args: { label: 'Billing email', defaultValue: 'finance@northwind', icon: 'mail', error: 'Enter a full email address, like name@company.com' } };
export const Success: S = { args: { label: 'VAT number', defaultValue: 'GB 123 4567 89', success: 'VAT number verified' } };
export const Loading: S = { args: { label: 'Company registration no.', defaultValue: '09876543', loading: true, hint: 'Checking Companies House…' } };
export const Disabled: S = { args: { disabled: true, defaultValue: 'Northwind Motors' } };
export const ReadOnly: S = { args: { label: 'Organisation ID', readOnly: true, defaultValue: 'ORG-00412' } };
export const Prefix: S = { name: 'Prefix (money)', args: { label: 'Price per seat', prefix: '£', placeholder: '0.00', suffix: <span>/ month</span> } };
export const Multiline: S = { args: { label: 'Description', placeholder: 'Describe what this role can do…', multiline: true, maxLength: 240 } };
export const Small: S = { args: { size: 'sm', label: undefined, placeholder: 'Small input' } };
export const Search: S = { render: () => <SearchInput placeholder="Search organisations, OEMs…" /> };
