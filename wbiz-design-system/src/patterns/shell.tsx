// Story-only app frame shared by the page patterns.
import type { ReactNode } from 'react';
import { NavMenu } from '../components/NavMenu';
import { TopBar, type TopBarProps } from '../components/TopBar';
import { Logo } from '../components/Logo';
import { appFooterNavigation, appNavigation, currentUser } from './demo-data';
// The top bar's theme button drives the Storybook theme (patterns have no floating toggle).
import { setTheme, useTheme } from '../../.storybook/theme';

/** App frame: sidebar, top bar and a scrolling main area. Every page below uses it. */
export function Shell({ activeId, breadcrumbs, children }: { activeId: string; breadcrumbs: TopBarProps['breadcrumbs']; children: ReactNode }) {
  const theme = useTheme();
  return (
    <div className="flex h-screen w-full overflow-hidden bg-surface-page">
      <NavMenu items={appNavigation} footerItems={appFooterNavigation} activeId={activeId} logo={<Logo size="sm" />} logoCollapsed={<Logo variant="mark" size="sm" />} />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar
          breadcrumbs={breadcrumbs}
          user={currentUser}
          notificationCount={8}
          onNotificationsClick={() => {}}
          theme={theme}
          onThemeToggle={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          onTourClick={() => {}}
          onAppsClick={() => {}}
        />
        <main className="relative min-w-0 flex-1 overflow-y-auto p-8">
          <div className="flex flex-col gap-6">{children}</div>
        </main>
      </div>
    </div>
  );
}

