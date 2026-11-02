import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Switch } from '../components/Switch';

const meta = { title: 'Components/Switch', component: Switch, args: { checked: false, onChange: () => {}, label: 'Auto-send renewal reminders', description: '30, 14 and 3 days before expiry' } } satisfies Meta<typeof Switch>;
export default meta;
type S = StoryObj<typeof meta>;
export const Interactive: S = {
  render: (a) => {
    const [on, setOn] = useState(true);
    return <Switch {...a} checked={on} onChange={setOn} />;
  },
};
export const Off: S = {};
export const On: S = { args: { checked: true } };
export const DisabledOn: S = { args: { checked: true, disabled: true } };
export const Small: S = { args: { size: 'sm', label: undefined, description: undefined, 'aria-label': 'Active' } };
