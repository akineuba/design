import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';

/** Same five tones as the wBiz ERP status set. */
export type StatusTone = 'success' | 'error' | 'warning' | 'info' | 'neutral';

export interface StatusPillProps {
  tone?: StatusTone;
  children: ReactNode;
  /** Leading dot. Use in dense tables where colour alone carries meaning. */
  dot?: boolean;
  className?: string;
}

export function StatusPill({ tone = 'neutral', dot, children, className }: StatusPillProps) {
  return (
    <span className={cx('sso-pill', `sso-pill--${tone}`, className)}>
      {dot && <span className="sso-pill__dot" aria-hidden />}
      {children}
    </span>
  );
}
