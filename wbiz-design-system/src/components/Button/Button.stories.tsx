import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button, type ButtonVariant } from './Button';
import { CopyIcon, ImportIcon, PlusIcon, TrashIcon } from '../../foundations/icons';

const FIGMA = 'https://www.figma.com/design/TJAupALP2AYuN7NXNlY33g/w-Biz?node-id=';

const meta = {
  title: 'Components/Button',
  component: Button,
  args: { children: 'Create New', onClick: fn() },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'tertiary', 'soft', 'destructive'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    leadingIcon: { control: false },
    trailingIcon: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Built from the `_Button base` frames on the accounting screens: 40px tall, 8px radius, 10/16 padding, ' +
          '8px gap, Inter Medium 14/20. Hover, focus and loading are not drawn in Figma and use derived tokens.',
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { variant: 'primary', leadingIcon: <PlusIcon /> },
  parameters: { design: { url: FIGMA + '6125-58412' } },
};

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Import', leadingIcon: <ImportIcon /> },
  parameters: { design: { url: FIGMA + '6309-33037' } },
};

export const Tertiary: Story = {
  args: { variant: 'tertiary', children: 'Tertiary' },
  parameters: { design: { url: FIGMA + '209-4260' } },
};

export const Soft: Story = {
  args: { variant: 'soft', children: 'Secondary' },
  parameters: { design: { url: FIGMA + '209-4263' } },
};

export const Destructive: Story = {
  args: { variant: 'destructive', children: 'Clear all lines', leadingIcon: <TrashIcon /> },
  parameters: { design: { url: FIGMA + '6309-33224' } },
};

export const Disabled: Story = {
  args: { variant: 'primary', disabled: true, children: 'Save and Send' },
};

export const Loading: Story = {
  args: { variant: 'primary', loading: true, children: 'Saving' },
};

export const IconOnly: Story = {
  args: { variant: 'tertiary', iconOnly: true, 'aria-label': 'Copy', children: <CopyIcon /> },
  parameters: { design: { url: FIGMA + '209-4284' } },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <Button {...args} size="sm">Small</Button>
      <Button {...args} size="md">Medium</Button>
      <Button {...args} size="lg">Large</Button>
    </div>
  ),
};

const VARIANTS: ButtonVariant[] = ['primary', 'secondary', 'tertiary', 'soft', 'destructive'];

/** Every variant against every state, for a side-by-side check with Figma. */
export const Matrix: Story = {
  parameters: { layout: 'padded' },
  render: (args) => (
    <table className="border-separate border-spacing-3 font-sans text-xs text-fg-muted">
      <thead>
        <tr>
          <th />
          {['Default', 'With icon', 'Disabled', 'Loading'].map((h) => (
            <th key={h} className="text-left font-medium">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {VARIANTS.map((v) => (
          <tr key={v}>
            <th className="pr-2 text-left font-medium capitalize">{v}</th>
            <td><Button {...args} variant={v}>Button</Button></td>
            <td><Button {...args} variant={v} leadingIcon={<PlusIcon />}>Button</Button></td>
            <td><Button {...args} variant={v} disabled>Button</Button></td>
            <td><Button {...args} variant={v} loading>Button</Button></td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
};
