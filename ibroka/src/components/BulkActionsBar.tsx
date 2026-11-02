import type { ReactNode } from 'react';
import { cx } from '../lib/cx';
import { CloseIcon } from '../icons';

export interface BulkActionsBarProps {
  count: number;
  /** Noun for the count: "3 policies selected". */
  noun?: [singular: string, plural: string];
  /** Buttons (size sm). Delete last, as destructive-outline. */
  actions: ReactNode;
  onClear: () => void;
  className?: string;
}

/** Replaces the card's toolbar while rows are ticked (wBiz proposal B5, now a rule). */
export function BulkActionsBar({ count, noun = ['row', 'rows'], actions, onClear, className }: BulkActionsBarProps) {
  if (count === 0) return null;
  return (
    <div role="region" aria-label="Bulk actions" className={cx('flex flex-wrap items-center justify-between gap-3 bg-brand-subtle px-4.5 py-3', className)}>
      <div className="flex items-center gap-3">
        <button type="button" aria-label="Clear selection" onClick={onClear} className="inline-flex size-7 items-center justify-center rounded-md text-primary hover:bg-surface ib-focus">
          <span className="size-icon-sm">
            <CloseIcon />
          </span>
        </button>
        <p className="text-13 font-semibold text-primary" aria-live="polite">
          {count} {count === 1 ? noun[0] : noun[1]} selected
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2.5">{actions}</div>
    </div>
  );
}
