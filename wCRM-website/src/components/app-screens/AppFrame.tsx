import type { ReactNode } from 'react';
import { NavMenu, TopBar } from '@ds';
import { businessSections, businessSettings } from '@ds/components/NavMenu/NavMenu.fixtures';

/**
 * Native size of a full-page product shot: the design-system sidebar (`w-sidebar`, 217) beside a 1400px content area
 * (the width every rebuilt screen is laid out at), under the design-system header (`h-header`, 63).
 */
export const APP_FRAME = { width: 1617, height: 860 } as const;

/**
 * The wCRM app window for marketing shots: design-system `TopBar` and `NavMenu` with the Business Development sidebar
 * (NavMenu.fixtures `businessSections`), and a screen in the content area. Inert illustration (see ScaledScreen).
 */
export function AppFrame({ title, active, children }: { title: string; active: string; children: ReactNode }) {
  return (
    <div className="flex size-full flex-col bg-surface-canvas">
      <TopBar title={title} greeting="Hi Adaeze," userName="Adaeze Okafor" hasUnreadNotifications />
      <div className="flex min-h-0 flex-1">
        <NavMenu sections={businessSections} settings={businessSettings} activeId={active} onLogout={() => undefined} className="h-full" />
        <div className="relative min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
