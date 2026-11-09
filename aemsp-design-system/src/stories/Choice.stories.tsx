import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox, RadioGroup, Switch } from '../components/forms';

export default { title: 'Components/Checkbox, Radio & Switch', tags: ['autodocs'], parameters: { surface: 'white' } } satisfies Meta;
type S = StoryObj;
const col: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: 14 };
export const Checkboxes: S = { render: () => <div style={col}><Checkbox label="Unchecked" /><Checkbox label="Checked" defaultChecked /><Checkbox label="Indeterminate" indeterminate /><Checkbox label="Disabled" disabled /><Checkbox label="Disabled checked" disabled defaultChecked /><Checkbox label="Send renewal reminders" description="Email the billing contact 30, 14 and 3 days before renewal." defaultChecked /></div> };
export const Radios: S = { render: () => <div style={col}><RadioGroup name="cycle" label="Billing cycle" options={[{ value: 'm', label: 'Monthly' }, { value: 'y', label: 'Annually' }]} value="m" /><RadioGroup name="v" direction="column" options={[{ value: 'a', label: 'All seats' }, { value: 'b', label: 'Only unassigned seats' }]} /><RadioGroup name="d" disabled options={[{ value: 'a', label: 'Disabled' }, { value: 'b', label: 'Option' }]} value="a" /></div> };
export const RadioCards: S = { render: () => <RadioGroup name="plan" cards label="Plan" value="business" options={[{ value: 'standard', label: 'Standard', description: '£12 / seat / month' }, { value: 'business', label: 'Business', description: '£18 / seat / month' }, { value: 'enterprise', label: 'Enterprise', description: 'Custom pricing' }]} /> };
export const Switches: S = { render: () => <div style={col}><Switch label="Off" /><Switch label="On" defaultChecked /><Switch label="Disabled on" disabled defaultChecked /><Switch label="Small" size="sm" defaultChecked /><Switch label="Auto-renew" description="Renew automatically at the end of each term." defaultChecked /></div> };
