import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { Input } from './Input';

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  args: { label: 'Work email', placeholder: 'you@company.com', helperText: 'Use your business email address.' },
  argTypes: {
    size: { control: 'inline-radio', options: ['md', 'lg'] },
    leadingIcon: { control: false },
    trailingIcon: { control: false },
  },
  // Stories render at a single field width unless they opt out with `parameters.wide`.
  decorators: [(Story, ctx) => (ctx.parameters.wide ? <Story /> : <div className="w-field-sm"><Story /></div>)],
  parameters: {
    docs: {
      description: {
        component:
          'Figma source: `Field input` / `Input` / `input-box` frames on the marketing design updates page (e.g. 1926:27086, 1926:27124, 1931:24364, 1823:7673). ' +
          '44px high, radius `md`, 1px `border.default`, 14px Inter body text, label 14/500 with an 8px gap, caption 12px for helper and validation text.',
      },
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Filled: Story = { args: { defaultValue: 'olumide@wragbybiz.com' } };

/** Focus is not drawn in Figma; it uses the navy accent border plus the `shadow.focus` ring. */
export const Focus: Story = {
  args: { defaultValue: 'alex@company.com' },
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByLabelText('Work email');
    await userEvent.click(input);
    await expect(input).toHaveFocus();
  },
};

/** Matches the mobile "Create Contact" validation: red outline and message below. */
export const ErrorState: Story = {
  name: 'Error',
  args: { defaultValue: 'alex@', error: 'Enter a valid email address.', required: true },
};

export const Required: Story = { args: { label: 'First name', placeholder: 'Enter first name', helperText: undefined, required: true } };

export const Disabled: Story = { args: { disabled: true, defaultValue: 'olumide@wragbybiz.com', helperText: 'Managed by your administrator.' } };

/** Read-only uses the subtle surface, e.g. auto-filled addresses in Email settings. */
export const ReadOnly: Story = { args: { readOnly: true, label: 'Sender address', defaultValue: 'john.doe@wragby.com', helperText: 'Auto-filled from your organisation.' } };

/** Table toolbar search: md (40px), leading icon, hidden label. */
export const Search: Story = {
  args: { label: 'Search contacts', hideLabel: true, size: 'md', placeholder: 'Search...', helperText: undefined, leadingIcon: <SearchIcon /> },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Input {...args} size="md" label="Medium · 40px" helperText={undefined} />
      <Input {...args} size="lg" label="Large · 44px" helperText={undefined} />
    </div>
  ),
};

/** Default, filled, error and disabled side by side, as in the foundations sheet. */
export const States: Story = {
  parameters: { layout: 'padded', wide: true },
  render: () => (
    <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
      <Input label="Work email" placeholder="you@company.com" helperText="Use your business email address." />
      <Input label="Work email" defaultValue="alex@company.com" helperText="Use your business email address." />
      <Input label="Work email" defaultValue="alex@" error="Enter a valid email address." />
      <Input label="Work email" defaultValue="alex@company.com" disabled helperText="Managed by your administrator." />
    </div>
  ),
};
