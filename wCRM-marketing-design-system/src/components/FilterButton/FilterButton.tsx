import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { CalendarOutlineIcon, FilterBoldIcon, FilterIcon } from '../../icons';
import { cn } from '../../utils/cn';

/**
 * Mobile dialect of the icon-only button.
 * - v2: Mobile V2-flow, 44×44, #DDE3ED border; active #FFF0F2 fill, #F32135 border, bold glyph, 7px dot
 * - v1: Mobile V1, 44×44, #E2E8F0 border; active #FFF1F2 fill, #EE1F2F border, bold glyph, 14px dot
 * - sections: Mobile V2-sections, 40×40, 18px glyph; active #FFF0F1 fill, #EE1F2F border, glyph stays linear, no dot
 */
export type FilterButtonAppearance = 'v2' | 'v1' | 'sections';

export interface FilterButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Visible label on desktop. Also the accessible name when the label is hidden. */
  label?: string;
  /** Number of applied filters. Shows a count (desktop pill, mobile dot) and switches to the active style when above 0. */
  count?: number;
  /** Force the active style (filters applied, or the popover is open). Defaults to `count > 0`. */
  active?: boolean;
  /**
   * - labelled: desktop toolbar button, calendar icon + "Filter" (Figma `filter-button`, 1230:26010)
   * - icon: square funnel button for mobile toolbars (Figma `Filter action` 1926:24556 / 1926:24736, 1918:20992, 1931:24248 / 1931:24486)
   * - responsive: labelled from `sm` up, icon-only below
   */
  display?: 'labelled' | 'icon' | 'responsive';
  /** Mobile dialect of the icon-only button. Default `v2`. */
  appearance?: FilterButtonAppearance;
  /** Label colour of the labelled button: #64748B (lists) or #4F5966 (User management). */
  labelTone?: 'secondary' | 'nav';
}

const iconBox: Record<FilterButtonAppearance, string> = {
  v2: 'size-control-lg',
  v1: 'size-control-lg',
  sections: 'size-control-md',
};
const iconIdle: Record<FilterButtonAppearance, string> = {
  v2: 'border-mobile-border bg-surface-default',
  v1: 'border-border-default bg-surface-default',
  sections: 'border-border-default bg-surface-default',
};
const iconActive: Record<FilterButtonAppearance, string> = {
  v2: 'border-mobile-brand bg-brand-primary-subtle',
  v1: 'border-brand-primary bg-status-danger-subtle',
  sections: 'border-brand-primary bg-mobile-brand-subtle',
};
const dots: Record<FilterButtonAppearance, string | null> = {
  v2: 'right-1.25 top-1.25 size-1.75 bg-mobile-brand',
  v1: 'right-1 top-1 size-3.5 bg-brand-primary',
  sections: null,
};
const glyph: Record<FilterButtonAppearance, string> = { v2: 'size-5', v1: 'size-5', sections: 'size-icon-md' };

/**
 * Toolbar trigger for a `FilterPopover`. Pass it as the popover `trigger`; it forwards refs and props so
 * Radix can wire `aria-expanded` and focus return.
 */
export const FilterButton = forwardRef<HTMLButtonElement, FilterButtonProps>(function FilterButton(
  { label = 'Filter', count = 0, active, display = 'labelled', appearance = 'v2', labelTone = 'secondary', type = 'button', className, ...rest },
  ref,
) {
  const isActive = active ?? count > 0;
  const accessibleName = count > 0 ? `${label}, ${count} applied` : undefined;

  if (display === 'icon') {
    // Figma keeps the glyph #292D32 when active and swaps linear → bold (V2/V1); sections stay linear.
    const bold = isActive && appearance !== 'sections';
    const Glyph = bold ? FilterBoldIcon : FilterIcon;
    const dot = dots[appearance];
    return (
      <button
        ref={ref}
        type={type}
        aria-label={accessibleName ?? label}
        data-active={isActive || undefined}
        data-appearance={appearance}
        className={cn(
          'relative inline-flex shrink-0 items-center justify-center rounded-md border text-mobile-icon',
          'transition-colors duration-fast ease-standard focus-visible:outline-none focus-visible:shadow-focus',
          'disabled:cursor-not-allowed disabled:opacity-50',
          iconBox[appearance],
          isActive ? iconActive[appearance] : iconIdle[appearance],
          className,
        )}
        {...rest}
      >
        <Glyph className={cn('shrink-0', glyph[appearance])} />
        {count > 0 && dot && <span aria-hidden="true" className={cn('absolute rounded-full', dot)} />}
      </button>
    );
  }

  const responsive = display === 'responsive';
  return (
    <button
      ref={ref}
      type={type}
      aria-label={accessibleName}
      data-active={isActive || undefined}
      className={cn(
        'relative inline-flex h-control-md shrink-0 items-center gap-2 rounded-md border font-sans text-body font-medium',
        'transition-colors duration-fast ease-standard focus-visible:outline-none focus-visible:shadow-focus',
        'disabled:cursor-not-allowed disabled:border-border-default disabled:bg-surface-sunken disabled:text-text-muted',
        isActive
          ? 'border-brand-primary bg-brand-primary-subtle text-brand-primary'
          : cn('border-border-default bg-transparent hover:border-border-strong', labelTone === 'nav' ? 'text-text-nav' : 'text-text-secondary'),
        responsive ? 'max-sm:h-control-lg max-sm:w-control-lg max-sm:justify-center max-sm:px-0 sm:px-4' : 'px-4',
        className,
      )}
      {...rest}
    >
      {/* Figma draws the desktop button with the vuesax calendar glyph and the mobile square with the funnel. */}
      <CalendarOutlineIcon className={cn('size-5 shrink-0', !isActive && 'text-text-muted', responsive && 'max-sm:hidden')} />
      {responsive && <FilterIcon className="size-5 shrink-0 text-mobile-icon sm:hidden" />}
      <span className={responsive ? 'max-sm:sr-only' : undefined}>{label}</span>
      {count > 0 && (
        <span
          aria-hidden="true"
          className={cn(
            'inline-flex min-w-5 items-center justify-center rounded-full bg-brand-primary px-1.5 text-caption font-semibold text-text-inverse',
            responsive && 'max-sm:absolute max-sm:right-1.25 max-sm:top-1.25 max-sm:size-1.75 max-sm:min-w-0 max-sm:p-0 max-sm:text-transparent',
          )}
        >
          {count}
        </span>
      )}
    </button>
  );
});
