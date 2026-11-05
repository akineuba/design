import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';
import { Button } from '../Button/Button';

const meta: Meta<typeof Alert> = { title: 'Components/Alert', component: Alert, tags: ['autodocs'], args: { tone: 'info', title: '1 seat available', description: 'Add more seats from Subscriptions when you need them.' } };
export default meta;
export const Playground: StoryObj<typeof Alert> = { args: { action: <Button variant="link">Manage seats</Button> } };
export const Tones: StoryObj<typeof Alert> = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Alert tone="info" title="1 seat available" description="Add more seats from Subscriptions when you need them." action={<Button variant="link">Manage seats</Button>} />
      <Alert tone="success" title="SSO connection verified" description="Users can now sign in with Microsoft Entra ID." onDismiss={() => {}} />
      <Alert tone="warning" title="Your plan renews in 7 days" description="Full ERP · ₦1,200,000 will be charged to Debit Card ending 4242." />
      <Alert tone="error" title="Payment failed" description="We couldn't charge your card. Update your payment method to keep access." action={<Button size="sm" variant="danger">Update card</Button>} />
    </div>
  ),
};
