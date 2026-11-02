import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from '../components/Alert';

const meta = { title: 'Components/Alert', component: Alert, decorators: [(S) => <div className="w-[560px]"><S /></div>] } satisfies Meta<typeof Alert>;
export default meta;
type S = StoryObj<typeof meta>;
export const Info: S = { args: { title: 'Rates updated', children: 'Harbor General Assurance changed its motor rates on 1 Oct 2026. New quotes use the new rates.' } };
export const Success: S = { args: { tone: 'success', title: 'Premium fully paid', children: 'The policy is active and the certificate can be issued.' } };
export const Warning: S = { args: { tone: 'warning', title: 'Policy expires in 12 days', children: 'Send a renewal notice to the client.', action: <a href="#" className="text-primary underline">Renew now</a> } };
export const ErrorSummary: S = {
  args: {
    tone: 'error',
    title: 'Fix 2 fields to submit this policy',
    children: (
      <ul className="list-disc pl-5">
        <li><a href="#" className="underline">Sum insured</a> is required.</li>
        <li><a href="#" className="underline">End date</a> must be after the start date.</li>
      </ul>
    ),
  },
};
export const Dismissible: S = { args: { title: 'New: export to Excel from any table.', onDismiss: () => {} } };
