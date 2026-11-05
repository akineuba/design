import { useState, type ReactNode } from 'react';
import { AppShell } from '../components/AppShell/AppShell';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { SSO_NAV_ITEMS } from '../components/Sidebar/navItems';
import { TopBar } from '../components/TopBar/TopBar';
import { currentTenant, currentUser } from '../demo/data';

/** Demo wrapper: the real shell with local nav state. */
export function PortalShell({ active, children }: { active: string; children: ReactNode }) {
  const [current, setCurrent] = useState(active);
  const [collapsed, setCollapsed] = useState(false);
  return (
    <AppShell
      sidebar={
        <Sidebar
          items={SSO_NAV_ITEMS}
          activeId={current}
          onNavigate={(id, e) => { e.preventDefault(); setCurrent(id); }}
          collapsed={collapsed}
          onToggleCollapsed={() => setCollapsed(!collapsed)}
          footer={!collapsed && 'SSO Portal · v0.1'}
        />
      }
      topbar={<TopBar context={currentTenant} user={currentUser} unreadNotifications />}
    >
      {children}
    </AppShell>
  );
}
