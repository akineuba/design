import { cx } from '../../utils/cx';

export interface SpinnerProps {
  /** Accessible label. Omit when a parent already announces the busy state. */
  label?: string;
  className?: string;
}

/** Circular loading indicator. Inherits colour from `currentColor` and sizes to the icon token. */
export function Spinner({ label, className }: SpinnerProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      role={label ? 'status' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cx('size-icon shrink-0 animate-spin', className)}
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" opacity="0.25" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
