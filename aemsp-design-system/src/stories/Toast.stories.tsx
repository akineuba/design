import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Toast, ToastProvider, useToast } from '../components/overlays';
import { Button } from '../components/primitives';

export default { title: 'Components/Toast', component: Toast, tags: ['autodocs'], args: { tone: 'success', title: 'Role created', message: 'Finance Analyst is ready to assign.' } } satisfies Meta<typeof Toast>;
type S = StoryObj<typeof Toast>;
export const Success: S = {};
export const WithUndo: S = { args: { title: 'Licence revoked', message: 'Key FDP-8X2Q was revoked.', action: { label: 'Undo' }, onClose: () => {} } };
export const Error: S = { args: { tone: 'error', title: 'Couldn’t save changes', message: 'Check your connection and try again.', action: { label: 'Retry' } } };
export const Warning: S = { args: { tone: 'warning', title: 'Seats almost full', message: '94% used on Telematics Suite.' } };
export const Info: S = { args: { tone: 'info', title: 'Export started', message: 'We’ll email you when the CSV is ready.' } };
function Demo() {
  const push = useToast();
  return <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
    <Button onClick={() => push({ tone: 'success', title: 'Changes saved' })}>Success toast</Button>
    <Button variant="outline" onClick={() => push({ tone: 'error', title: 'Upload failed', message: 'File is larger than 10 MB.' })}>Error toast</Button>
    <Button variant="outline" onClick={() => push({ tone: 'info', title: 'Licence revoked', action: { label: 'Undo' } })}>With undo</Button>
  </div>;
}
export const Interactive: S = { render: () => <ToastProvider><Demo /></ToastProvider> };
