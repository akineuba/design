import type { Meta, StoryObj } from '@storybook/react';
import { ExpiryBadge } from '../insurance/ExpiryBadge';
import { TODAY } from './demo-data';

const meta = { title: 'Insurance/ExpiryBadge', component: ExpiryBadge, args: { today: TODAY, date: '2027-03-01' } } satisfies Meta<typeof ExpiryBadge>;
export default meta;
type S = StoryObj<typeof meta>;
export const Plenty: S = {};
export const Expiring: S = { args: { date: '2026-10-30' } };
export const Today: S = { args: { date: '2026-10-18' } };
export const Expired: S = { args: { date: '2026-09-20' } };
export const WithDate: S = { args: { date: '2026-10-30', showDate: true } };
