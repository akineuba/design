import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker, FileUpload, RichTextField } from '../components/forms';

export default { title: 'Components/DatePicker', component: DatePicker, tags: ['autodocs'], parameters: { surface: 'white' }, decorators: [(S: any) => <div style={{ maxWidth: 360, minHeight: 420 }}><S /></div>] } satisfies Meta<typeof DatePicker>;
type S = StoryObj<typeof DatePicker>;
export const Single: S = { args: { label: 'Start date', value: new Date(2026, 10, 14) } };
export const SingleOpen: S = { args: { label: 'Start date', value: new Date(2026, 10, 14), defaultOpen: true } };
export const Range: S = { args: { label: 'Contract period', range: true, value: [new Date(2026, 10, 3), new Date(2026, 10, 19)], defaultOpen: true } };
export const Empty: S = { args: { label: 'Renewal date' } };
export const WithError: S = { args: { label: 'Renewal date', required: true, error: 'Renewal date must be after the start date' } };
