import { useState, type ReactNode } from 'react';
import { Sidebar, type SidebarProps } from './Sidebar';
import { TopBar, type TopBarProps } from './TopBar';

export interface AppShellProps {
  sidebar: Omit<SidebarProps, 'collapsed' | 'onCollapsedChange'>;
  topBar: TopBarProps;
  children: ReactNode;
  defaultCollapsed?: boolean;
}

/** Page frame (UI rule 15): sidebar, top bar, then the page body with 80px side padding and 20px gaps. */
export function AppShell({ sidebar, topBar, children, defaultCollapsed = false }: AppShellProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  return (
    <div className="flex h-screen min-h-[640px] w-full bg-surface-page">
      <Sidebar {...sidebar} collapsed={collapsed} onCollapsedChange={setCollapsed} />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar {...topBar} />
        <main className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto px-5 py-5 lg:px-20">{children}</main>
      </div>
    </div>
  );
}
