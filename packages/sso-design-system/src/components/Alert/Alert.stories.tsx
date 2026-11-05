import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';
import { Button } from '../Button/Button';

const meta: Meta<typeof Alert> = { title: 'Components/Alert', component: Alert, tags: ['autodocs'], args: { tone: 'info', title: '1 seat available', children: 'Add more seats from Subscriptions when you need them.' } };
export default meta;
export const Playground: StoryObj<typeof Alert> = {};
export const Tones: StoryObj<typeof Alert> = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Alert tone="info" title="1 seat available" actions={<Button size="sm" variant="outline">Manage seats</Button>}>Add more seats from Subscriptions when you need them.</Alert>
      <Alert tone="success" title="SSO connection verified" onDismiss={() => {}}>Users can now sign in with Microsoft Entra ID.</Alert>
      <Alert tone="warning" title="Your plan renews in 7 days">Full ERP · ₦1,200,000 will be charged to the debit card ending 4242.</Alert>
      <Alert tone="error" title="Payment failed" actions={<Button size="sm" variant="destructive">Update card</Button>}>We couldn’t charge your card. Update your payment method to keep access.</Alert>
    </div>
  ),
};
