import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { TopBar } from '../TopBar';
import { UserMenu } from './UserMenu';
import { demoUserMenu } from '../../sample-screens/demo-user-menu';

const noop = () => {};

const meta = {
  title: 'Components/UserMenu',
  component: UserMenu,
  args: demoUserMenu,
  parameters: {
    docs: {
      description: {
        component:
          'Account menu opened from the TopBar user button (pass it as `userMenu`). Neutral avatar, name and email; role and ' +
          'session time in one quiet grey block; single-line items with muted 16px icons in hairline-separated groups; Log out last.',
      },
    },
  },
} satisfies Meta<typeof UserMenu>;
export default meta;
type Story = StoryObj<typeof meta>;

/** The panel on its own. */
export const Default: Story = {};
/** Without the session block (SSO sessions that do not expire). */
export const NoSession: Story = { args: { session: undefined } };
/** Session nearly over. */
export const SessionEnding: Story = { args: { session: { endsAt: '12:40', remaining: '9m left', progress: 0.05 } } };

/** Opened from the top bar: click the user, arrows move through items, Escape closes. */
export const InTopBar: Story = {
  parameters: { layout: 'fullscreen' },
  render: (args) => (
    <div className="h-[520px] bg-surface-page">
      <TopBar
        breadcrumbs={[{ label: 'Dashboard' }]}
        user={{ name: args.name, role: args.role }}
        notificationCount={8}
        onNotificationsClick={noop}
        onThemeToggle={noop}
        onTourClick={noop}
        userMenu={<UserMenu {...args} />}
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: /Ada Obi/ }));
    await expect(canvas.getByRole('menuitem', { name: 'View profile' })).toHaveFocus();
    await userEvent.keyboard('{ArrowDown}');
    await expect(canvas.getByRole('menuitem', { name: /Manage account/ })).toHaveFocus();
  },
};
