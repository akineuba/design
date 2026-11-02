import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button, type ButtonVariant } from '../components/Button';
import { DeleteIcon, ExportIcon, FilterIcon, PlusIcon, SuccessIcon } from '../icons';
import { figma } from '../docs/links';

const meta = {
  title: 'Components/Button',
  component: Button,
  args: { children: 'Add Policy', onClick: fn() },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'outline', 'tertiary', 'destructive', 'destructive-outline'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    leadingIcon: { control: false },
    trailingIcon: { control: false },
  },
  parameters: {
    design: { type: 'figma', url: figma('15:1301') },
    docs: { description: { component: 'Figma: 40px tall (10px padding + 20px icon), 10px radius, 20px side padding, 5px icon gap, Instrument Sans SemiBold 13. Hover, focus, disabled and loading are derived.' } },
  },
} satisfies Meta<typeof Button>;
export default meta;
type S = StoryObj<typeof meta>;

export const Primary: S = { args: { variant: 'primary', leadingIcon: <PlusIcon /> } };
export const Secondary: S = { args: { variant: 'secondary', children: 'Export', leadingIcon: <ExportIcon /> } };
export const Outline: S = { args: { variant: 'outline', children: 'Filter', leadingIcon: <FilterIcon /> } };
export const Tertiary: S = { args: { variant: 'tertiary', children: 'Clear all' } };
export const Destructive: S = { args: { variant: 'destructive', children: 'Delete policy', leadingIcon: <DeleteIcon /> } };
export const DestructiveOutline: S = { args: { variant: 'destructive-outline', children: 'Cancel policy' } };
export const Disabled: S = { args: { disabled: true, children: 'Save' } };
export const Loading: S = { args: { loading: true, children: 'Saving' } };
export const IconOnly: S = { args: { variant: 'outline', iconOnly: true, 'aria-label': 'Delete', children: <DeleteIcon /> } };
export const Sizes: S = {
  render: (a) => (
    <div className="flex items-center gap-3">
      <Button {...a} size="sm">Small 34</Button>
      <Button {...a} size="md">Medium 40</Button>
      <Button {...a} size="lg">Large 48</Button>
    </div>
  ),
};
const V: ButtonVariant[] = ['primary', 'secondary', 'outline', 'tertiary', 'destructive', 'destructive-outline'];
/** Every variant against every state. */
export const Matrix: S = {
  parameters: { layout: 'padded' },
  render: (a) => (
    <table className="border-separate border-spacing-3 text-12 text-fg-muted">
      <thead>
        <tr>
          <th />
          {['Default', 'With icon', 'Disabled', 'Loading'].map((h) => (
            <th key={h} className="text-left font-medium">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {V.map((v) => (
          <tr key={v}>
            <th className="pr-2 text-left font-medium">{v}</th>
            <td><Button {...a} variant={v}>Button</Button></td>
            <td><Button {...a} variant={v} leadingIcon={<SuccessIcon />}>Button</Button></td>
            <td><Button {...a} variant={v} disabled>Button</Button></td>
            <td><Button {...a} variant={v} loading>Button</Button></td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
};
