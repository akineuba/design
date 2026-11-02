import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { RadioGroup } from '../components/Radio';

const opts = [
  { value: 'new', label: 'New business' },
  { value: 'renewal', label: 'Renewal' },
  { value: 'endorsement', label: 'Endorsement' },
];
const meta = { title: 'Components/Radio', component: RadioGroup, args: { name: 'txn', label: 'Transaction type', options: opts } } satisfies Meta<typeof RadioGroup>;
export default meta;
type S = StoryObj<typeof meta>;
export const NoneSelected: S = { args: { value: '' } };
export const Selected: S = {
  render: (a) => {
    const [v, setV] = useState('renewal');
    return <RadioGroup {...a} value={v} onChange={setV} />;
  },
};
export const Vertical: S = { args: { direction: 'vertical', value: 'new' } };
export const Disabled: S = { args: { disabled: true, value: 'new' } };
