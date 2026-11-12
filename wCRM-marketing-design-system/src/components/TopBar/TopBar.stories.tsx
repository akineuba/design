import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';
import { TopBar } from './TopBar';

const meta = {
  title: 'Components/Top Bar',
  component: TopBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Desktop app header. Figma: `navbar` (1514:7170) and `Application header` (2518:57355). Menu (navigation) toggle, Wragby logo, greeting and page title on the left; ' +
          'notifications, app switcher, theme toggle and account avatar on the right.',
      },
    },
  },
  args: {
    greeting: 'Hi Akinola',
    title: 'Settings - Social Media',
    userName: 'Akinola Ebuka',
    hasUnreadNotifications: true,
  },
} satisfies Meta<typeof TopBar>;
export default meta;
type Story = StoryObj<typeof meta>;

/** As drawn in Figma: unread notifications, light theme. */
export const Default: Story = {};

/** No unread notifications: the red dot is hidden. */
export const NoUnread: Story = { args: { hasUnreadNotifications: false } };

/** Another page title, from the `Application header` frame. */
export const CustomFields: Story = { args: { title: 'Custom Fields' } };

/** Long titles truncate instead of pushing the right-hand controls off the bar. */
export const LongTitle: Story = {
  args: { title: 'Business Development - Collaboration Report for the Lagos and Abuja regional sales teams, Q4' },
};

const ThemeFrame = ({ theme, children }: { theme: 'light' | 'dark'; children: ReactNode }) => (
  <div data-theme={theme} className="bg-surface-canvas">
    {children}
  </div>
);

/** Dark theme: the toggle shows the moon. */
export const Dark: Story = {
  render: (args) => (
    <ThemeFrame theme="dark">
      <TopBar {...args} theme="dark" />
    </ThemeFrame>
  ),
};
