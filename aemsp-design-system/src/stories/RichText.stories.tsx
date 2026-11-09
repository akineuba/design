import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RichTextField } from '../components/forms';
export default { title: 'Components/RichTextField', component: RichTextField, tags: ['autodocs'], parameters: { surface: 'white' }, decorators: [(S: any) => <div style={{ maxWidth: 560 }}><S /></div>] } satisfies Meta<typeof RichTextField>;
type S = StoryObj<typeof RichTextField>;
export const Empty: S = { args: { label: 'Internal note' } };
export const WithContent: S = { args: { label: 'Internal note', defaultHTML: '<p>Approved after call with <b>Ada</b>. Conditions:</p><ul><li>Seats billed from 1 Dec</li><li>Review usage in Q1</li></ul>' } };
export const Disabled: S = { args: { label: 'Internal note', disabled: true, defaultHTML: 'Locked after approval.' } };
