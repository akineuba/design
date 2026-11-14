import type { Meta, StoryObj } from '@storybook/react';
import { Toast, ToastProvider, useToast } from '../components/Toast';
import { Button } from '../components/Button';

const meta = { title: 'Components/Toast', component: Toast, args: { title: 'Client saved', onClose: () => {} } } satisfies Meta<typeof Toast>;
export default meta;
type S = StoryObj<typeof meta>;
export const Success: S = {};
export const WithUndo: S = { args: { title: 'Policy deleted', description: 'POL-2026-00975', action: { label: 'Undo', onClick: () => {} } } };
export const Error: S = { args: { tone: 'error', title: 'Couldn’t save the client', description: 'Check your connection and try again. Your changes are still in the form.' } };
export const Warning: S = { args: { tone: 'warning', title: 'Saved with warnings', description: 'KYC documents are missing.' } };
export const Info: S = { args: { tone: 'info', title: 'Export started', description: 'We’ll email you when the file is ready.' } };
function Demo() {
  const toast = useToast();
  return (
    <div className="flex gap-2.5">
      <Button onClick={() => toast({ title: 'Client saved' })}>Save</Button>
      <Button variant="destructive-outline" onClick={() => toast({ title: 'Policy deleted', action: { label: 'Undo', onClick: () => toast({ tone: 'info', title: 'Policy restored' }) } })}>Delete</Button>
      <Button variant="outline" onClick={() => toast({ tone: 'error', title: 'Couldn’t send the renewal notice', description: 'The client has no email address.' })}>Fail</Button>
    </div>
  );
}
export const Interactive: S = { render: () => <ToastProvider><Demo /></ToastProvider> };
