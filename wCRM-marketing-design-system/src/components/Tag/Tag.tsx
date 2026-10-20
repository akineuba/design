import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  /** Highlighted chip, e.g. the filter currently being edited (navy text in Figma). */
  selected?: boolean;
  /** Shows a remove button; called with no arguments when pressed. */
  onRemove?: () => void;
  /** Accessible name for the remove button. Defaults to "Remove <children>". */
  removeLabel?: string;
}

/** Filter chip from the "Active Filters" panel. */
export const Tag = forwardRef<HTMLSpanElement, TagProps>(function Tag({ selected, onRemove, removeLabel, className, children, ...rest }, ref) {
  return (
    <span
      ref={ref}
      className={cn(
        'inline-flex h-chip items-center gap-1.5 rounded-sm px-2.5 text-body-sm',
        selected ? 'bg-accent-navy-subtle font-semibold text-accent-navy' : 'bg-surface-sunken text-text-primary',
        className,
      )}
      {...rest}
    >
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={removeLabel ?? `Remove ${typeof children === 'string' ? children : 'filter'}`}
          className="-mr-1 inline-flex size-5 items-center justify-center rounded-xs text-text-secondary hover:bg-border-default hover:text-text-primary focus-visible:outline-none focus-visible:shadow-focus"
        >
          <svg viewBox="0 0 24 24" className="size-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
        </button>
      )}
    </span>
  );
});
