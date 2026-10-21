import { useId, useState, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { FieldLabelContext } from '../../utils/field-label';
import { Button } from '../Button';
import { FilterEditIcon } from '../../icons';

export interface FilterBarProps {
  /** Always-visible fields, usually a Date select. Figma: "Date" (General ledger, 1752:21749). */
  children: ReactNode;
  /** Extra fields revealed by "More Filters". Omit to hide the toggle. */
  moreFilters?: ReactNode;
  /** Controlled state of the "More Filters" row. */
  expanded?: boolean;
  defaultExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  onApply?: () => void;
  applyLabel?: string;
  /** "Advanced" button at the end of the extra row. Omit to hide it. */
  onAdvanced?: () => void;
  advancedLabel?: string;
  /** Busy state on Apply while results load. */
  applying?: boolean;
  className?: string;
}

const tinted =
  'inline-flex h-control-sm shrink-0 items-center justify-between gap-3 rounded-lg border border-primary px-4 font-sans text-sm transition-colors ' +
  'focus-visible:outline-none focus-visible:shadow-focus';

/**
 * Report filter bar. Figma: filter (General ledger, 1752:21749), two variants: Default shows the main
 * fields, "More Filters" and Apply; Variant2 adds a divider and a second row of fields with "Advanced".
 * White card, 1px line-subtle border, 8px radius, 16px padding; fields are 34px.
 */
export function FilterBar({
  children,
  moreFilters,
  expanded: expandedProp,
  defaultExpanded = false,
  onExpandedChange,
  onApply,
  applyLabel = 'Apply',
  onAdvanced,
  advancedLabel = 'Advanced',
  applying = false,
  className,
}: FilterBarProps) {
  const [inner, setInner] = useState(defaultExpanded);
  const expanded = expandedProp ?? inner;
  const setExpanded = (v: boolean) => {
    if (expandedProp === undefined) setInner(v);
    onExpandedChange?.(v);
  };
  const regionId = useId();

  return (
    <FieldLabelContext.Provider value="form">
      <section aria-label="Filters" className={cx('flex w-full flex-col gap-4 rounded-lg border border-line-subtle bg-surface p-4', className)}>
        <div className="flex flex-wrap items-end gap-5">
          {children}
          {moreFilters && (
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls={regionId}
              onClick={() => setExpanded(!expanded)}
              className={cx(tinted, 'w-filter-control max-w-full text-fg-muted', expanded ? 'bg-primary-muted' : 'bg-surface hover:bg-primary-subtle')}
            >
              More Filters
              <span className={cx('size-icon shrink-0', expanded ? 'text-primary' : 'text-icon')} aria-hidden><FilterEditIcon /></span>
            </button>
          )}
          {onApply && (
            <Button className="min-w-filter-control" onClick={onApply} loading={applying}>
              {applyLabel}
            </Button>
          )}
        </div>
        {moreFilters && (
          <div id={regionId} hidden={!expanded} className={cx(expanded ? 'flex' : 'hidden', 'flex-wrap items-end gap-5 border-t border-line-subtle pt-4')}>
            {moreFilters}
            {onAdvanced && (
              <button type="button" onClick={onAdvanced} className={cx(tinted, 'ml-auto justify-center bg-primary-muted text-primary hover:bg-primary-subtle')}>
                {advancedLabel}
              </button>
            )}
          </div>
        )}
      </section>
    </FieldLabelContext.Provider>
  );
}

export interface FilterBarFieldProps {
  children: ReactNode;
  className?: string;
}

/** Fixed-width slot for a field in the filter bar so rows line up. */
export function FilterBarField({ children, className }: FilterBarFieldProps) {
  return <div className={cx('w-filter-control max-w-full', className)}>{children}</div>;
}
