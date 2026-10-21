import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { TopBar } from './TopBar';
import { FIGMA } from '../../patterns/demo-data';

const noop = () => {};

const meta = {
  title: 'Components/TopBar',
  component: TopBar,
  args: {
    breadcrumbs: [{ label: 'Dashboard' }],
    user: { name: 'Ada Obi', role: 'Super User' },
    notificationCount: 8,
    onNotificationsClick: noop,
    onThemeToggle: noop,
    onTourClick: noop,
    onAppsClick: noop,
    onUserMenuClick: noop,
  },
  parameters: {
    layout: 'fullscreen',
    design: { url: FIGMA + '7053-5510' },
    docs: { description: { component: 'Top bar from the latest reference: breadcrumb on the left (current page in blue); Tour, theme toggle, notifications with a red count, user (blue initials avatar, name, role, chevron) and the grid app launcher on the right. Each control appears only when its handler is passed.' } },
  },
} satisfies Meta<typeof TopBar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const DeepBreadcrumb: Story = { args: { breadcrumbs: [{ label: 'Accounting', href: '#' }, { label: 'Fixed Assets', href: '#' }, { label: 'Asset Category' }] } };
export const NoUnreadNotifications: Story = { args: { notificationCount: 0 } };
export const ManyNotifications: Story = { args: { notificationCount: 128 } };
export const DarkThemeSelected: Story = { args: { theme: 'dark' } };
export const Minimal: Story = { args: { onTourClick: undefined, onThemeToggle: undefined, onAppsClick: undefined } };

export const Interactive: Story = {
  render: (args) => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [count, setCount] = useState(8);
    return <TopBar {...args} theme={theme} onThemeToggle={() => setTheme(theme === 'light' ? 'dark' : 'light')} notificationCount={count} onNotificationsClick={() => setCount(0)} />;
  },
};
