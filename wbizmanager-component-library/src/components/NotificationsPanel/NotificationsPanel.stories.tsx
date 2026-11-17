import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { TopBar } from '../TopBar';
import { NotificationsPanel } from './NotificationsPanel';
import { demoNotifications } from '../../sample-screens/demo-notifications';

const noop = () => {};

const meta = {
  title: 'Components/NotificationsPanel',
  component: NotificationsPanel,
  args: { items: demoNotifications, onMarkAllRead: noop, onSettings: noop, onClearRead: noop, onViewAll: noop },
  parameters: {
    docs: {
      description: {
        component:
          'Popover opened from the TopBar bell (pass it as `notificationsPanel`). White surface; one header row with Mark all read ' +
          'and settings; All / Unread tabs; items grouped by day with a small tone icon, a two-line body and a blue unread dot; ' +
          'Clear read and View all in the footer.',
      },
    },
  },
} satisfies Meta<typeof NotificationsPanel>;
export default meta;
type Story = StoryObj<typeof meta>;

/** The panel on its own. */
export const Default: Story = {};
/** Nothing unread: Mark all read is disabled. */
export const AllRead: Story = { args: { items: demoNotifications.map((n) => ({ ...n, unread: false })) } };
/** Unread tab with nothing unread shows the empty state. */
export const AllCaughtUp: Story = {
  args: { items: demoNotifications.map((n) => ({ ...n, unread: false })) },
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole('tab', { name: /Unread/ }));
    await expect(within(canvasElement).getByText("You're all caught up")).toBeInTheDocument();
  },
};

/** Opened from the top bar bell; Escape closes it. */
export const InTopBar: Story = {
  parameters: { layout: 'fullscreen' },
  render: (args) => (
    <div className="h-[680px] bg-surface-page">
      <TopBar
        breadcrumbs={[{ label: 'Dashboard' }]}
        user={{ name: 'Ada Obi', role: 'Super User' }}
        notificationCount={args.items.filter((n) => n.unread).length}
        onThemeToggle={noop}
        onTourClick={noop}
        notificationsPanel={<NotificationsPanel {...args} />}
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: /Notifications/ }));
    await expect(canvas.getByRole('dialog', { name: 'Notifications' })).toBeInTheDocument();
  },
};
