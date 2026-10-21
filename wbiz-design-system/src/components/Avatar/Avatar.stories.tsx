import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarLabel } from './Avatar';
import { FIGMA } from '../../patterns/demo-data';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  args: { name: 'Sure Tester' },
  argTypes: { size: { control: 'inline-radio', options: ['sm', 'md'] }, tone: { control: 'inline-radio', options: ['blue', 'neutral'] } },
  parameters: {
    design: { url: FIGMA + '7075-190' },
    docs: { description: { component: 'Round initials avatar. Blue (gradient) for people everywhere, including the signed-in user in the top bar; neutral grey for system or unknown users. Initials come from the first and last name.' } },
  },
} satisfies Meta<typeof Avatar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Blue: Story = {};
export const Neutral: Story = { args: { tone: 'neutral' } };
export const Small: Story = { args: { size: 'sm', name: 'Daniel Olabode' } };
export const SingleName: Story = { args: { name: 'Wragby' } };

/** Name cell for people tables, with an optional second line. */
export const WithLabel: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <AvatarLabel name="Daniel Olabode" />
      <AvatarLabel name="Amaka Nwosu" description="amaka.nwosu@wbiz.com" />
      <AvatarLabel name="Ibrahim Musa" description="Sales Executive" size="md" />
    </div>
  ),
};
