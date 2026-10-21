// Story-only app frame shared by the page patterns.
import type { ReactNode } from 'react';
import { Sidebar } from '../components/Sidebar';
import { TopBar, type TopBarProps } from '../components/TopBar';
import { Logo } from '../components/Logo';
import { appNavigation, currentUser } from './demo-data';

/** App frame: sidebar, top bar and a scrolling main area. Every page below uses it. */
export function Shell({ activeId, breadcrumbs, children }: { activeId: string; breadcrumbs: TopBarProps['breadcrumbs']; children: ReactNode }) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-surface-page">
      <Sidebar items={appNavigation} activeId={activeId} logo={<Logo />} logoCollapsed={<Logo variant="mark" />} />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar
          breadcrumbs={breadcrumbs}
          user={currentUser}
          notificationCount={8}
          onNotificationsClick={() => {}}
          onThemeToggle={() => {}}
          onTourClick={() => {}}
          onAppsClick={() => {}}
        />
        <main className="min-w-0 flex-1 overflow-y-auto p-8">
          <div className="flex flex-col gap-6">{children}</div>
        </main>
      </div>
    </div>
  );
}

