import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SidePanel } from '../components/overlays';
import { Input, Select, DatePicker, RadioGroup, Switch } from '../components/forms';
import { Button, StatusPill } from '../components/primitives';
import { DescriptionList, UsageMeter, LicenceKey, ApprovalTrail } from '../components/domain';

const meta: Meta<typeof SidePanel> = {
  title: 'Components/SidePanel', component: SidePanel, tags: ['autodocs'],
  args: { inline: true, title: 'New subscription', subtitle: 'Northwind Motors', primary: { label: 'Create subscription' } },
  parameters: { docs: { description: { component: 'Right-side panel for create / view / edit without leaving the page. Same navy header and footer buttons as modals.' } } },
  decorators: [(S) => <div style={{ height: 760 }}><S /></div>],
};
export default meta;
type S = StoryObj<typeof SidePanel>;
const form = <>
  <Select label="Product" required options={[{ value: 'fdp', label: 'Fleet Diagnostics Pro' }, { value: 'ts', label: 'Telematics Suite' }]} value="fdp" />
  <RadioGroup name="sp-plan" label="Plan" cards value="biz" options={[{ value: 'std', label: 'Standard', description: '£12/seat' }, { value: 'biz', label: 'Business', description: '£18/seat' }]} />
  <div className="ae-form-grid"><Input label="Seats" type="number" defaultValue="120" required /><DatePicker label="Start date" value={new Date(2026, 11, 1)} /></div>
  <Switch label="Auto-renew" defaultChecked description="Renews every 12 months unless cancelled." />
</>;
export const NewSubscription: S = { args: { children: form } };
export const ViewSubscription: S = {
  args: { title: 'Fleet Diagnostics Pro', subtitle: 'Northwind Motors · Enterprise', tabs: [{ id: 'o', label: 'Overview' }, { id: 'l', label: 'Licences' }, { id: 'h', label: 'History' }], primary: undefined, extraActions: <Button variant="danger-outline" size="lg">Cancel plan</Button>, secondary: { label: 'Close' },
    children: <><div><StatusPill status="success" variant="soft">Active</StatusPill></div><UsageMeter label="Seats" used={842} limit={1000} /><DescriptionList items={[['Plan', 'Enterprise · Annual'], ['Price', '£18,400.00 / month'], ['Started', '24 Feb 2026'], ['Renews', '24 Feb 2027 (auto)'], ['Owner', 'Ada Lovelace']]} /><div className="ae-field"><span className="ae-label">Master licence key</span><LicenceKey value="FDP-8X2Q-77LM-K4PA-2026" /></div><div><p className="ae-section-title" style={{ marginBottom: 12 }}>Approval trail</p><ApprovalTrail steps={[{ state: 'submitted', title: 'Requested by Ada Lovelace', when: '20 Feb 2026' }, { state: 'approved', title: 'Approved by Grace Obi', when: '21 Feb 2026' }]} /></div></> },
};
export const Saving: S = { args: { children: form, primary: { label: 'Creating…', loading: true } } };
function Demo() { const [o, setO] = useState(false); return <><Button icon="add" onClick={() => setO(true)}>New subscription</Button><SidePanel open={o} onClose={() => setO(false)} title="New subscription" subtitle="Northwind Motors" primary={{ label: 'Create subscription', onClick: () => setO(false) }}>{form}</SidePanel></>; }
export const Interactive: S = { args: { inline: false }, render: () => <Demo />, decorators: [(St) => <div><St /></div>] };
