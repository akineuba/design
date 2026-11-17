import type { Meta, StoryObj } from '@storybook/react';
import { RichTextField } from './RichTextField';

const meta = {
  title: 'Components/RichTextField',
  component: RichTextField,
  args: { label: 'Customer notes', placeholder: 'Payment instructions, terms or a thank-you note.', hint: 'Shown on the invoice and in the email to the customer.' },
  decorators: [(Story) => <div className="w-full max-w-dialog"><Story /></div>],
  parameters: { layout: 'padded', docs: { description: { component: 'Multi-line text with bold, italic, underline and lists, for text the recipient reads (invoice notes, terms, payment instructions). Derived: Figma has no rich text field.' } } },
} satisfies Meta<typeof RichTextField>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};
export const WithContent: Story = { args: { defaultValue: '<p>Thank you for your business.</p><p><b>Bank:</b> Zenith Bank · <b>Account:</b> 1012345678</p><ul><li>Payment within 30 days</li><li>Quote the invoice number</li></ul>' } };
export const Disabled: Story = { args: { disabled: true, defaultValue: '<p>Issued invoices can’t be edited.</p>' } };
