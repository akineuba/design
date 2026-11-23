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

function Frame({ id, header = true }: { id: ShotId; header?: boolean }) {
  const s = SHOTS[id];
  return (
    <AppFrame title={s.title} active={s.active} header={header}>
      {s.screen}
    </AppFrame>
  );
}

/**
 * Full page: the whole app window, scaled to the box width (box keeps the window's aspect ratio).
 * `header={false}` leaves out the top bar (sidebar and content only).
 */
export function FullShot({ id, header = true, className, style }: { id: ShotId; header?: boolean; className?: string; style?: CSSProperties }) {
  const height = header ? APP_FRAME.height : APP_FRAME.height - APP_FRAME.header;
  return (
    <div data-shot={`full-${id}${header ? '' : '-no-header'}`} className={cn('relative w-full overflow-hidden', className)} style={{ aspectRatio: `${APP_FRAME.width} / ${height}`, ...style }}>
      <ScaledScreen width={APP_FRAME.width} height={height} fit="top" label={SHOTS[id].label}>
        <Frame id={id} header={header} />
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
 * Inset: the app window set in from the card's top-left corner and running off its right and bottom edges, straight
 * on (not skewed). Offsets and width are illustration geometry, kept with the artwork.
 */
const INSET: CSSProperties = { left: 32, top: 32, width: '118%' };

export function InsetShot({ id }: { id: ShotId }) {
  return (
    <div data-shot={`inset-${id}`} className="absolute" style={INSET}>
      <FullShot id={id} className="rounded-lg border border-border-default shadow-lg" />
    </div>
  );
}
