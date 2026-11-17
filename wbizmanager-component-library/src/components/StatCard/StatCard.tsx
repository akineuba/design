import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';

export type StatTone = 'default' | 'primary' | 'success' | 'error' | 'warning';

export interface StatCardProps extends HTMLAttributes<HTMLDivElement> {
  label: ReactNode;
  value: ReactNode;
  /** Colour of the value, by meaning: success = good / paid, error = bad / overdue, primary = neutral metric. */
  tone?: StatTone;
  /** Small icon shown in a tinted tile before the text. */
  icon?: ReactNode;
  /** Secondary line under the value, e.g. "12 of 28 runs". */
  hint?: ReactNode;
}

const valueTone: Record<StatTone, string> = {
  default: 'text-fg-ink',
  primary: 'text-primary',
  success: 'text-success-strong',
  error: 'text-error',
  warning: 'text-warning',
};

const tileTone: Record<StatTone, string> = {
  default: 'bg-surface-muted text-icon',
  primary: 'bg-primary-muted text-primary',
  success: 'bg-success-subtle text-success-strong',
  error: 'bg-error-subtle text-error',
  warning: 'bg-status-warning-bg text-warning',
};

/**
 * Key figure at the top of a page or dashboard. Figma: the stat row on Appraisal Dashboard
 * (hr, 4370:29966): white card, 1px line-subtle border, 8px radius, label Inter 16 fg-muted,
 * value Inter Semibold 24 coloured by meaning, optional icon tile on the left.
 */
export function StatCard({ label, value, tone = 'default', icon, hint, className, ...rest }: StatCardProps) {
  return (
    <div className={cx('flex min-w-0 items-center gap-3 rounded-lg border border-line-subtle bg-surface px-4 py-3', className)} {...rest}>
      {icon && (
        <span className={cx('inline-flex size-control-xs shrink-0 items-center justify-center rounded-lg', tileTone[tone])} aria-hidden>
          <span className="size-icon">{icon}</span>
        </span>
      )}
      <div className="flex min-w-0 flex-col">
        <span className="truncate font-sans text-sm text-fg-muted">{label}</span>
        <span className={cx('truncate font-sans text-xl font-semibold', valueTone[tone])}>{value}</span>
        {hint && <span className="truncate font-sans text-xs text-fg-muted">{hint}</span>}
      </div>
    </div>
  );
}
