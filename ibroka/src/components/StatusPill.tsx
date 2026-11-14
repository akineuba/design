import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../lib/cx';

export type StatusTone = 'success' | 'warning' | 'error' | 'info' | 'neutral';

export interface StatusPillProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Choose by meaning, never by colour (UI rule 32). success = done or in force (Active, Paid, Settled).
   * warning = waiting on someone or due soon (Pending approval, Expiring). info = in progress (Reported, Quoted).
   * error = failed, late or ended badly (Expired, Lapsed, Repudiated, Overdue). neutral = draft or inactive.
   */
  tone?: StatusTone;
  /** Coloured dot before the label, as drawn in Figma. */
  dot?: boolean;
  children: ReactNode;
}

const tones: Record<StatusTone, { pill: string; dot: string }> = {
  success: { pill: 'bg-status-success-bg text-status-success-fg', dot: 'bg-status-success-dot' },
  warning: { pill: 'bg-status-warning-bg text-status-warning-fg', dot: 'bg-status-warning-dot' },
  error: { pill: 'bg-status-error-bg text-status-error-fg', dot: 'bg-status-error-dot' },
  info: { pill: 'bg-status-info-bg text-status-info-fg', dot: 'bg-status-info-dot' },
  neutral: { pill: 'bg-status-neutral-bg text-status-neutral-fg', dot: 'bg-status-neutral-dot' },
};

/** Rounded status label with a dot. Figma: 22px, fully rounded, 20% tint, Medium 12. */
export function StatusPill({ tone = 'neutral', dot = true, className, children, ...rest }: StatusPillProps) {
  return (
    <span
      className={cx(
        'inline-flex h-pill max-w-full items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 text-12 font-medium',
        tones[tone].pill,
        className,
      )}
      {...rest}
    >
      {dot && <span className={cx('size-[6px] shrink-0 rounded-full', tones[tone].dot)} aria-hidden />}
      <span className="truncate">{children}</span>
    </span>
  );
}

/** One place that maps every iBroka record status to a tone, so the same status looks the same everywhere. */
export const STATUS_TONES = {
  // Policies
  Active: 'success',
  Renewed: 'success',
  Pending: 'warning',
  'Pending approval': 'warning',
  Expiring: 'warning',
  Quoted: 'info',
  Draft: 'neutral',
  Expired: 'error',
  Lapsed: 'error',
  Cancelled: 'neutral',
  // Claims
  Reported: 'info',
  'Under review': 'warning',
  Approved: 'success',
  Settled: 'success',
  Repudiated: 'error',
  // Money
  Paid: 'success',
  'Part paid': 'info',
  Unpaid: 'warning',
  Overdue: 'error',
  // People
  Inactive: 'neutral',
} as const satisfies Record<string, StatusTone>;

export type KnownStatus = keyof typeof STATUS_TONES;

/** StatusPill that picks its tone from STATUS_TONES. */
export function RecordStatus({ status, ...rest }: { status: KnownStatus } & Omit<StatusPillProps, 'tone' | 'children'>) {
  return (
    <StatusPill tone={STATUS_TONES[status]} {...rest}>
      {status}
    </StatusPill>
  );
}
