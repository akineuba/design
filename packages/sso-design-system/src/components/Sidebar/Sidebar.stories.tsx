import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { CircleHelp, Settings } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { SSO_NAV_ITEMS } from './navItems';
import { Logo } from '../Logo/Logo';
import { TopBar } from '../TopBar/TopBar';
import { Avatar } from '../Avatar/Avatar';
import { contextOptions, currentUser } from '../../demo/data';

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

const withGroups = SSO_NAV_ITEMS.map((i) =>
  i.id === 'approval-admin'
    ? { ...i, badge: 5 }
    : i.id === 'subscriptions'
      ? {
          ...i,
          children: [
            { id: 'subs-overview', label: 'Overview' },
            { id: 'subs-plans', label: 'Plans' },
            { id: 'subs-tenants', label: 'Commercial tenants' },
            { id: 'subs-billing', label: 'Billing tools' },
            { id: 'subs-wallet', label: 'Wallet review', badge: 2 },
            { id: 'subs-audit', label: 'Audit logs' },
          ],
        }
      : i,
);

export const WithGroupsAndBadges: StoryObj<typeof Sidebar> = {
  name: 'Sidebar: groups, badges, footer',
  render: () => {
    const [active, setActive] = useState('subs-plans');
    return (
      <div className="sso-root" style={{ height: 860, display: 'flex', background: 'var(--sso-color-surface-page)' }}>
        <Sidebar
          items={withGroups}
          activeId={active}
          onNavigate={(id, e) => { e.preventDefault(); setActive(id); }}
          footerItems={[{ id: 'settings', label: 'Settings', icon: <Settings /> }, { id: 'help', label: 'Help', icon: <CircleHelp /> }]}
        />
      </div>
    );
  },
};

export const TopBarStory: StoryObj = {
  name: 'Top bar',
  render: () => (
    <div className="sso-root">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <TopBar
          contexts={[
            { id: 'scope', label: 'Scope', value: 'GLOBAL', options: contextOptions.scope, width: 264 },
            { id: 'product', label: 'Product', value: 'CORE', options: contextOptions.product, width: 180 },
            { id: 'entity', label: 'Entity', value: '', options: contextOptions.entity, width: 150, disabled: true },
          ]}
          user={currentUser}
          notificationCount={3}
        />
        <TopBar breadcrumbs={[{ label: 'Tenants', href: '#' }, { label: 'AIM Group' }]} user={currentUser} />
      </div>
    </div>
  ),
};

export const Logos: StoryObj = {
  render: () => (
    <div className="sso-root" style={{ padding: 32, display: 'flex', gap: 48, alignItems: 'center', flexWrap: 'wrap' }}>
      <figure style={{ margin: 0 }}><Logo variant="sso" height={48} /><figcaption style={{ fontSize: 12, color: 'var(--sso-color-fg-muted)', marginTop: 8 }}>sso: SSO Portal (sign-in + app)</figcaption></figure>
      <figure style={{ margin: 0 }}><Logo variant="wordmark" height={44} /><figcaption style={{ fontSize: 12, color: 'var(--sso-color-fg-muted)', marginTop: 8 }}>wordmark: plain wBizManager</figcaption></figure>
      <figure style={{ margin: 0 }}><Logo variant="mark" height={44} /><figcaption style={{ fontSize: 12, color: 'var(--sso-color-fg-muted)', marginTop: 8 }}>mark: collapsed sidebar</figcaption></figure>
      <figure style={{ margin: 0, display: 'flex', gap: 8 }}><Avatar name="Global Admin" size="sm" /><Avatar name="Global Admin" /><Avatar name="Adam Smith" tone="neutral" size="lg" /></figure>
    </div>
  ),
};
