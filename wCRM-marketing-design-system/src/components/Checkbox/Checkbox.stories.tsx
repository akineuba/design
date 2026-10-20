import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: { label: 'Facebook Page' },
  parameters: { docs: { description: { component: 'Figma: `checkbox-checked` in `filter-popup`, notification preference rows and the frequency checklist. 16px, radius 4, brand red when checked.' } } },
} satisfies Meta<typeof Checkbox>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Unchecked: Story = {};
export const Checked: Story = { args: { defaultChecked: true } };
export const Indeterminate: Story = { args: { checked: 'indeterminate', label: 'All accounts' } };
export const WithDescription: Story = { args: { label: 'Daily', description: 'Send a summary every morning at 08:00.' } };
export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Checkbox label="X Account (disconnected)" disabled />
      <Checkbox label="YouTube Channel (managed by admin)" disabled defaultChecked />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Checkbox label="Unchecked" />
      <Checkbox label="Checked" defaultChecked />
      <Checkbox label="Indeterminate" checked="indeterminate" />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Disabled checked" disabled defaultChecked />
    </div>
  ),
};

export const Toggles: Story = {
  play: async ({ canvasElement }) => {
    const box = within(canvasElement).getByRole('checkbox');
    await userEvent.click(box);
    await expect(box).toHaveAttribute('data-state', 'checked');
  },
};
