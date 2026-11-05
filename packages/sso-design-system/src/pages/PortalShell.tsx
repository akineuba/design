import { useState, type ReactNode } from 'react';
import { AppShell } from '../components/AppShell/AppShell';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { SSO_NAV_ITEMS } from '../components/Sidebar/navItems';
import { TopBar } from '../components/TopBar/TopBar';
import { contextOptions, currentUser } from '../demo/data';

/** Demo wrapper: the real shell with local nav + context state. */
export function PortalShell({ active, children, constrained = false }: { active: string; children: ReactNode; constrained?: boolean }) {
  const [current, setCurrent] = useState(active);
  const [collapsed, setCollapsed] = useState(false);
  const [scope, setScope] = useState('GLOBAL');
  const [product, setProduct] = useState('CORE');
  return (
    <AppShell
      constrained={constrained}
      sidebar={
        <Sidebar
          items={SSO_NAV_ITEMS}
          activeId={current}
          onNavigate={(id, e) => { e.preventDefault(); setCurrent(id); }}
          collapsed={collapsed}
          onToggleCollapsed={() => setCollapsed(!collapsed)}
        />
      }
      topbar={
        <TopBar
          contexts={[
            { id: 'scope', label: 'Scope', value: scope, onChange: setScope, options: contextOptions.scope, width: 264 },
            { id: 'product', label: 'Product', value: product, onChange: setProduct, options: contextOptions.product, width: 180 },
            { id: 'entity', label: 'Entity', value: '', options: contextOptions.entity, width: 150, disabled: true },
          ]}
          user={currentUser}
          notificationCount={3}
        />
      }
    >
      {children}
    </AppShell>
  );
}
