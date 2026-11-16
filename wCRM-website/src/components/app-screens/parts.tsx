import type { CSSProperties, ReactNode } from 'react';
import { LucideMoreIcon, SearchNormalIcon, cn } from '@ds';

/** Shared pieces of the rebuilt wCRM product screens (tables, toolbars, kebab buttons). */

export function SearchBox({ className }: { className?: string }) {
  return (
    <span className={cn('flex h-control-31 w-search-sm items-center gap-2.5 rounded-sm border border-border-strong px-2.5 text-body text-text-muted', className)}>
      <SearchNormalIcon className="size-4.5 text-text-secondary" />
      Search...
    </span>
  );
}

export function Kebab() {
  return (
    <span className="flex size-5.5 items-center justify-center rounded-xs border border-border-default text-text-secondary">
      <LucideMoreIcon className="size-3.5 rotate-90" />
    </span>
  );
}

/** White table card with a toolbar row. */
export function ScreenCard({ toolbar, children, className, style }: { toolbar: ReactNode; children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <div style={style} className={cn('absolute overflow-hidden rounded-callout border border-border-subtle bg-surface-default', className)}>
      <div className="flex h-14 items-center justify-between px-4">{toolbar}</div>
      {children}
    </div>
  );
}

/** One grid row; `columns` is the CSS grid template measured from the screenshot. */
export function GridRow({ columns, className, children }: { columns: string; className?: string; children: ReactNode }) {
  return (
    <div className={cn('grid items-center px-4', className)} style={{ gridTemplateColumns: columns }}>
      {children}
    </div>
  );
}

export const headCell = 'text-caption font-medium uppercase text-text-secondary';
