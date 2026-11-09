import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ActionMenu } from '../components/layout';
const actions = [
  { label: 'View details', icon: 'eye' as const }, { label: 'Edit organisation', icon: 'edit' as const }, { label: 'Add subscription', icon: 'package' as const }, { label: 'Export data', icon: 'download' as const },
  'separator' as const, { label: 'Suspend access', icon: 'pause' as const, danger: true }, { label: 'Delete organisation', icon: 'trash' as const, danger: true },
];
const meta: Meta<typeof ActionMenu> = {
  title: 'Components/ActionMenu', component: ActionMenu, tags: ['autodocs'], args: { actions },
  parameters: { docs: { description: { component: 'Row and page action menus. **Options and icons are black; only destructive actions are red**, grouped last after a separator.' } } },
  decorators: [(S) => <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: 300 }}><S /></div>],
};
export default meta;
type S = StoryObj<typeof ActionMenu>;
export const Closed: S = {};
export const Open: S = { args: { defaultOpen: true } };
export const WithDisabledItem: S = { args: { defaultOpen: true, actions: [{ label: 'View details', icon: 'eye' }, { label: 'Resend invite', icon: 'send', disabled: true }, 'separator', { label: 'Revoke licence', icon: 'key', danger: true }] } };
export const ButtonTrigger: S = { args: { trigger: 'button', label: 'More actions', defaultOpen: true } };
