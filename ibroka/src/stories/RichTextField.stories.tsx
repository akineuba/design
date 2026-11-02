import type { Meta, StoryObj } from '@storybook/react';
import { RichTextField } from '../components/RichTextField';

const meta = { title: 'Components/RichTextField', component: RichTextField, args: { label: 'Claim description' }, decorators: [(S) => <div className="w-[520px]"><S /></div>] } satisfies Meta<typeof RichTextField>;
export default meta;
type S = StoryObj<typeof meta>;
export const Empty: S = { args: { hint: 'What happened, where and when.' } };
export const WithContent: S = { args: { defaultValue: '<p>Vehicle was hit from behind at <b>Ikorodu Road</b> on 12 Oct 2026.</p><ul><li>Police report attached</li><li>Repair estimate pending</li></ul>' } };
export const Disabled: S = { args: { disabled: true, defaultValue: '<p>Locked once the claim is submitted.</p>' } };
