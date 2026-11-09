import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { StatusPill } from '../components/primitives';
const meta: Meta<typeof StatusPill> = {
  title: 'Components/StatusPill', component: StatusPill, tags: ['autodocs'], args: { children: 'Active', status: 'success', variant: 'solid' },
  parameters: { docs: { description: { component: 'Kept exactly as the Figma: **solid** pills (white text on colour) in list tables and **soft** pills (tinted) on dashboard widgets. Fixed 76px minimum width so columns line up.' } } },
};
export default meta;
type S = StoryObj<typeof StatusPill>;
export const Success: S = {};
export const Error: S = { args: { status: 'error', children: 'Overdue' } };
export const Warning: S = { args: { status: 'warning', children: 'Pending' } };
export const Neutral: S = { args: { status: 'neutral', children: 'Suspended' } };
export const Info: S = { args: { status: 'info', children: 'Trial' } };
export const Soft: S = { args: { variant: 'soft' } };
export const AllStatuses: S = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, max-content)', gap: 12 }}>
      {(['solid', 'soft'] as const).map((v) => (['success', 'error', 'warning', 'neutral', 'info'] as const).map((s) => <StatusPill key={v + s} status={s} variant={v}>status</StatusPill>))}
    </div>
  ),
};
