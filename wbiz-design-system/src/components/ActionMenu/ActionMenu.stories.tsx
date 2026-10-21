import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { ActionMenu } from './ActionMenu';
import { BlockIcon, EditIcon, EyeIcon, MoneyReceiveIcon, TransferIcon } from '../../icons';
import { FIGMA } from '../../patterns/demo-data';

const items = [
  { id: 'view', label: 'View', tone: 'view' as const, icon: <EyeIcon /> },
  { id: 'edit', label: 'Edit', tone: 'edit' as const, icon: <EditIcon /> },
  { id: 'delete', label: 'Delete', tone: 'delete' as const, icon: <BlockIcon /> },
  { id: 'transactions', label: 'Transactions', tone: 'link' as const, icon: <TransferIcon /> },
  { id: 'receive', label: 'Receive Payment', tone: 'positive' as const, icon: <MoneyReceiveIcon /> },
];

const meta = {
  title: 'Components/ActionMenu',
  component: ActionMenu,
  args: { label: 'Actions for Daniel Olabode', items },
  decorators: [(Story) => <div className="flex min-h-dialog justify-end p-4"><Story /></div>],
  parameters: {
    design: { url: FIGMA + '191-3853' },
    docs: { description: { component: 'Kebab menu at the end of a table row. Item colours follow Figma: View grey, Edit amber, Delete red, navigation (Transactions) blue, money-in (Receive Payment) green. Arrow keys move, Enter selects, Escape closes.' } },
  },
} satisfies Meta<typeof ActionMenu>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = {};
export const Open: Story = {
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await userEvent.click(c.getByRole('button', { name: /actions for/i }));
    await expect(c.getByRole('menu')).toBeVisible();
  },
};
export const ShortMenu: Story = { args: { items: items.slice(0, 3) }, play: Open.play };
export const WithDisabledItem: Story = { args: { items: [items[0], items[1], { ...items[2], disabled: true }] }, play: Open.play };
