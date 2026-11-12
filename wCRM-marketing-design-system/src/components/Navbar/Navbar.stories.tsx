import type { Meta, StoryObj } from '@storybook/react';
import { useId, useState, type ReactNode } from 'react';
import { Sidebar } from '../Sidebar';
import { businessSections, businessSettings, marketingSections, marketingSettings } from '../Sidebar/Sidebar.fixtures';
import { Navbar } from './Navbar';

const meta = {
  title: 'Components/Navbar',
  component: Navbar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Desktop app header. Figma: `navbar` (1514:7170) and `Application header` (2518:57355). Sidebar toggle, Wragby logo, greeting and page title on the left; ' +
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
} satisfies Meta<typeof Navbar>;
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
      <Navbar {...args} theme="dark" />
    </ThemeFrame>
  ),
};

function Shell({ initialTheme, business }: { initialTheme: 'light' | 'dark'; business?: boolean }) {
  const [theme, setTheme] = useState(initialTheme);
  const [open, setOpen] = useState(true);
  const [active, setActive] = useState(business ? 'report-birthdays' : 'settings-social');
  const sidebarId = useId();
  return (
    <div data-theme={theme} className="flex h-screen min-h-mobile-frame flex-col bg-surface-canvas">
      <Navbar
        greeting="Hi Akinola"
        title={business ? 'Reports - Birthdays' : 'Settings - Social Media'}
        userName="Akinola Ebuka"
        hasUnreadNotifications
        theme={theme}
        onThemeToggle={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
        sidebarOpen={open}
        sidebarId={sidebarId}
        onMenuClick={() => setOpen((o) => !o)}
      />
      <div className="flex min-h-0 flex-1">
        {open && (
          <Sidebar
            id={sidebarId}
            sections={business ? businessSections : marketingSections}
            settings={business ? businessSettings : marketingSettings}
            activeId={active}
            onNavigate={(item) => setActive(item.id)}
            onLogout={() => {}}
          />
        )}
        <main className="flex-1 p-10">
          <div className="rounded-lg border border-border-default bg-surface-default p-6 text-body text-text-secondary">
            Page content. Use the menu button to hide the sidebar and the sun / moon to switch theme.
          </div>
        </main>
      </div>
    </div>
  );
}

/** Navbar + Sidebar together, as on the Settings › Social Media screen. Menu, theme toggle and nav items all work. */
export const WithSidebar: Story = { render: () => <Shell initialTheme="light" /> };

/** The same shell on the dark theme, with the Business Development sidebar. */
export const WithSidebarDark: Story = { render: () => <Shell initialTheme="dark" business /> };
