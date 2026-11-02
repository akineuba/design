import { useId, type ReactNode } from 'react';
import { cx } from '../lib/cx';
import { usePopover } from '../lib/usePopover';
import { CaretDownIcon, CheckIcon, FilterIcon } from '../icons';
import { Button } from './Button';

export interface QuickFilterProps {
  /** Filter name shown before the value: "Status: All". */
  label: string;
  options: Array<{ value: string; label: string }>;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

/**
 * Inline "Label: Value ▾" filter that applies at once. Figma: Selector Dropdown, 8px radius,
 * 16/12 padding, 13px. Use at most two next to a card title (UI Rules B6); use FilterDropdown for more.
 */
export function QuickFilter({ label, options, value, onChange, className }: QuickFilterProps) {
  const { open, toggle, close, rootRef, triggerRef } = usePopover<HTMLDivElement>();
  const listId = useId();
  const current = options.find((o) => o.value === value);
  return (
    <div ref={rootRef} className={cx('relative', className)}>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={toggle}
        className="inline-flex h-control-md items-center gap-7.5 rounded-md border border-line-subtle bg-surface px-4 text-13 text-fg-strong hover:border-line-strong ib-focus"
      >
        <span className="flex gap-2.5">
          <span className="text-fg-muted">{label}:</span>
          <span className="font-medium">{current?.label ?? 'All'}</span>
        </span>
        <span className={cx('size-3 text-fg-strong transition-transform', open && 'rotate-180')} aria-hidden>
          <CaretDownIcon />
        </span>
      </button>
      {open && (
        <ul id={listId} role="listbox" aria-label={label} className="absolute left-0 z-30 mt-1 min-w-full animate-fade-in rounded-md border border-line-subtle bg-surface py-1 shadow-pop">
          {options.map((o) => {
            const on = o.value === value;
            return (
              <li key={o.value} role="option" aria-selected={on}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(o.value);
                    close();
                  }}
                  className={cx('flex w-full items-center justify-between gap-4 whitespace-nowrap px-4 py-2 text-left text-13 hover:bg-surface-muted focus-visible:bg-surface-muted focus-visible:outline-none', on ? 'font-semibold text-primary' : 'text-fg-strong')}
                >
                  {o.label}
                  {on && (
                    <span className="size-icon-sm" aria-hidden>
                      <CheckIcon />
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export interface FilterDropdownProps {
  /** Number of filters currently applied; shown on the button (UI rule 19). */
  activeCount?: number;
  /** The filter fields. Wrap them in FieldSizeContext 'filter' for 34px controls (done for you). */
  children: ReactNode;
  onApply: () => void;
  onClear: () => void;
  label?: string;
  defaultOpen?: boolean;
}

/** "Filter" button that opens a panel of fields; nothing changes until Apply (UI rule 21). Figma: funnel outline button. */
export function FilterDropdown({ activeCount = 0, children, onApply, onClear, label = 'Filter', defaultOpen }: FilterDropdownProps) {
  const { open, toggle, close, rootRef, triggerRef } = usePopover<HTMLDivElement>(defaultOpen);
  const panelId = useId();
  return (
    <div ref={rootRef} className="relative">
      <Button
        ref={triggerRef}
        variant="outline"
        leadingIcon={<FilterIcon />}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={toggle}
        className={cx(activeCount > 0 && 'border-brand text-primary')}
      >
        {label}
        {activeCount > 0 && (
          <span className="ml-0.5 inline-flex size-5 items-center justify-center rounded-full bg-primary text-11 text-fg-inverse">{activeCount}</span>
        )}
      </Button>
      {open && (
        <div
          id={panelId}
          role="dialog"
          aria-label="Filters"
          className="absolute left-0 z-30 mt-2 w-[340px] max-w-[calc(100vw-32px)] animate-fade-in rounded-lg border border-line-subtle bg-surface shadow-pop"
        >
          <div className="flex flex-col gap-3 p-4.5">{children}</div>
          <div className="flex justify-between gap-2.5 border-t border-line-subtle px-4.5 py-3">
            <Button variant="tertiary" size="sm" onClick={onClear}>
              Clear all
            </Button>
            <Button
              size="sm"
              onClick={() => {
                onApply();
                close();
              }}
            >
              Apply filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
