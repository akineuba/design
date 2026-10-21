import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';

export type StatusTone = 'warning' | 'info' | 'neutral' | 'success' | 'error';

export interface StatusPillProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Choose by meaning: warning = waiting on someone (Pending Approval), info = in progress
   * (Awaiting Payment), neutral = partial or inactive, success = done (Paid, Completed).
   * error = failed or late (Overdue, Rejected); derived, there is no error pill in Figma.
   */
  tone?: StatusTone;
  children: ReactNode;
}

const tones: Record<StatusTone, string> = {
  warning: 'bg-status-warning-bg text-status-warning-fg',
  info: 'bg-status-info-bg text-status-info-fg',
  neutral: 'bg-status-neutral-bg text-status-neutral-fg',
  success: 'bg-status-success-bg text-status-success-fg',
  error: 'bg-status-error-bg text-status-error-fg',
};

/** Rounded status label for table rows and record headers. 22px tall, Roboto Semibold 12. */
export function StatusPill({ tone = 'neutral', className, children, ...rest }: StatusPillProps) {
  return (
    <span
      className={cx(
        'inline-flex h-pill max-w-full items-center whitespace-nowrap rounded-md px-2.5 font-data text-xs font-semibold',
        tones[tone],
        className,
      )}
      {...rest}
    >
      <span className="truncate">{children}</span>
    </span>
  );
}
