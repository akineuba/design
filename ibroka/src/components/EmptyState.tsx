import type { ReactNode } from 'react';
import { cx } from '../lib/cx';
import { EmptyIcon } from '../icons';

export interface EmptyStateProps {
  /** What belongs here: "No policies yet". For no search results, say what was searched. */
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  /** The next step, usually the page's Add New button (wBiz proposal B12, now a rule). */
  action?: ReactNode;
  compact?: boolean;
  className?: string;
}

/** Shown inside a card or table when there's nothing to show. Figma dashboard has an illustration slot (image 3). */
export function EmptyState({ title, description, icon = <EmptyIcon />, action, compact, className }: EmptyStateProps) {
  return (
    <div className={cx('flex flex-col items-center justify-center gap-3 text-center', compact ? 'py-8' : 'py-14', className)}>
      <span className="inline-flex size-14 items-center justify-center rounded-full bg-brand-subtle text-primary" aria-hidden>
        <span className="size-7">{icon}</span>
      </span>
      <div className="flex max-w-sm flex-col gap-1">
        <p className="text-15 font-semibold text-fg-strong">{title}</p>
        {description && <p className="text-13 text-fg-muted">{description}</p>}
      </div>
      {action && <div className="mt-1">{action}</div>}
    </div>
  );
}
