import { cx } from '../lib/cx';

/** Small rotating ring used inside buttons and loading rows. Inherits the text colour. */
export function Spinner({ className, label }: { className?: string; label?: string }) {
  return (
    <span role={label ? 'status' : undefined} className={cx('inline-flex size-icon-sm shrink-0', className)}>
      <svg viewBox="0 0 24 24" className="size-full animate-spin" aria-hidden>
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
        <path d="M21 12a9 9 0 0 0-9-9" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
      {label && <span className="sr-only">{label}</span>}
    </span>
  );
}
