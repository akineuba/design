import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@ds';
import {
  APP_FRAME,
  ActivitiesScreen,
  AppFrame,
  BudgetPanel,
  BudgetScreen,
  CompanyScreen,
  ContactsScreen,
  DealsScreen,
  ScaledScreen,
  type ScreenFocus,
} from './app-screens';

/*
 * Product shots for the marketing pages, generated from the rebuilt screens inside the design-system app frame
 * (TopBar + Business Development NavMenu). They are live HTML, so they follow the theme; /concept/screens renders
 * each one at native size for export.
 */

export type ShotId = 'deals' | 'contacts' | 'reports' | 'budgets' | 'companies';

export const SHOTS: Record<ShotId, { title: string; active: string; label: string; screen: ReactNode }> = {
  deals: { title: 'Deals', active: 'deals', label: 'wCRM Deals register', screen: <DealsScreen /> },
  contacts: { title: 'Contacts', active: 'contacts', label: 'wCRM Contacts register', screen: <ContactsScreen /> },
  reports: { title: 'Performance Report', active: 'report-performance', label: 'wCRM Performance report', screen: <ActivitiesScreen /> },
  budgets: { title: 'Budgets', active: 'budgets', label: 'wCRM Budgets and allocations', screen: <><BudgetScreen /><BudgetPanel /></> },
  companies: { title: 'Companies', active: 'companies', label: 'wCRM company record for Cash Drive Ltd', screen: <CompanyScreen /> },
};

function Frame({ id }: { id: ShotId }) {
  const s = SHOTS[id];
  return (
    <AppFrame title={s.title} active={s.active}>
      {s.screen}
    </AppFrame>
  );
}

/** Full page: the whole app window, scaled to the box width (box keeps the window's aspect ratio). */
export function FullShot({ id, className, style }: { id: ShotId; className?: string; style?: CSSProperties }) {
  return (
    <div data-shot={`full-${id}`} className={cn('relative w-full overflow-hidden', className)} style={{ aspectRatio: `${APP_FRAME.width} / ${APP_FRAME.height}`, ...style }}>
      <ScaledScreen width={APP_FRAME.width} height={APP_FRAME.height} fit="top" label={SHOTS[id].label}>
        <Frame id={id} />
      </ScaledScreen>
    </div>
  );
}

/** Cropped: zooms into one region of the app window (native px) and fills its positioned parent. */
export function CropShot({ id, focus, name }: { id: ShotId; focus: ScreenFocus; name: string }) {
  return (
    <div data-shot={`crop-${name}`} className="absolute inset-0">
      <ScaledScreen width={APP_FRAME.width} height={APP_FRAME.height} fit="top" focus={focus} label={SHOTS[id].label}>
        <Frame id={id} />
      </ScaledScreen>
    </div>
  );
}

/*
 * Skewed: the app window tilted in 3D and bleeding off the card's right edge. The transform is illustration
 * geometry, kept with the artwork.
 */
const SKEW: CSSProperties = {
  left: '30%',
  top: '-4%',
  width: '95%',
  transform: 'perspective(2200px) rotateX(24deg) rotateY(-10deg) rotateZ(10deg)',
  transformOrigin: 'top left',
};

export function SkewShot({ id }: { id: ShotId }) {
  return (
    <div data-shot={`skew-${id}`} className="absolute" style={SKEW}>
      <FullShot id={id} className="rounded-lg shadow-lg ring-1 ring-site-divider-on-dark" />
    </div>
  );
}
