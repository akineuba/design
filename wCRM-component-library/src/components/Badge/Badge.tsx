import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export type BadgeTone = 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'brand';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Status meaning. Always pair the colour with a readable label. */
  tone?: BadgeTone;
  /** Show the 6px status dot before the label (Figma `status-badge`). */
  dot?: boolean;
  size?: 'sm' | 'md';
}

const tones: Record<BadgeTone, { pill: string; dot: string }> = {
  success: { pill: 'bg-status-success-subtle text-status-success-text', dot: 'bg-status-success' },
  warning: { pill: 'bg-status-warning-subtle text-status-warning-text', dot: 'bg-status-warning' },
  danger: { pill: 'bg-status-danger-subtle text-status-danger', dot: 'bg-status-danger' },
  info: { pill: 'bg-status-info-subtle text-accent-navy', dot: 'bg-status-info' },
  neutral: { pill: 'bg-surface-sunken text-text-secondary', dot: 'bg-text-muted' },
  brand: { pill: 'bg-brand-primary-subtle text-brand-primary', dot: 'bg-brand-primary' },
};

const sizes = { sm: 'h-5 px-2 text-caption font-semibold', md: 'h-6 px-3 text-label-sm' };

/** Status pill used in tables and cards: Active, Inactive, Failed, Scheduled, Spam Report. */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { tone = 'neutral', dot = true, size = 'md', className, children, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cn('inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full', sizes[size], tones[tone].pill, className)}
      {...rest}
    >
      {dot && <span className={cn('size-1.5 shrink-0 rounded-full', tones[tone].dot)} aria-hidden="true" />}
      {children}
    </span>
  );
});
