import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '../components/Checkbox';
import { figma } from '../docs/links';

const meta = { title: 'Components/Checkbox', component: Checkbox, args: { label: 'Send renewal notice' }, parameters: { design: { type: 'figma', url: figma('14:1042') } } } satisfies Meta<typeof Checkbox>;
export default meta;
type S = StoryObj<typeof meta>;
export const Unchecked: S = {};
export const Checked: S = { args: { defaultChecked: true } };
export const Indeterminate: S = { args: { indeterminate: true, label: 'Select all' } };
export const Disabled: S = { args: { disabled: true } };
export const DisabledChecked: S = { args: { disabled: true, defaultChecked: true } };
export const WithoutLabel: S = { args: { label: undefined, 'aria-label': 'Select row' } };
