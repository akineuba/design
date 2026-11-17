import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';
import { Button } from '../Button';

const meta = {
  title: 'Components/Alert',
  component: Alert,
  args: { tone: 'info', title: 'Exchange rates update daily at 9:00' },
  argTypes: { tone: { control: 'inline-radio', options: ['info', 'success', 'warning', 'error'] } },
  decorators: [(Story) => <div className="w-full max-w-dialog-lg"><Story /></div>],
  parameters: { layout: 'padded', docs: { description: { component: 'Page-level message under the page title: a validation summary before saving, a confirmation after an action, or a warning about the record. Derived (no banner in Figma).' } } },
} satisfies Meta<typeof Alert>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = { args: { children: 'Invoices in foreign currency use the rate on the invoice date.' } };
export const Success: Story = { args: { tone: 'success', title: 'INV-2026-0142 issued to Deborah Akinola', children: 'Balance due ₦ 1,537,005.00, due 21 Nov 2026.', actions: <Button size="sm">Receive Payment</Button> } };
export const Warning: Story = { args: { tone: 'warning', title: 'This customer is over their credit limit', children: 'Outstanding receivables are ₦ 3.2M against a ₦ 3M limit.' } };
export const ErrorSummary: Story = {
  args: { tone: 'error', title: 'Fix these before issuing the invoice', onDismiss: () => {}, children: <ul className="list-disc pl-5"><li>Choose a customer.</li><li>Line 2: choose an item or account.</li></ul> },
};
