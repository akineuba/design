import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { TopBar } from './TopBar';
import { FIGMA } from '../../patterns/demo-data';

const noop = () => {};

const meta = {
  title: 'Components/TopBar',
  component: TopBar,
  args: {
    breadcrumbs: [{ label: 'Inventory', href: '#' }, { label: 'Consumption Requisitions' }],
    user: { name: 'sure', role: 'Super User', initials: 'ST' },
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
    docs: { description: { component: 'Top bar from the new features screens: breadcrumb on the left; Tour, theme toggle, notifications, user menu and app launcher on the right. Each control appears only when its handler is passed.' } },
  },
} satisfies Meta<typeof TopBar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const DeepBreadcrumb: Story = { args: { breadcrumbs: [{ label: 'Inventory', href: '#' }, { label: 'Consumption Requisitions', href: '#' }, { label: 'New' }] } };
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
