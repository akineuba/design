import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';
import { Button } from './Button';

const Plus = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" aria-hidden="true">
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
);
const History = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
    <path d="M12 7v5l4 2" />
  </svg>
);

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: { children: 'Create contact', onClick: fn() },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'outline', 'ghost', 'danger'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    leadingIcon: { control: false },
    trailingIcon: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Figma source: `Button` / `create-button` frames on the marketing design updates page (e.g. 817:8441, 1926:27103, 1926:27101, 1931:24592). ' +
          'Radius `md` (8px), label 14/600 Inter, 8px icon gap, 16px inset. Heights map to `size.control-*` tokens.',
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Solid brand red. One per view: "Create Contact", "Send invitation", "Publish". */
export const Primary: Story = { args: { variant: 'primary' } };

/** Navy outline for supporting actions: "Connection History", "Save as Draft". */
export const Secondary: Story = { args: { variant: 'secondary', children: 'Connection history', leadingIcon: <History /> } };

/** Neutral outline for low-emphasis actions: "Clear all", "Cancel", "Export". */
export const Outline: Story = { args: { variant: 'outline', children: 'Clear all' } };

/** Text-only brand action used under a primary button on mobile forms. */
export const Ghost: Story = { args: { variant: 'ghost', children: 'Save as draft' } };

/** Outlined destructive action beside a primary, e.g. "Delete" next to "Mark complete". */
export const Danger: Story = { args: { variant: 'danger', children: 'Delete' } };

/** Disabled looks the same for every variant: sunken fill, muted label. */
export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <div className="flex items-center gap-3">
      <Button {...args} variant="primary">Primary</Button>
      <Button {...args} variant="secondary">Secondary</Button>
      <Button {...args} variant="outline">Outline</Button>
      <Button {...args} variant="ghost">Ghost</Button>
      <Button {...args} variant="danger">Danger</Button>
    </div>
  ),
};

/** Keeps its width and colour, shows a spinner and blocks repeat submits. */
export const Loading: Story = {
  args: { loading: true, children: 'Send invitation' },
  play: async ({ canvasElement, args }) => {
    const button = within(canvasElement).getByRole('button');
    await expect(button).toHaveAttribute('aria-busy', 'true');
    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

export const WithLeadingIcon: Story = { args: { leadingIcon: <Plus />, children: 'Create contact' } };

/** sm 36px · md 40px · lg 44px. */
export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <Button {...args} size="sm">Small · 36</Button>
      <Button {...args} size="md">Medium · 40</Button>
      <Button {...args} size="lg">Large · 44</Button>
    </div>
  ),
};

export const FullWidth: Story = {
  args: { fullWidth: true, size: 'lg', children: 'Create contact' },
  decorators: [(Story) => <div className="w-mobile-content"><Story /></div>],
};

/** Every variant × state, for visual review against Figma. */
export const Matrix: Story = {
  parameters: { layout: 'padded' },
  render: () => {
    const variants = ['primary', 'secondary', 'outline', 'ghost', 'danger'] as const;
    return (
      <div className="grid grid-cols-4 items-center gap-x-6 gap-y-4">
        <span />
        {['Default', 'Disabled', 'Loading'].map((h) => (
          <span key={h} className="text-overline text-text-secondary">{h}</span>
        ))}
        {variants.map((v) => (
          <div key={v} className="contents">
            <span className="text-label-sm capitalize text-text-primary">{v}</span>
            <Button variant={v}>Get started</Button>
            <Button variant={v} disabled>Get started</Button>
            <Button variant={v} loading>Get started</Button>
          </div>
        ))}
      </div>
    );
  },
};
