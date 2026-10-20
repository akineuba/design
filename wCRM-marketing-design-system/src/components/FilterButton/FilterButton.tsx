import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { FilterIcon } from '../../icons';
import { cn } from '../../utils/cn';

export interface FilterButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Visible label on desktop. Also the accessible name when the label is hidden. */
  label?: string;
  /** Number of applied filters. Shows a count pill and switches to the active style when above 0. */
  count?: number;
  /** Force the active style (filters applied, or the popover is open). Defaults to `count > 0`. */
  active?: boolean;
  /**
   * - labelled: desktop toolbar button, icon + "Filter" (Figma `filter-button`, 1230:26010)
   * - icon: 40 × 40 square for mobile toolbars (Figma `Filter button`, 1931:24248 / active 1931:24486)
   * - responsive: labelled from `sm` up, icon-only below
   */
  display?: 'labelled' | 'icon' | 'responsive';
}

/**
 * Toolbar trigger for a `FilterPopover`. Pass it as the popover `trigger`; it forwards refs and props so
 * Radix can wire `aria-expanded` and focus return.
 */
export const FilterButton = forwardRef<HTMLButtonElement, FilterButtonProps>(function FilterButton(
  { label = 'Filter', count = 0, active, display = 'labelled', type = 'button', className, ...rest },
  ref,
) {
  const isActive = active ?? count > 0;
  const hideLabel = display === 'icon' ? 'sr-only' : display === 'responsive' ? 'max-sm:sr-only' : undefined;
  const square = display === 'icon' ? 'w-control-md justify-center' : display === 'responsive' ? 'max-sm:w-control-md max-sm:justify-center max-sm:px-0 sm:px-4' : 'px-4';

  return (
    <button
      ref={ref}
      type={type}
      aria-label={count > 0 ? `${label}, ${count} applied` : undefined}
      data-active={isActive || undefined}
      className={cn(
        'relative inline-flex h-control-md shrink-0 items-center gap-2 rounded-md border font-sans text-label font-medium',
        'transition-colors duration-fast ease-standard focus-visible:outline-none focus-visible:shadow-focus',
        'disabled:cursor-not-allowed disabled:border-border-default disabled:bg-surface-sunken disabled:text-text-muted',
        isActive
          ? 'border-brand-primary bg-brand-primary-subtle text-brand-primary'
          : display === 'icon'
            ? 'border-border-default bg-surface-default text-text-primary hover:border-border-strong'
            : 'border-border-default bg-transparent text-text-secondary hover:border-border-strong hover:text-text-primary',
        square,
        className,
      )}
      {...rest}
    >
      <FilterIcon
        className={cn(
          'shrink-0',
          display === 'icon' ? 'size-icon-md' : display === 'responsive' ? 'size-5 max-sm:size-icon-md' : 'size-5',
          !isActive && display !== 'icon' && 'text-text-muted',
        )}
      />
      <span className={hideLabel}>{label}</span>
      {count > 0 && (
        <span
          aria-hidden="true"
          className={cn(
            'inline-flex min-w-5 items-center justify-center rounded-full bg-brand-primary px-1.5 text-caption font-semibold text-text-inverse',
            display === 'icon' ? 'absolute -right-1.5 -top-1.5' : display === 'responsive' ? 'max-sm:absolute max-sm:-right-1.5 max-sm:-top-1.5' : undefined,
          )}
        >
          {count}
        </span>
      )}
    </button>
  );
});
