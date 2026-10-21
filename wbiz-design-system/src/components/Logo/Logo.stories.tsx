import type { Meta, StoryObj } from '@storybook/react';
import { Logo } from './Logo';

const meta = {
  title: 'Components/Logo',
  component: Logo,
  argTypes: { variant: { control: 'inline-radio', options: ['full', 'mark'] } },
  parameters: { docs: { description: { component: 'wBizManager logo from the brand asset. `full` in the sidebar header, `mark` in the collapsed sidebar. Sized by height (default 32px).' } } },
} satisfies Meta<typeof Logo>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Full: Story = {};
export const Mark: Story = { args: { variant: 'mark' } };
export const Large: Story = { args: { className: 'h-control-lg' } };
