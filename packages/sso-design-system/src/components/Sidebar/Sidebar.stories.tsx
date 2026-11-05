import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { SSO_NAV_ITEMS } from './navItems';
import { Logo } from '../Logo/Logo';
import { TopBar } from '../TopBar/TopBar';
import { Avatar } from '../Avatar/Avatar';
import { currentUser } from '../../demo/data';

const meta: Meta<typeof Sidebar> = { title: 'Components/Navigation', component: Sidebar, tags: ['autodocs'], parameters: { layout: 'fullscreen' } };
export default meta;

export const SidebarNav: StoryObj<typeof Sidebar> = {
  name: 'Sidebar',
  render: () => {
    const [active, setActive] = useState('dashboard');
    const [collapsed, setCollapsed] = useState(false);
    return (
      <div className="sso-root" style={{ height: 760, display: 'flex', background: 'var(--sso-color-surface-page)' }}>
        <Sidebar items={SSO_NAV_ITEMS} activeId={active} onNavigate={(id, e) => { e.preventDefault(); setActive(id); }} collapsed={collapsed} onToggleCollapsed={() => setCollapsed(!collapsed)} />
      </div>
    );
  },
};

export const TopBarStory: StoryObj = {
  name: 'Top bar',
  render: () => (
    <div className="sso-root">
      <TopBar context="Wragby Group" user={currentUser} unreadNotifications />
    </div>
  ),
};

export const Logos: StoryObj = {
  render: () => (
    <div className="sso-root" style={{ padding: 32, display: 'flex', gap: 48, alignItems: 'center', flexWrap: 'wrap' }}>
      <figure style={{ margin: 0 }}><Logo variant="sso" height={48} /><figcaption style={{ fontSize: 12, color: 'var(--sso-color-fg-muted)', marginTop: 8 }}>sso: signed-in portal</figcaption></figure>
      <figure style={{ margin: 0 }}><Logo variant="wordmark" height={44} /><figcaption style={{ fontSize: 12, color: 'var(--sso-color-fg-muted)', marginTop: 8 }}>wordmark: sign-in / public</figcaption></figure>
      <figure style={{ margin: 0 }}><Logo variant="mark" height={44} /><figcaption style={{ fontSize: 12, color: 'var(--sso-color-fg-muted)', marginTop: 8 }}>mark: collapsed sidebar</figcaption></figure>
      <figure style={{ margin: 0, display: 'flex', gap: 8 }}><Avatar name="Adaola Johnson" size="sm" /><Avatar name="Adaola Johnson" /><Avatar name="Adam Smith" tone="neutral" size="lg" /></figure>
    </div>
  ),
};
