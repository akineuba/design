import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  args: { label: 'Social interactions', description: 'Get notified about new conversations, interactions and follower changes.' },
  parameters: { docs: { description: { component: 'Figma: `toggle-switch` in the notification `pref-row` (1529:9553). Green track when on. The off state is not drawn in Figma; it uses `status.toggle-off`.' } } },
} satisfies Meta<typeof Switch>;
export default meta;
type Story = StoryObj<typeof meta>;

export const On: Story = { args: { defaultChecked: true } };
export const Off: Story = {};
export const Disabled: Story = { args: { disabled: true, defaultChecked: true } };
export const LabelStart: Story = { args: { labelPosition: 'start', defaultChecked: true }, decorators: [(S) => <div className="w-modal-md"><S /></div>] };
export const Bare: Story = { args: { label: undefined, description: undefined, 'aria-label': 'Automated birthday email', defaultChecked: true } };
